import { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useAuth } from "@/context/AuthContext";

const SkillSuggestInputField = ({ onSkillSelect, isMultiple, existingSkills }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { backendUrl } = useAuth();

  const fetchSkills = async (query) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/skills?query=${query}`,
      );
      const fetchedSkills = response.data;

      // Filter out skills already in existingSkills array
      const filteredSuggestions = fetchedSkills.filter(
        (skill) => !existingSkills.includes(skill.name),
      );

      setSuggestions(filteredSuggestions);
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
    let updatedSkills;
    if (isMultiple) {
      updatedSkills = [...existingSkills, suggestion.name];
    } else {
      updatedSkills = [suggestion.name];
    }
    onSkillSelect(updatedSkills); // Notify parent

    setInput("");
    setSuggestions([]);
  };

  return (
    <div className="w-full mt-4">
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

export default SkillSuggestInputField;
