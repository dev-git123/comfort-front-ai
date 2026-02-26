from fastapi import FastAPI
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow cross-origin requests
origins = [
    "http://localhost:5173",  # React frontend
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,    # allow these origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ChatRequest(BaseModel):
    message: str

OLLAMA_API = "http://localhost:11434/api/chat"
MODEL = "llama3.2:1b" 

@app.post("/chat")
def chat(req: ChatRequest):
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "user", "content": req.message}
        ],
        "stream": False
    }
    response = requests.post(OLLAMA_API, json=payload)
    data = response.json()
    # Extract text output
    bot_reply = data.get("message", {}).get("content", "")
    return {"reply": bot_reply}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("localAIServer:app", host="127.0.0.1", port=8000)