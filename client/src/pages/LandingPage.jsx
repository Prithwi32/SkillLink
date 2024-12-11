import CustomComponentsHere from "@/components/CustomComponentsHere";
import Event from "@/components/Event";
import SuggestedCard from "@/components/SuggestedCard";
import TopSkills from "@/components/TopSkills";
const LandingPage = () => {
  return (
    <div>
      {/* adding components */}
      {/* <CustomComponentsHere /> */}
      <TopSkills/>
      <Event/>
      <SuggestedCard/>
    </div>
  );
};

export default LandingPage;
