import React from 'react';
import SkillCard from "./skillCard"

export default function SkillsList({ status }) {
  // This is mock data. In a real application, you'd fetch this from an API
  const skill = {
    approved: [
      { id: 1, title: "React Development", description: "It is framework of javascript." },
      { id: 2, title: "Shastriya Sangeetha", description: "A traditional music." },
    ],
    inReview: [
      { id: 1, title: "React Development", description: "It is framework of javascript." },
      { id: 2, title: "Shastriya Sangeetha", description: "A traditional music." },
  
     ],
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {skill[status].map((skill) => (
        <SkillCard 
          key={skill.id}
          title={skill.title}
          status={status}
          description={skill.description}
        />
      ))}
    </div>
  )
}

