from fastapi import FastAPI, UploadFile, Response
from pydantic import BaseModel
from Database import addChating,getChatByName

#uvicorn server:app --reload --host=0.0.0.0 --port=8800

app=FastAPI()

class Chat(BaseModel):
    sender_name: str
    receiver_name : str
    content : str
    
@app.get("/api/hello")
async def Hello():
    return "hello,world"

@app.post("/api/add/chat")
async def addChat(chat : Chat):
    return addChating(chat)

@app.get("/api/get/chats/{name}")
async def getChat(name : str):
    print(name)
    return getChatByName(name)
    