import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { FileText, AlertTriangle, CheckCircle, Info, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Annotation {
  id: string;
  type: 'warning' | 'info' | 'critical';
  text: string;
  explanation: string;
  startIndex: number;
  endIndex: number;
}

const DocumentViewer = () => {
  const { id } = useParams();
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null);

  // Mock document content
  const documentContent = `
    EMPLOYMENT AGREEMENT

    This Employment Agreement ("Agreement") is entered into on [DATE], between [COMPANY NAME], 
    a corporation organized under the laws of [STATE] ("Company"), and [EMPLOYEE NAME] ("Employee").

    1. EMPLOYMENT RELATIONSHIP
    Employee agrees to work exclusively for Company during the term of this Agreement. Employee 
    shall not engage in any other business activity that competes with Company's business.

    2. COMPENSATION
    Company shall pay Employee a base salary of $[AMOUNT] per year, payable in accordance with 
    Company's standard payroll practices. Employee shall be eligible for performance-based bonuses 
    at the sole discretion of Company.

    3. TERMINATION
    This Agreement may be terminated by either party with or without cause upon thirty (30) days 
    written notice. Upon termination, Employee shall return all Company property and confidential 
    information.

    4. NON-COMPETE CLAUSE
    Employee agrees that for a period of two (2) years following termination of employment, 
    Employee shall not directly or indirectly compete with Company within a 50-mile radius 
    of Company's principal place of business.

    5. CONFIDENTIALITY
    Employee acknowledges that during employment, Employee may have access to confidential 
    information. Employee agrees to maintain the confidentiality of such information both 
    during and after employment.
  `;

  // Mock annotations
  const annotations: Annotation[] = [
    {
      id: '1',
      type: 'warning',
      text: 'work exclusively for Company',
      explanation: 'This clause prevents you from having any side jobs or freelance work. Consider negotiating for specific exceptions.',
      startIndex: 350,
      endIndex: 375
    },
    {
      id: '2',
      type: 'critical',
      text: 'with or without cause',
      explanation: 'This means you can be fired for any reason or no reason at all. This provides very little job security.',
      startIndex: 680,
      endIndex: 700
    },
    {
      id: '3',
      type: 'warning',
      text: 'two (2) years following termination',
      explanation: 'A 2-year non-compete period is quite long and may limit your future employment opportunities significantly.',
      startIndex: 850,
      endIndex: 885
    },
    {
      id: '4',
      type: 'info',
      text: 'performance-based bonuses at the sole discretion',
      explanation: 'This means bonuses are not guaranteed and the company has complete control over whether you receive them.',
      startIndex: 550,
      endIndex: 595
    }
  ];

  const getAnnotationColor = (type: Annotation['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-destructive/20 border-destructive';
      case 'warning':
        return 'bg-warning/20 border-warning';
      case 'info':
        return 'bg-accent/20 border-accent';
      default:
        return 'bg-muted/20 border-muted';
    }
  };

  const getAnnotationIcon = (type: Annotation['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'info':
        return <Info className="h-4 w-4 text-accent" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const renderAnnotatedText = (text: string) => {
    let lastIndex = 0;
    const elements: JSX.Element[] = [];

    annotations.forEach((annotation, index) => {
      // Add text before annotation
      if (lastIndex < annotation.startIndex) {
        elements.push(
          <span key={`text-${index}`}>
            {text.slice(lastIndex, annotation.startIndex)}
          </span>
        );
      }

      // Add annotated text
      elements.push(
        <TooltipProvider key={`annotation-${annotation.id}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={`cursor-pointer px-1 py-0.5 rounded-sm border-2 transition-all duration-200 hover:scale-105 ${getAnnotationColor(annotation.type)}`}
                onClick={() => setSelectedAnnotation(annotation)}
              >
                {text.slice(annotation.startIndex, annotation.endIndex)}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="font-medium">{annotation.type.toUpperCase()}</p>
              <p className="text-sm">{annotation.explanation}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      lastIndex = annotation.endIndex;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(
        <span key="text-end">
          {text.slice(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Document Analysis</h1>
          <p className="text-muted-foreground text-lg">
            Employment Agreement - Document ID: {id}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Content */}
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                    {renderAnnotatedText(documentContent)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Annotations Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Critical Issues</span>
                    <Badge variant="destructive">1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Warnings</span>
                    <Badge className="bg-warning text-warning-foreground">2</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Information</span>
                    <Badge variant="secondary">1</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Annotations List */}
            <Card>
              <CardHeader>
                <CardTitle>Annotations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {annotations.map((annotation) => (
                    <motion.div
                      key={annotation.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105 ${
                        selectedAnnotation?.id === annotation.id 
                          ? 'ring-2 ring-primary' 
                          : getAnnotationColor(annotation.type)
                      }`}
                      onClick={() => setSelectedAnnotation(annotation)}
                    >
                      <div className="flex items-start gap-2">
                        {getAnnotationIcon(annotation.type)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            "{annotation.text}"
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {annotation.explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Ask AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-hero hover:shadow-glow">
                  Start AI Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentViewer;