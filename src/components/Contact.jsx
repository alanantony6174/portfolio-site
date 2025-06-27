import React, { useState } from 'react'
import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaIdCard
} from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [emailValid, setEmailValid] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const validateEmail = e => {
    const val = e.target.value
    setEmailValid(/^\S+@\S+\.\S+$/.test(val))
    setFormData(f => ({ ...f, email: val }))
  }

  const handleChange = e =>
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    if (!emailValid) return
    // TODO: replace with real submit (Formspree, your API, etc.)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="w-screen py-20 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-8 text-center">Contact</h2>
        <div className="flex flex-col md:flex-row md:space-x-8">
          
          {/* Left: direct methods */}
          <div className="mb-8 md:mb-0">
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaPhone className="mr-2 text-indigo-600 contact-icon" />
                +91 92074 86174
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-indigo-600 contact-icon" />
                <a
                  href="mailto:alananatony6174@gmail.com"
                  className="hover:underline"
                >
                  alananatony6174@gmail.com
                </a>
              </li>
            </ul>

            <div className="flex space-x-4 mt-6 text-2xl">
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener"
              >
                <FaLinkedin className="contact-icon text-indigo-600" />
              </a>
              <a
                href="https://github.com/your-github"
                target="_blank"
                rel="noopener"
              >
                <FaGithub className="contact-icon text-indigo-600" />
              </a>
            </div>

            <div className="mt-6 flex items-center">
              <FaIdCard className="mr-2 text-indigo-600 contact-icon" />
              <a href="/AlanAntony.vcf" download className="hover:underline">
                Download My vCard
              </a>
            </div>
          </div>

          {/* Right: contact form */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-4">
            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={validateEmail}
              required
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 transition ${
                emailValid
                  ? 'focus:ring-indigo-400 border-gray-300'
                  : 'border-red-500 focus:ring-red-400'
              }`}
            />
            {!emailValid && (
              <p className="text-red-600 text-sm">
                Please enter a valid email.
              </p>
            )}

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Let’s Talk
            </button>

            <p className="text-sm text-gray-600">
              I’ll get back to you within 24 hours.
            </p>

            {submitted && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded">
                Thanks! I’ll be in touch soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
