import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ─── Gap Analysis Karo ───────────────────────────
def analyze_gaps(resume_data, jobs_data):

    prompt = f"""
    You are an expert career gap analyst.
    
    Candidate Profile:
    {json.dumps(resume_data, indent=2)}
    
    Job Market Data:
    {json.dumps(jobs_data, indent=2)}
    
    Analyze the gap between candidate profile and job market.
    Return a JSON response with:
    {{
        "overall_match_percentage": number,
        "strong_skills": ["skill1", "skill2"],
        "missing_critical_skills": [
            {{
                "skill": "skill name",
                "importance": "high/medium/low",
                "reason": "why this skill is needed"
            }}
        ],
        "missing_good_to_have_skills": ["skill1", "skill2"],
        "experience_gap": "analysis of experience gap",
        "education_gap": "analysis of education gap",
        "immediate_actions": ["action1", "action2", "action3"],
        "summary": "one paragraph overall gap summary"
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
    # Dummy data se test karo
    resume_data = {
        "name": "Adarsh",
        "skills": ["React", "JavaScript", "HTML", "CSS"],
        "experience_years": 0,
        "education": "B.Tech"
    }

    jobs_data = {
        "most_demanded_skills": ["React", "Node.js", "Docker", "AWS", "TypeScript"],
        "top_matching_jobs": [
            {"title": "Frontend Developer", "match_percentage": 60}
        ]
    }

    result = analyze_gaps(resume_data, jobs_data)
    print(result)