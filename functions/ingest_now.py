import firebase_admin
from firebase_admin import credentials
from src.services.ingest import ingest

cred = credentials.Certificate('../keys/pacmap-fe260-firebase-adminsdk-fbsvc-4ab91928bb.json')
firebase_admin.initialize_app(cred)

# ingest()
