from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from resume_agent import analyze_resume
from job_scout_agent import fetch_jobs, analyze_jobs
import shutil
import os
import json

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
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = analyze_resume(temp_path)
    os.remove(temp_path)

    return {"status": "success", "data": result}

# ─── Job Scout Route ─────────────────────────────
@app.post("/fetch-jobs")
async def fetch_jobs_route(
    job_title: str = Form(...),
    location: str = Form("India"),
    skills: str = Form(...)
):
    # Live jobs fetch karo
    jobs = fetch_jobs(job_title, location)

    # AI se analyze karo
    skills_list = skills.split(",")
    analysis = analyze_jobs(jobs, skills_list)

    return {
        "status": "success",
        "jobs": jobs,
        "analysis": analysis
    }

# ─── Health Check ────────────────────────────────
@app.get("/")
def root():
    return {"message": "CareerForge AI is running!"}