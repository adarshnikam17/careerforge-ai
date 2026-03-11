import { useEffect, useState } from "react";

const steps = [
  { id: 1, agent: "Resume Analyzer", message: "Reading your resume..." , icon: "📄" },
  { id: 2, agent: "Resume Analyzer", message: "Extracting skills and experience...", icon: "🔍" },
  { id: 3, agent: "Job Scout", message: "Scanning live job market...", icon: "🌐" },
  { id: 4, agent: "Job Scout", message: "Fetching matching job listings...", icon: "💼" },
  { id: 5, agent: "Gap Analyst", message: "Comparing your profile vs market demand...", icon: "📊" },
  { id: 6, agent: "Gap Analyst", message: "Identifying skill gaps...", icon: "⚡" },
  { id: 7, agent: "Action Planner", message: "Building your 30-day plan...", icon: "🗺️" },
  { id: 8, agent: "Action Planner", message: "Finding best resources for you...", icon: "✅" },
];

const agentColors = {
  "Resume Analyzer": "text-blue-400",
  "Job Scout": "text-purple-400",
  "Gap Analyst": "text-yellow-400",
  "Action Planner": "text-green-400",
};

const AgentThinking = ({ isLoading }) => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setVisibleSteps([]);
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length) {
          clearInterval(interval);
          return prev;
        }
        setVisibleSteps((prevSteps) => [...prevSteps, steps[prev]]);
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading && visibleSteps.length === 0) return null;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 my-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <h2 className="text-white font-semibold text-lg">Agent Thinking...</h2>
      </div>

      {/* Terminal Style Logs */}
      <div className="bg-black rounded-lg p-4 font-mono text-sm space-y-2 min-h-32">
        {visibleSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-3 animate-pulse-once">
            <span className="text-gray-500">{">"}</span>
            <span className="text-gray-400">[{step.agent}]</span>
            <span className={agentColors[step.agent]}>
              {step.icon} {step.message}
            </span>
          </div>
        ))}

        {/* Blinking Cursor */}
        {isLoading && (
          <div className="flex items-center gap-1">
            <span className="text-gray-500">{">"}</span>
            <span className="text-green-400 animate-ping">_</span>
          </div>
        )}
      </div>

      {/* Agent Progress */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        {["Resume Analyzer", "Job Scout", "Gap Analyst", "Action Planner"].map((agent, i) => (
          <div key={i} className={`text-center p-2 rounded-lg border ${
            visibleSteps.some(s => s.agent === agent)
              ? "border-green-500 bg-green-900/20"
              : "border-gray-700 bg-gray-800"
          }`}>
            <p className={`text-xs font-medium ${
              visibleSteps.some(s => s.agent === agent)
                ? "text-green-400"
                : "text-gray-500"
            }`}>{agent}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentThinking;