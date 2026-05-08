import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/src/lib/utils";

const projects = [
  {
    title: "HOUSIEMED",
    description: "First gamified medical education platform in India integrating quiz-based Housie methodology for active learning.",
    tech: ["Gamification", "Active Learning", "LMS"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop",
  },
  {
    title: "Bedside Medicine",
    description: "Best-selling clinical methods book series adopted in medical curricula across India for over 12 years.",
    tech: ["Publication", "Respiratory Medicine", "Clinical"],
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2844&auto=format&fit=crop",
  },
  {
    title: "AI In Medicine",
    description: "Winner of AI Assessment Hackathon 2025. Focused on machine learning for localized lung cancer diagnosis and staging.",
    tech: ["AI/ML", "Python", "Diagnostics"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop",
  },
];

export default function Projects() {
  return (
    <section className="bg-background py-32 px-6 md:px-24 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4">Portfolio</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">Selected Work.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5",
                "backdrop-blur-xl transition-all duration-500 hover:border-white/20"
              )}
            >
              {/* Image Container */}
              <div className="aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-white/50">Project {index + 1}</span>
                  <div className="flex gap-1">
                    {project.tech.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[9px] uppercase tracking-tighter bg-white/10 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-2xl font-medium mb-3 text-white">
                  {project.title}
                </h3>
                
                <p className="text-white/60 text-xs leading-relaxed mb-8">
                  {project.description}
                </p>

                <button className="w-full py-4 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold rounded-lg hover:bg-white/90 transition-all active:scale-[0.98]">
                  View Case Study
                </button>
              </div>

              {/* Subtle Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
