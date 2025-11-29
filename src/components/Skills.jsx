import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaAws, FaPython } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiPostgresql, SiMongodb, SiFigma, SiGraphql, SiRedux } from 'react-icons/si';

const skillCategories = [
    {
        title: "Frontend",
        skills: [
            { name: "React", icon: FaReact, color: "#61DAFB" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
            { name: "Redux", icon: SiRedux, color: "#764ABC" },
            { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
            { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
        ]
    },
    {
        title: "Backend",
        skills: [
            { name: "Node.js", icon: FaNodeJs, color: "#339933" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
            { name: "Python", icon: FaPython, color: "#3776AB" },
        ]
    },
    {
        title: "Tools & DevOps",
        skills: [
            { name: "Git", icon: FaGitAlt, color: "#F05032" },
            { name: "Docker", icon: FaDocker, color: "#2496ED" },
            { name: "AWS", icon: FaAws, color: "#FF9900" },
            { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        ]
    }
];

const Skills = () => {
    return (
        <Section id="skills" className="bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
                <p className="text-gray-600 max-w-2xl">
                    I've worked with a variety of technologies and tools to build robust and scalable applications.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
                {skillCategories.map((category, categoryIndex) => (
                    <motion.div
                        key={categoryIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
                    >
                        <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-2">{category.title}</h3>
                        <div className="flex flex-wrap gap-4">
                            {category.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="flex flex-col items-center gap-2 group">
                                    <div
                                        className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors"
                                    >
                                        <skill.icon size={24} color={skill.color} />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Skills;
