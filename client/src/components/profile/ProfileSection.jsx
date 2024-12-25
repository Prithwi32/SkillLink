import React, { useState } from "react";
import { ProfilePage } from "../../pages/ProfilePage";
import { HOBBY_SUGGESTIONS as AVAILABLE_SKILLS } from "../../constants/hobby-suggestions";

const INITIAL_USER = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
  about: "Full-stack developer with a passion for building great user experiences.",
  skills: ["Gardening", "Yoga", "Digital marketing"],
  interestedSkills: ["Music", "Dancing"],
};

function ProfileSection() {
  const [user, setUser] = useState(INITIAL_USER);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = (editing) => {
    setIsEditing(editing);
  };

  const handleSubmit = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <ProfilePage
      user={user}
      availableSkills={AVAILABLE_SKILLS}
      isEditing={isEditing}
      onEditToggle={handleEditToggle}
      onSubmit={handleSubmit}
    />
  );
}

export default ProfileSection;