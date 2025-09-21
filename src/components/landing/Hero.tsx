import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Sparkles, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated text reveal
      gsap.fromTo(titleRef.current?.children || [], 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.5
        }
      );


    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="hero-bg absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-floating" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-floating" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-10 p-6"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-glow">
              <Scale className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold gradient-text">LegalAI</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cases" className="text-muted-foreground hover:text-foreground transition-colors">Cases</Link>
            <Link to="/upload" className="text-muted-foreground hover:text-foreground transition-colors">Upload</Link>
            <Button variant="outline" size="sm" className="glass">Sign In</Button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="floating-element mb-6"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent-dark text-sm font-medium">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Legal Analysis
          </div>
        </motion.div>

        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <div className="overflow-hidden">
            <div>Transform Legal</div>
          </div>
          <div className="overflow-hidden">
            <div className="gradient-text">Documents Into</div>
          </div>
          <div className="overflow-hidden">
            <div>Clear Insights</div>
          </div>
        </h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Experience the future of legal document analysis with AI-powered insights, 
          real-time translation, and expert consultation—all in one professional platform.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link to="/upload">
            <Button size="lg" className="group bg-gradient-hero hover:shadow-glow transition-all duration-300">
              Start Analysis
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="group glass">
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="floating-element relative max-w-4xl mx-auto"
        >
          <div className="card-glass rounded-2xl p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="h-4 bg-primary/20 rounded animate-pulse" />
                <div className="h-3 bg-muted rounded w-3/4 animate-pulse" style={{ animationDelay: '0.1s' }} />
                <div className="h-3 bg-muted rounded w-1/2 animate-pulse" style={{ animationDelay: '0.2s' }} />
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-accent/20 rounded animate-pulse" style={{ animationDelay: '0.3s' }} />
                <div className="h-3 bg-muted rounded w-2/3 animate-pulse" style={{ animationDelay: '0.4s' }} />
                <div className="h-3 bg-muted rounded w-3/4 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-success/20 rounded animate-pulse" style={{ animationDelay: '0.6s' }} />
                <div className="h-3 bg-muted rounded w-1/2 animate-pulse" style={{ animationDelay: '0.7s' }} />
                <div className="h-3 bg-muted rounded w-2/3 animate-pulse" style={{ animationDelay: '0.8s' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;