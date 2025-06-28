import React from 'react'
import useIsMobile    from './hooks/useIsMobile'
import ScrollDragger  from './components/ScrollDragger'
import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import About          from './components/About'
import Experience     from './components/Experience'
import Projects       from './components/Projects'
import Contact        from './components/Contact'

export default function App() {
  const isMobile = useIsMobile()
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      {isMobile && <ScrollDragger />}
    </>
  )
}
