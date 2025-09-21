import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Corporate Lawyer',
      company: 'TechLegal Partners',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      quote: 'LegalAI has revolutionized how we handle contract reviews. What used to take hours now takes minutes, and the insights are incredibly accurate.',
      featured: true
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'General Counsel',
      company: 'StartupCorp',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      quote: 'The plain language translation feature is a game-changer. Our clients finally understand their contracts without needing a law degree.'
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Legal Operations Manager',
      company: 'Enterprise Solutions',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      quote: 'The AI consultation feature feels like having a senior partner available 24/7. It has significantly improved our response times.'
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Contract Specialist',
      company: 'LegalTech Innovations',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      quote: 'Workflow visualization helps us track deadlines and obligations effortlessly. Our compliance rate has improved by 40%.'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Legal Director',
      company: 'Global Enterprises',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      quote: 'Security was our biggest concern, but LegalAI exceeds all compliance requirements. We can trust it with our most sensitive documents.'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Senior Associate',
      company: 'Wilson & Associates',
      avatar: '/api/placeholder/60/60',
      rating: 5,
      quote: 'The document analysis catches risks we might have missed. It has become an essential part of our due diligence process.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-warning fill-warning' : 'text-muted'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by Legal
            <span className="gradient-text block">Professionals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of legal professionals who rely on LegalAI for faster, 
            more accurate document analysis and consultation
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 mb-16 opacity-60"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">99.9%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">10,000+</div>
            <div className="text-sm text-muted-foreground">Documents Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Law Firms</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className={`group ${testimonial.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <Card className={`h-full hover-lift transition-all duration-300 group-hover:shadow-glow ${
                testimonial.featured ? 'ring-2 ring-primary/20 bg-gradient-to-br from-card to-primary/5' : 'card-glass'
              }`}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <Quote className="h-8 w-8 text-primary/30 flex-shrink-0 mt-1" />
                    <p className={`text-muted-foreground leading-relaxed ${
                      testimonial.featured ? 'text-lg' : ''
                    }`}>
                      "{testimonial.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Card className="card-elevated max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">
                Join the Legal AI Revolution
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Don't let complex legal documents slow you down. Experience the future of legal analysis today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-hero text-primary-foreground rounded-lg font-semibold shadow-glow hover:shadow-accent transition-all duration-300"
                >
                  Start Your Free Trial
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent/50 transition-all duration-300"
                >
                  Contact Sales
                </motion.button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;