import React from "react";

const Dashboard = ({ result }) => {
if (!result) return null;

return ( <div className="min-h-screen bg-gray-950 px-4 py-8"> <div className="max-w-5xl mx-auto">

```
    {/* Header */}
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
      <h2 className="text-white text-2xl font-bold mb-1">
        👋 Welcome, {result.resume?.name}!
      </h2>
      <p className="text-gray-400">
        Here is your complete career analysis dashboard
      </p>
    </div>

    {/* Stats Row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 text-center">
        <p className="text-3xl font-bold text-blue-400">
          {result.resume?.overall_score}/10
        </p>
        <p className="text-gray-400 text-sm mt-1">Resume Score</p>
      </div>

      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 text-center">
        <p className="text-3xl font-bold text-green-400">
          {result.gap_analysis?.overall_match_percentage}%
        </p>
        <p className="text-gray-400 text-sm mt-1">Job Match</p>
      </div>

      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 text-center">
        <p className="text-3xl font-bold text-purple-400">
          {result.resume?.skills?.length || 0}
        </p>
        <p className="text-gray-400 text-sm mt-1">Skills Found</p>
      </div>

      <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 text-center">
        <p className="text-3xl font-bold text-yellow-400">
          {result.gap_analysis?.missing_critical_skills?.length || 0}
        </p>
        <p className="text-gray-400 text-sm mt-1">Gaps Found</p>
      </div>

    </div>

    {/* Two Column Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

      {/* Skills */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-white font-bold text-lg mb-4">
          ✅ Your Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {result.resume?.skills?.map((skill, i) => (
            <span
              key={i}
              className="bg-green-900/40 text-green-400 border border-green-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-white font-bold text-lg mb-4">
          ❌ Missing Skills
        </h3>

        <div className="space-y-2">
          {result.gap_analysis?.missing_critical_skills?.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-2"
            >
              <span className="text-white text-sm">{item.skill}</span>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.importance === "high"
                    ? "bg-red-900 text-red-400"
                    : item.importance === "medium"
                    ? "bg-yellow-900 text-yellow-400"
                    : "bg-gray-600 text-gray-400"
                }`}
              >
                {item.importance}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>

    {/* Live Jobs */}
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-6">
      <h3 className="text-white font-bold text-lg mb-4">
        💼 Live Job Matches
      </h3>

      <div className="space-y-3">
        {result.jobs_analysis?.top_matching_jobs?.map((job, i) => (
          <div
            key={i}
            className="bg-gray-700 rounded-xl p-4 flex items-center justify-between"
          >

            <div>
              <p className="text-white font-semibold">{job.title}</p>
              <p className="text-gray-400 text-sm">{job.company}</p>
            </div>

            <div className="text-right">
              <p className="text-green-400 font-bold">
                {job.match_percentage}%
              </p>

              <a
                href={job.apply_link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 text-xs hover:underline block mt-1"
              >
                Apply →
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>

    {/* Immediate Actions */}
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-white font-bold text-lg mb-4">
        ⚡ Immediate Actions
      </h3>

      <div className="space-y-2">
        {result.gap_analysis?.immediate_actions?.map((action, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-gray-700 rounded-lg px-4 py-3"
          >
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">
                {i + 1}
              </span>
            </div>

            <p className="text-gray-300 text-sm">{action}</p>
          </div>
        ))}
      </div>
    </div>

  </div>
</div>

);
};

export default Dashboard;
