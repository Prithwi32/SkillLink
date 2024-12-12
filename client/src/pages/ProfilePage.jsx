import React from 'react';
import { Avatar } from '../components/HelperComponents/Avatar';
import { EditableField } from '../components/HelperComponents/EditableField';
import { SkillsList } from '../components/HelperComponents/SkillsList';
import { MentorCard } from '../components/Cards/MentorCard';

export function ProfilePage({
  user,
  availableSkills,
  mentors,
  onUpdateProfile,
  onUpdateAvatar,
  onRequestNewSkill,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 transition-all duration-500">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-xl p-8 space-y-8 animate-scale-in hover:shadow-2xl transition-all duration-500">
          {/* Header Section */}
          <div className="flex items-start gap-8">
            <Avatar
              src={user.avatar}
              alt={user.name}
              onUpdate={onUpdateAvatar}
            />
            <div className="flex-1 space-y-4">
              <EditableField
                label="Name"
                value={user.name}
                onSubmit={(value) => onUpdateProfile('name', value)}
              />
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
              About
            </h2>
            <EditableField
              value={user.about}
              onSubmit={(value) => onUpdateProfile('about', value)}
              type="textarea"
            />
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
              Skills
            </h2>
            <SkillsList
              skills={user.skills}
              availableSkills={availableSkills}
              onUpdate={(skills) => onUpdateProfile('skills', skills)}
              onRequestNew={onRequestNewSkill}
            />
          </div>

          {/* Interested Skills Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
              Skills I Want to Learn
            </h2>
            <SkillsList
              skills={user.interestedSkills}
              availableSkills={availableSkills}
              onUpdate={(skills) => onUpdateProfile('interestedSkills', skills)}
            />
          </div>

          {/* Recommended Mentors */}
          {mentors.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                Recommended Mentors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mentors.map((mentor, index) => (
                  <div key={mentor.id} style={{ animationDelay: `${index * 100}ms` }}>
                    <MentorCard mentor={mentor} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
