import requests

mvr_packages = [
    "@deepbook/core",
]


def get_mvr_packages():
    return [
        get_mvr_package(p)
        for p in mvr_packages
    ]


def get_mvr_package(package: str):
    res = requests.get(f"https://mainnet.mvr.mystenlabs.com/v1/names/{package}")
    res.raise_for_status()
    res = res.json()

    return {
        "name": res["name"],
        "id": res["package_address"],
        "icon": res["metadata"].get("icon_url"),
        "github": res["git_info"]["repository_url"].replace("https://github.com/", ""),
    }
