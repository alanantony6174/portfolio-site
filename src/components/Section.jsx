import React from 'react';

const Section = ({ children, id, className = '' }) => {
    return (
        <section id={id} className={`py-20 md:py-32 px-6 ${className}`}>
            <div className="max-w-5xl mx-auto">
                {children}
            </div>
        </section>
    );
};

export default Section;
