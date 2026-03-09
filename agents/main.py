from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from resume_agent import analyze_resume
from job_scout_agent import fetch_jobs, analyze_jobs
from gap_analyst_agent import analyze_gaps
from action_planner_agent import create_action_plan
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
    jobs = fetch_jobs(job_title, location)
    skills_list = skills.split(",")
    analysis = analyze_jobs(jobs, skills_list)

    return {
        "status": "success",
        "jobs": jobs,
        "analysis": analysis
    }

# ─── Gap Analyst Route ───────────────────────────
@app.post("/analyze-gaps")
async def analyze_gaps_route(
    resume_data: str = Form(...),
    jobs_data: str = Form(...)
):
    resume = json.loads(resume_data)
    jobs = json.loads(jobs_data)
    result = analyze_gaps(resume, jobs)

    return {"status": "success", "data": result}

# ─── Action Planner Route ────────────────────────
@app.post("/create-plan")
async def create_plan_route(
    resume_data: str = Form(...),
    gap_data: str = Form(...),
    target_role: str = Form(...)
):
    resume = json.loads(resume_data)
    gaps = json.loads(gap_data)
    result = create_action_plan(resume, gaps, target_role)

    return {"status": "success", "data": result}

# ─── Full Pipeline Route (Sabka Ek Saath) ────────
@app.post("/full-analysis")
async def full_analysis_route(
    file: UploadFile = File(...),
    target_role: str = Form(...),
    location: str = Form("India")
):
    # Step 1: Resume analyze karo
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_result = analyze_resume(temp_path)
    os.remove(temp_path)
    resume_data = json.loads(resume_result)

    # Step 2: Jobs fetch karo
    skills = resume_data.get("skills", [])
    jobs = fetch_jobs(target_role, location)
    jobs_analysis = analyze_jobs(jobs, skills)
    jobs_data = json.loads(jobs_analysis)

    # Step 3: Gap analyze karo
    gap_result = analyze_gaps(resume_data, jobs_data)
    gap_data = json.loads(gap_result)

    # Step 4: Action plan banao
    plan_result = create_action_plan(resume_data, gap_data, target_role)
    plan_data = json.loads(plan_result)

    return {
        "status": "success",
        "resume": resume_data,
        "jobs": jobs,
        "jobs_analysis": jobs_data,
        "gap_analysis": gap_data,
        "action_plan": plan_data
    }

# ─── Health Check ────────────────────────────────
@app.get("/")
def root():
    return {"message": "CareerForge AI is running!"}