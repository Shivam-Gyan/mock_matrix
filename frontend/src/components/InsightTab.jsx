import { useState } from 'react';
import { useAuth } from '../context/context.jsx';
import { motion } from 'framer-motion';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from 'recharts';

function groupRequestsByDate(timestamps) {
  const groups = {};
  timestamps.forEach(ts => {
    const date = new Date(ts);
    const dayMonth = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    groups[dayMonth] = (groups[dayMonth] || 0) + 1;
  });

  // Convert grouped object to array for Recharts
  return Object.entries(groups).map(([date, requests]) => ({ date, requests }));
}

const InsightTab = ({ setActivetab }) => {
  const { projects } = useAuth();
  const [selectedProject, setSelectedProject] = useState('');
  const [projectData, setProjectData] = useState([]);

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setSelectedProject(projectId);

    const project = projects.find(proj => proj.projectId === projectId);
    if (!project || !project.request) {
      setProjectData([]);
      return;
    }

    const groupedData = groupRequestsByDate(project.request);
    setProjectData(groupedData);
  };

  return (
    <div className="ml-1 md:ml-10 mt-12 flex flex-col gap-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex max-md:flex-col max-md:items-start gap-4 items-center justify-between"
      >
        {/* Left: Title */}
        <h2 className="text-2xl font-bold">Insights</h2>

        {/* Middle: Dropdown */}
        <select
          value={selectedProject}
          onChange={handleProjectChange}
          disabled={projects.length === 0}
          className="px-3 py-2 font-nunito max-md:hidden w-64 rounded-lg bg-gray-700 border border-gray-300"
        >
          <option value="">{projects.length === 0 ? 'No projects' : 'Select a project'}</option>
          {projects.map(proj => (
            <option key={proj.projectId} value={proj.projectId}>
              {proj.projectName} {proj.projectType === 'custom' ? '(Basic Mode)' : '(Smart Mode)'}
            </option>
          ))}
        </select>

        <div className="flex justify-between gap-2 max-md:w-full">
          <select
            value={selectedProject}
            onChange={(e) => handleProjectChange(e)}
            className="px-3 py-2 w-fit md:hidden rounded-lg bg-gray-700 border border-gray-300"
          >
            <option value="">Select a project</option>
            {projects.map(proj => (
              <option key={proj.projectId} value={proj.projectId}>
                {proj.projectName}
              </option>
            ))}
          </select>

          {/* Right: Create Project Button */}
          <button
            onClick={() => setActivetab('Projects')}
            className="flex items-center gap-2 bg-gray-400/20 border border-gray-300 px-4 py-1 rounded-lg font-semibold"
          >
            <span className="text-lg font-bold">+</span> Create Project
          </button>
        </div>
      </motion.div>

      {/* Chart container */}
      <div className=" h-64 mt-8 bg-gray-800 rounded-lg p-4">
        {projectData.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">Select a project to see request data</p>
        ) : (
         <ResponsiveContainer width="100%" height="100%">
  <LineChart
    data={projectData}
    margin={{ top: 20, right: 30, left: 20, bottom: 30 }} // increased bottom for label
  >
    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
    
    <XAxis
      dataKey="date"
      stroke="#ccc"
      label={{
        value: "Date", // label text
        position: "insideBottom", // or "bottom"
        offset: -5, // move label closer/farther from axis
        fill: "#ccc",
        fontSize: 14
      }}
    />
    
    <YAxis
      stroke="#ccc"
      allowDecimals={false}
      label={{
        value: "Requests",
        angle: -90,
        position: "insideLeft",
        fill: "#ccc",
        fontSize: 14,
      }}
    />
    
    <Tooltip
      contentStyle={{ backgroundColor: "#222", border: "none" }}
      labelStyle={{ color: "#ddd" }}
      itemStyle={{ color: "#bbb" }}
    />
    
    <Line
      type="monotone"
      dataKey="requests"
      stroke="#dadada"
      strokeWidth={2}
      dot={{ r: 4, fill: "#dadada", strokeWidth: 2 }}
      activeDot={{ r: 6, fill: "#fff" }}
    />
  </LineChart>
</ResponsiveContainer>


        )}
      </div>
    </div>
  );
};

export default InsightTab;
