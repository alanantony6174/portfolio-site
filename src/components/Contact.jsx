export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-100 text-gray-800">
      <h2 className="text-4xl font-semibold text-center mb-6">Get In Touch</h2>
      <form action="https://formspree.io/f/yourFormID" method="POST" className="max-w-xl mx-auto space-y-4">
        <input name="name" placeholder="Your Name" className="w-full p-3 border rounded" required />
        <input name="email" type="email" placeholder="Your Email" className="w-full p-3 border rounded" required />
        <textarea name="message" rows="5" placeholder="Your Message" className="w-full p-3 border rounded" required></textarea>
        <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700">Send Message</button>
      </form>
    </section>
  );
}
