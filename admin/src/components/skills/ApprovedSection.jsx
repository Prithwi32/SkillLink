import React from 'react';
import ApprovedSkillsTable from './ApprovedTable';

const ApprovedSkillsPage = () => {
  // Sample data for demonstration
  const approvedSkills = [
    { id: 1, name: 'JavaScript', description: 'Programming language for web development' },
    { id: 2, name: 'React', description: 'JavaScript library for building user interfaces' },
    { id: 3, name: 'Node.js', description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine' },
    { id: 4, name: 'Python', description: 'High-level programming language for general-purpose programming' },
    { id: 5, name: 'Data Analysis', description: 'Inspecting, cleansing, transforming, and modeling data' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ApprovedSkillsTable skills={approvedSkills} />
        </div>
      </main>
    </div>
  );
};

export default ApprovedSkillsPage;

