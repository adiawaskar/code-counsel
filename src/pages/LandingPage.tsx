import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

// Components
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Demo from '@/components/landing/Demo';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP scroll animations
    const ctx = gsap.context(() => {
      // Parallax effect for hero background
      gsap.to(".hero-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Feature cards stagger animation
      gsap.fromTo(".feature-card", 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".features-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Demo section reveal
      gsap.fromTo(".demo-content",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".demo-section",
            start: "top 70%",
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="overflow-hidden">
      <Hero />
      <Features />
      <Demo />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;