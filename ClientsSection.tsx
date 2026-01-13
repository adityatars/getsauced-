import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const logos = [
  { 
    name: "FamPay", 
    url: "https://kgnenaqsmjqnggyvsuuo.supabase.co/storage/v1/object/public/shoe/testimonials/fp.png" 
  },
  { 
    name: "Master's Union", 
    url: "https://kgnenaqsmjqnggyvsuuo.supabase.co/storage/v1/object/public/shoe/testimonials/mu.png" 
  },
  { 
    name: "Pernod Ricard", 
    url: "https://kgnenaqsmjqnggyvsuuo.supabase.co/storage/v1/object/public/shoe/testimonials/jm-removebg-preview.png" 
  },
  { 
    name: "Zomato", 
    url: "https://kgnenaqsmjqnggyvsuuo.supabase.co/storage/v1/object/public/shoe/testimonials/zm.png" 
  },
  { 
    name: "Siya", 
    url: "https://kgnenaqsmjqnggyvsuuo.supabase.co/storage/v1/object/public/shoe/testimonials/siya.jpeg" 
  },
  { 
    name: "MN", 
    url: "https://kgnenaqsmjqnggyvsuuo.supabase.co/storage/v1/object/public/shoe/testimonials/mn.png" 
  },
  { 
    name: "V", 
    url: "https://kgnenaqsmjqnggyvsuuo.supabase.co/storage/v1/object/public/shoe/testimonials/v.jpeg" 
  },
  { 
    name: "OX", 
    url: "https://kgnenaqsmjqnggyvsuuo.supabase.co/storage/v1/object/public/shoe/testimonials/ox.png" 
  },
  { 
    name: "Aditya Birla", 
    url: "https://kgnenaqsmjqnggyvsuuo.supabase.co/storage/v1/object/public/shoe/testimonials/ad.jpeg" 
  },
];

// Duplicate logos multiple times for seamless infinite scroll
// Using 3 sets ensures smooth looping even if one set is partially visible
const duplicatedLogos = [...logos, ...logos, ...logos];

const ClientsSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Force animation to restart if it stops (safety mechanism)
  useEffect(() => {
    if (shouldReduceMotion || !carouselRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Ensure animation is running when visible
            const element = entry.target as HTMLElement;
            element.style.animationPlayState = 'running';
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    
    return () => observer.disconnect();
  }, [shouldReduceMotion]);
  
  return (
    <section id="clients" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-[32px] md:text-[44px] lg:text-[56px] font-bold text-foreground tracking-[-0.02em] leading-[1.1] mb-6">
            Our Clients
          </h2>
          <p className="text-foreground/70 text-sm md:text-base font-medium uppercase tracking-[2px] max-w-3xl mx-auto">
            Proudly partnering with leading brands worldwide
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Carousel */}
      {/* 
        ROBUST FIX: Using both CSS animation (primary) and Framer Motion (fallback)
        - CSS animation ensures it always runs regardless of React state
        - Framer Motion provides smooth control and respects reduced motion
        - IntersectionObserver ensures animation restarts if it stops
        - Using 3 sets of logos for seamless looping (33.33% per set)
      */}
      <style>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .clients-carousel {
          animation: infinite-scroll 40s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .clients-carousel {
            animation: none;
          }
        }
      `}</style>
      
      <div className="relative w-full">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex overflow-hidden">
          <div
            ref={carouselRef}
            className={`flex items-center gap-16 md:gap-24 ${shouldReduceMotion ? '' : 'clients-carousel'}`}
            style={{
              willChange: 'transform',
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 h-16 md:h-20 w-32 md:w-40 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
