import Event from "@/components/HelperComponents/Event";
import SuggestedCard from "@/components/Cards/SuggestedCard";
import TopSkills from "@/components/HelperComponents/TopSkills";
import AboutSection from "@/components/HelperComponents/AboutSection";
// import RentingPage from "./RentingPage";
const LandingPage = () => {
  return (
    <div>
      <AboutSection/>
      <TopSkills/>
      <Event/>
      <SuggestedCard/>
      {/* <RentingPage/> */}
    </div>
  );
};

export default LandingPage;
