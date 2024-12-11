import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import EventList from "../components/events/EventsList"

export default function EventsDashboard() {
  return (
    <div className="flex-1 overflow-hidden bg-gray-50">
      <div className="h-full flex flex-col">
        <header className="border-b p-6 bg-white">
          <h1 className="text-3xl font-bold text-gray-800">Events Dashboard</h1>
        </header>

        <div className="flex-1 p-6">
          <Tabs defaultValue="upcoming" className="h-full">
            <TabsList className="mb-6 bg-blue-600 p-1 rounded-lg shadow-sm text-gray-100">
              <TabsTrigger value="upcoming" className="px-6 py-2 text-sm font-medium">Upcoming</TabsTrigger>
              <TabsTrigger value="past" className="px-6 py-2 text-sm font-medium">Past</TabsTrigger>
              <TabsTrigger value="canceled" className="px-6 py-2 text-sm font-medium">Canceled</TabsTrigger>
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
  )
}

