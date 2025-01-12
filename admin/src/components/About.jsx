import { ArrowRight } from "lucide-react";
import placeholder from "../assets/placeholder.jpg";
import { Monitor, ShieldCheck, Activity, Settings } from "lucide-react";
import { skillImage } from "../assets/assets.js";

export default function About() {
  const features = [
    {
      icon: <Monitor className="h-6 w-6 text-blue-500" />,
      title: "Effortless Management",
      description:
        "Stay in control with tools that simplify managing users, events, and platform activities, all in one place.",
      iconBg: "bg-blue-100",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-green-500" />,
      title: "Platform Security",
      description:
        "Maintain a safe and secure environment with robust features for monitoring and managing platform integrity.",
      iconBg: "bg-green-100",
    },
    {
      icon: <Activity className="h-6 w-6 text-yellow-500" />,
      title: "Actionable Insights",
      description:
        "Access detailed analytics to make informed decisions and drive the platform's growth effectively.",
      iconBg: "bg-yellow-100",
    },
    {
      icon: <Settings className="h-6 w-6 text-purple-500" />,
      title: "Customizable Controls",
      description:
        "Adapt the platform to your needs with flexible settings and personalized management options.",
      iconBg: "bg-purple-100",
    },
  ];

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 p-4 pb-0 sm:p-8 sm:pb-0 bg-white text-black">
        <div></div>
        <div className="lg:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center lg:text-left font-extrabold mb-4 leading-none">
            Welcome To
            <br />
            Admin <span className="text-blue-800">Dashboard</span>
          </h1>
          <p className="text-gray-600 mb-6 w-3/5 lg:w-3/4 mx-auto lg:mx-0 text-xs sm:text-sm md:text-base text-center lg:text-left">
            Manage your platform seamlessly with insights, tools, and controls
            designed to optimize user experience and community growth.
          </p>
          <div className="flex space-x-4 mb-4 justify-center lg:justify-start">
            <a href="#controls">
              <button className="bg-blue-700 text-white px-6 py-2 rounded-full flex items-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </a>
            <a href="#users">
              <button className="bg-gray-200 text-black px-6 py-2 rounded-full">
                Explore
              </button>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden hover:scale-[1.02] transition-all cursor-pointer"
            >
              <img
                src={skillImage[i]}
                alt={`Merch customization ${i + 1}`}
                className="sm:size-[200px] size-[100px] object-cover"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-8 sm:pt-24 py-16 pb-8" id="controls">
        <h1 className="text-2xl text-center sm:text-3xl font-semibold mb-3">
          Empowering <span className="text-blue-700">Admins</span> to Manage
          Seamlessly
        </h1>
        <p className="text-gray-600 sm:text-lg max-w-lg mx-auto text-center mb-10">
          Built for administrators, the tools and features ensure smooth
          platform management and endless opportunities for growth.
        </p>
        <div className="grid gap-8 lg:px-24 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex cursor-pointer ${
                index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              <div className="w-full md:w-[600px] bg-white shadow-lg rounded-lg hover:scale-[1.02] transition-all overflow-hidden">
                <div className="p-6">
                  <div className="flex gap-4">
                    <div
                      className={`${feature.iconBg} rounded-lg p-3 flex items-center justify-center`}
                    >
                      {feature.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-purple-700">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
