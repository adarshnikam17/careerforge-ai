import { useState } from "react";

const Navbar = ({ onHome }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={onHome}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">
              CareerForge <span className="text-blue-400">AI</span>
            </h1>
            <p className="text-gray-500 text-xs hidden sm:block">Multi-Agent Career Coach</p>
          </div>
        </div>

        {/* Desktop Pills */}
        <div className="hidden lg:flex items-center gap-2">
          {[
            { label: "Resume Analyzer", color: "blue" },
            { label: "Job Scout", color: "purple" },
            { label: "Gap Analyst", color: "yellow" },
            { label: "Action Planner", color: "green" },
          ].map((agent, i) => (
            <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium border ${
              agent.color === "blue" ? "bg-blue-900/30 text-blue-400 border-blue-800"
              : agent.color === "purple" ? "bg-purple-900/30 text-purple-400 border-purple-800"
              : agent.color === "yellow" ? "bg-yellow-900/30 text-yellow-400 border-yellow-800"
              : "bg-green-900/30 text-green-400 border-green-800"
            }`}>
              🤖 {agent.label}
            </span>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-green-900/30 border border-green-800 px-2.5 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium hidden sm:block">4 Agents Active</span>
            <span className="text-green-400 text-xs font-medium sm:hidden">Active</span>
          </div>

          <button
            onClick={onHome}
            className="hidden sm:flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg text-sm transition-all border border-gray-700"
          >
            🏠 <span className="hidden md:block">Home</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden bg-gray-800 hover:bg-gray-700 text-gray-300 p-2 rounded-lg border border-gray-700"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-3 pb-3 border-t border-gray-800 pt-3">
          <div className="flex flex-wrap gap-2 px-1">
            {[
              { label: "Resume Analyzer", color: "blue" },
              { label: "Job Scout", color: "purple" },
              { label: "Gap Analyst", color: "yellow" },
              { label: "Action Planner", color: "green" },
            ].map((agent, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium border ${
                agent.color === "blue" ? "bg-blue-900/30 text-blue-400 border-blue-800"
                : agent.color === "purple" ? "bg-purple-900/30 text-purple-400 border-purple-800"
                : agent.color === "yellow" ? "bg-yellow-900/30 text-yellow-400 border-yellow-800"
                : "bg-green-900/30 text-green-400 border-green-800"
              }`}>
                🤖 {agent.label}
              </span>
            ))}
          </div>
          <button
            onClick={() => { onHome(); setMenuOpen(false); }}
            className="mt-3 w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm border border-gray-700"
          >
            🏠 Go Home
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;