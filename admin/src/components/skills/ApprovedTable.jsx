import React from "react";

const ApprovedSkillsTable = ({ skills, isLoading }) => {
  if (isLoading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="shadow overflow-hidden rounded-lg border-b border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="w-full sm:w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Skill Name
                </th>
                <th className="w-full sm:w-2/3 text-left py-3 px-4 uppercase font-semibold text-sm hidden sm:table-cell">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {skills.length > 0 &&
                skills.map((skill) => (
                  <tr
                    key={skill._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="w-full sm:w-1/3 text-left py-3 px-4">
                      <span className="font-medium">{skill.name}</span>
                      <p className="sm:hidden text-gray-500 text-sm mt-1">
                        {skill.desc}
                      </p>
                    </td>
                    <td className="w-full sm:w-2/3 text-left py-3 px-4 hidden sm:table-cell">
                      {skill.desc}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApprovedSkillsTable;
