from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import os
from fastapi.middleware.cors import CORSMiddleware

os.environ["HF_TOKEN"] = "your HF token"
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

tokenizer = AutoTokenizer.from_pretrained("openai-community/gpt2")
model = AutoModelForCausalLM.from_pretrained("openai-community/gpt2")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    inputs = tokenizer(req.message, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=100)
    reply = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"reply": reply}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("chat:app", host="127.0.0.1", port=8000)