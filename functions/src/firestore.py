from firebase_admin import firestore


def save(col: str, id: str, data: dict):
    db = firestore.client()
    doc_ref = db.collection(col).document(id)
    doc_ref.set(data)


def get_all(col: str) -> list:
    db = firestore.client()
    collection_ref = db.collection(col)
    docs = collection_ref.stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in docs]
