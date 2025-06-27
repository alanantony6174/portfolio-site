import { Link } from 'react-scroll'

export default function Navbar() {
  const navItems = [
    { label: 'Home',      id: 'home' },
    { label: 'About',     id: 'about' },
    { label: 'Journey',   id: 'experience' },  // ← links to your Experience section
    { label: 'Projects',  id: 'projects' },
    { label: 'Contact',   id: 'contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-black bg-opacity-80 text-white p-4 z-20">
      <ul className="flex w-full justify-around">
        {navItems.map(({ label, id }) => (
          <li key={id}>
            <Link
              to={id}
              smooth={true}
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
