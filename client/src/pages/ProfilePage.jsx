import { useState } from "react";
import { Avatar } from "../components/HelperComponents/Avatar";
import { EditableField } from "../components/HelperComponents/EditableField";
import { Plus, X } from "lucide-react";
import SkillSuggestInputField from "@/components/HelperComponents/SkillSuggestCommon";

export function ProfilePage({ user, isEditing, onEditToggle, onSubmit }) {
  const [editedUser, setEditedUser] = useState({
    ...user,
    skillsOffered: user?.skillsOffered || [],
    skillsRequested: user?.skillsRequested || [],
  });
  const [showAddSkillButton, setShowAddSkillButton] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isAddingInterestedSkill, setIsAddingInterestedSkill] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFieldChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updatedUser = { ...editedUser, photo: selectedFile };
    onSubmit(updatedUser);
    onEditToggle(false);
    setShowAddSkillButton(false);
    setIsAddingSkill(false);
    setIsAddingInterestedSkill(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    onEditToggle(false);
    setShowAddSkillButton(false);
    setIsAddingSkill(false);
    setIsAddingInterestedSkill(false);
  };

  const handleEditToggle = (editing) => {
    onEditToggle(editing);
    setShowAddSkillButton(editing);
    setIsAddingSkill(false);
    setIsAddingInterestedSkill(false);
  };

  const handleSkillAdd = (skillsArray, newSkill) => {
    const updatedSkills = [...skillsArray, newSkill];
    handleFieldChange("skillsOffered", updatedSkills);
  };

  const handleInterestedSkillAdd = (skillsArray, newSkill) => {
    const updatedSkills = [...skillsArray, newSkill];
    handleFieldChange("skillsRequested", updatedSkills);
  };

  const handleSkillRemove = (skillToRemove) => {
    const updatedSkills = editedUser.skillsOffered.filter(
      (skill) => skill !== skillToRemove,
    );
    handleFieldChange("skillsOffered", updatedSkills);
  };

  const handleInterestedSkillRemove = (skillToRemove) => {
    const updatedSkills = editedUser.skillsRequested.filter(
      (skill) => skill !== skillToRemove,
    );
    handleFieldChange("skillsRequested", updatedSkills);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 transition-all duration-500">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-xl p-8 space-y-8 animate-scale-in hover:shadow-2xl transition-all duration-500">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:gap-8">
            <Avatar
              src={editedUser.photo}
              alt={editedUser.name}
              isEditing={isEditing}
              onUpdate={(file) => {
                console.log("Selected file:", file);
                setSelectedFile(file);
                const uploadedImageURL = URL.createObjectURL(file);
                handleFieldChange("photo", uploadedImageURL);
              }}
            />
            <div className="flex-1 space-y-4">
              <EditableField
                label="Name"
                value={editedUser.name}
                onChange={(value) => handleFieldChange("name", value)}
                isEditing={isEditing}
              />
              <p className="text-gray-600">{editedUser.email}</p>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
              About
            </h2>
            <EditableField
              value={editedUser.about}
              onChange={(value) => handleFieldChange("about", value)}
              type="textarea"
              isEditing={isEditing}
            />
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
              My Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {editedUser.skillsOffered.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                >
                  {skill}
                  {isEditing && (
                    <button onClick={() => handleSkillRemove(skill)}>
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {showAddSkillButton && !isAddingSkill && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAddingSkill(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-all duration-300 hover:shadow-md transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  Add Skill
                </button>
              </div>
            )}
            {isAddingSkill && (
              <SkillSuggestInputField 
                isMultiple={true}
                onSkillSelect={(skills) =>
                  handleSkillAdd(
                    editedUser.skillsOffered,
                    skills[skills.length - 1],
                  )
                }
                existingSkills={editedUser.skillsOffered}
              />
            )}
          </div>

          {/* Skills I Want to Learn Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
              Skills I Want to Learn
            </h2>
            <div className="flex flex-wrap gap-2">
              {editedUser.skillsRequested.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                >
                  {skill}
                  {isEditing && (
                    <button onClick={() => handleInterestedSkillRemove(skill)}>
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {showAddSkillButton && !isAddingInterestedSkill && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAddingInterestedSkill(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-all duration-300 hover:shadow-md transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  Add Skill
                </button>
              </div>
            )}
            {isAddingInterestedSkill && (
              <SkillSuggestInputField
                isMultiple={true}
                onSkillSelect={(skills) =>
                  handleInterestedSkillAdd(
                    editedUser.skillsRequested,
                    skills[skills.length - 1],
                  )
                }
                existingSkills={editedUser.skillsRequested}
              />
            )}
          </div>
          {/* Edit, Save, Cancel Buttons */}
          <div className="flex justify-end gap-4 flex-wrap sm:flex-nowrap">
            {!isEditing ? (
              <button
                onClick={() => handleEditToggle(true)}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-300"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-300"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
