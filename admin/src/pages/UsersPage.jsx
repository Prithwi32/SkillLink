import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestedUsers } from "@/components/users/reported-users";
import { BlockedUsers } from "@/components/users/blocked-users";
import { MetricCard } from "../components/counterCard/MetricCard";
import { metrics } from "@/components/counterCard/data";

export default function UsersPage() {
  return (
    <div className="flex-1">
      <div className="flex flex-wrap justify-center items-center px-8 py-6 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
      <div className="flex-1 overflow-hidden bg-gray-50 ml-3 mr-3">
        <div className="h-full flex flex-col">
          <header className="border-b p-6 bg-white">
            <h1 className="text-3xl font-bold text-blue-700">Users</h1>
          </header>

          <div className="flex-1 pt-8">
            <Tabs defaultValue="reported" className="h-full">
              <TabsList className="mb-6 text-blue-600 p-1 rounded-lg shadow-sm bg-gray-100">
                <TabsTrigger
                  value="reported"
                  className="data-[state=active]:text-white data-[state=active]:bg-blue-600"
                >
                  Reported Users
                </TabsTrigger>
                <TabsTrigger
                  value="blocked"
                  className="data-[state=active]:text-white data-[state=active]:bg-blue-600"
                >
                  Blocked
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reported" className="space-y-4">
                <RequestedUsers />
              </TabsContent>
              <TabsContent value="blocked" className="space-y-4">
                <BlockedUsers />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
