import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import SkillsList from "../components/skills/skillsList"
import CounterUpCard from '../components/WebsiteMetricsCard'
export default function SkillsDashboard() {
  return (
    <div>       
      <CounterUpCard/>
    <div className="flex-1 overflow-hidden bg-gray-50">
      <div className="h-full flex flex-col">
        <header className="border-b p-6 bg-white">
          <h1 className="text-3xl font-bold text-blue-700">Skills</h1>
        </header>

        <div className="flex-1 pt-8">
          <Tabs defaultValue="approved" className="h-full">
            <TabsList className="mb-6 bg-blue-600 p-1 rounded-lg shadow-sm text-gray-100">
              <TabsTrigger value="approved"className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                Approved
                </TabsTrigger>
              <TabsTrigger value="inReview"  className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                InReview
                </TabsTrigger>
            </TabsList>
            
            <ScrollArea className="h-[calc(100vh-14rem)]">
              <TabsContent value="approved" className="mt-0">
                <SkillsList status="approved" />
              </TabsContent>
              
              <TabsContent value="inReview" className="mt-0">
                <SkillsList status="inReview" />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </div>
    </div>
  )
}

