from src.firestore import get_all
from src.genai import find_similar_items, ask_ai


def get_matched_modules(question: str):
    modules = get_all("modules")
    if len(modules) == 0:
        return None, []

    matches = find_similar_items(question, modules)
    if len(matches) == 0:
        return None, []

    matches_str = "\n".join(f"- {item['description']}" for item in matches)
    system_prompt = f"You're a Move package assistant that recommends Move packages from this list\n: {matches_str}."

    message = ask_ai(question, system_prompt)
    matched_ids = [m["id"] for m in matches]

    return message, matched_ids
