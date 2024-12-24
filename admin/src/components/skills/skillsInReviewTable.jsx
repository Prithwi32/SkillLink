import { AdminContext } from '@/context/AdminContext';
import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';

const ResponsiveSkillsTable = ({ skills,getPendingSkills,isLoading }) => {
  const {backendUrl} = useContext(AdminContext);

  const handleApprove = async(skill) => {
    try {
      const {data}= await axios.put(backendUrl + `/api/admin/skills/approve/${skill._id}`);
      if(data.success){
        toast.success(`Skill ${skill.name} approved`);
        getPendingSkills();
      }else{
        toast.dismiss();
        toast.error(`Failed to approve skill ${skill.name}`);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(error.message || `Failed to approve skill ${skill.name}`);
    }
  };

  const handleReject = async(skill) => {
    try {
      const {data}= await axios.put(backendUrl + `/api/admin/skills/reject/${skill._id}`);
      if(data.success){
        toast.success(`Skill ${skill.name} rejected`);
        getPendingSkills();
      }else{
        toast.dismiss();
        toast.error(`Failed to reject skill ${skill.name}`);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(error.message || `Failed to reject skill ${skill.name}`);
    }
  };


  if (isLoading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-2 sm:px-8">
      <div className="py-8">
        <div className="shadow overflow-hidden rounded-lg border-b border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="w-full sm:w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Skill Name</th>
                <th className="w-full sm:w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm hidden sm:table-cell">Description</th>
                <th className="w-full sm:w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {skills.map((skill) => (
                <tr key={skill._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="w-full sm:w-1/4 text-left py-3 px-4">
                    <span className="font-medium">{skill.name}</span>
                    <p className="sm:hidden text-gray-500 text-sm mt-1">{skill.desc}</p>
                  </td>
                  <td className="w-full sm:w-1/2 text-left py-3 px-4 hidden sm:table-cell">{skill.desc}</td>
                  <td className="w-full sm:w-1/4 text-left py-3 px-4">
                    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleApprove(skill)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(skill)}
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
  );
};

export default ResponsiveSkillsTable;

