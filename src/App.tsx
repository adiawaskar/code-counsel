import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import DocumentUpload from "./pages/DocumentUpload";
import DocumentViewer from "./pages/DocumentViewer";
import DocumentTranslation from "./pages/DocumentTranslation";
import VideoCall from "./pages/VideoCall";
import WorkflowVisualization from "./pages/WorkflowVisualization";
import CaseTracker from "./pages/CaseTracker";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/layout/Navbar";

const queryClient = new QueryClient();

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background">
      {!isLandingPage && <Navbar />}
      <PageTransition>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<DocumentUpload />} />
          <Route path="/document/:id" element={<DocumentViewer />} />
          <Route path="/translate" element={<DocumentTranslation />} />
          <Route path="/call" element={<VideoCall />} />
          <Route path="/workflow" element={<WorkflowVisualization />} />
          <Route path="/cases" element={<CaseTracker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;