import { InstructorCard } from '@/components/Cards/InstructorCard'
import React from 'react'

const instructors = [
  {
    photo: "/placeholder.svg?height=100&width=100",
    name: "John Doe",
    skill: "Web Development",
    description: "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
    date: "Starting June 1, 2024",
    rating: 4
  },
  {
    photo: "/placeholder.svg?height=100&width=100",
    name: "Jane Smith",
    skill: "Data Science",
    description: "Dive into the world of data analysis and machine learning.",
    date: "Starting July 15, 2024",
    rating: 4.3
  },
  {
    photo: "/placeholder.svg?height=100&width=100",
    name: "Mike Johnson",
    skill: "UX Design",
    description: "Learn to create user-centered designs for digital products.",
    date: "Starting August 1, 2024",
    rating: 3.5
  },
  {
    photo: "/placeholder.svg?height=100&width=100",
    name: "Emily Brown",
    skill: "Mobile App Development",
    description: "Build cross-platform mobile apps using React Native.",
    date: "Starting September 1, 2024",
    rating: 4.9
  },
  {
    photo: "/placeholder.svg?height=100&width=100",
    name: "Alex Lee",
    skill: "Artificial Intelligence",
    description: "Explore the world of AI and machine learning algorithms.",
    date: "Starting October 1, 2024",
    rating: 5
  },
  {
    photo: "/placeholder.svg?height=100&width=100",
    name: "Sarah Wilson",
    skill: "Cybersecurity",
    description: "Learn to protect systems and networks from digital attacks.",
    date: "Starting November 1, 2024",
    rating: 3.9
  }
]


const AllSuggestedLearningPage = () => {
  return (
    <>
      <main className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Suggested Learning</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((instructor, index) => (
          <div key={index} className="w-full">
            <InstructorCard {...instructor} />
          </div>
        ))}
      </div>
    </main>
    </>
  )
}

export default AllSuggestedLearningPage
