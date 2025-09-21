import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, FileText, MessageSquare, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Demo = () => {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    {
      id: 'analysis',
      title: 'Document Analysis',
      description: 'See how our AI instantly analyzes and highlights critical clauses in legal documents',
      icon: FileText,
      preview: (
        <div className="space-y-4">
          <div className="bg-card rounded-lg p-4 border">
            <div className="space-y-2">
              <div className="h-3 bg-primary/20 rounded w-3/4" />
              <div className="h-2 bg-muted rounded w-full" />
              <div className="h-2 bg-muted rounded w-2/3" />
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-warning/20 text-warning border-warning">Warning</Badge>
            <Badge className="bg-destructive/20 text-destructive border-destructive">Critical</Badge>
            <Badge className="bg-accent/20 text-accent border-accent">Info</Badge>
          </div>
        </div>
      )
    },
    {
      id: 'translation',
      title: 'Plain Language Translation',
      description: 'Transform complex legal jargon into clear, understandable language',
      icon: MessageSquare,
      preview: (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Legal Text</h4>
            <div className="bg-muted/50 p-3 rounded text-xs">
              "Whereas the party of the first part..."
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Plain English</h4>
            <div className="bg-accent/10 p-3 rounded text-xs">
              "Since both companies agree..."
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'workflow',
      title: 'Workflow Visualization',
      description: 'Interactive flowcharts showing contract obligations and deadlines',
      icon: BarChart3,
      preview: (
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="w-16 h-16 rounded-full bg-success/20 border-2 border-success flex items-center justify-center">
              <div className="w-2 h-2 bg-success rounded-full" />
            </div>
            <div className="flex-1 h-0.5 bg-muted" />
            <div className="w-16 h-16 rounded-full bg-warning/20 border-2 border-warning flex items-center justify-center">
              <div className="w-2 h-2 bg-warning rounded-full" />
            </div>
            <div className="flex-1 h-0.5 bg-muted" />
            <div className="w-16 h-16 rounded-full bg-muted/20 border-2 border-muted flex items-center justify-center">
              <div className="w-2 h-2 bg-muted rounded-full" />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Signed</span>
            <span>Review</span>
            <span>Expire</span>
          </div>
        </div>
      )
    }
  ];

  const nextDemo = () => {
    setActiveDemo((prev) => (prev + 1) % demos.length);
  };

  const prevDemo = () => {
    setActiveDemo((prev) => (prev - 1 + demos.length) % demos.length);
  };

  return (
    <section className="demo-section py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See LegalAI
            <span className="gradient-text block">In Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the power of AI-driven legal analysis through our interactive demonstrations
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Demo Selector */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="lg:w-1/3 space-y-4">
              {demos.map((demo, index) => {
                const Icon = demo.icon;
                return (
                  <motion.div
                    key={demo.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 ${
                        activeDemo === index 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:bg-accent/50'
                      }`}
                      onClick={() => setActiveDemo(index)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${
                            activeDemo === index 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{demo.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {demo.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Demo Preview */}
            <div className="lg:w-2/3">
              <Card className="card-elevated">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">
                      {demos[activeDemo].title}
                    </h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={prevDemo}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={nextDemo}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeDemo}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="demo-content"
                    >
                      {demos[activeDemo].preview}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button className="bg-gradient-hero hover:shadow-glow">
                      <Play className="h-4 w-4 mr-2" />
                      Try Interactive Demo
                    </Button>
                    <Button variant="outline">
                      Watch Full Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Demo Navigation */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              {demos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDemo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeDemo === index 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;