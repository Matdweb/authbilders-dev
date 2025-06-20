
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

// --Concepts
import Installation from "./pages/docs/Installation";
import QuickStart from "./pages/docs/QuickStart";
import ConceptsAuthentication from "./pages/docs/concepts/ConceptsAuthentication";
import ConceptsDal from "./pages/docs/concepts/ConceptsDal";
import ConceptsAuthorization from "./pages/docs/concepts/ConceptsAuthorization";
import ConceptsJwt from "./pages/docs/concepts/ConceptsJwt";
import ConceptsSessions from "./pages/docs/concepts/ConceptsSessions";
import ConceptsMagicLinks from "./pages/docs/concepts/ConceptsMagicLinks";
import ConceptsMfa from "./pages/docs/concepts/ConceptsMfa";

// --Templates
import Nextjs_jwt from "./pages/docs/templates/Nextjs_jwt"
import Nextjs_NextAuth from "./pages/docs/templates/Nextjs_NextAuth";

// --Services
import ServiceResendDoc from "./pages/docs/integrations/ServiceResend";

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
            <Route path="/docs/installation" element={<Installation />} />
            <Route path="/docs/quick-start" element={<QuickStart />} />
            {/* concepts */}
            <Route path="/docs/concepts/authentication" element={<ConceptsAuthentication />} />
            <Route path="/docs/concepts/dal" element={<ConceptsDal />} />
            <Route path="/docs/concepts/authorization" element={<ConceptsAuthorization />} />
            <Route path="/docs/concepts/jwt" element={<ConceptsJwt />} />
            <Route path="/docs/concepts/sessions" element={<ConceptsSessions />} />
            <Route path="/docs/concepts/magic-links" element={<ConceptsMagicLinks />} />
            <Route path="/docs/concepts/mfa" element={<ConceptsMfa />} />
            {/* templates */}
            <Route path="/docs/templates/nextjs-jwt" element={<Nextjs_jwt />} />
            <Route path="/docs/templates/nextjs-nextauth" element={<Nextjs_NextAuth />} />

            {/* integrations */}
            <Route path="/docs/integrations/resend" element={<ServiceResendDoc />} />

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
