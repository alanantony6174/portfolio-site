const projects = [
  { title: "Outdoor AMR", desc: "ROS 2, Nav2, IsaacSim case study", link: "#" },
  { title: "Ultrasonic Sensor Module", desc: "STM32CubeIDE integration", link: "#" },
  // ...
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white text-gray-900">
      <h2 className="text-4xl font-semibold text-center mb-12">Projects</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {projects.map(p => (
          <a
            key={p.title}
            href={p.link}
            className="w-80 p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
            <p className="mb-4">{p.desc}</p>
            <span className="text-indigo-600">Learn More →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
