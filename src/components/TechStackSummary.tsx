
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Template {
  slug: string;
  frontend: string;
  backend: string;
  authMethod: string;
  gitBranch: string;
  docUrl: string;
  githubUrl: string;
}

interface TechStackSummaryProps {
  selectedTemplate: Template | null;
}

const TechStackSummary = ({ selectedTemplate }: TechStackSummaryProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!selectedTemplate) return;
    
    const command = `git clone --branch ${selectedTemplate.gitBranch} ${selectedTemplate.githubUrl}.git`;
    
    navigator.clipboard.writeText(command)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied to clipboard!",
          description: "You can now paste the command in your terminal.",
        });
        
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Please try again or copy manually.",
          variant: "destructive",
        });
      });
  };

  if (!selectedTemplate) {
    return (
      <Card className="h-full border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
          <div className="mb-4 rounded-full bg-muted p-3">
            <div className="rounded-full bg-muted-foreground/20 p-4">
              <div className="animate-pulse rounded-full bg-muted-foreground/30 h-12 w-12"></div>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-1">Your Stack Summary</h3>
          <p className="text-muted-foreground">
            Follow the steps on the left to configure your perfect authentication stack.
          </p>
        </CardContent>
      </Card>
    );
  }

  const gitCommand = `git clone --branch ${selectedTemplate.gitBranch} ${selectedTemplate.githubUrl}.git`;
  
  return (
    <Card className="h-full shadow-md border-2 border-authbuilders-purple/50 animate-fade-in">
      <CardHeader className="bg-muted border-b">
        <CardTitle className="text-xl">Your Perfect Stack</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4 px-6">
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-authbuilders-purple/10 p-3 rounded-full">
              <div className="w-8 h-8 flex items-center justify-center">
                <FrameworkIcon framework={selectedTemplate.frontend} />
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Frontend Framework</div>
              <div className="font-medium">{selectedTemplate.frontend}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-authbuilders-purple/10 p-3 rounded-full">
              <div className="w-8 h-8 flex items-center justify-center">
                <DatabaseIcon database={selectedTemplate.backend} />
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Backend/Database</div>
              <div className="font-medium">{selectedTemplate.backend}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-authbuilders-purple/10 p-3 rounded-full">
              <div className="w-8 h-8 flex items-center justify-center">
                <AuthIcon authMethod={selectedTemplate.authMethod} />
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Auth Method</div>
              <div className="font-medium">{selectedTemplate.authMethod}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg p-3 font-mono text-xs overflow-auto">
          {gitCommand}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 px-6 pt-0 pb-6">
        <Link to={selectedTemplate.docUrl} className="w-full">
          <Button className="w-full" variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Documentation
          </Button>
        </Link>
        <Button 
          className="w-full bg-authbuilders-purple hover:bg-authbuilders-purple-dark" 
          onClick={copyToClipboard}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy Clone Command
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper components for icons (same as in StackSelector)
const FrameworkIcon = ({ framework }: { framework: string }) => {
  switch (framework.toLowerCase()) {
    case 'next.js':
      return <span className="text-2xl font-bold">N.js</span>;
    case 'vite':
      return <span className="text-2xl font-bold">V</span>;
    case 'vue':
      return <span className="text-2xl font-bold">Vue</span>;
    case 'angular':
      return <span className="text-2xl font-bold">Ng</span>;
    default:
      return <span className="text-2xl font-bold">?</span>;
  }
};

const DatabaseIcon = ({ database }: { database: string }) => {
  switch (database.toLowerCase()) {
    case 'firebase':
      return <span className="text-2xl font-bold">FB</span>;
    case 'supabase':
      return <span className="text-2xl font-bold">SB</span>;
    case 'postgresql':
      return <span className="text-2xl font-bold">PG</span>;
    case 'mongodb':
      return <span className="text-2xl font-bold">MDB</span>;
    default:
      return <span className="text-2xl font-bold">?</span>;
  }
};

const AuthIcon = ({ authMethod }: { authMethod: string }) => {
  switch (authMethod.toLowerCase()) {
    case 'email/password':
      return <span className="text-2xl font-bold">📧</span>;
    case 'social login':
      return <span className="text-2xl font-bold">👤</span>;
    case 'jwt':
      return <span className="text-2xl font-bold">🔑</span>;
    case 'oauth':
      return <span className="text-2xl font-bold">🔄</span>;
    case 'mfa':
      return <span className="text-2xl font-bold">🔒</span>;
    case 'magic link':
      return <span className="text-2xl font-bold">✨</span>;
    default:
      return <span className="text-2xl font-bold">?</span>;
  }
};

export default TechStackSummary;
