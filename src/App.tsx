import { useRef } from "react";
import { useScroll, motion, useTransform } from "motion/react";
import ScrollyCanvas from "./components/ScrollyCanvas";
import Overlay from "./components/Overlay";
import Projects from "./components/Projects";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // This scroll listener is for the whole scrolly-container section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <main className="min-h-screen bg-background text-white selection:bg-white selection:text-black bg-grid-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-black text-xs">VDR</div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-medium opacity-60 hidden md:block">Academic Portfolio / 2026</span>
        </div>
        <div className="flex gap-4 md:gap-8 items-center pointer-events-auto">
          <a href="#" className="text-[10px] uppercase tracking-widest hover:opacity-50 transition-opacity">Publications</a>
          <a href="#" className="text-[10px] uppercase tracking-widest hover:opacity-50 transition-opacity">Experience</a>
          <div className="px-4 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-widest hidden sm:block">Open for Collaboration</div>
        </div>
      </nav>

      {/* Scroll Section */}
      <section ref={containerRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ScrollyCanvas scrollYProgress={scrollYProgress} frameCount={120} />
          <Overlay scrollYProgress={scrollYProgress} />

          {/* Status Rail (Bottom) */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20 flex justify-between items-end pointer-events-none">
            <div className="hidden lg:block pointer-events-auto">
              {/* Optional bio teaser could go here */}
            </div>

            <div className="flex flex-col items-end gap-8 pb-2 pointer-events-auto">
              <div className="flex gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Focus</span>
                  <span className="text-[11px] font-mono whitespace-nowrap">Medical Ed / AI / Gamification</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Location</span>
                  <span className="text-[11px] font-mono whitespace-nowrap">Visakhapatnam, IN</span>
                </div>
              </div>
              
              {/* Progress Scrubber */}
              <div className="flex items-center gap-4 w-48 md:w-64">
                <span className="text-[9px] font-mono opacity-40">00</span>
                <div className="h-[1px] flex-grow bg-white/10 relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-white"
                    style={{ width: useTransform(progress, (v) => `${v}%`) }}
                  />
                </div>
                <span className="text-[9px] font-mono opacity-40">100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <Projects />

      {/* Footer */}
      <footer className="py-24 border-t border-white/10 px-6 md:px-24 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Dr. V. Dharma Rao.</h3>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Advancing Medical Education through Innovation.</p>
            <p className="text-white/20 text-[10px]">PROFESSOR & HEAD • GENERAL MEDICINE</p>
          </div>
          <div className="flex gap-8 text-[10px] font-mono tracking-widest uppercase text-white/40">
            <a href="#" className="hover:text-white transition-colors">Publications</a>
            <a href="#" className="hover:text-white transition-colors">ResearchGate</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
