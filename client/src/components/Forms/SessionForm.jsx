import React, { useState } from 'react';
import { HOBBY_SUGGESTIONS } from '../../constants/hobby-suggestions';
import SkillSuggest from '../HelperComponents/SkillSuggestionInputField';

// Placeholder mentor names for suggestions
const MENTOR_NAMES = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Davis'];

export default function SessionForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    mentorName: '',
    skillsOffered: [],
    skillsAcquiring: [],
    date: '',
    link: '',
  });
  
  const [filteredMentors, setFilteredMentors] = useState([]);
  
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

  const handleMentorChange = (e) => {
    const query = e.target.value;
    setFormData({
      ...formData,
      mentorName: query,
    });
    
    if (query) {
      const suggestions = MENTOR_NAMES.filter((mentor) =>
        mentor.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMentors(suggestions);
    } else {
      setFilteredMentors([]);
    }
  };

  const handleMentorSelect = (mentor) => {
    setFormData({
      ...formData,
      mentorName: mentor,
    });
    setFilteredMentors([]);
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
            onChange={handleMentorChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Render Mentor Suggestions */}
          {filteredMentors.length > 0 && (
            <ul className="border border-t-0 mt-2 max-h-60 overflow-y-auto">
              {filteredMentors.map((mentor, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleMentorSelect(mentor)}
                >
                  {mentor}
                </li>
              ))}
            </ul>
          )}
        </div>

        <SkillSuggest feildName={"Skills Offered"} isMultiple={false}/>
        <SkillSuggest feildName={"Skills Acquiring"} isMultiple={false}/>

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
