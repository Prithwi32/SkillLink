import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "../components/ui/scroll-area"
import EventList from "../components/events/EventsList"

export default function EventsDashboard() {
  return (
    <div className="flex-1 overflow-hidden ">
      <div className="h-full flex flex-col ">
        <header className="border-b p-4">
          <h1 className="text-2xl font-semibold">Events</h1>
        </header>

        <div className="flex-1 p-4 w-96">
          <Tabs defaultValue="upcoming" className="h-full ">
            <TabsList className="bg-blue-600  text-gray-100 ">
              <TabsTrigger value="upcoming" >Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="canceled">Canceled</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <TabsContent value="upcoming" className="space-y-4 mt-4 ">
                <EventList status="upcoming" />
              </TabsContent>
              
              <TabsContent value="past" className="space-y-4 mt-4">
                <EventList status="past" />
              </TabsContent>
              
              <TabsContent value="canceled" className="space-y-4 mt-4">
                <EventList status="canceled" />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

