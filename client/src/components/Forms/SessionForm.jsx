import React, { useContext, useEffect, useState } from "react";
import SkillSuggest from "../HelperComponents/SkillSuggestionInputField";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function SessionForm({ setShowForm, onCancel,getAllSessions }) {
  const [formData, setFormData] = useState({
    mentor: { name: "" },
    skillsOffered: {},
    skillsAcquiring: {},
    date: "",
    link: "",
  });


  const token = localStorage.getItem("token");
  const { backendUrl } = useContext(AuthContext);

  const [allUser, setAllUsers] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState(allUser);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/getAll`);

      if (data.success) {
        setAllUsers(data.users);
      } else {
        toast.error("Unable to fetch all users");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch all users");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post(
        `${backendUrl}/api/sessions/new`,
        {
          date: formData.date,
          userTwo: formData.mentor._id,
          skillTaughtByUserOne: formData.skillsOffered._id,
          skillTaughtByUserTwo: formData.skillsAcquiring._id,
          link: formData.link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.sucess) {
        toast.success("Session created successfully");
        getAllSessions();
        setShowForm(false);
      } else {
        toast.error("Unable to create session");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to create session");
    }
  };

  const handleMentorChange = (e) => {
    const query = e.target.value;
    setFormData({
      ...formData,
      mentor: { name: query },
    });

    if (query) {
      const suggestions = allUser.filter((mentor) =>
        mentor.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredMentors(suggestions);
    } else {
      setFilteredMentors([]);
    }
  };

  const handleMentorSelect = (mentorDetails) => {
    setFormData({
      ...formData,
      mentor: { ...mentorDetails },
    });
    setFilteredMentors([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Session</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mentor Name
          </label>
          <input
            type="text"
            required
            value={formData.mentor.name}
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
                  {mentor.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <SkillSuggest
          feildName={"Skills Offered"}
          isFromSessionPage={true}
          formData={formData}
          setFormData={setFormData}
          isMultiple={false}
        />
        <SkillSuggest
          feildName={"Skills Acquiring"}
          isFromSessionPage={true}
          formData={formData}
          setFormData={setFormData}
          isMultiple={false}
        />

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
            onClick={handleSubmit}
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
