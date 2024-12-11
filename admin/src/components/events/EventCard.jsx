import React from 'react';
import { Card } from "../ui/card"

export default function EventCard({ title, date, status }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <div className={`
          px-2 py-1 rounded-full text-sm
          ${status === 'upcoming' ? 'bg-blue-200 text-blue-700' : ''}
          ${status === 'past' ? 'bg-green-200 text-green-700' : ''}
          ${status === 'canceled' ? 'bg-red-200 text-red-700' : ''}
        `}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
    </Card>
  )
}

