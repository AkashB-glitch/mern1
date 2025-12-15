import React, { useEffect, useState } from 'react'
import './About.css'

export default function About() {
  const [play, setPlay] = useState(false)

  useEffect(() => {
    // Trigger animation on mount using a state toggle to ensure class is applied after render
    setPlay(false)
    requestAnimationFrame(() => setPlay(true))
  }, [])

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 ring-1 ring-gray-100">
        <h1 className={`text-4xl font-extrabold mb-4 ${play ? 'puff-in-tl' : ''} text-gray-900 tracking-tight`}>About Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to our community forum, a collaborative space where developers, designers, and curious learners come together to exchange ideas, ask questions, and support one another in their technical journeys. This platform brings together individuals working across diverse domains such as web development, mobile app creation, artificial intelligence, DevOps, cloud technologies, and emerging digital innovations. Whether you are here to seek guidance, share your expertise, explore new concepts, or stay updated with industry trends, our community is designed to foster continuous learning and meaningful engagement. Every interaction—whether a question, answer, or shared resource—helps strengthen our collective knowledge and drives us forward as a community. Thank you for being an essential part of this journey and contributing to an environment where everyone can grow and be inspired.
        </p>

        <div className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-600">
          <p>
            Contact: <a href="tel:+91000000000" className="text-teal-500 hover:underline">+91 0000000000</a>
            &nbsp;&nbsp; Email: <a href="mailto:communityforum@gmail.com" className="text-teal-500 hover:underline">communityforum@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
