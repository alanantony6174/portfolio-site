// src/components/Hero.jsx

import React, { useEffect, Suspense, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  PresentationControls,
  Float,
  useGLTF,
  useAnimations,
  Html,
  PerformanceMonitor
} from '@react-three/drei'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { Link } from 'react-scroll'

// Detect mobile synchronously
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

// Model URLs
const DESKTOP_MODEL = '/robot_model.glb'
const MOBILE_MODEL  = '/robot_model_compressed.glb'

function RobotModel({ src, ...props }) {
  const { scene, animations } = useGLTF(src)
  const ref = useRef()
  const { actions } = useAnimations(animations, ref)

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach(a =>
        a.reset().fadeIn(0.5).play().setLoop(THREE.LoopRepeat, Infinity)
      )
    }
  }, [actions])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.2
  })

  return <primitive ref={ref} object={scene} {...props} />
}

export default function Hero() {
  // Pick the correct model and preload it
  const modelSrc = isMobile ? MOBILE_MODEL : DESKTOP_MODEL
  useEffect(() => {
    useGLTF.preload(modelSrc)
  }, [modelSrc])

  // Dynamic DPR
  const [dpr, setDpr] = useState(window.devicePixelRatio || 1)

  // Desktop‐only parallax scroll
  useEffect(() => {
    if (isMobile) return
    const onScroll = () => {
      document.querySelectorAll('.parallax-layer').forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0
        el.style.transform = `translateY(${window.scrollY * speed}px)`
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Particle settings
  const particlesInit = async engine => await loadFull(engine)
  const particleOpts = {
    fullScreen: { enable: false },
    particles: {
      number:       { value: isMobile ? 20 : 60 },
      links:        { enable: true, color: '#646cff', distance: isMobile ? 80 : 120 },
      move:         { speed: isMobile ? 0.3 : 1 },
      size:         { value: isMobile ? 2 : 3 },
      color:        { value: '#646cff' }
    },
  }

  return (
    <section id="home" className="relative w-screen h-screen overflow-hidden">
      {/* SVG Parallax + Floating */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#242424" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" />
          <circle className="parallax-layer floating" data-speed="0.2" cx="20%" cy="30%" r="200" fill="#1a1a1a" />
          <circle className="parallax-layer floating" data-speed="0.4" cx="80%" cy="70%" r="150" fill="#343434" />
        </svg>
      </div>

      {/* Particle Network */}
      <Particles init={particlesInit} options={particleOpts}
        className="absolute inset-0 z-0 pointer-events-none" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas dpr={dpr} camera={{ position: [0, 0, 7], fov: 50 }}>
          <PerformanceMonitor onChange={({ factor }) => {
            const minDpr = isMobile ? 0.5 : 0.75
            const maxDpr = window.devicePixelRatio || 1
            const newDpr = minDpr + (maxDpr - minDpr) * factor
            setDpr(Math.round(newDpr * 100) / 100)
          }} />

          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <Suspense fallback={
            <mesh>
              <boxGeometry args={[1,1,1]} />
              <meshBasicMaterial color="#646cff" wireframe />
            </mesh>
          }>
            {isMobile ? (
              <Float speed={1} rotationIntensity={0.3} floatIntensity={0.6}>
                <RobotModel src={modelSrc} scale={1} position={[0, -1.2, 0]} />
              </Float>
            ) : (
              <PresentationControls global config={{ mass:1,tension:170,friction:26 }} snap={{ mass:2,tension:400,friction:40 }}>
                <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
                  <RobotModel src={modelSrc} scale={1.25} position={[0, -1.75, 0]} />
                </Float>
              </PresentationControls>
            )}
          </Suspense>

          <OrbitControls
            enableZoom={isMobile}     // only mobile pinch-zoom
            enablePan={false}         // no panning
          />
        </Canvas>
      </div>

      {/* Foreground Text & Buttons */}
      <div className="absolute inset-x-0 top-16 flex flex-col items-center text-center space-y-4 px-4 z-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Hello, I’m Alan Antony 👋
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Robotics Engineer | AMR · ROS 2 · Embedded Systems
        </p>
        <div className="flex space-x-4">
          <Link to="projects" smooth duration={500}
            className="px-6 py-2 bg-white text-indigo-600 rounded-md hover:bg-gray-100 transition"
          >
            View Projects
          </Link>
          <Link to="experience" smooth duration={500}
            className="px-6 py-2 bg-white text-indigo-600 rounded-md hover:bg-gray-100 transition"
          >
            My Journey
          </Link>
        </div>
      </div>
    </section>
  )
}
