import React, { useState, useEffect } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { label: 'Home', id: 'hero' }, // Changed id to hero to match section id
    { label: 'About', id: 'about' },
    { label: 'Journey', id: 'experience' }, // Note: Experience section might be missing in Home, need to check
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ]

  const handleNavClick = (id) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  // Handle scroll on mount if state exists (simple implementation)
  useEffect(() => {
    if (isHome && location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Clear state to avoid scrolling on refresh? 
        // window.history.replaceState({}, document.title)
      }
    }
  }, [isHome, location]);

  return (
    <header
      className={`
        fixed w-full top-0 left-0 right-0
        transition-colors duration-300
        ${isScrolled || !isHome ? 'bg-white shadow-md' : 'bg-transparent'}
        z-50
      `}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <RouterLink to="/" className="text-2xl font-bold text-indigo-600">Alan Antony</RouterLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map(({ label, id }) => (
            isHome ? (
              <ScrollLink
                key={id}
                to={id}
                smooth
                duration={500}
                spy
                offset={-64}
                activeClass="text-indigo-400 underline"
                className="nav-link text-black cursor-pointer hover:text-indigo-600 transition-colors"
              >
                {label}
              </ScrollLink>
            ) : (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="nav-link text-black cursor-pointer hover:text-indigo-600 transition-colors"
              >
                {label}
              </button>
            )
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden text-2xl text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`
          md:hidden bg-white
          ${mobileOpen ? 'max-h-screen' : 'max-h-0'} overflow-hidden
          transition-max-height duration-500
          z-50 absolute w-full shadow-lg
        `}
      >
        <ul className="flex flex-col items-center space-y-4 py-6">
          {navItems.map(({ label, id }) => (
            isHome ? (
              <ScrollLink
                key={id}
                to={id}
                smooth
                duration={500}
                spy
                offset={-64}
                activeClass="text-indigo-400 underline"
                className="nav-link text-black text-xl cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </ScrollLink>
            ) : (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="nav-link text-black text-xl cursor-pointer"
              >
                {label}
              </button>
            )
          ))}
        </ul>
      </nav>
    </header>
  )
}
