from fastapi import FastAPI, UploadFile, Response

#uvicorn server:app --reload --host=0.0.0.0 --port=8800

app=FastAPI()

@app.get("/api/hello")
async def Hello():
    return "hello,world"