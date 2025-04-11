from src.graphql import get_package_transactions
from datetime import datetime


def get_avg_tx_per_sec(package_id, module, first_last: str = "first"):
    txs = get_package_transactions(package_id, module, first_last)
    txs = [t["effects"]["timestamp"] for t in txs]
    dt_list = [datetime.fromisoformat(ts.replace("Z", "+00:00")) for ts in txs]
    dt_list.sort()

    if len(dt_list) == 0:
        return None, None

    time_range_minutes = (dt_list[-1] - dt_list[0]).total_seconds()

    # Avoid division by zero if all timestamps are at the same second
    if time_range_minutes == 0:
        tps = len(dt_list)
    else:
        tps = len(dt_list) / time_range_minutes

    time = dt_list[0] if first_last == "first" else dt_list[-1]

    return tps, time

def get_transactions(package_id, module):
    first_tps, min_time = get_avg_tx_per_sec(package_id, module, "first")
    last_tps, max_time = get_avg_tx_per_sec(package_id, module, "last")

    if first_tps is None or last_tps is None:
        print(f"No transactions found for {package_id}/{module}...")
        return 0

    total_seconds = (max_time - min_time).total_seconds()

    avg_tps = (first_tps + last_tps) / 2

    return round(avg_tps * total_seconds)

