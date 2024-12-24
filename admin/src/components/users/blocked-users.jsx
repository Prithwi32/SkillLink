import { Mail, Calendar } from 'lucide-react'
import { useState } from 'react'
import ReportedUserReason from './reported-reason-form'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const blockedUsers = [
  {
    id: "1",
    name: "William",
    email: "william@example.com",
    requestDate: "2023-12-04",
    skills: ["JavaScript", "React", "Node.js"],
    status: "blocked",
    reason: "Inappropriate behavior",
    description: "User has been reported for using offensive language in the community forum.",
  },
  {
    id: "2",
    name: "john",
    email: "john@example.com",
    requestDate: "2023-12-03",
    skills: ["Python", "Data Analysis", "Machine Learning"],
    status: "blocked",
    reason: "Spam content",
    description: "User has been reported for posting excessive promotional content.",
  },
  // Add more sample data as needed
]

export function BlockedUsers() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [isReasonFormOpen, setIsReasonFormOpen] = useState(false)

  const handleReasonClick = (user) => {
    setSelectedUser(user)
    setIsReasonFormOpen(true)
  }

  const handleCloseReasonForm = () => {
    setIsReasonFormOpen(false)
    setSelectedUser(null)
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blockedUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardTitle className="text-sm font-bold mb-3">
                {user.name}
              </CardTitle>
            </CardHeader>
            <CardContent>              
                <div className="flex items-center space-x-2 mt-5">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground text-gray-700">
                    {user.email}
                  </span>               
               </div>
               </CardContent> 
               <CardFooter>
                {user.status === "blocked" && (
                  <div className="flex-1 justify-between mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="pl-5 pr-5 w-[48%] bg-purple-600 text-white hover:text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                      onClick={() => handleReasonClick(user)}
                    >
                      View Reason
                    </Button>
                  </div>
                )}
              </CardFooter>
              
          </Card>
        ))}
      </div>
      {isReasonFormOpen && selectedUser && (
        <ReportedUserReason
          user={selectedUser}
          onClose={handleCloseReasonForm}
          
        />
      )}
    </>
  )
}

