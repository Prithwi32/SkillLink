import EventCarousel from "@/components/HelperComponents/EventCarousel"

const events = [
  {
    skillName: "Web Development",
    rating: 4.5,
    participants: 1500,
    description: "Learn the fundamentals of web development, including HTML, CSS, and JavaScript.",
  },
  {
    skillName: "Data Science",
    rating: 4.8,
    participants: 1200,
    description: "Explore data analysis, machine learning, and statistical modeling techniques.",
  },
  {
    skillName: "UX Design",
    rating: 4.2,
    participants: 800,
    description: "Master the principles of user experience design and create intuitive interfaces.",
  },
  {
    skillName: "Digital Marketing",
    rating: 4.0,
    participants: 1000,
    description: "Discover strategies for online marketing, SEO, and social media campaigns.",
  },
  {
    skillName: "Mobile App Development",
    rating: 4.6,
    participants: 950,
    description: "Build native and cross-platform mobile applications for iOS and Android.",
  },
  {
    skillName: "Artificial Intelligence",
    rating: 4.9,
    participants: 750,
    description: "Dive into AI concepts, neural networks, and deep learning techniques.",
  },
]

export default function Event() {
  return (
    <main className="flex flex-col items-center justify-center p-10 px-14">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Featured Events</h1>
      <EventCarousel events={events} />
    </main>
  )
}

