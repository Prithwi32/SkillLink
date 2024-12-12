import React, { useState } from 'react';
import { HOBBY_SUGGESTIONS } from '../../constants/hobby-suggestions';

export default function SessionForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    mentorName: '',
    skillsOffered: [],
    skillsAcquiring: [],
    date: '',
    link: '',
  });

  const allSkills = [...HOBBY_SUGGESTIONS, ...HOBBY_SUGGESTIONS];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddSkill = (type, skill) => {
    setFormData({
      ...formData,
      [type]: [skill], // Replace the array with the new skill
    });
  };

  const handleRemoveSkill = (type) => {
    setFormData({
      ...formData,
      [type]: [], // Clear the skill from the array
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Session</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mentor Name
          </label>
          <input
            type="text"
            required
            value={formData.mentorName}
            onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Skills Offered */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills Offered
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.skillsOffered.length > 0 && (
              <span
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm cursor-pointer"
                onClick={() => handleRemoveSkill('skillsOffered')}
              >
                {formData.skillsOffered[0]} &times;
              </span>
            )}
          </div>
          <select
            onChange={(e) => handleAddSkill('skillsOffered', e.target.value)}
            className="w-full p-2 border rounded"
            value={formData.skillsOffered[0] || ""}
          >
            <option value="">Select a skill</option>
            {allSkills
              .filter((skill) => formData.skillsOffered.indexOf(skill) === -1) // Exclude the selected skill
              .map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
          </select>
        </div>

        {/* Skills Acquiring */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills Acquiring
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.skillsAcquiring.length > 0 && (
              <span
                className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm cursor-pointer"
                onClick={() => handleRemoveSkill('skillsAcquiring')}
              >
                {formData.skillsAcquiring[0]} &times;
              </span>
            )}
          </div>
          <select
            onChange={(e) => handleAddSkill('skillsAcquiring', e.target.value)}
            className="w-full p-2 border rounded"
            value={formData.skillsAcquiring[0] || ""}
          >
            <option value="">Select a skill</option>
            {allSkills
              .filter((skill) => formData.skillsAcquiring.indexOf(skill) === -1) // Exclude the selected skill
              .map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Session Date
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Session Link
          </label>
          <input
            type="url"
            required
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://meet.google.com/..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Add Session
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
