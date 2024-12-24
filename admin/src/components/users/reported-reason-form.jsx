'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"


export default function ReportedUserReason( user, onClose ) {
  const handleApprove = () => {
    console.log('Approved:', { user })
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">User Information</h2>
        <form className="space-y-4">
          <div>
           <h2>Name</h2> 
          </div>
          
          <div>
           <p>Reason for Reporting</p>
          </div>
          <div>
           <p>Description</p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={handleApprove} className="bg-green-500 hover:bg-green-600">
              Approve
            </Button>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

