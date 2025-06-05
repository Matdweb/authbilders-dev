
import { useState, useEffect } from "react";
import TerminalSimulator from "@/components/TerminalSimulator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StackSelector from "@/components/StackSelector";
import TechStackSummary from "@/components/TechStackSummary";
import { templates } from "@/lib/templates";

const TechStackSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedAuthMethods, setSelectedAuthMethods] = useState<string[]>([]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10 pt-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Auth Stack</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select your preferred tech stack and authentication method to get started with AuthBuilders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <StackSelector
                templates={templates}
                onSelect={setSelectedTemplate}
                selectedAuthMethods={selectedAuthMethods}
                setSelectedAuthMethods={setSelectedAuthMethods}
              />
            </div>

            <div className="lg:col-span-1">
              <TechStackSummary
                selectedTemplate={selectedTemplate}
                selectedAuthMethods={selectedAuthMethods}
              />
            </div>

            <div className="lg:col-span-2">
              {selectedTemplate &&
                (
                  <TerminalSimulator
                    gitBranch={selectedTemplate.gitBranch}
                    githubUrl={selectedTemplate.githubUrl}
                  />
                )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TechStackSelector;
