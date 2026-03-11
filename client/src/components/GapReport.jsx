import { CircularScore, SkillsChart, MatchChart } from "./ScoreChart";

const GapReport = ({ resumeData, gapData, jobsData }) => {
if (!resumeData || !gapData) return null;

return ( <div className="space-y-6 my-6">

```
  {/* Charts Row */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <CircularScore
      value={resumeData.overall_score}
      max={10}
      label="Resume Score"
      color="#3b82f6"
    />

    <MatchChart percentage={gapData.overall_match_percentage} />

    <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 text-center flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-purple-400">
        {resumeData.skills?.length || 0}
      </p>
      <p className="text-gray-300 font-medium mt-2">Skills Found</p>

      <div className="flex flex-wrap justify-center gap-1 mt-2">
        {resumeData.skills?.slice(0, 3).map((s, i) => (
          <span
            key={i}
            className="text-xs bg-purple-900/30 text-purple-400 px-2 py-0.5 rounded-full"
          >
            {s}
          </span>
        ))}
      </div>
    </div>

    <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 text-center flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-red-400">
        {gapData.missing_critical_skills?.length || 0}
      </p>
      <p className="text-gray-300 font-medium mt-2">Gaps Found</p>

      <div className="flex flex-wrap justify-center gap-1 mt-2">
        {gapData.missing_critical_skills?.slice(0, 2).map((s, i) => (
          <span
            key={i}
            className="text-xs bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full"
          >
            {s.skill}
          </span>
        ))}
      </div>
    </div>
  </div>

  {/* Skills Chart + Missing Skills */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <SkillsChart
      skills={resumeData.skills}
      missingSkills={gapData.missing_critical_skills}
    />

    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-red-400 font-bold text-lg mb-4">
        ❌ Missing Critical Skills
      </h3>

      <div className="space-y-2">
        {gapData.missing_critical_skills?.map((item, i) => (
          <div key={i} className="bg-gray-700 rounded-xl px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-sm font-medium">
                {item.skill}
              </span>

              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
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

            {item.reason && (
              <p className="text-gray-400 text-xs">{item.reason}</p>
            )}

            <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
              <div
                className={`h-1 rounded-full ${
                  item.importance === "high"
                    ? "bg-red-400 w-full"
                    : item.importance === "medium"
                    ? "bg-yellow-400 w-2/3"
                    : "bg-gray-400 w-1/3"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Strong Skills */}
  <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
    <h3 className="text-green-400 font-bold text-lg mb-4">
      ✅ Strong Skills
    </h3>

    <div className="flex flex-wrap gap-2">
      {resumeData.skills?.map((skill, i) => (
        <span
          key={i}
          className="bg-green-900/40 text-green-400 border border-green-700 px-3 py-1.5 rounded-full text-sm hover:bg-green-900/60 transition-all"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>

  {/* Gap Summary */}
  <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
    <h3 className="text-white font-bold text-lg mb-3">
      📊 Gap Summary
    </h3>

    <p className="text-gray-300 leading-relaxed">
      {gapData.summary}
    </p>

    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-700 rounded-xl p-4">
        <p className="text-yellow-400 font-semibold mb-2">
          ⚡ Immediate Actions
        </p>

        <ul className="space-y-2">
          {gapData.immediate_actions?.map((action, i) => (
            <li
              key={i}
              className="text-gray-300 text-sm flex gap-2 items-start"
            >
              <span className="text-blue-400 mt-0.5">→</span>
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-700 rounded-xl p-4">
        <p className="text-purple-400 font-semibold mb-2">
          💼 Suitable Job Titles
        </p>

        <ul className="space-y-2">
          {resumeData.job_titles_suitable?.map((title, i) => (
            <li
              key={i}
              className="text-gray-300 text-sm flex gap-2 items-start"
            >
              <span className="text-green-400 mt-0.5">✓</span>
              <span>{title}</span>
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
            className="bg-gray-700 rounded-xl p-4 flex items-center justify-between hover:bg-gray-600 transition-all"
          >
            <div>
              <p className="text-white font-semibold">
                {job.title}
              </p>

              <p className="text-gray-400 text-sm">
                {job.company}
              </p>

              {job.missing_skills?.length > 0 && (
                <p className="text-red-400 text-xs mt-1">
                  Missing: {job.missing_skills.join(", ")}
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="text-green-400 font-bold text-xl">
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
