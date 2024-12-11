import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/components/users/users-table"
import { RequestedUsers } from "@/components/users/reported-users"

export default function UsersPage() {
  return (
    <div className="flex-1 p-6  ">
      <Tabs defaultValue="requested" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] bg-blue-500 mb-10 text-gray-100 h-12">
          <TabsTrigger 
            value="all"
            className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
          >
            All Users
          </TabsTrigger>
          <TabsTrigger 
            value="requested"
            className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
          >
            Reported Users
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <UsersTable />
        </TabsContent>
        <TabsContent value="requested" className="space-y-4">
          <RequestedUsers />
        </TabsContent>
      </Tabs>
    </div>
  )
}

