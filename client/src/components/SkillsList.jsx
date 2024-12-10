import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export function SkillsList({ skills, availableSkills, onUpdate, onRequestNew }) {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('');

  const handleAddSkill = () => {
    if (selectedSkill && !skills.includes(selectedSkill)) {
      onUpdate([...skills, selectedSkill]);
      setSelectedSkill('');
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={skill}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-all duration-300 hover:shadow-md animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {skill}
          </span>
        ))}
      </div>

      {isAdding ? (
        <div className="flex gap-2 animate-slide-in">
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            autoFocus
          >
            <option value="">Select a skill</option>
            {availableSkills
              .filter((skill) => !skills.includes(skill))
              .map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
          </select>
          <button
            onClick={handleAddSkill}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            Add
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-all duration-300 hover:shadow-md transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
          {onRequestNew && (
            <button
              onClick={onRequestNew}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300 hover:underline"
            >
              Request new skill
            </button>
          )}
        </div>
      )}
    </div>
  );
}
