import json

from datetime import datetime
from src.utils import get_nested, get_github_stars, bytes_to_code
from src.genai import ask_ai, get_embedding
from src.graphql import get_package_details
from src.firestore import save, get_all
from src.services.get_transactions import get_transactions

long_description_prompt = """
You are a Move language expert and you are given Move code of a module.
Your task is to generate a description on this Move module and each of the functions as Markdown.
"""

description_prompt = """
You are a Move language expert and you are given Move code of a module.
Your task is to generate one short paragraph describing the functionality of this Move module.
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
        long_description = ask_ai(long_description_prompt, code)

        keywords = ask_ai(keywords_prompt, code)
        keywords = keywords.replace("```json", "").replace("```", "").strip()
        keywords = json.loads(keywords)

        data = {
            **package,
            "module": module["name"],
            "functions": functions,
            "code": code,
            "description": description,
            "longDescription": long_description,
            "embedding": get_embedding(description),
            "keywords": keywords,
            "metrics": {
                "github": github_stars,
                "transactions": get_transactions(pack["id"], module["name"]),
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
    {
        "name": "Navi",
        "id": "0x81c408448d0d57b3e371ea94de1d40bf852784d3e225de1e74acab3e8395c18f",
        "github": "naviprotocol/protocol-interface"
    },
    {
        "name": "scallop",
        "id": "0x83bbe0b3985c5e3857803e2678899b03f3c4a31be75006ab03faf268c014ce41",
        "github": "scallop-io/sui-lending-protocol"
    },
]


def ingest():
    for pack in packages:
        print(f"Ingesting {pack['id']}...")
        get_modules(pack)
        print(f"Ingested {pack['id']}.")

    return {
        "ingested": "ok"
    }

def ingest_metrics():
    modules = get_all("modules")
    for module in modules:
        print("Updating transactions for:", module["packageId"], module["module"])
        github_stars = get_github_stars(module["github"])
        transactions = get_transactions(module["packageId"], module["module"])
        if transactions > 0 or github_stars != module["metrics"]["github"]:
            module["metrics"]["transactions"] = transactions
            module["metrics"]["github"] = github_stars
            save("modules", module["id"], module)
            print("Updated transactions for:", module["packageId"], module["module"], transactions)