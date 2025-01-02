import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import SkillsInReview from "../components/skills/skillsInReviewSection";
import SkillsApproved from "../components/skills/ApprovedSection";
import { MetricCard } from "../components/counterCard/MetricCard";
import { metrics } from "@/components/counterCard/data";


export default function SkillsDashboard() {
  return (
    <div className="flex-1">
      <div className="flex flex-wrap justify-center items-center px-8 py-6 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
      <div className="flex-1 overflow-hidden bg-gray-50 ml-5 mr-5">
        <div className="h-full flex flex-col">
          <header className="border-b p-6 bg-white">
            <h1 className="text-3xl font-bold text-blue-700">Skills</h1>
          </header>
          <div className="flex-1 pt-8">
            <Tabs defaultValue="approved" className="h-full">
              <TabsList className="mb-6 text-blue-600 p-1 rounded-lg shadow-sm bg-gray-100">
                <TabsTrigger
                  value="approved"
                  className="data-[state=active]:text-white data-[state=active]:bg-blue-600"
                >
                  Approved
                </TabsTrigger>
                <TabsTrigger
                  value="inReview"
                  className="data-[state=active]:text-white data-[state=active]:bg-blue-600"
                >
                  In Review
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[calc(100vh-14rem)]">
                <TabsContent value="approved" className="mt-0">
                  <SkillsApproved />
                </TabsContent>

                <TabsContent value="inReview" className="mt-0">
                  {<SkillsInReview />}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
