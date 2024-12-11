// import React from 'react'
import { Mail, Calendar } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const requestedUsers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    requestDate: "2023-12-04",
    skills: ["JavaScript", "React", "Node.js"],
    status: "pending",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    requestDate: "2023-12-03",
    skills: ["Python", "Data Analysis", "Machine Learning"],
    status: "pending",
  },
  // Add more sample data as needed
]

export function RequestedUsers() {
  return (
    <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {requestedUsers.map((user) => (
        <Card key={user.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {user.name}
            </CardTitle>
            <Badge
              variant={
                user.status === "pending"
                  ? "secondary"
                  : user.status === "approved"
                  ? "success"
                  : "destructive"
              }
            >
              {user.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Requested: {user.requestDate}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {user.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
              {user.status === "pending" && (
                <div className="flex justify-between mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-[48%]"
                    onClick={() => {
                      // Handle approval logic
                      console.log(`Approved user: ${user.id}`)
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-[48%]"
                    onClick={() => {
                      // Handle block logic
                      console.log(`Blocked user: ${user.id}`)
                    }}
                  >
                    Block
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

