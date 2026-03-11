const GapReport = ({ resumeData, gapData, jobsData }) => {
  if (!resumeData || !gapData) return null;

  return (
    <div className="space-y-6 my-6">

      {/* Profile Card */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-white text-xl font-bold mb-4">👤 Your Profile</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-gray-700 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-blue-400">
              {resumeData.overall_score}/10
            </p>
            <p className="text-gray-400 text-sm mt-1">Resume Score</p>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-green-400">
              {gapData.overall_match_percentage}%
            </p>
            <p className="text-gray-400 text-sm mt-1">Job Match</p>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-purple-400">
              {resumeData.skills?.length || 0}
            </p>
            <p className="text-gray-400 text-sm mt-1">Skills Found</p>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-yellow-400">
              {gapData.missing_critical_skills?.length || 0}
            </p>
            <p className="text-gray-400 text-sm mt-1">Gaps Found</p>
          </div>

        </div>
      </div>

      {/* Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Strong Skills */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-green-400 font-bold text-lg mb-4">
            ✅ Strong Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills?.map((skill, i) => (
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
          <h3 className="text-red-400 font-bold text-lg mb-4">
            ❌ Missing Critical Skills
          </h3>
          <div className="space-y-2">
            {gapData.missing_critical_skills?.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-2"
              >
                <span className="text-white text-sm">{item.skill}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  item.importance === "high"
                    ? "bg-red-900 text-red-400"
                    : item.importance === "medium"
                    ? "bg-yellow-900 text-yellow-400"
                    : "bg-gray-600 text-gray-400"
                }`}>
                  {item.importance}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Gap Summary */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-white font-bold text-lg mb-3">
          📊 Gap Summary
        </h3>
        <p className="text-gray-300 leading-relaxed">{gapData.summary}</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-xl p-4">
            <p className="text-yellow-400 font-semibold mb-2">
              ⚡ Immediate Actions
            </p>
            <ul className="space-y-1">
              {gapData.immediate_actions?.map((action, i) => (
                <li key={i} className="text-gray-300 text-sm flex gap-2">
                  <span className="text-blue-400">→</span> {action}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-700 rounded-xl p-4">
            <p className="text-purple-400 font-semibold mb-2">
              💼 Suitable Job Titles
            </p>
            <ul className="space-y-1">
              {resumeData.job_titles_suitable?.map((title, i) => (
                <li key={i} className="text-gray-300 text-sm flex gap-2">
                  <span className="text-green-400">✓</span> {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Live Jobs */}
      {jobsData?.top_matching_jobs && (
  <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
    <h3 className="text-white font-bold text-lg mb-4">
      🌐 Top Matching Jobs
    </h3>

    <div className="space-y-3">
      {jobsData.top_matching_jobs.map((job, i) => (
        <div
          key={i}
          className="bg-gray-700 rounded-xl p-4 flex items-center justify-between"
        >

          <div>
            <p className="text-white font-semibold">{job.title}</p>
            <p className="text-gray-400 text-sm">{job.company}</p>

            {job.missing_skills?.length > 0 && (
              <p className="text-red-400 text-xs mt-1">
                Missing: {job.missing_skills.join(", ")}
              </p>
            )}
          </div>

          <div className="text-right">
            <p className="text-green-400 font-bold text-lg">
              {job.match_percentage}%
            </p>

            <a
              href={job.apply_link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 text-xs hover:underline"
            >
              Apply →
            </a>
          </div>

        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
};

export default GapReport;