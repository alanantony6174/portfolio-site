import { Link } from 'react-scroll'

export default function Hero() {
  return (
    <section
      id="home"
      className="w-screen min-h-screen flex items-center justify-center
                 bg-gradient-to-b from-black to-gray-800 text-white"
    >
      <div className="max-w-4xl text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Hello, I’m Alan Antony 👋
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Robotics Engineer | AMR · ROS 2 · Embedded Systems
        </p>
        <Link
          to="projects"
          smooth={true}
          duration={500}
          className="inline-block px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 transition"
        >
          View My Projects
        </Link>
      </div>
    </section>
  )
}
