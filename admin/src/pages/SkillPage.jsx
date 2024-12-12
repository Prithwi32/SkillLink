import React, { useState } from 'react';
import {  Plus, Trash2, CheckCircle, Clock, Edit2 } from 'react-feather';
import CountUpCard from '../components/WebsiteMetricsCard'

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${className}`}>
    {children}
  </div>
);

const SkillsSection = () => {
  const [skills] = useState([
    { id: 1, name: 'React Development', status: 'approved', level: 'Advanced', endorsements: 24 },
    { id: 2, name: 'UI/UX Design', status: 'in-review', level: 'Intermediate', endorsements: 18 },
    { id: 3, name: 'Node.js', status: 'approved', level: 'Beginner', endorsements: 12 },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     <CountUpCard/>
      {/* Status Tabs */}
      <div className="flex space-x-2 mb-6">
        <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          Approved
        </button>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          In Review
        </button>
      </div>

      {/* Skills Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add New Skill Card */}
        <Card className="border-2 border-dashed border-gray-200">
          <div className="p-6 flex flex-col items-center justify-center cursor-pointer group">
            <div className="bg-blue-100 rounded-full p-3 group-hover:bg-blue-200 transition-colors">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mt-4 group-hover:text-blue-600 transition-colors">Add New Skill</h3>
            <p className="text-sm text-gray-400 mt-1 text-center">Click to add a new skill to your profile</p>
          </div>
        </Card>

        {/* Existing Skills */}
        {skills.map((skill) => (
          <Card key={skill.id}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    skill.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {skill.status === 'approved' ? 'Approved' : 'In Review'}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900 mt-2">{skill.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Level: {skill.level}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Edit2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-full transition-colors">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">{skill.endorsements} endorsements</span>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
                View Details
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;

