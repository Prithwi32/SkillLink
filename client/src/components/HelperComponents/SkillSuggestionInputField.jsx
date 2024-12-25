import { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useAuth } from "@/context/AuthContext";

const SkillSuggest = ({
  onSkillSelect,
  feildName,
  isMultiple,
  isFromSessionPage,
  formData,
  setFormData,
}) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]); // Supports single/multiple selections
  const { backendUrl } = useAuth();

  const fetchSkills = async (query) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/skills?query=${query}`,
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const debouncedFetchSkills = debounce(fetchSkills, 300);

  useEffect(() => {
    return () => {
      debouncedFetchSkills.cancel();
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 0) {
      debouncedFetchSkills(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (isFromSessionPage && feildName == "Skills Offered") {
      setFormData({
        ...formData,
        skillsOffered: suggestion, 
      });
    }else if (isFromSessionPage && feildName == "Skills Acquiring") {
      setFormData({
        ...formData,
        skillsAcquiring: suggestion, 
      });
    }

    if (isMultiple) {
      if (!selectedSkills.includes(suggestion.name)) {
        const updatedSkills = [...selectedSkills, suggestion.name];
        setSelectedSkills(updatedSkills);
      }
    } else {
      const updatedSkills = [suggestion.name];
      setSelectedSkills(updatedSkills);
    }

    setInput("");
    setSuggestions([]);
  };

  const handleSkillRemove = (skill) => {
    if (isFromSessionPage && feildName == "Skills Offered") {
      setFormData({
        ...formData,
        skillsOffered: '', 
      });
    }else if (isFromSessionPage && feildName == "Skills Acquiring") {
      setFormData({
        ...formData,
        skillsAcquiring: '',
      });
    }

    const updatedSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updatedSkills);
    if(!isFromSessionPage)
    onSkillSelect(updatedSkills); // Notify parent
  };

  return (
    <div className="w-full mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {feildName}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedSkills.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm cursor-pointer"
            onClick={() => handleSkillRemove(skill)}
          >
            {skill} &times;
          </span>
        ))}
      </div>
      <div className="relative">
        <input
          type="text"
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Type to search skills..."
          value={input}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded shadow-md mt-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SkillSuggest;
