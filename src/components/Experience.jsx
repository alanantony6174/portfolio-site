const experiences = [
  {
    role: "Robotic Engineer Trainee",
    company: "Sinro Robotics",
    date: "Jun 2023 – Jan 2024",
    details: "Developed ROS 2 packages, integrated sensors and actuators, and delivered workshops to 150+ students."
  },
  {
    role: "Intern – Industrial Robotic Arm",
    company: "Galexon Engineering Industries",
    date: "Jan 2023",
    details: "Programmed robotic welding systems and implemented motion control algorithms."
  },
  {
    role: "Intern – Automation",
    company: "SMCE Automation",
    date: "Oct 2020",
    details: "Gained experience with PLC, DCS & SCADA; trained in ladder logic programming."
  },
  {
    role: "Freelance Developer",
    company: "Self-Initiated",
    date: "Feb 2024",
    details: "Built a Python-based AI assistant on Raspberry Pi using LangChain and Gemini API."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="w-screen py-20 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-6">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.company}>
              <h3 className="text-2xl font-medium">
                {exp.role} <span className="text-indigo-600">@ {exp.company}</span>
              </h3>
              <p className="text-sm text-gray-600 mb-2">{exp.date}</p>
              <p className="text-lg">{exp.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
