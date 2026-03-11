import { useState } from "react";

const Navbar = ({ onHome }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={onHome}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-xl leading-none">
              CareerForge <span className="text-blue-400">AI</span>
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">Multi-Agent Career Coach</p>
          </div>
        </div>

        {/* Center Pills — Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {[
            { label: "Resume Analyzer", color: "blue" },
            { label: "Job Scout", color: "purple" },
            { label: "Gap Analyst", color: "yellow" },
            { label: "Action Planner", color: "green" },
          ].map((agent, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                agent.color === "blue"
                  ? "bg-blue-900/30 text-blue-400 border-blue-800"
                  : agent.color === "purple"
                  ? "bg-purple-900/30 text-purple-400 border-purple-800"
                  : agent.color === "yellow"
                  ? "bg-yellow-900/30 text-yellow-400 border-yellow-800"
                  : "bg-green-900/30 text-green-400 border-green-800"
              }`}
            >
              🤖 {agent.label}
            </span>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-900/30 border border-green-800 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium">4 Agents Active</span>
          </div>

          {/* Back / Home Button */}
          <button
            onClick={onHome}
            className="hidden md:flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-all border border-gray-700"
          >
            🏠 Home
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;