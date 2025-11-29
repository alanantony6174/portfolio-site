import React from 'react';
import Section from './Section';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

const projects = [
  {
    id: "e-commerce-dashboard",
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for managing online stores, featuring real-time analytics, inventory management, and order processing.",
    tags: ["React", "Tailwind", "Node.js"],
    image: null, // Placeholder
    link: "#"
  },
  {
    id: "social-media-app",
    title: "Social Media App",
    description: "A mobile-first social platform focused on photo sharing and community building. Includes real-time chat and notifications.",
    tags: ["React Native", "Firebase", "Redux"],
    image: null, // Placeholder
    link: "#"
  },
  {
    id: "task-management-tool",
    title: "Task Management Tool",
    description: "A productivity application helping teams organize tasks, track progress, and collaborate effectively.",
    tags: ["Vue.js", "Express", "MongoDB"],
    image: null, // Placeholder
    link: "#"
  },
  {
    id: "portfolio-website-v1",
    title: "Portfolio Website v1",
    description: "My previous portfolio website showcasing my early work and development journey.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: null, // Placeholder
    link: "#"
  }
];

const Projects = () => {
  return (
    <Section id="projects" className="bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Selected Work</h2>
        <p className="text-gray-600 max-w-2xl">
          Here are some of the projects I've worked on recently. Each one presented unique challenges and learning opportunities.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
