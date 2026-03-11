import { useState } from "react";

const ActionPlan = ({ planData }) => {
  const [activeWeek, setActiveWeek] = useState(0);

  if (!planData) return null;

  return (
    <div className="space-y-6 my-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-6 border border-blue-700">
        <h2 className="text-white text-2xl font-bold mb-1">
          🗺️ Your 30-Day Action Plan
        </h2>
        <p className="text-blue-300">
          Target Role: <span className="font-bold text-white">{planData.target_role}</span>
        </p>
        {planData.motivational_message && (
          <p className="text-blue-200 mt-3 italic">
            "{planData.motivational_message}"
          </p>
        )}
      </div>

      {/* Week Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {planData.weekly_plans?.map((week, i) => (
          <button
            key={i}
            onClick={() => setActiveWeek(i)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
              activeWeek === i
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-400 hover:bg-gray-600"
            }`}
          >
            Week {week.week}
          </button>
        ))}
      </div>

      {/* Active Week */}
      {planData.weekly_plans?.[activeWeek] && (
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="mb-4">
            <h3 className="text-white font-bold text-lg">
              Week {planData.weekly_plans[activeWeek].week} —{" "}
              {planData.weekly_plans[activeWeek].focus}
            </h3>
            <p className="text-green-400 text-sm mt-1">
              🎯 Goal: {planData.weekly_plans[activeWeek].week_goal}
            </p>
          </div>

          <div className="space-y-3">
            {planData.weekly_plans[activeWeek].days?.map((day, i) => (
              <div key={i} className="bg-gray-700 rounded-xl p-4 flex items-start gap-4">

                <div className="bg-blue-600 rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">D{day.day}</span>
                </div>

                <div className="flex-1">
                  <p className="text-white font-medium">{day.task}</p>

                  {day.resource && (
                    <a
                      href={day.resource}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 text-xs hover:underline mt-1 block"
                    >
                      📎 Resource Link →
                    </a>
                  )}

                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      day.type === "learning"
                        ? "bg-blue-900 text-blue-400"
                        : day.type === "practice"
                        ? "bg-yellow-900 text-yellow-400"
                        : day.type === "project"
                        ? "bg-purple-900 text-purple-400"
                        : "bg-gray-600 text-gray-400"
                    }`}
                  >
                    {day.type}
                  </span>

                  <p className="text-gray-400 text-xs mt-1">{day.hours}h</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Projects */}
      {planData.recommended_projects && (
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-white font-bold text-lg mb-4">
            🛠️ Recommended Projects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {planData.recommended_projects.map((project, i) => (
              <div key={i} className="bg-gray-700 rounded-xl p-4">

                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-semibold">{project.name}</p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      project.difficulty === "easy"
                        ? "bg-green-900 text-green-400"
                        : project.difficulty === "medium"
                        ? "bg-yellow-900 text-yellow-400"
                        : "bg-red-900 text-red-400"
                    }`}
                  >
                    {project.difficulty}
                  </span>
                </div>

                <p className="text-gray-400 text-sm">{project.description}</p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {project.skills_covered?.map((skill, j) => (
                    <span
                      key={j}
                      className="bg-blue-900/40 text-blue-400 text-xs px-2 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Metrics */}
      {planData.success_metrics && (
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">

          <h3 className="text-white font-bold text-lg mb-4">
            ✅ Success Metrics
          </h3>

          <div className="space-y-2">
            {planData.success_metrics.map((metric, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-gray-300 text-sm">{metric}</p>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default ActionPlan;