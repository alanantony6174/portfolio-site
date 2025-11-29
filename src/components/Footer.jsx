import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <span className="text-xl font-bold">Alan Antony.</span>
                </div>
                <div className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Alan Antony. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
