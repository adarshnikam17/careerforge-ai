from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from resume_agent import analyze_resume
import shutil
import os

app = FastAPI()

# CORS — React se connect hone ke liye
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Resume Upload & Analyze Route ───────────────
@app.post("/analyze-resume")
async def analyze_resume_route(file: UploadFile = File(...)):
    # File save karo temporarily
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Analyze karo
    result = analyze_resume(temp_path)

    # Temp file delete karo
    os.remove(temp_path)

    return {"status": "success", "data": result}

# ─── Health Check ────────────────────────────────
@app.get("/")
def root():
    return {"message": "CareerForge AI is running!"}