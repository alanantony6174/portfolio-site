import React from 'react';
import Section from './Section';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Section id="about" className="bg-transparent">
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
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <h3 className="text-xl text-indigo-600 font-medium mb-6">
            Transforming complex problems into elegant solutions.
          </h3>

          <p className="text-gray-600 mb-6 leading-relaxed">
            I'm a software engineer with a passion for building digital products that make a difference. With a background in both design and development, I bring a unique perspective to every project, ensuring that the code is as clean as the user interface.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            My approach is user-centric and data-driven. I don't just write code; I solve problems. Whether it's optimizing a database query or crafting a pixel-perfect animation, I'm dedicated to delivering excellence.
          </p>
          <p className="text-gray-600 leading-relaxed">
            When I'm not at my desk, you can find me hiking, experimenting with new cooking recipes, or contributing to the open-source community.
          </p>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
