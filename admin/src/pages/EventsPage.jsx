import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import EventList from "../components/events/EventsList"
import CounterUpCard from '../components/WebsiteMetricsCard'
export default function EventsDashboard() {
  return (
    <div>       
      <CounterUpCard/>
    <div className="flex-1 overflow-hidden bg-gray-50 ml-5 mr-5">
      <div className="h-full flex flex-col">
        <header className="border-b p-6 bg-white">
          <h1 className="text-3xl font-bold text-blue-700">Events</h1>
        </header>

        <div className="flex-1 pt-8">
          <Tabs defaultValue="upcoming" className="h-full">
            <TabsList className="mb-6 text-blue-600 p-1 rounded-lg shadow-sm bg-gray-100">
              <TabsTrigger value="upcoming"   className="data-[state=active]:text-white data-[state=active]:bg-blue-600">
                Upcoming
                </TabsTrigger>
              <TabsTrigger value="past"  className="data-[state=active]:text-white data-[state=active]:bg-blue-600">
                Past
                </TabsTrigger>
              <TabsTrigger value="canceled"  className="data-[state=active]:text-white data-[state=active]:bg-blue-600">
                Canceled
                </TabsTrigger>
            </TabsList>
            
            <ScrollArea className="h-[calc(100vh-14rem)]">
              <TabsContent value="upcoming" className="mt-0">
                <EventList status="upcoming" />
              </TabsContent>
              
              <TabsContent value="past" className="mt-0">
                <EventList status="past" />
              </TabsContent>
              
              <TabsContent value="canceled" className="mt-0">
                <EventList status="canceled" />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </div>
    </div>
  )
}

