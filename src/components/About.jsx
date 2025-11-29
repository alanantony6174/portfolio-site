import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Section id="about" className="bg-gray-50">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200">
            {/* Placeholder for profile image */}
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
              Profile Image
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gray-100 rounded-full -z-10"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            I'm a passionate developer with a keen eye for design. My journey started when I built my first website at 15, and I've been hooked ever since.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            I specialize in building scalable web applications using modern technologies like React, Node.js, and TypeScript. I believe in writing clean, maintainable code and creating intuitive user experiences.
          </p>
          <p className="text-gray-600 leading-relaxed">
            When I'm not coding, you can find me exploring new coffee shops, reading about design trends, or contributing to open source projects.
          </p>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
