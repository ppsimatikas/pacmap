import os
import numpy as np
from openai import OpenAI


def get_client():
    return OpenAI(api_key=os.getenv("AI_API_KEY"), base_url=os.getenv("AI_URL"))


def ask_ai(system: str, question: str, ):
    response = get_client().chat.completions.create(
        model=os.getenv("AI_MODEL"),
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": question},
        ],
        stream=False
    )

    return response.choices[0].message.content


def get_embedding(text):
    response = get_client().embeddings.create(
        input=[text],
        model="text-embedding-3-large"
    )
    return response.data[0].embedding


def find_similar_items(query, items, top_k=3):
    query_embedding = get_embedding(query)

    def cosine_similarity(a, b):
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

    items_with_score = [
        (item, cosine_similarity(query_embedding, item["embedding"]))
        for item in items
    ]
    items_with_score.sort(key=lambda x: x[1], reverse=True)
    return [item for item, score in items_with_score[:top_k]]
