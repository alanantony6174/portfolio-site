// src/components/About.jsx

import React, { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

// Hook to detect mobile (window width < 768px)
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const onChange = () => setIsMobile(query.matches)
    query.addEventListener('change', onChange)
    onChange()
    return () => query.removeEventListener('change', onChange)
  }, [])
  return isMobile
}

export default function About() {
  const isMobile = useIsMobile()

  // Only bind parallax layers on desktop
  useEffect(() => {
    if (isMobile) return
    const onScroll = () => {
      document.querySelectorAll('.about-parallax').forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0
        el.style.transform = `translateY(${window.scrollY * speed}px)`
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  // Common motion settings
  const fadeInLeft = { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.6 }, viewport: { once: true } }
  const fadeInRight = { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay: 0.2 }, viewport: { once: true } }

  return (
    <section id="about" className="relative w-screen py-20 bg-white overflow-hidden">
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Parallax SVG Background */}
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="aboutGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ddd" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#aboutGrad)" />
            <circle
              className="about-parallax floating"
              data-speed="0.2"
              cx="30%"
              cy="20%"
              r="120"
              fill="#f0f0f0"
            />
            <circle
              className="about-parallax floating"
              data-speed="0.4"
              cx="80%"
              cy="80%"
              r="90"
              fill="#e0e0e0"
            />
          </svg>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Portrait */}
        {isMobile ? (
          <motion.div {...fadeInLeft} className="w-40 h-40 mb-6 mx-auto">
            <img
              src="/alan.png"
              alt="Alan Antony"
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
          </motion.div>
        ) : (
          <motion.div {...fadeInLeft} className="w-48 h-48 md:w-64 md:h-64 mb-6 md:mb-0 md:mr-8">
            <Tilt
              glareEnable
              glareMaxOpacity={0.25}
              scale={1.05}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
            >
              <img
                src="/alan.png"
                alt="Alan Antony"
                className="rounded-full w-full h-full object-cover shadow-lg"
              />
            </Tilt>
          </motion.div>
        )}

        {/* Text */}
        {isMobile ? (
          <motion.div {...fadeInRight} className="flex-1 text-center md:text-left text-gray-900">
            <h2 className="text-3xl font-semibold mb-2">About Me</h2>
            <p className="text-base leading-relaxed mb-4">
              I’m a Robotics Engineer specializing in autonomous mobile robots and embedded systems.
              I hold a B.E. in Robotics and Automation from Dhanalakshmi Srinivasan Engineering College
              (Anna University), graduating in 2023 with a CGPA of 8.68.
            </p>
            <Link
              to="projects"
              smooth
              duration={500}
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Discover My Projects
            </Link>
          </motion.div>
        ) : (
          <motion.div {...fadeInRight} className="flex-1 text-gray-900">
            <h2 className="text-4xl font-semibold mb-4">About Me</h2>
            <p className="text-lg leading-relaxed mb-4">
              I’m a Robotics Engineer specializing in autonomous mobile robots and embedded systems.
              I hold a B.E. in Robotics and Automation from Dhanalakshmi Srinivasan Engineering College
              (Anna University), graduating in 2023 with a CGPA of 8.68.
            </p>
            <Link
              to="projects"
              smooth
              duration={500}
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Discover My Projects
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
