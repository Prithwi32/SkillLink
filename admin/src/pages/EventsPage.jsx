import EventList from "@/components/events/EventsList";
import { MetricCard } from "../components/counterCard/MetricCard";
import { metrics } from "@/components/counterCard/data";
import { useState } from "react";
import {
  CalendarCheck2,
  CalendarX2,
  Hourglass,
} from "lucide-react";

export default function EventsDashboard() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  return (
    <div className="flex-1">
      <div className="flex flex-wrap justify-center items-center px-8 py-6 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
      <div className="bg-blue-800 text-white py-6 mt-6">
        <div className="flex flex-col justify-center items-center px-4">
          <h1 className="text-3xl text-center font-bold">
            Event Management Dashboard
          </h1>
          <p className="mt-3 text-sm text-center text-blue-100">
          Track, analyze, and optimize events
          </p>
        </div>
      </div>

      <div className=" px-4 py-8">
        {/* Tab buttons */}
        <div className="flex justify-center flex-wrap space-x-4 gap-4 sm:gap-0 mb-8">
          <button
            onClick={() => setActiveTab("Upcoming")}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "Upcoming"
                ? "bg-blue-800 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            <Hourglass className="w-5 h-5 mr-2" />
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("Completed")}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "Completed"
                ? "bg-blue-800 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            <CalendarCheck2 className="w-5 h-5 mr-2" />
            Completed
          </button>
          <button
            onClick={() => setActiveTab("Cancelled")}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "Cancelled"
                ? "bg-blue-800 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-blue-50"
            }`}
          >
            <CalendarX2 className="w-5 h-5 mr-2" />
            Cancelled
          </button>
        </div>

        {activeTab == "Upcoming" && <EventList status="Upcoming" />}

        {activeTab == "Completed" && <EventList status="Completed" />}

        {activeTab == "Cancelled" && <EventList status="Cancelled" />}
      </div>
    </div>
  );
}
