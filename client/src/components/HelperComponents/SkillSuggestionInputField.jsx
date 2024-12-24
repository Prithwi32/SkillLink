import { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useAuth } from '@/context/AuthContext';

const SkillSuggest = ({ onSkillSelect }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { backendUrl } = useAuth();

  const fetchSkills = async (query) => {
    try {
      const response = await axios.get(`${backendUrl}/api/skills?query=${query}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const debouncedFetchSkills = debounce(fetchSkills, 300);

  useEffect(() => {
    return () => {
      debouncedFetchSkills.cancel();
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 0) {
      debouncedFetchSkills(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.name);
    setSuggestions([]);
    onSkillSelect(suggestion.name);
  };

  return (
    <div className="w-full max-w-md mt-4">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Enter a skill..."
        value={input}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-md shadow-md mt-1">
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
  );
};

export default SkillSuggest;
