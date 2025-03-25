import json
from dotenv import load_dotenv

load_dotenv()

from datetime import datetime
from src.utils import get_nested, get_github_stars, bytes_to_code
from src.genai import ask_ai
from src.graphql import get_package_details, get_package_transactions
from src.firebase import save

description_prompt = """
You are a Move language expert and you are given Move code of a module.
Your task is to generate a description on this Move module and each of the functions as Markdown.
"""

keywords_prompt = """
You are a Move language expert and you are given some Move code.
Your task is to generate 3 keywords that can be used for tags to search the functionality of this module.
Return the results as a json list of strings, do not add ```json.
"""


def get_modules(pack: str):
    data = get_package_details(pack["id"])
    pname = pack.get("name", data["address"])

    github = f"https://github.com/{pack['github']}"
    github_stars = get_github_stars(pack["github"])

    package = {
        "package": pname,
        "packageId": data["address"],
        "version": data["address"],
        "deployedAt": datetime.strptime(get_nested(data, ["previousTransactionBlock", "effects", "timestamp"], "2023-05-03T00:00:00.000Z"), '%Y-%m-%dT%H:%M:%S.%fZ'),
        "publisher": get_nested(data, ["previousTransactionBlock", "sender", "address"], "0x0000000000000000000000000000000000000000000000000000000000000000"),
        "linkedPackages": [l["upgradedId"] for l in data["linkage"]],
        "github": github,
    }

    for module in data["modules"]["nodes"]:
        print(f"Ingesting {pname}/{module['name']}...")
        functions = [f["name"] for f in get_nested(module, ["functions", "nodes"], [])]
        code = bytes_to_code(module["bytes"])

        description = ask_ai(description_prompt, code)

        keywords = ask_ai(keywords_prompt, code)
        keywords = keywords.replace("```json", "").replace("```", "").strip()
        keywords = json.loads(keywords)

        data = {
            **package,
            "module": module["name"],
            "functions": functions,
            "code": code,
            "description": description,
            "keywords": keywords,
            "metrics": {
                "github": github_stars,
                "transactions": 0,
                # "transactions": get_package_transactions(pack["id"], module["name"]),
            }
        }

        save("modules", f'{pack["id"]}_{module["name"]}', data)
        print(f"Ingested {pname}/{module['name']}...")


packages = [
    {
        "name": "sui",
        "id": "0x0000000000000000000000000000000000000000000000000000000000000002",
        "github": "MystenLabs/sui"
    },
    {
        "id": "0x0000000000000000000000000000000000000000000000000000000000000001",
        "github": "MystenLabs/sui"
    },
]

for pack in packages:
    print(f"Ingesting {pack['id']}...")
    get_modules(pack)
    print(f"Ingested {pack['id']}.")
