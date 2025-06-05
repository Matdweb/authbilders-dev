
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, ExternalLink, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Icon } from "../lib/icons";

interface Template {
  slug: string;
  frontend: string;
  backend: string;
  authMethod: string[];
  gitBranch: string;
  docUrl: string;
  githubUrl: string;
  isInProgress?: boolean;
}

interface TechStackSummaryProps {
  selectedTemplate: Template | null;
  selectedAuthMethods: string[]
}

const TechStackSummary = ({ selectedTemplate, selectedAuthMethods }: TechStackSummaryProps) => {
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

  return (
    <Card className={`h-full shadow-md border-2 animate-fade-in ${selectedTemplate.isInProgress
      ? 'border-orange-400/50 bg-muted/30'
      : 'border-authbuilders-purple/50'
      }`}>
      <CardHeader className="bg-muted border-b">
        <CardTitle className="text-xl flex items-center justify-between">
          Your Perfect Stack
          {selectedTemplate.isInProgress && (
            <Badge variant="secondary" className="bg-orange-400 text-white">
              Coming Soon 🚧
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4 px-6">
        {selectedTemplate.isInProgress && (
          <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">This stack is not yet available, but we're working on it!</span>
            </div>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-authbuilders-purple/10 p-3 rounded-full">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon value={selectedTemplate.frontend} />
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
                <Icon value={selectedTemplate.backend} />
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Backend/Database</div>
              <div className="font-medium">{selectedTemplate.backend}</div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-authbuilders-purple/10 p-3 rounded-full">
              <div className="w-8 h-8 flex items-center justify-center">
                <Icon value={selectedAuthMethods[0]} />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Auth Methods</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedAuthMethods.map((method, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 px-6 pt-0 pb-6">
        <Link to={selectedTemplate.docUrl} className="w-full">
          <Button className="w-full" variant="outline" disabled={selectedTemplate.isInProgress}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View Documentation
          </Button>
        </Link>
        <Button
          className="w-full bg-authbuilders-purple hover:bg-authbuilders-purple-dark"
          onClick={copyToClipboard}
          disabled={selectedTemplate.isInProgress}
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

export default TechStackSummary;
