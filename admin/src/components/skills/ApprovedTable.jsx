import React from 'react';

const ApprovedSkillsTable = ({ skills }) => {
  return (
    <div className="container mx-auto px-4 sm:px-8">
    <div className="py-8">
      <div className="shadow rounded-lg border-b border-gray-200">
        {/* Table wrapper with fixed height and scroll */}
       
          <table className="min-w-full bg-white relative max-h-[600px] overflow-auto">
            {/* Sticky header */}
            <thead className="bg-blue-700 text-white sticky top-0 z-10">
              <tr>
                <th scope="col" className="w-full sm:w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Skill Name
                </th>
                <th scope="col" className="w-full sm:w-2/3 text-left py-3 px-4 uppercase font-semibold text-sm hidden sm:table-cell">
                  Description
                </th>
              </tr>
            </thead>
            {/* Scrollable body */}
            <tbody className="text-gray-700">
              {skills && skills.length > 0 ? (
                skills.map((skill) => (
                  <tr key={skill.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="w-full sm:w-1/3 text-left py-3 px-4">
                      <span className="font-medium">{skill.name}</span>
                      <p className="sm:hidden text-gray-500 text-sm mt-1">{skill.description}</p>
                    </td>
                    <td className="w-full sm:w-2/3 text-left py-3 px-4 hidden sm:table-cell">
                      {skill.description}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4">
                    No skills available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      
      </div>
    </div>
  </div>
  );
};

export default ApprovedSkillsTable;

