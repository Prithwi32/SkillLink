import React, { useState, useEffect } from 'react'

export default function AnimatedAbout() {
  const [visibleIndex, setVisibleIndex] = useState(-1)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleIndex((prev) => {
        if (prev < 2) return prev + 1
        clearInterval(timer)
        return prev
      })
    }, 600)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative bg-gray-600 text-white overflow-hidden px-4 py-12 md:py-20 lg:py-24">
      {/* Hero Section */}
      <div
        className={`max-w-7xl mx-auto space-y-8 transform transition-all duration-700 ease-out ${
          visibleIndex >= 0 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Welcome to Our Platform
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Discover a place where skills are exchanged, communities thrive, and
            growth is a shared journey.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div
        className={`max-w-7xl mx-auto mt-16 md:mt-20 transform transition-all duration-700 ease-out ${
          visibleIndex >= 1 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Global Community
            </h2>
            <p className="text-white/80 leading-relaxed">
              Connect with people from all over the world and expand your
              horizons through meaningful interactions and shared experiences.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Skill Exchange
            </h2>
            <p className="text-white/80 leading-relaxed">
              Share your expertise and learn new skills from community members.
              Every interaction is an opportunity for growth.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Collaborative Growth
            </h2>
            <p className="text-white/80 leading-relaxed">
              Grow together through knowledge sharing and collaborative projects.
              Success is better when it's shared.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className={`max-w-7xl mx-auto mt-16 md:mt-20 transform transition-all duration-700 ease-out ${
          visibleIndex >= 2 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto min-w-[200px] border border-white text-white hover:bg-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            Join Community
          </button>
          <button className="w-full sm:w-auto min-w-[200px] border border-white text-white hover:bg-white hover:text-black font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}