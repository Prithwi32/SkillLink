import React from 'react';
import { InstructorCardCarousel } from "@/components/InstructorCardCarousel"

const instructors = [
  {
    photo: "/placeholder.svg?height=100&width=100",
    name: "John Doe",
    skill: "Web Development",
    description: "Learn the fundamentals of web development with HTML, CSS, and JavaScript.",
    date: "Starting June 1, 2024",
    rating: 4.5
  },
  {
    photo: "/placeholder.svg?height=100&width=100",
    name: "Jane Smith",
    skill: "Data Science",
    description: "Dive into the world of data analysis and machine learning.",
    date: "Starting July 15, 2024",
    rating: 3.5
  },
  {
    photo: "/placeholder.svg?height=100&width=100",
    name: "Mike Johnson",
    skill: "UX Design",
    description: "Learn to create user-centered designs for digital products.",
    date: "Starting August 1, 2024",
    rating: 4
  },
  {
    photo: "/placeholder.svg?height=100&width=100",
    name: "Emily Brown",
    skill: "Mobile App Development",
    description: "Build cross-platform mobile apps using React Native.",
    date: "Starting September 1, 2024",
    rating: 5
  }
]

export default function SuggestedCard() {
  return (
    <main className="container mx-auto py-12 px-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Suggested Learning</h1>
      <InstructorCardCarousel instructors={instructors} />
    </main>
  )
}

