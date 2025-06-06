
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import Documentation from "./pages/Documentation";
import Templates from "./pages/Templates";
import Guides from "./pages/Guides";
import NotFound from "./pages/NotFound";
import TechStackSelector from "./pages/TechStackSelector";

// Documentation pages
import QuickStart from "./pages/docs/QuickStart";
import ConceptsAuthentication from "./pages/docs/ConceptsAuthentication";
import ConceptsDal from "./pages/docs/ConceptsDal";
import ConceptsAuthorization from "./pages/docs/ConceptsAuthorization";
import ConceptsJwt from "./pages/docs/ConceptsJwt";
import ConceptsSessions from "./pages/docs/ConceptsSessions";
import ConceptsMagicLinks from "./pages/docs/ConceptsMagicLinks";
import ConceptsMfa from "./pages/docs/ConceptsMfa";

const queryClient = new QueryClient();

const App = () => {
  // Initialize theme on app load
  useEffect(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Apply theme class to document
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/docs/quick-start" element={<QuickStart />} />
            <Route path="/docs/concepts/authentication" element={<ConceptsAuthentication />} />
            <Route path="/docs/concepts/dal" element={<ConceptsDal />} />
            <Route path="/docs/concepts/authorization" element={<ConceptsAuthorization />} />
            <Route path="/docs/concepts/sessions" element={<ConceptsSessions />} />
            <Route path="/docs/concepts/magic-links" element={<ConceptsMagicLinks />} />
            <Route path="/docs/concepts/mfa" element={<ConceptsMfa />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/tech-stack-selector" element={<TechStackSelector />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
