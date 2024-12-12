import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersTable } from "@/components/users/users-table"
import { RequestedUsers } from "@/components/users/reported-users"
import CounterUpCard from '../components/WebsiteMetricsCard'
import { BlockedUsersTable } from '@/components/users/blocked-users'

export default function UsersPage() {
  return (
    <div> 
      <div>    
      <CounterUpCard/>
      </div>
      <header className="border-b p-6 bg-white pl-20">
          <h1 className="text-3xl font-bold text-blue-700">Users</h1>
      </header>
    <div className="flex-1 p-6  ">
      <Tabs defaultValue="requested" className="space-y-4 ">
      <TabsList className="flex flex-col sm:grid sm:grid-cols-3 w-full max-w-full sm:max-w-[600px] bg-blue-500 text-white rounded-lg overflow-hidden mb-10 ">
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
          <TabsTrigger 
            value="blocked"
            className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
          >
            Blocked Users
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <UsersTable />
        </TabsContent>
        <TabsContent value="requested" className="space-y-4">
          <RequestedUsers />
        </TabsContent>
        <TabsContent value="blocked" className="space-y-4">
          <BlockedUsersTable />
        </TabsContent>

      </Tabs>
    </div>
  </div>
  )
}

