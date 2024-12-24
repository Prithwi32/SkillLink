// import React from 'react';
// import { InstructorCard } from "./InstructorCard";
// import { Button } from "@/components/ui/button";

// export function InstructorCardGrid({ instructors }) {
//   // Determine the number of instructors to display based on screen size
//   const getVisibleInstructors = () => {
//     if (window.innerWidth >= 1024) {
//       return instructors.slice(0, 3); // PC view
//     } else if (window.innerWidth >= 640) {
//       return instructors.slice(0, 2); // Tablet view
//     } else {
//       return instructors.slice(0, 2); // Mobile view
//     }
//   };

//   const [visibleInstructors, setVisibleInstructors] = React.useState(getVisibleInstructors());

//   React.useEffect(() => {
//     const handleResize = () => {
//       setVisibleInstructors(getVisibleInstructors());
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [instructors]);

//   return (
//     <div className="w-full mx-auto px-10 py-5">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-between">
//         {visibleInstructors.map((instructor, index) => (
//           <div key={index} className="h-full">
//             <InstructorCard {...instructor} />
//           </div>
//         ))}
//       </div>
//       <div className="mt-8 text-center">
//         <Button variant="default" size="lg">Explore</Button>
//       </div>
//     </div>
//   );
// }
import React from 'react';
import { InstructorCard } from "./InstructorCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function InstructorCardGrid({ instructors }) {
  // Determine the number of instructors to display based on screen size
  const getVisibleInstructors = () => {
    if (window.innerWidth >= 1024) {
      return instructors.slice(0, 3); // PC view
    } else if (window.innerWidth >= 640) {
      return instructors.slice(0, 2); // Tablet view
    } else {
      return instructors.slice(0, 2); // Mobile view
    }
  };

  const [visibleInstructors, setVisibleInstructors] = React.useState(getVisibleInstructors());

  React.useEffect(() => {
    const handleResize = () => {
      setVisibleInstructors(getVisibleInstructors());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [instructors]);

  const navigate = useNavigate(); // Initialize navigate function

  const handleExploreClick = () => {
    navigate('/allSuggestedLearning'); // Redirect to home page
  };

  return (
    <div className="w-full mx-auto px-10 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-between">
        {visibleInstructors.map((instructor, index) => (
          <div key={index} className="h-full">
            <InstructorCard {...instructor} />
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button variant="default" size="lg" onClick={handleExploreClick}>Explore</Button>
      </div>
    </div>
  );
}
