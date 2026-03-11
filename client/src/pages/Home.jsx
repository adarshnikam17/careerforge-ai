import { useState } from "react";
import ResumeUpload from "../components/ResumeUpload";
import AgentThinking from "../components/AgentThinking";
import GapReport from "../components/GapReport";
import ActionPlan from "../components/ActionPlan";
import { fullAnalysis } from "../services/api";
import PDFExport from "../components/PDFExport";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("gap");

  const handleSubmit = async (file, targetRole, location) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await fullAnalysis(file, targetRole, location);
      setResult(data);
    } catch (err) {
      setError("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Hero Section */}
      {!result && !isLoading && (
        <div className="relative overflow-hidden">

          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-600 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-900/30 border border-blue-800 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400 text-sm font-medium">
                Powered by Groq + Llama 3.3 + CrewAI
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Personal
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}AI Career Coach
              </span>
            </h1>

            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
              4 specialized AI agents analyze your resume, scan live job market,
              find skill gaps, and build your personalized 30-day action plan
            </p>

            {/* How it Works */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {[
                { icon: "📄", agent: "Resume Analyzer", desc: "Reads & scores your resume", color: "blue" },
                { icon: "🌐", agent: "Job Scout", desc: "Fetches live job listings", color: "purple" },
                { icon: "📊", agent: "Gap Analyst", desc: "Finds missing skills", color: "yellow" },
                { icon: "🗺️", agent: "Action Planner", desc: "Builds 30-day roadmap", color: "green" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`bg-gray-800/50 border rounded-2xl p-5 text-center transition-all hover:scale-105 ${
                    item.color === "blue" ? "border-blue-800 hover:border-blue-600"
                    : item.color === "purple" ? "border-purple-800 hover:border-purple-600"
                    : item.color === "yellow" ? "border-yellow-800 hover:border-yellow-600"
                    : "border-green-800 hover:border-green-600"
                  }`}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className={`font-semibold text-sm mb-1 ${
                    item.color === "blue" ? "text-blue-400"
                    : item.color === "purple" ? "text-purple-400"
                    : item.color === "yellow" ? "text-yellow-400"
                    : "text-green-400"
                  }`}>
                    {item.agent}
                  </p>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-12">
              {[
                { value: "4", label: "AI Agents" },
                { value: "30s", label: "Analysis Time" },
                { value: "100%", label: "Free to Use" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Upload Form */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {!result && (
          <ResumeUpload onSubmit={handleSubmit} isLoading={isLoading} />
        )}

        {/* Agent Thinking */}
        <AgentThinking isLoading={isLoading} />

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 text-red-400 text-center my-4">
            ⚠️ {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div>

            {/* Result Header */}
            <div className="flex items-center justify-between mb-6">
  <div>
    <h2 className="text-white text-2xl font-bold">
      ✅ Analysis Complete!
    </h2>
    <p className="text-gray-400 text-sm mt-1">
      Hi {result.resume?.name} — here is your full career report
    </p>
  </div>
  <div className="flex items-center gap-3">
    <PDFExport
      resumeData={result.resume}
      gapData={result.gap_analysis}
      planData={result.action_plan}
      targetRole={result.action_plan?.target_role || ""}
    />
    <button
      onClick={() => window.location.reload()}
      className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm border border-gray-700 transition-all"
    >
      ← Analyze Again
    </button>
  </div>
</div>
            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-gray-800/50 p-1 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab("gap")}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  activeTab === "gap"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                📊 Gap Report
              </button>
              <button
                onClick={() => setActiveTab("plan")}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  activeTab === "plan"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                🗺️ Action Plan
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "gap" && (
              <GapReport
                resumeData={result.resume}
                gapData={result.gap_analysis}
                jobsData={result.jobs_analysis}
              />
            )}
            {activeTab === "plan" && (
              <ActionPlan planData={result.action_plan} />
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default Home;