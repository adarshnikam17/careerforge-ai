import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ─── 30 Day Action Plan Banao ────────────────────
def create_action_plan(resume_data, gap_data, target_role):

    prompt = f"""
    You are an expert career coach.
    
    Candidate Profile:
    {json.dumps(resume_data, indent=2)}
    
    Skill Gap Analysis:
    {json.dumps(gap_data, indent=2)}
    
    Target Role: {target_role}
    
    Create a detailed 30-day action plan to help this candidate get job-ready.
    Return a JSON response with:
    {{
        "target_role": "role name",
        "total_days": 30,
        "weekly_plans": [
            {{
                "week": 1,
                "focus": "main focus area",
                "days": [
                    {{
                        "day": 1,
                        "task": "specific task",
                        "resource": "youtube/udemy/docs link",
                        "hours": number,
                        "type": "learning/practice/project/revision"
                    }}
                ],
                "week_goal": "what to achieve by end of week"
            }}
        ],
        "recommended_projects": [
            {{
                "name": "project name",
                "description": "what to build",
                "skills_covered": ["skill1", "skill2"],
                "difficulty": "easy/medium/hard"
            }}
        ],
        "recommended_resources": [
            {{
                "title": "resource name",
                "url": "link",
                "type": "video/article/course",
                "is_free": true
            }}
        ],
        "success_metrics": ["metric1", "metric2"],
        "motivational_message": "encouraging message for candidate"
    }}
    
    Return ONLY valid JSON, nothing else.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=4000,
    )

    return response.choices[0].message.content

# ─── Test Karo ───────────────────────────────────
if __name__ == "__main__":
    resume_data = {
        "name": "Adarsh",
        "skills": ["React", "JavaScript", "HTML", "CSS"],
        "experience_years": 0,
        "education": "B.Tech"
    }

    gap_data = {
        "missing_critical_skills": [
            {"skill": "Node.js", "importance": "high"},
            {"skill": "Docker", "importance": "medium"}
        ],
        "overall_match_percentage": 60
    }

    result = create_action_plan(resume_data, gap_data, "Full Stack Developer")
    print(result)