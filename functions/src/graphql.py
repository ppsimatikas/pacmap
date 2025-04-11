import requests


def get_graphql_data(query):
    origin = "https://sui-mainnet.mystenlabs.com"
    resp = requests.post(
        f"{origin}/graphql",
        headers={
            "User-Agent": "sui-integrity (https://github.com/MystenLabs/sui-integrity)",
            "Content-Type": "application/json",
        },
        json={"query": query},
    )
    resp.raise_for_status()

    return resp.json()["data"]


def get_package_details(package_id: str):
    query = """
    {
      package(address: "<PACKAGE>") {
        address
        version
        digest
        previousTransactionBlock {
          effects {
            timestamp
          }
          sender {
            address
          }
        }
        modules {
          nodes {
            name
            bytes
            functions {
              nodes {
                visibility
                isEntry
                name
              }
            }
          }
        }
        linkage {
          originalId
          upgradedId
          version
        }
      }
    }
    """
    return get_graphql_data(query.replace("<PACKAGE>", package_id))["package"]


def get_package_transactions(package_id: str, module: str, first_last: str = "first", after: str = "NONE"):
    query = """
    {
      transactionBlocks(
        <FIRSTLAST>: 50,
        after: <AFTER>,
        filter: {
            function: "<PACKAGE>::<MODULE>"
        }
      ) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        nodes {
          effects {
            timestamp
          }
        }
      }
    }
    """
    query = query.replace("<FIRSTLAST>", first_last)
    query = query.replace("<PACKAGE>", package_id)
    query = query.replace("<MODULE>", module)

    if after != 'NONE':
        query = query.replace("<AFTER>", after if after == "null" else f'"{after}"')
    else:
        query = query.replace("after: <AFTER>,", "")

    data = get_graphql_data(query)["transactionBlocks"]

    page_info = data["pageInfo"]
    if page_info["hasNextPage"] and after != 'NONE':
        cursor = page_info["endCursor"]
        return data["nodes"] + get_package_transactions(package_id, module, cursor)

    return data["nodes"]
