// src/components/Hero.jsx

import React, { useRef, useEffect, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  OrbitControls,
  PresentationControls,
  Float,
  useGLTF,
  useAnimations,
  Html
} from '@react-three/drei'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { Link } from 'react-scroll'

// Preload the GLB so there's no flash when you navigate back
useGLTF.preload('/robot_model.glb')

function RobotModel({ scale = 1.25, position = [0, -1.75, 0] }) {
  const { scene, animations } = useGLTF('/robot_model.glb')
  const ref = useRef()
  const { actions } = useAnimations(animations, ref)

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        action.reset().fadeIn(0.5).play().setLoop(THREE.LoopRepeat, Infinity)
      })
    }
  }, [actions])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.2
  })

  return <primitive ref={ref} object={scene} scale={scale} position={position} />
}

export default function Hero() {
  // init particles engine
  const particlesInit = async (engine) => {
    await loadFull(engine)
  }

  // parallax scroll effect
  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll('.parallax-layer').forEach((el) => {
        const speed = parseFloat(el.dataset.speed)
        el.style.transform = `translateY(${window.scrollY * speed}px)`
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="home" className="relative w-screen h-screen overflow-hidden">
      {/* 1) Parallax SVG Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#242424" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" />
          <circle
            className="parallax-layer"
            data-speed="0.2"
            cx="20%"
            cy="30%"
            r="200"
            fill="#1a1a1a"
          />
          <circle
            className="parallax-layer"
            data-speed="0.4"
            cx="80%"
            cy="70%"
            r="150"
            fill="#343434"
          />
        </svg>
      </div>

      {/* 2) Particle Network Overlay */}
      <Particles
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: 'transparent' },
          particles: {
            number: { value: 60 },
            color: { value: '#646cff' },
            links: { enable: true, color: '#646cff' },
            move: { speed: 1 },
            size: { value: 3 },
          },
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* 3) 3D Canvas with Suspense */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={<Html center>Loading 3D...</Html>}>
          <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <PresentationControls
              global
              config={{ mass: 1, tension: 170, friction: 26 }}
              snap={{ mass: 2, tension: 400, friction: 40 }}
            >
              <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
                <RobotModel />
              </Float>
            </PresentationControls>

            <OrbitControls enableZoom={false} />
          </Canvas>
        </Suspense>
      </div>

      {/* 4) Foreground Text & Buttons */}
      <div className="absolute inset-x-0 top-16 flex flex-col items-center text-center space-y-4 px-4 z-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Hello, I’m Alan Antony 👋
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Robotics Engineer | AMR · ROS 2 · Embedded Systems
        </p>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
          <Link
            to="projects"
            smooth
            duration={500}
            className="px-6 py-2 bg-white text-indigo-600 rounded-md hover:bg-gray-100 transition"
          >
            View My Projects
          </Link>
          <Link
            to="experience"
            smooth
            duration={500}
            className="px-6 py-2 bg-white text-indigo-600 rounded-md hover:bg-gray-100 transition"
          >
            My Journey
          </Link>
        </div>
      </div>
    </section>
  )
}
