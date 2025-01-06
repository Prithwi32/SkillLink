import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import generalSkillImage from '../../assets/generalSkillImage.avif';

const SkillCard = ({ name, icon }) => {
  return (
    <div className="relative flex flex-col items-center hover:translate-y-[-10px] transition-all duration-500 cursor-pointer">
      <Avatar className="size-24 shadow-xl">
        <AvatarImage src={icon.trim()==""?generalSkillImage:icon} className="object-cover" />
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="mt-3 text-sm text-center md:text-base font-medium text-gray-800">
        {name}
      </span>
    </div>
  );
};

const App = () => {
  const [topSkills, setTopSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { backendUrl } = useAuth();

  const getTopSkills = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(backendUrl + "/api/skills/recent");

      if (data.success) {
        setTopSkills(data.skills);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to get top skills");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTopSkills();
  }, []);

  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800 px-8"
      id="skills"
    >
      <h1 className="text-2xl sm:text-3xl font-semibold">
        TOP <span className="text-blue-700">SKILLS</span>
      </h1>

      <p className="text-gray-600 sm:text-lg max-w-lg text-center">
        Explore top skills that inspire learning, spark creativity, and bring
        communities together. Find your passion or share your expertise today!
      </p>

      <div className="flex sm:justify-center gap-10 pt-5 w-full overflow-scroll">
        {!isLoading &&
          topSkills.map((skill, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger>
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  description={skill.desc}
                  icon={skill.photo}
                />
              </HoverCardTrigger>
              <HoverCardContent>
                <h2 className="text-xl text-blue-800 font-medium mb-3">
                  {skill.name}
                </h2>
                <p className="text-zinc-500 text-sm">{skill.desc}</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        {isLoading && <div className="text-center text-slate-600">Loading...</div>}
      </div>
    </div>
  );
};

export default App;
