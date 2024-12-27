// import React from 'react';
// import { Calendar, Clock, Users } from 'lucide-react';

// export function EventHeader({ title, description, instructor, skill }) {
//   return (
//     <div className="space-y-4">
//       <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
//       <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
//         <p className="text-gray-600">{description}</p>
//         <div className="flex flex-wrap gap-4">
//           <div className="flex items-center gap-2">
//             <span className="font-semibold text-gray-700">Instructor:</span>
//             <span className="text-gray-600">{instructor}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="font-semibold text-gray-700">Skill:</span>
//             <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
//               {skill}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export function EventHeader({ title, description, instructor, skills = [] }) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
      <div className="bg-white rounded-xl p-8 shadow-lg space-y-6 border border-gray-200">
        <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700">Instructor:</span>
            <span className="text-gray-600">{instructor}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700">Skill:</span>
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-blue-600 bg-blue-50 px-4 py-2 rounded-full text-sm font-medium"
              >
                {" "}
                {skill}{" "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
