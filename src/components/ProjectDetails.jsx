import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Section from './Section';
import Button from './Button';
import { motion } from 'framer-motion';

// This would ideally come from a shared data file or API
const projectsData = {
    "e-commerce-dashboard": {
        title: "E-Commerce Dashboard",
        description: "A comprehensive dashboard for managing online stores, featuring real-time analytics, inventory management, and order processing.",
        fullDescription: "This project was built to solve the problem of fragmented e-commerce management. It provides a unified interface for store owners to track sales, manage inventory across multiple warehouses, and process orders efficiently. The dashboard features real-time data visualization using Recharts, secure authentication with Firebase, and a responsive design that works on tablets and desktops.",
        tags: ["React", "Tailwind", "Node.js", "Firebase", "Recharts"],
        challenges: "One of the main challenges was handling real-time updates for inventory levels without overwhelming the client. I implemented a WebSocket connection to push updates only when necessary.",
        outcome: "The dashboard reduced order processing time by 40% for the pilot client.",
        image: null
    },
    "social-media-app": {
        title: "Social Media App",
        description: "A mobile-first social platform focused on photo sharing and community building.",
        fullDescription: "A vibrant social media platform designed for mobile devices. It allows users to share photos, create stories, and chat in real-time. The app focuses on performance and smooth animations to provide a native-like experience on the web.",
        tags: ["React Native", "Firebase", "Redux"],
        challenges: "Optimizing image loading and caching for a smooth scrolling experience on lower-end devices.",
        outcome: "Achieved a 60fps scroll performance and 99% uptime during the beta launch.",
        image: null
    },
    "task-management-tool": {
        title: "Task Management Tool",
        description: "A productivity application helping teams organize tasks, track progress, and collaborate effectively.",
        fullDescription: "A Trello-style task management tool with drag-and-drop functionality. Teams can create boards, lists, and cards to organize their work. It includes features like due dates, labels, and member assignments.",
        tags: ["Vue.js", "Express", "MongoDB"],
        challenges: "Implementing a performant drag-and-drop interface that works seamlessly across different browsers.",
        outcome: "Used by 5 small teams to manage their daily workflows.",
        image: null
    },
    "portfolio-website-v1": {
        title: "Portfolio Website v1",
        description: "My previous portfolio website showcasing my early work and development journey.",
        fullDescription: "The first iteration of my portfolio, built with raw HTML, CSS, and JavaScript. It served as a playground for learning the basics of web development and responsive design.",
        tags: ["HTML", "CSS", "JavaScript"],
        challenges: "Learning how to make a layout responsive without using a CSS framework.",
        outcome: "Landed my first freelance gig.",
        image: null
    }
};

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projectsData[id];

    if (!project) {
        return (
            <Section className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
                <Link to="/">
                    <Button variant="primary">Back to Home</Button>
                </Link>
            </Section>
        );
    }

    return (
        <div className="pt-24 pb-12 min-h-screen bg-white/90 backdrop-blur-sm">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link to="/" className="inline-block mb-8 text-gray-600 hover:text-black transition-colors">
                    &larr; Back to Projects
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="bg-gray-100 rounded-xl h-64 md:h-96 mb-10 flex items-center justify-center text-gray-400">
                        {project.image ? (
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            <span>Project Screenshot Placeholder</span>
                        )}
                    </div>

                    <div className="prose max-w-none">
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            {project.fullDescription || project.description}
                        </p>

                        {project.challenges && (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Challenges</h2>
                                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                    {project.challenges}
                                </p>
                            </>
                        )}

                        {project.outcome && (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Outcome</h2>
                                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                    {project.outcome}
                                </p>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetails;
