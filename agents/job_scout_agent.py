import requests
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ─── Live Jobs Fetch Karo ────────────────────────
def fetch_jobs(job_title, location="India"):
    url = "https://jsearch.p.rapidapi.com/search"

    querystring = {
        "query": f"{job_title} in {location}",
        "page": "1",
        "num_pages": "1",
        "date_posted": "all"
    }

    headers = {
        "X-RapidAPI-Key": os.getenv("RAPIDAPI_KEY"),
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    data = response.json()

    # Clean jobs list banao
    jobs = []
    for job in data.get("data", []):
        jobs.append({
            "title": job.get("job_title"),
            "company": job.get("employer_name"),
            "location": job.get("job_city", "Remote"),
            "description": job.get("job_description", "")[:500],
            "required_skills": job.get("job_required_skills", []),
            "apply_link": job.get("job_apply_link"),
            "posted_date": job.get("job_posted_at_datetime_utc"),
            "employment_type": job.get("job_employment_type"),
            "is_remote": job.get("job_is_remote", False),
        })

    return jobs

# ─── AI se Job Insights Nikalo ───────────────────
def analyze_jobs(jobs, candidate_skills):
    jobs_text = str(jobs[:5])  # top 5 jobs bhejo

    prompt = f"""
    You are a job market analyst.
    
    Candidate skills: {candidate_skills}
    
    Job listings: {jobs_text}
    
    Return a JSON response with:
    {{
        "top_matching_jobs": [
            {{
                "title": "job title",
                "company": "company name",
                "match_percentage": number,
                "missing_skills": ["skill1", "skill2"],
                "apply_link": "url"
            }}
        ],
        "most_demanded_skills": ["skill1", "skill2", ...],
        "market_insight": "one line insight about job market"
    }}
    
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
    jobs = fetch_jobs("React Developer", "India")
    result = analyze_jobs(jobs, ["React", "JavaScript", "Node.js"])
    print(result)