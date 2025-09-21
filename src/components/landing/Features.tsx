import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Languages, Video, BarChart3, Brain, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: 'Document Analysis',
      description: 'AI-powered analysis that highlights key clauses, risks, and opportunities in your legal documents.',
      color: 'text-primary'
    },
    {
      icon: Languages,
      title: 'Plain Language Translation',
      description: 'Convert complex legal jargon into clear, understandable language that anyone can comprehend.',
      color: 'text-accent'
    },
    {
      icon: Video,
      title: 'AI Legal Consultation',
      description: 'Get real-time explanations and advice through interactive video calls with our AI assistant.',
      color: 'text-success'
    },
    {
      icon: BarChart3,
      title: 'Workflow Visualization',
      description: 'Interactive flowcharts showing contract obligations, deadlines, and potential outcomes.',
      color: 'text-warning'
    },
    {
      icon: Brain,
      title: 'Smart Insights',
      description: 'Machine learning algorithms identify patterns and provide predictive analysis for better decisions.',
      color: 'text-purple-500'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with full compliance to legal industry standards and regulations.',
      color: 'text-primary'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="features-section py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful AI-Driven
            <span className="gradient-text block">Legal Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your legal workflow with cutting-edge AI technology designed for modern legal professionals
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="feature-card group"
              >
                <Card className="card-glass h-full hover-lift hover-glow transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-background to-muted mb-6 ${feature.color}`}
                    >
                      <Icon className="h-8 w-8" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
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
                Ready to Transform Your Legal Workflow?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of legal professionals who trust our AI-powered platform for better, 
                faster, and more accurate legal document analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-hero text-primary-foreground rounded-lg font-semibold shadow-glow hover:shadow-accent transition-all duration-300"
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-border rounded-lg font-semibold hover:bg-accent/50 transition-all duration-300"
                >
                  Schedule Demo
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;