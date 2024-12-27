// import { useState } from "react";
// import PropTypes from "prop-types";
// import { HOBBY_SUGGESTIONS } from "@/constants/hobby-suggestions";

// export function HobbyInput({ selectedHobbies, onChange, title, placeholderTitle }) {
//   const [inputValue, setInputValue] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const filteredSuggestions = HOBBY_SUGGESTIONS.filter(
//     (hobby) =>
//       hobby.toLowerCase().includes(inputValue.toLowerCase()) &&
//       !selectedHobbies.includes(hobby),
//   );

//   const addHobby = (hobby) => {
//     if (!selectedHobbies.includes(hobby)) {
//       onChange([...selectedHobbies, hobby]);
//     }
//     setInputValue("");
//     setShowSuggestions(false);
//   };

//   const removeHobby = (hobbyToRemove) => {
//     onChange(selectedHobbies.filter((hobby) => hobby !== hobbyToRemove));
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{title}</label>

//       <div className="relative">
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => {
//             setInputValue(e.target.value);
//             setShowSuggestions(true);
//           }}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
//                    focus:ring-blue-500 focus:border-blue-500 transition-colors"
//           placeholder={`Type to add ${placeholderTitle}...`}
//         />

//         {showSuggestions && inputValue && (
//           <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
//             {filteredSuggestions.map((suggestion) => (
//               <div
//                 key={suggestion}
//                 className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//                 onClick={() => addHobby(suggestion)}
//               >
//                 {suggestion}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="flex flex-wrap gap-2 mt-2">
//         {selectedHobbies.map((hobby) => (
//           <span
//             key={hobby}
//             className="inline-flex items-center px-3 py-1 rounded-full text-sm 
//                      bg-blue-100 text-blue-800"
//           >
//             {hobby}
//             <button
//               type="button"
//               onClick={() => removeHobby(hobby)}
//               className="ml-2 text-blue-600 hover:text-blue-800"
//             >
//               ×
//             </button>
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// HobbyInput.propTypes = {
//   selectedHobbies: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onChange: PropTypes.func.isRequired,
// };
