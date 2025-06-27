import React, { useState } from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { FaRobot, FaChevronDown } from 'react-icons/fa'

const experiences = [
  {
    role: "Robotic Engineer Trainee",
    company: "Sinro Robotics",
    date: "Jun 2023 – Jan 2024",
    details:
      "Developed ROS 2 packages, integrated sensors and actuators, and delivered workshops to 150+ students."
  },
  {
    role: "Intern – Industrial Robotic Arm",
    company: "Galexon Engineering Industries",
    date: "Jan 2023",
    details:
      "Programmed robotic welding systems and implemented motion-control algorithms."
  },
  {
    role: "Intern – Automation",
    company: "SMCE Automation",
    date: "Oct 2020",
    details:
      "Gained experience with PLC, DCS & SCADA; trained in ladder-logic programming."
  },
  {
    role: "Freelance Developer",
    company: "Self-Initiated",
    date: "Feb 2024",
    details:
      "Built a Python-based AI assistant on Raspberry Pi using LangChain and the Gemini API."
  }
]

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  return (
    <section id="experience" className="w-screen py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-12 text-center">My Journey</h2>

        <VerticalTimeline lineColor="#646cff">
          {experiences.map((exp, i) => {
            const isOpen = expandedIndex === i
            return (
              <VerticalTimelineElement
                key={i}
                date={exp.date}
                icon={<FaRobot />}
                iconStyle={{ background: '#646cff', color: '#fff' }}
                contentStyle={{ borderTop: '3px solid #646cff' }}
                contentArrowStyle={{ borderRight: '7px solid #646cff' }}
              >
                {/* Entire header acts as a toggle button */}
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : i)}
                  className="
                    w-full flex justify-between items-center
                    bg-white p-4 rounded-lg shadow hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-indigo-400
                    transition
                    "
                  type="button"
                >
                  <div className="text-left">
                    <h3 className="vertical-timeline-element-title">
                      {exp.role}
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                      {exp.company}
                    </h4>
                  </div>
                  <FaChevronDown
                    className={`
                      transform transition-transform duration-300
                      ${isOpen ? 'rotate-180' : 'rotate-0'}
                    `}
                  />
                </button>

                {/* Expandable details */}
                <div
                  className={`
                    mt-2 px-4 overflow-hidden transition-all duration-300
                    ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <p className="text-gray-600">{exp.details}</p>
                </div>
              </VerticalTimelineElement>
            )
          })}
        </VerticalTimeline>
      </div>
    </section>
  )
}
