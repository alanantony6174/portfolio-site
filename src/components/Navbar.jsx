import React, { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Change background on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { label: 'Home',      id: 'home' },
    { label: 'About',     id: 'about' },
    { label: 'Journey',   id: 'experience' },
    { label: 'Projects',  id: 'projects' },
    { label: 'Contact',   id: 'contact' },
  ]

  return (
    <header
      className={`
        fixed w-full z-20 transition-colors duration-300
        ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Brand / Logo */}
        <div className="text-2xl font-bold text-indigo-600">Alan Antony</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map(({ label, id }) => (
            <Link
              key={id}
              to={id}
              smooth={true}
              duration={500}
              spy={true}
              offset={-64}              // account for header height
              activeClass="active text-indigo-400"
              className="nav-link text-black cursor-pointer"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Slide-Down Menu */}
      <nav
        className={`
          md:hidden bg-white
          ${mobileOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden
          transition-max-height duration-500
        `}
      >
        <ul className="flex flex-col items-center space-y-4 py-6">
          {navItems.map(({ label, id }) => (
            <Link
              key={id}
              to={id}
              smooth={true}
              duration={500}
              spy={true}
              offset={-64}
              activeClass="active text-indigo-400"
              className="nav-link text-black text-xl"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  )
}
