import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

// ─── Resume Analyze ───────────────────────────
export const analyzeResume = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${BASE_URL}/analyze-resume`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

// ─── Jobs Fetch ───────────────────────────────
export const fetchJobs = async (jobTitle, location, skills) => {
  const formData = new FormData();
  formData.append('job_title', jobTitle);
  formData.append('location', location);
  formData.append('skills', skills.join(','));

  const response = await axios.post(`${BASE_URL}/fetch-jobs`, formData);
  return response.data;
};

// ─── Gap Analysis ─────────────────────────────
export const analyzeGaps = async (resumeData, jobsData) => {
  const formData = new FormData();
  formData.append('resume_data', JSON.stringify(resumeData));
  formData.append('jobs_data', JSON.stringify(jobsData));

  const response = await axios.post(`${BASE_URL}/analyze-gaps`, formData);
  return response.data;
};

// ─── Action Plan ──────────────────────────────
export const createPlan = async (resumeData, gapData, targetRole) => {
  const formData = new FormData();
  formData.append('resume_data', JSON.stringify(resumeData));
  formData.append('gap_data', JSON.stringify(gapData));
  formData.append('target_role', targetRole);

  const response = await axios.post(`${BASE_URL}/create-plan`, formData);
  return response.data;
};

// ─── Full Analysis (Sab Ek Saath) ────────────
export const fullAnalysis = async (file, targetRole, location) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('target_role', targetRole);
  formData.append('location', location);

  const response = await axios.post(`${BASE_URL}/full-analysis`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};