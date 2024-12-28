import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { assets } from "../../assets/assets";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const skills = [
  {
    name: "Active Listening",
    description: "Mastering the art of listening attentively to understand and engage effectively in conversations.",
    icon: assets.active_listening,
  },
  {
    name: "Dancing",
    description: "Expressing rhythm and creativity through various dance forms, from classical to modern styles.",
    icon: assets.dancing,
  },
  {
    name: "Cooking",
    description: "Crafting delicious meals and exploring diverse cuisines to bring joy through food.",
    icon: assets.cooking,
  },
  {
    name: "Coding",
    description: "Developing software solutions and enhancing problem-solving skills through programming.",
    icon: assets.coding,
  },
  {
    name: "Gardening",
    description: "Nurturing plants and creating beautiful green spaces with sustainable gardening practices.",
    icon: assets.gardening,
  },
  {
    name: "Music",
    description: "Playing, composing, and appreciating music to connect with emotions and inspire creativity.",
    icon: assets.music,
  },
];


const SkillCard = ({ name, icon }) => {
  return (
    <div className="relative flex flex-col items-center hover:translate-y-[-10px] transition-all duration-500 cursor-pointer">
      <Avatar className="size-24 shadow-xl">
        <AvatarImage src={icon} />
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="mt-3 text-sm text-center md:text-base font-medium text-gray-800">
        {name}
      </span>
    </div>
  );
};

const App = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800 px-8"
      id="skills"
    >
      <h1 className="text-2xl sm:text-3xl font-semibold">TOP <span className="text-blue-700">SKILLS</span></h1>

      <p className="text-gray-600 sm:text-lg max-w-lg text-center">
        Explore top skills that inspire learning, spark creativity, and bring
        communities together. Find your passion or share your expertise today!
      </p>

      <div className="flex sm:justify-center gap-10 pt-5 w-full overflow-scroll">
        {skills.map((skill,index) => (
          <HoverCard key={index}>
            <HoverCardTrigger>
              <SkillCard
                key={skill.name}
                name={skill.name}
                description={skill.description}
                icon={skill.icon}
              />
            </HoverCardTrigger>
            <HoverCardContent>
              <h2 className="text-xl text-blue-800 font-medium mb-3">{skill.name}</h2>
              <p className="text-zinc-500 text-sm">{skill.description}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default App;
