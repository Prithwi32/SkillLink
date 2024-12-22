import CustomComponentsHere from "@/components/HelperComponents/CustomComponentsHere";
import Event from "@/components/HelperComponents/Event";
import SuggestedCard from "@/components/Cards/SuggestedCard";
import TopSkills from "@/components/HelperComponents/TopSkills";
import AboutSection from "@/components/HelperComponents/AboutSection";
const LandingPage = () => {
  return (
    <div>
      {/* adding components */}
      {/* <CustomComponentsHere /> */}
      <AboutSection/>
      <TopSkills/>
      <Event/>
      <SuggestedCard/>
    </div>
  );
};

export default LandingPage;
