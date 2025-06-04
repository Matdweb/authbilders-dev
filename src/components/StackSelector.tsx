import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  SiNextdotjs,
  SiVite,
  SiVuedotjs,
  SiAngular,
  SiFirebase,
  SiSupabase,
  SiPostgresql,
  SiMongodb
} from "react-icons/si";
import {
  MdEmail,
  MdSecurity,
  MdKey,
  MdSync,
  MdLock,
  MdAutoAwesome
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";

interface Template {
  slug: string;
  frontend: string;
  backend: string;
  authMethod: string;
  gitBranch: string;
  docUrl: string;
  githubUrl: string;
}

interface StackSelectorProps {
  templates: Template[];
  onSelect: (template: Template | null) => void;
  selectedTemplate: Template | null;
}

const StackSelector = ({ templates, onSelect, selectedTemplate }: StackSelectorProps) => {
  const [step, setStep] = useState<number>(1);
  const [selectedFrontend, setSelectedFrontend] = useState<string | null>(null);
  const [selectedBackend, setSelectedBackend] = useState<string | null>(null);
  const [selectedAuth, setSelectedAuth] = useState<string | null>(null);

  // Extract unique options from templates
  const frontendOptions = [...new Set(templates.map(t => t.frontend))];
  const backendOptions = [...new Set(templates
    .filter(t => !selectedFrontend || t.frontend === selectedFrontend)
    .map(t => t.backend))];
  const authOptions = [...new Set(templates
    .filter(t =>
      (!selectedFrontend || t.frontend === selectedFrontend) &&
      (!selectedBackend || t.backend === selectedBackend)
    )
    .map(t => t.authMethod))];

  // Reset subsequent selections when earlier selection changes
  useEffect(() => {
    if (selectedFrontend) {
      const backendStillValid = templates.some(
        t => t.frontend === selectedFrontend && t.backend === selectedBackend
      );

      if (!backendStillValid) {
        setSelectedBackend(null);
        setSelectedAuth(null);
      } else if (selectedBackend) {
        const authStillValid = templates.some(
          t => t.frontend === selectedFrontend &&
            t.backend === selectedBackend &&
            t.authMethod === selectedAuth
        );

        if (!authStillValid) {
          setSelectedAuth(null);
        }
      }
    }
  }, [selectedFrontend, selectedBackend, templates]);

  // Find matching template when all selections are made
  useEffect(() => {
    if (selectedFrontend && selectedBackend && selectedAuth) {
      const match = templates.find(
        t => t.frontend === selectedFrontend &&
          t.backend === selectedBackend &&
          t.authMethod === selectedAuth
      );

      onSelect(match || null);
    } else {
      onSelect(null);
    }
  }, [selectedFrontend, selectedBackend, selectedAuth, templates, onSelect]);

  // Reset all selections
  const resetSelections = () => {
    setSelectedFrontend(null);
    setSelectedBackend(null);
    setSelectedAuth(null);
    setStep(1);
    onSelect(null);
  };

  // Navigation between steps
  const goToNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const goToPrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Render different step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <span className="bg-authbuilders-purple text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
                Choose Frontend Framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                value={selectedFrontend || ""}
                onValueChange={(value) => setSelectedFrontend(value)}
              >
                {frontendOptions.map((frontend) => (
                  <label
                    key={frontend}
                    className={`
                      flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer
                      ${selectedFrontend === frontend ? 'border-authbuilders-purple bg-muted' : 'border-border'}
                      hover:border-authbuilders-purple hover:bg-muted/50 transition-colors
                    `}
                  >
                    <RadioGroupItem className="sr-only" value={frontend} id={`frontend-${frontend}`} />
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                      <FrameworkIcon framework={frontend} />
                    </div>
                    <span className="text-center font-medium">{frontend}</span>
                    <div className="min-h-7">
                      {selectedFrontend === frontend && (
                        <Check className="text-authbuilders-purple mt-2 w-5 h-5" />
                      )}
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={resetSelections}>
                  Reset
                </Button>
                <Button
                  onClick={goToNextStep}
                  className="bg-authbuilders-purple hover:bg-authbuilders-purple-dark"
                  disabled={!selectedFrontend}
                >
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </>
        );

      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <span className="bg-authbuilders-purple text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
                Choose Backend/Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                value={selectedBackend || ""}
                onValueChange={(value) => setSelectedBackend(value)}
              >
                {backendOptions.map((backend) => (
                  <label
                    key={backend}
                    className={`
                      flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer
                      ${selectedBackend === backend ? 'border-authbuilders-purple bg-muted' : 'border-border'}
                      hover:border-authbuilders-purple hover:bg-muted/50 transition-colors
                    `}
                  >
                    <RadioGroupItem className="sr-only" value={backend} id={`backend-${backend}`} />
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                      <DatabaseIcon database={backend} />
                    </div>
                    <span className="text-center font-medium">{backend}</span>
                    <div className="min-h-7">
                      {selectedBackend === backend && (
                        <Check className="text-authbuilders-purple mt-2 w-5 h-5" />
                      )}
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={goToPrevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  onClick={goToNextStep}
                  className="bg-authbuilders-purple hover:bg-authbuilders-purple-dark"
                  disabled={!selectedBackend}
                >
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </>
        );

      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <span className="bg-authbuilders-purple text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">3</span>
                Choose Authentication Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                className="grid grid-cols-2 gap-4"
                value={selectedAuth || ""}
                onValueChange={(value) => setSelectedAuth(value)}
              >
                {authOptions.map((auth) => (
                  <label
                    key={auth}
                    className={`
                      flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer
                      ${selectedAuth === auth ? 'border-authbuilders-purple bg-muted' : 'border-border'}
                      hover:border-authbuilders-purple hover:bg-muted/50 transition-colors
                    `}
                  >
                    <RadioGroupItem className="sr-only" value={auth} id={`auth-${auth}`} />
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
                      <AuthIcon authMethod={auth} />
                    </div>
                    <span className="text-center font-medium">{auth}</span>
                    <div className="min-h-7">
                      {selectedAuth === auth && (
                        <Check className="text-authbuilders-purple mt-2 w-5 h-5" />
                      )}
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={goToPrevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  variant="ghost"
                  onClick={resetSelections}
                >
                  Reset All
                </Button>
              </div>
            </CardContent>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="border-2">
      {renderStepContent()}
    </Card>
  );
};

// Helper components for icons using react-icons
const FrameworkIcon = ({ framework }: { framework: string }) => {
  switch (framework.toLowerCase()) {
    case 'next.js':
      return <SiNextdotjs className="w-8 h-8" />;
    case 'vite':
      return <SiVite className="w-8 h-8" />;
    case 'vue':
      return <SiVuedotjs className="w-8 h-8" />;
    case 'angular':
      return <SiAngular className="w-8 h-8" />;
    default:
      return <span className="text-2xl font-bold">?</span>;
  }
};

const DatabaseIcon = ({ database }: { database: string }) => {
  switch (database.toLowerCase()) {
    case 'firebase':
      return <SiFirebase className="w-8 h-8" />;
    case 'supabase':
      return <SiSupabase className="w-8 h-8" />;
    case 'postgresql':
      return <SiPostgresql className="w-8 h-8" />;
    case 'mongodb':
      return <SiMongodb className="w-8 h-8" />;
    default:
      return <span className="text-2xl font-bold">?</span>;
  }
};

const AuthIcon = ({ authMethod }: { authMethod: string }) => {
  switch (authMethod.toLowerCase()) {
    case 'email/password':
      return <MdEmail className="w-8 h-8" />;
    case 'social login':
      return <FaUsers className="w-8 h-8" />;
    case 'jwt':
      return <MdKey className="w-8 h-8" />;
    case 'oauth':
      return <MdSync className="w-8 h-8" />;
    case 'mfa':
      return <MdLock className="w-8 h-8" />;
    case 'magic link':
      return <MdAutoAwesome className="w-8 h-8" />;
    default:
      return <MdSecurity className="w-8 h-8" />;
  }
};

export default StackSelector;
