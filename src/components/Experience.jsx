// src/components/Experience.jsx

import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { FaRobot } from 'react-icons/fa'

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
  return (
    <section
      id="experience"
      className="w-screen py-20 bg-gray-100 text-gray-900"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-12 text-center">
          My Journey
        </h2>

        <VerticalTimeline lineColor="#646cff">
          {experiences.map((exp, i) => (
            <VerticalTimelineElement
              key={i}
              date={exp.date}
              icon={<FaRobot />}
              iconStyle={{ background: '#646cff', color: '#fff' }}
              contentStyle={{ borderTop: '3px solid #646cff' }}
              contentArrowStyle={{ borderRight: '7px solid #646cff' }}
            >
              {/* group wrapper: hover this to reveal the details */}
              <div className="group">
                <h3 className="vertical-timeline-element-title">
                  {exp.role}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {exp.company}
                </h4>
                <p
                  className="
                    mt-2 
                    text-gray-600 
                    opacity-0 
                    group-hover:opacity-100 
                    transition-opacity 
                    duration-300
                  "
                >
                  {exp.details}
                </p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  )
}
