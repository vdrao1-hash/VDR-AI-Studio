import { useEffect, useRef, useState, useMemo } from "react";
import { type MotionValue, useTransform, useMotionValueEvent } from "motion/react";
import { cn } from "@/src/lib/utils";

interface ScrollyCanvasProps {
  frameCount?: number;
  className?: string;
  scrollYProgress: MotionValue<number>;
}

export default function ScrollyCanvas({ 
  frameCount = 120, 
  className,
  scrollYProgress
}: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Generate image paths
  const imagePaths = useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) => {
      const index = i.toString().padStart(3, "0");
      return `/sequence/frame_${index}_delay-0.067s.webp`;
    });
  }, [frameCount]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = async () => {
      const promises = imagePaths.map((path, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = path;
          img.onload = () => {
            loadedCount++;
            setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
            loadedImages[index] = img;
            resolve();
          };
          img.onerror = () => {
            // If image fails to load, we still resolve to not block the app
            // We'll handle missing images in the render loop
            loadedCount++;
            setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
            resolve();
          };
        });
      });

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoading(false);
    };

    preloadImages();
  }, [imagePaths, frameCount]);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const renderImage = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img) return;

    // Object-fit: cover logic
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const newWidth = imgWidth * ratio;
    const newHeight = imgHeight * ratio;
    const x = (canvasWidth - newWidth) / 2;
    const y = (canvasHeight - newHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, newWidth, newHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderImage(Math.round(latest));
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      
      // Re-render current frame on resize
      const currentFrame = Math.round(frameIndex.get());
      renderImage(currentFrame);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  return (
    <div className={cn("relative h-full w-full bg-background", className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover"
        style={{ width: '100%', height: '100%' }}
      />
      
      {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-50">
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300" 
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="mt-4 text-xs font-mono tracking-widest uppercase opacity-50">
              Initializing Experience {loadProgress}%
            </p>
          </div>
        )}
    </div>
  );
}
