export default function Contact() {
  return (
    <section id="contact" className="w-screen py-20 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-6">Contact</h2>
        <ul className="space-y-4 mb-8">
          <li><strong>Phone:</strong> +91 92074 86174</li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:alananatony6174@gmail.com" className="text-indigo-600 hover:underline">
              alananatony6174@gmail.com
            </a>
          </li>
          <li>
            <strong>LinkedIn:</strong>{" "}
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener" className="text-indigo-600 hover:underline">
              linkedin.com/in/your-profile
            </a>
          </li>
          <li>
            <strong>GitHub:</strong>{" "}
            <a href="https://github.com/your-github" target="_blank" rel="noopener" className="text-indigo-600 hover:underline">
              github.com/your-github
            </a>
          </li>
        </ul>
        <form action="https://formspree.io/f/yourFormID" method="POST" className="space-y-4">
          <input name="name" placeholder="Your Name" className="w-full p-3 border rounded" required />
          <input name="email" type="email" placeholder="Your Email" className="w-full p-3 border rounded" required />
          <textarea name="message" rows="5" placeholder="Your Message" className="w-full p-3 border rounded" required />
          <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
