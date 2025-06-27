const projects = [
  {
    title: "Disability Assistance Device",
    desc: "IOT & Computer Vision device in collaboration with Higbec Pvt. Ltd (2023).",
    link: "#"
  },
  {
    title: "Inspection Robot Arm",
    desc: "Two-segment continuum mechanism prototype; paper published in IJARSCT (2022).",
    link: "#"
  },
  {
    title: "Cross-Spherical Gear Robotic Arm",
    desc: "SolidWorks CAD design for advanced motion with simple construction (2021).",
    link: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="w-screen py-20 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-12">Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.link}
              className="block p-6 border rounded-lg hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
              <p className="text-lg">{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
