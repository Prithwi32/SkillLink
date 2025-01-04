import React from "react";
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

  const [visibleInstructors, setVisibleInstructors] = React.useState(
    getVisibleInstructors(),
  );

  React.useEffect(() => {
    const handleResize = () => {
      setVisibleInstructors(getVisibleInstructors());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [instructors]);

  const navigate = useNavigate(); // Initialize navigate function

  const token = localStorage.getItem("token");

  const handleExploreClick = () => {
    if (token)
      navigate("users/allRecommendUsers"); // Redirect to home page
    else navigate("/users");
  };

  return (
    <div className="w-full mx-auto px-10 py-5">
      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {visibleInstructors.map((instructor, index) => (
          <InstructorCard {...instructor} key={index} />
        ))}
      </div>

      {instructors.length > 3 && (
        <div className="mt-8 text-center">
          <Button variant="default" size="sm" className="bg-blue-950 hover:opacity-90 hover:bg-blue-950" onClick={handleExploreClick}>
            Explore
          </Button>
        </div>
      )}
    </div>
  );
}
