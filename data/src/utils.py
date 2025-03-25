import subprocess
import requests
import base64
from pathlib import Path


def get_nested(d, keys, default=None):
    for key in keys:
        if isinstance(d, dict) and key in d:
            d = d[key]
        else:
            return default
    return d


def bytes_to_code(bytes: str) -> str:
    tmp_file = "./tmp.mv"
    bys = base64.b64decode(bytes)
    Path(tmp_file).write_bytes(bys)
    result = subprocess.run(
        ["./move-decompiler-osx-arm64", "--bytecode", tmp_file],
        capture_output=True,
        text=True  # Decodes bytes to str automatically
    )

    Path(tmp_file).unlink()
    return result.stdout.strip()


def get_github_stars(repo: str) -> int:
    res = requests.get(f"https://api.github.com/repos/{repo}")
    res.raise_for_status()
    return res.json()["stargazers_count"]
