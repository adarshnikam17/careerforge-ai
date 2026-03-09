from crewai import Agent, Task, Crew
from groq import Groq
import PyPDF2
import os
from dotenv import load_dotenv

load_dotenv()

# Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ─── PDF Text Extract Karo ───────────────────────
def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text()
    return text

# ─── Resume Analyze Karo ─────────────────────────
def analyze_resume(pdf_path):
    resume_text = extract_text_from_pdf(pdf_path)

    prompt = f"""
    You are an expert resume analyzer.
    
    Analyze this resume and return a JSON response with:
    {{
        "name": "candidate name",
        "skills": ["skill1", "skill2", ...],
        "experience_years": number,
        "education": "highest degree",
        "projects": ["project1", "project2"],
        "weak_points": ["weakness1", "weakness2"],
        "strong_points": ["strength1", "strength2"],
        "job_titles_suitable": ["title1", "title2"],
        "overall_score": number between 1-10
    }}
    
    Resume:
    {resume_text}
    
    Return ONLY valid JSON, nothing else.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )

    return response.choices[0].message.content

# ─── Test Karo ───────────────────────────────────
if __name__ == "__main__":
    result = analyze_resume("test_resume.pdf")
    print(result)