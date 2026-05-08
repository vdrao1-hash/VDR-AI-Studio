import { motion, MotionValue, useTransform } from "motion/react";
import { cn } from "@/src/lib/utils";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: My Name (0% scroll)
  const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Section 2: Digital Experiences (30% scroll)
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [50, 0, -50]);

  // Section 3: Design and Engineering (60% scroll)
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [50, 0, -50]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Section 1 */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="flex h-screen w-full flex-col items-center justify-center p-8 text-center"
      >
        <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/40 mb-8">Professor & Head of General Medicine</p>
        <h1 className="text-[60px] md:text-[100px] lg:text-[120px] font-bold leading-[0.8] tracking-tighter text-white">
          DR. VANAMALI<br/>DHARMA RAO<span className="text-white/20">.</span>
        </h1>
      </motion.div>

      {/* Section 2 */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="flex h-screen w-full items-center justify-center p-12 md:p-24"
      >
        <div className="max-w-3xl text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6">Innovation</p>
          <h2 className="text-4xl md:text-7xl font-light leading-tight text-white/90">
            Pioneering <span className="text-white border-b border-white/20">gamified</span> <br />
            medical learning platforms.
          </h2>
        </div>
      </motion.div>

      {/* Section 3 */}
      <motion.div 
        style={{ opacity: opacity3, x: x3 }}
        className="flex h-screen w-full items-center justify-end p-12 md:p-24 text-right"
      >
        <div className="max-w-xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6">Future of Medicine</p>
          <h2 className="text-4xl md:text-6xl font-light leading-tight text-white/90">
            Integrating AI <br />
            precision into <br />
            clinical training.
          </h2>
        </div>
      </motion.div>

      {/* Side Rail Rail Text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-180 py-10 hidden lg:block opacity-20">
        <p style={{ writingMode: 'vertical-rl' }} className="text-[10px] uppercase tracking-[0.5em] whitespace-nowrap">
          Performance-Driven Design • Creative Engineering • Minimal Aesthetics
        </p>
      </div>
    </div>
  );
}
