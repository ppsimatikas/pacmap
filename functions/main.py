from firebase_functions import https_fn, options, scheduler_fn
from firebase_admin import initialize_app
from src.services.chat import get_matched_modules
from src.services.ingest import ingest

initialize_app()

cors_options = options.CorsOptions(
    cors_origins="*",
    cors_methods=["get", "post"]
)


@https_fn.on_request(
    region="europe-west1",
    cors=cors_options,
    timeout_sec=120,
)
def chat(req: https_fn.Request) -> https_fn.Response:
    if req.method != 'POST':
        return https_fn.Response("Method Not Allowed", status=405)

    default_msg = "Unfortunately I can't find any modules matching your request. I am new to the SUI ecosystem, and I am getting a little smarter day by day."

    try:
        question = req.get_json(silent=True).get('message')
        message, matches = get_matched_modules(question)
        return {
            "message": message if message is not None else default_msg,
            "modules": matches
        }
    except Exception as e:
        return {
            "message": default_msg,
            "modules": []
        }


# Commented out for now, to not consume all the LLM model credits.
# @scheduler_fn.on_schedule(
#     schedule="every month 00:00",
#     region="europe-west1",
#     timeout_sec=60*5,
# )
# def ingest_packages(event: scheduler_fn.ScheduledEvent) -> None:
#     return ingest()
