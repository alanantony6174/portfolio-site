// src/components/Navbar.jsx

import { Link } from 'react-scroll'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-black bg-opacity-80 text-white p-4 z-20">
      <ul className="flex w-full justify-around">
        {['Home','About','Projects','Contact'].map(label => (
          <li key={label}>
            <Link
              to={label.toLowerCase()}
              smooth
              duration={500}
              className="cursor-pointer hover:text-indigo-400"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
