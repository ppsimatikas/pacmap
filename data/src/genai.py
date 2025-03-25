import os
from openai import OpenAI


def ask_ai(system: str, question: str, ):
    client = OpenAI(api_key=os.getenv("AI_API_KEY"), base_url=os.getenv("AI_URL"))

    response = client.chat.completions.create(
        model=os.getenv("AI_MODEL"),
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": question},
        ],
        stream=False
    )

    return response.choices[0].message.content
