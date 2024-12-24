import React from 'react';

const ResponsiveSkillsTable = ({ skills }) => {
  const handleApprove = (skillId) => {
    // Implement approve logic here
    console.log(`Approved skill with id: ${skillId}`);
  };

  const handleReject = (skillId) => {
    // Implement reject logic here
    console.log(`Rejected skill with id: ${skillId}`);
  };

  return (

    <div className="container mx-auto px-4 sm:px-8">
    <div className="py-8">
      <div className="shadow rounded-lg border-b border-gray-200">
        {/* Table wrapper with fixed height and scroll */}
       
          <table className="min-w-full bg-white relative max-h-[600px] overflow-auto">
            {/* Sticky header */}
            <thead className="bg-blue-700 text-white sticky top-0 z-10">
            <tr>
                <th className="w-full sm:w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Skill Name</th>
                <th className="w-full sm:w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm hidden sm:table-cell">Description</th>
                <th className="w-full sm:w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            {/* Scrollable body */}
            <tbody className="text-gray-700">
              {skills.map((skill) => (
                <tr key={skill.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="w-full sm:w-1/4 text-left py-3 px-4">
                    <span className="font-medium">{skill.name}</span>
                    <p className="sm:hidden text-gray-500 text-sm mt-1">{skill.description}</p>
                  </td>
                  <td className="w-full sm:w-1/2 text-left py-3 px-4 hidden sm:table-cell">{skill.description}</td>
                  <td className="w-full sm:w-1/4 text-left py-3 px-4">
                    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleApprove(skill.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(skill.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      
      </div>
    </div>
  </div>
    // <div className="container mx-auto px-2 sm:px-8">
    //   <div className="py-8">
    //     <div className="shadow overflow-hidden rounded-lg border-b border-gray-200">
    //       <table className="min-w-full bg-white">
    //         <thead className="bg-blue-700 text-white">
             
    //         </thead>
            
    //       </table>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ResponsiveSkillsTable;

