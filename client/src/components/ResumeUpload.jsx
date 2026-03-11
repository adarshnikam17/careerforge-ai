import { useState } from "react";

const ResumeUpload = ({ onSubmit, isLoading }) => {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [location, setLocation] = useState("India");
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
    } else {
      alert("Please upload a PDF file only!");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
    }
  };

  const handleSubmit = () => {
    if (!file) return alert("Please upload your resume!");
    if (!targetRole) return alert("Please enter your target role!");
    onSubmit(file, targetRole, location);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">

        {/* Title */}
        <h2 className="text-white text-2xl font-bold mb-2">
          🚀 Start Your Analysis
        </h2>
        <p className="text-gray-400 mb-6">
          Upload your resume and let 4 AI agents work for you
        </p>

        {/* File Upload */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragOver
              ? "border-blue-500 bg-blue-900/20"
              : file
              ? "border-green-500 bg-green-900/20"
              : "border-gray-600 hover:border-gray-400"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          {file ? (
            <div>
              <p className="text-4xl mb-2">✅</p>
              <p className="text-green-400 font-semibold">{file.name}</p>
              <p className="text-gray-400 text-sm mt-1">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ) : (
            <div>
              <p className="text-4xl mb-2">📄</p>
              <p className="text-white font-semibold">
                Drop your resume here
              </p>
              <p className="text-gray-400 text-sm mt-1">
                or click to browse — PDF only
              </p>
            </div>
          )}
        </div>

        {/* Target Role */}
        <div className="mt-5">
          <label className="text-gray-300 text-sm font-medium mb-2 block">
            🎯 Target Role
          </label>
          <input
            type="text"
            placeholder="e.g. Full Stack Developer, AI Engineer, Data Analyst"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 placeholder-gray-500"
          />
        </div>

        {/* Location */}
        <div className="mt-4">
          <label className="text-gray-300 text-sm font-medium mb-2 block">
            📍 Preferred Location
          </label>
          <input
            type="text"
            placeholder="e.g. India, Bangalore, Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 placeholder-gray-500"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all ${
            isLoading
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
          }`}
        >
          {isLoading ? "⏳ Agents Working..." : "⚡ Analyze My Career"}
        </button>

      </div>
    </div>
  );
};

export default ResumeUpload;