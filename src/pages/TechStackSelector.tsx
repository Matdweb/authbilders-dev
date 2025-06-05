
import { useState, useEffect } from "react";
import TerminalSimulator from "@/components/TerminalSimulator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StackSelector from "@/components/StackSelector";
import TechStackSummary from "@/components/TechStackSummary";

// Sample data - this would be replaced with actual data from your backend or props
const templates = [
  {
    slug: 'nextjs-firebase-email',
    frontend: 'Next.js',
    backend: 'Firebase',
    authMethod: ['Email/Password','Google','Github'],
    gitBranch: 'nextjs-firebase-email',
    docUrl: '/docs/templates/nextjs-firebase-email',
    githubUrl: 'https://github.com/authbuilders/templates',
  },
  {
    slug: 'nextjs-supabase-oauth',
    frontend: 'Next.js',
    backend: 'Supabase',
    authMethod: ['OAuth',],
    gitBranch: 'nextjs-supabase-oauth',
    docUrl: '/docs/templates/nextjs-supabase-oauth',
    githubUrl: 'https://github.com/authbuilders/templates',
  },
  {
    slug: 'vite-mongodb-jwt',
    frontend: 'Vite',
    backend: 'MongoDB',
    authMethod: ['JWT',],
    gitBranch: 'vite-mongodb-jwt',
    docUrl: '/docs/templates/vite-mongodb-jwt',
    githubUrl: 'https://github.com/authbuilders/templates',
  },
  {
    slug: 'vue-postgres-mfa',
    frontend: 'Vue',
    backend: 'PostgreSQL',
    authMethod: ['MFA',],
    gitBranch: 'vue-postgres-mfa',
    docUrl: '/docs/templates/vue-postgres-mfa',
    githubUrl: 'https://github.com/authbuilders/templates',
  },
  {
    slug: 'angular-firebase-magic-link',
    frontend: 'Angular',
    backend: 'Firebase',
    authMethod: ['Magic Link',],
    gitBranch: 'angular-firebase-magic',
    docUrl: '/docs/templates/angular-firebase-magic',
    githubUrl: 'https://github.com/authbuilders/templates',
  },
  {
    slug: 'vite-supabase-social',
    frontend: 'Vite',
    backend: 'Supabase',
    authMethod: ['Social Login',],
    gitBranch: 'vite-supabase-social',
    docUrl: '/docs/templates/vite-supabase-social',
    githubUrl: 'https://github.com/authbuilders/templates',
  },
];

const TechStackSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
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
                selectedTemplate={selectedTemplate}
              />
            </div>

            <div className="lg:col-span-1">
              <TechStackSummary
                selectedTemplate={selectedTemplate}
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
