from firebase_functions import https_fn, options
from firebase_admin import initialize_app, firestore
from src.genai import find_similar_items, ask_ai

initialize_app()

cors_options = options.CorsOptions(
    cors_origins="*",
    cors_methods=["get", "post"]
)


def get_modules() -> list:
    db = firestore.client()
    collection_ref = db.collection("modules")
    docs = collection_ref.stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in docs]


def _get_response(
    msg="Unfortunately I can't find any modules matching your request. I am new to the SUI ecosystem, and I am getting a little smarter day by day.",
    modules=[]
):
    return {
        "message": msg,
        "modules": modules,
    }


@https_fn.on_request(
    region="europe-west1",
    cors=cors_options,
    timeout_sec=120,
)
def chat(req: https_fn.Request) -> https_fn.Response:
    if req.method != 'POST':
        return https_fn.Response("Method Not Allowed", status=405)

    try:
        question = req.get_json(silent=True).get('message')

        modules = get_modules()
        if len(modules) == 0:
            return _get_response()

        matches = find_similar_items(question, modules)
        if len(matches) == 0:
            return _get_response()

        matches_str = "\n".join(f"- {item['description']}" for item in matches)
        system_prompt = f"You're a Move package assistant that recommends Move packages from this list\n: {matches_str}."

        message = ask_ai(question, system_prompt)

        return _get_response(message, [m["id"] for m in matches]), 200
    except Exception as e:
        return _get_response()
