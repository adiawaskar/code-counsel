import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, FileText, Download, Copy, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const DocumentTranslation = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: 'plain-english', label: 'Plain English' },
    { code: 'spanish', label: 'Spanish' },
    { code: 'french', label: 'French' },
    { code: 'german', label: 'German' },
    { code: 'italian', label: 'Italian' },
    { code: 'portuguese', label: 'Portuguese' },
    { code: 'chinese', label: 'Chinese (Simplified)' },
    { code: 'japanese', label: 'Japanese' },
  ];

  const sampleLegalText = `
WHEREAS, the parties desire to enter into this Agreement to define and set forth the terms and conditions of their mutual agreement regarding the provision of services;

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:

1. SERVICES: The Service Provider agrees to perform the services described in Exhibit A attached hereto and incorporated herein by reference (the "Services").

2. COMPENSATION: In consideration for the Services, the Client shall pay the Service Provider the fees set forth in Exhibit B attached hereto and incorporated herein by reference.

3. TERM: This Agreement shall commence on the Effective Date and shall continue until terminated in accordance with the provisions hereof.
  `;

  const handleTranslate = async () => {
    if (!originalText.trim() || !selectedLanguage) {
      toast({
        title: "Missing Information",
        description: "Please enter text and select a target language.",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);

    // Simulate translation API call
    setTimeout(() => {
      let translated = '';
      
      if (selectedLanguage === 'plain-english') {
        translated = `
SIMPLE TRANSLATION:

Since both parties want to work together, they're making this agreement to clearly explain what each person will do:

1. WHAT WORK WILL BE DONE: The service provider will do the specific work listed in the attached document called "Exhibit A."

2. HOW MUCH WILL BE PAID: The client will pay the service provider the amounts shown in the attached document called "Exhibit B."

3. HOW LONG THIS LASTS: This agreement starts on the date both parties sign it and continues until someone ends it according to the rules in this agreement.

KEY POINTS TO UNDERSTAND:
- This is a business agreement between two parties
- One party will provide services, the other will pay for them
- The specific details of work and payment are in separate attached documents
- Either party can end the agreement following the termination rules
        `;
      } else {
        translated = `[Translated content would appear here in ${languages.find(l => l.code === selectedLanguage)?.label}]`;
      }
      
      setTranslatedText(translated);
      setIsTranslating(false);
      
      toast({
        title: "Translation Complete",
        description: "Your document has been successfully translated.",
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to your clipboard.",
    });
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
          <h1 className="text-4xl font-bold mb-2">Document Translation</h1>
          <p className="text-muted-foreground text-lg">
            Transform legal jargon into clear, understandable language
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Translation Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  Target Language
                </label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select translation language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleTranslate}
                disabled={isTranslating || !originalText.trim() || !selectedLanguage}
                className="bg-gradient-hero hover:shadow-glow"
              >
                {isTranslating ? 'Translating...' : 'Translate'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Translation Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Original Text */}
          <Card className="card-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Original Document
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOriginalText(sampleLegalText)}
                >
                  Load Sample
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your legal document text here..."
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground">
                  {originalText.length} characters
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(originalText)}
                  disabled={!originalText.trim()}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Translated Text */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Translated Text
                {selectedLanguage && (
                  <span className="text-sm font-normal text-muted-foreground">
                    ({languages.find(l => l.code === selectedLanguage)?.label})
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isTranslating ? (
                <div className="min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-muted-foreground">
                      Translating your document...
                    </p>
                  </div>
                </div>
              ) : translatedText ? (
                <>
                  <div className="bg-accent/10 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap min-h-[400px]">
                    {translatedText}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-muted-foreground">
                      Translation complete
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(translatedText)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="min-h-[400px] flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <Languages className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Translated text will appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <Languages className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Multiple Languages</h3>
              <p className="text-sm text-muted-foreground">
                Translate to 8+ languages including plain English
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <FileText className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Legal Context</h3>
              <p className="text-sm text-muted-foreground">
                Maintains legal accuracy while improving clarity
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Download className="h-8 w-8 text-success mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Export Options</h3>
              <p className="text-sm text-muted-foreground">
                Download in multiple formats for easy sharing
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DocumentTranslation;