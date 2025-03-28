import os
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS_FILE"))
firebase_admin.initialize_app(cred)

db = firestore.client()


def save(col: str, id: str, data: dict):
    doc_ref = db.collection(col).document(id)
    doc_ref.set(data)


def get_all(col: str) -> list:
    collection_ref = db.collection(col)
    docs = collection_ref.stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in docs]