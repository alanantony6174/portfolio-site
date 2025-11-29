import React from 'react';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';

const Home = () => {
    return (
        <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
        </main>
    );
};

export default Home;
