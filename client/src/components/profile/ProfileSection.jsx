import React, { useState } from "react";
import { ProfilePage } from "../ProfilePage";
import { HOBBY_SUGGESTIONS as AVAILABLE_SKILLS } from "../../constants/hobby-suggestions";

const INITIAL_USER = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
  about:
    "Full-stack developer with a passion for building great user experiences.",
  skills: ["Gardening", "Yoga", "Digital marketing"],
  interestedSkills: ["Music", "Dancing"],
};

const SAMPLE_MENTORS = [
  {
    id: "1",
    name: "Sarah Wilson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    skills: ["Music", "Carrer mentoring", "Time management"],
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    skills: ["Dancing", "Photography", "Email marketing"],
  },
];

function ProfileSection() {
  const [user, setUser] = useState(INITIAL_USER);

  const handleUpdateProfile = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateAvatar = (file) => {
    // In a real app, you would upload the file to a server
    const imageUrl = URL.createObjectURL(file);
    handleUpdateProfile("avatar", imageUrl);
  };

  const handleRequestNewSkill = () => {
    // In a real app, this would navigate to a new page
    alert("Redirecting to new skill request page...");
  };

  return (
    <ProfilePage
      user={user}
      availableSkills={AVAILABLE_SKILLS}
      mentors={SAMPLE_MENTORS}
      onUpdateProfile={handleUpdateProfile}
      onUpdateAvatar={handleUpdateAvatar}
      onRequestNewSkill={handleRequestNewSkill}
    />
  );
}

export default ProfileSection;
