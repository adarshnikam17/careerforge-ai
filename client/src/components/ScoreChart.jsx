import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// ─── Circular Score Card ──────────────────────
const CircularScore = ({ value, max, label, color }) => {
  const percentage = (value / max) * 100;
  const data = [
    { value: percentage, fill: color },
    { value: 100 - percentage, fill: "#1f2937" },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 text-center">
      <div className="relative w-32 h-32 mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={60}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-gray-400 text-xs">/{max}</p>
        </div>
      </div>
      <p className="text-gray-300 font-medium mt-2">{label}</p>
    </div>
  );
};

// ─── Skills Bar Chart ─────────────────────────
const SkillsChart = ({ skills, missingSkills }) => {
  const data = [
    { name: "Strong Skills", value: skills?.length || 0, fill: "#22c55e" },
    { name: "Missing Skills", value: missingSkills?.length || 0, fill: "#ef4444" },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-white font-bold text-lg mb-4">📊 Skills Overview</h3>
      <div className="flex items-center gap-6">
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          {data.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="text-gray-300 text-sm">{item.name}</span>
                <span className="text-white font-bold text-sm">{item.value}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${(item.value / (skills?.length + missingSkills?.length || 1)) * 100}%`,
                    backgroundColor: item.fill,
                  }}
                ></div>
              </div>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-400 text-xs">
              Total Skills Analyzed:{" "}
              <span className="text-white font-bold">
                {(skills?.length || 0) + (missingSkills?.length || 0)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Match Percentage Chart ───────────────────
const MatchChart = ({ percentage }) => {
  const data = [
    { name: "Match", value: percentage, fill: "#3b82f6" },
    { name: "Gap", value: 100 - percentage, fill: "#1f2937" },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700 text-center">
      <div className="relative w-32 h-32 mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={60}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-blue-400">{percentage}%</p>
          <p className="text-gray-400 text-xs">match</p>
        </div>
      </div>
      <p className="text-gray-300 font-medium mt-2">Job Match</p>
    </div>
  );
};

export { CircularScore, SkillsChart, MatchChart };