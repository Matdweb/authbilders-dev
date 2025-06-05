
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
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

interface StackSelectorProps {
  templates: Template[];
  onSelect: (template: Template | null) => void;
  selectedAuthMethods: string[];
  setSelectedAuthMethods: React.Dispatch<React.SetStateAction<string[]>>

}

const StackSelector = ({ templates, onSelect, selectedAuthMethods, setSelectedAuthMethods }: StackSelectorProps) => {
  const [step, setStep] = useState<number>(1);
  const [selectedFrontend, setSelectedFrontend] = useState<string | null>(null);
  const [selectedBackend, setSelectedBackend] = useState<string | null>(null);

  const frontendOptions = [...new Set(templates.map(t => t.frontend))];
  const backendOptions = [...new Set(templates
    .filter(t => !selectedFrontend || t.frontend === selectedFrontend)
    .map(t => t.backend))];
  const authOptions = [...new Set(templates
    .filter(t =>
      (!selectedFrontend || t.frontend === selectedFrontend) &&
      (!selectedBackend || t.backend === selectedBackend)
    )
    .flatMap(t => t.authMethod))];

  useEffect(() => {
    if (selectedFrontend) {
      const backendStillValid = templates.some(
        t => t.frontend === selectedFrontend && t.backend === selectedBackend
      );

      if (!backendStillValid) {
        setSelectedBackend(null);
        setSelectedAuthMethods([]);
      } else if (selectedBackend) {
        const validAuthMethods = selectedAuthMethods.filter(auth =>
          templates.some(
            t => t.frontend === selectedFrontend &&
              t.backend === selectedBackend &&
              t.authMethod.includes(auth)
          )
        );
        setSelectedAuthMethods(validAuthMethods);
      }
    }
  }, [selectedFrontend, selectedBackend, templates]);

  useEffect(() => {
    if (selectedFrontend && selectedBackend && selectedAuthMethods.length > 0) {
      // Find best matching template - prioritize non-progress templates
      const matches = templates.filter(
        t => t.frontend === selectedFrontend &&
          t.backend === selectedBackend &&
          selectedAuthMethods.every(auth => t.authMethod.includes(auth))
      );

      // Sort by non-progress first, then by number of matching auth methods
      const bestMatch = matches.sort((a, b) => {
        if (a.isInProgress && !b.isInProgress) return 1;
        if (!a.isInProgress && b.isInProgress) return -1;
        return b.authMethod.length - a.authMethod.length;
      })[0];

      onSelect(bestMatch || null);
    } else {
      onSelect(null);
    }
  }, [selectedFrontend, selectedBackend, selectedAuthMethods, templates, onSelect]);

  const resetSelections = () => {
    setSelectedFrontend(null);
    setSelectedBackend(null);
    setSelectedAuthMethods([]);
    setStep(1);
    onSelect(null);
  };

  const goToNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const goToPrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAuthMethodToggle = (authMethod: string) => {
    setSelectedAuthMethods(prev =>
      prev.includes(authMethod) ?
        prev.length == 1 ? [...prev] :
          prev.filter(method => method !== authMethod)
        : [...prev, authMethod]
    );
  };

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
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 h-72"
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
                      <Icon value={frontend} />
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
                <Button variant="ghost" onClick={resetSelections}>Reset</Button>
                <Button onClick={goToNextStep} className="bg-authbuilders-purple hover:bg-authbuilders-purple-dark" disabled={!selectedFrontend}>
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
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 h-72"
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
                      <Icon value={backend} />
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
                <Button onClick={goToNextStep} className="bg-authbuilders-purple hover:bg-authbuilders-purple-dark" disabled={!selectedBackend}>
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
                Choose Authentication Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 h-72 overflow-y-auto">
                {authOptions.map((auth) => {
                  const isSelected = selectedAuthMethods.includes(auth);
                  const hasInProgressTemplate = templates.some(
                    t => t.frontend === selectedFrontend &&
                      t.backend === selectedBackend &&
                      t.authMethod.includes(auth) &&
                      t.isInProgress
                  );

                  return (
                    <div
                      key={auth}
                      className={`
                        relative flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${isSelected ? 'border-authbuilders-purple bg-muted ring-2 ring-authbuilders-purple/20' : 'border-border'}
                        ${hasInProgressTemplate && !isSelected ? 'opacity-50 pointer-events-none' : ''}
                        hover:border-authbuilders-purple hover:bg-muted/50
                      `}
                      onClick={() => !hasInProgressTemplate && handleAuthMethodToggle(auth)}
                    >
                      {hasInProgressTemplate && (
                        <div className="absolute top-1 right-1 text-xs bg-orange-400 text-white px-2 py-0.5 rounded">
                          Coming Soon 🚧
                        </div>
                      )}

                      <div className="flex items-center mb-2">
                        <Checkbox
                          checked={isSelected}
                          disabled={hasInProgressTemplate}
                          className="mr-2 hidden"
                          onCheckedChange={() => !hasInProgressTemplate && handleAuthMethodToggle(auth)}
                        />
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <Icon value={auth} />
                        </div>
                      </div>

                      <span className="text-center font-medium text-sm">{auth}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={goToPrevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button variant="ghost" onClick={resetSelections}>Reset All</Button>
              </div>
            </CardContent>
          </>
        );
      default:
        return null;
    }
  };

  return <Card className="border-2 min-h-full">{renderStepContent()}</Card>;
};

export default StackSelector;
