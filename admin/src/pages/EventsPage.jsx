import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import EventList from "@/components/events/EventsList"
import { MetricCard } from "../components/counterCard/MetricCard";
import { metrics } from "@/components/counterCard/data";

export default function EventsDashboard() {
  return (
    <div>
     <div className="flex flex-wrap justify-center items-center px-8 py-6 gap-4">
             {metrics.map((metric) => (
               <MetricCard key={metric.label} {...metric} />
             ))}
           </div>
      <div className="flex-1 overflow-hidden bg-gray-50 ml-5 mr-5">
        <div className="h-full flex flex-col">
          <header className="border-b p-6 bg-white">
            <h1 className="text-3xl font-bold text-blue-700">Events</h1>
          </header>

          <div className="flex-1 pt-8">
            <Tabs defaultValue="Upcoming" className="h-full">
              <TabsList className="mb-6 text-blue-600 p-1 rounded-lg shadow-sm bg-gray-100">
                <TabsTrigger value="Upcoming" className="data-[state=active]:text-white data-[state=active]:bg-blue-600">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="Past" className="data-[state=active]:text-white data-[state=active]:bg-blue-600">
                  Past
                </TabsTrigger>
                <TabsTrigger value="Canceled" className="data-[state=active]:text-white data-[state=active]:bg-blue-600">
                  Canceled
                </TabsTrigger>
              </TabsList>
              
              <ScrollArea className="h-[calc(100vh-14rem)]">
                <TabsContent value="Upcoming" className="mt-0">
                  <EventList status="Upcoming" />
                </TabsContent>
                
                <TabsContent value="Past" className="mt-0">
                  <EventList status="Completed" />
                </TabsContent>
                
                <TabsContent value="Canceled" className="mt-0">
                  <EventList status="Cancelled" />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
