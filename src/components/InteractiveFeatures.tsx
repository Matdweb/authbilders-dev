
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Timer, User, Zap, Lock, Unlock, X, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountDownTimer } from "./CountDownTimer";
import { UserInfo } from "./UserInfo";
import ButtonAPIRequest from "./ButtonAPIRequest";

interface SessionData {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    email_verified: boolean;
  };
  expires: number;
}

const defaultSession: SessionData = {
  user: {
    id: "iu235rti2843658972",
    name: "John Doe",
    email: "john@example.com",
    image: "https://github.com/shadcn.png",
    email_verified: false
  },
  expires: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
};

const InteractiveFeatures = () => {
  const [sessionJson, setSessionJson] = useState(JSON.stringify(defaultSession, null, 2));
  const [session, setSession] = useState<SessionData>(defaultSession);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isValidJson, setIsValidJson] = useState(true);
  const [activeTab, setActiveTab] = useState("timer");
  const [isLoading, setIsLoading] = useState(false);
  const [showApiResponse, setShowApiResponse] = useState(false);

  // Update session when JSON changes
  useEffect(() => {
    try {
      const parsed = JSON.parse(sessionJson);
      setSession(parsed);
      setIsValidJson(true);
    } catch (error) {
      setIsValidJson(false);
    }
  }, [sessionJson]);


  const handleApiRequest = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowApiResponse(true);
  };

  const renderErrorState = () => (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <div className="text-center">
        <h3 className="text-lg font-semibold text-destructive">Invalid JSON</h3>
        <p className="text-sm text-muted-foreground">Oops! Couldn't parse session data.</p>
      </div>
    </div>
  );

  const renderTimerTab = () => {
    if (!isValidJson) return renderErrorState();

    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <CountDownTimer session={session} isAuthenticated={isAuthenticated} />
      </div>
    );
  };

  const renderSessionTab = () => {
    if (!isValidJson) return renderErrorState();

    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <UserInfo
          session={session}
          setSession={setSession}
          isAuthenticated={isAuthenticated}
          sessionJson={sessionJson}
          setSessionJson={setSessionJson}
        />
      </div>
    );
  };

  const renderApiTab = () => {
    if (!isValidJson) return renderErrorState();

    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6 relative">
        <ButtonAPIRequest
          session={session}
          isAuthenticated={isAuthenticated}
        />
      </div>
    );
  };

  return (
    <section className="py-16 bg-primary/10 dark:bg-secondary/60">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Main Features
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            We provide your templates with built-in and open-source components to help you on your development process.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Feature Preview */}
          <Card className={cn(
            "border-2 transition-colors max-h-[495px]",
            isAuthenticated ? "border-green-500/50" : "border-red-500/50"
          )}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Live Demo</CardTitle>
                <div className="flex items-center space-x-2">
                  {isAuthenticated ? (
                    <Lock className="h-4 w-4 text-green-500" />
                  ) : (
                    <Unlock className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {isAuthenticated ? "Authenticated" : "Unauthenticated"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="timer" className="flex items-center space-x-2">
                    <Timer className="h-4 w-4" />
                    <span>Timer</span>
                  </TabsTrigger>
                  <TabsTrigger value="session" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Session</span>
                  </TabsTrigger>
                  <TabsTrigger value="api" className="flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>API Test</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="timer" className="mt-6">
                  {renderTimerTab()}
                </TabsContent>

                <TabsContent value="session" className="mt-6">
                  {renderSessionTab()}
                </TabsContent>

                <TabsContent value="api" className="mt-6">
                  {renderApiTab()}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Right Column - Session Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Session Data Editor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Session JSON</label>
                <Textarea
                  value={sessionJson}
                  onChange={(e) => setSessionJson(e.target.value)}
                  className={cn(
                    "font-mono text-sm min-h-[300px]",
                    !isValidJson && "border-red-500"
                  )}
                  placeholder="Enter session JSON..."
                />
                {!isValidJson && (
                  <p className="text-sm text-red-500 mt-1">Invalid JSON format</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAuthenticated(!isAuthenticated)}
                    className={cn(
                      "flex items-center space-x-2",
                      isAuthenticated ? "text-green-600 border-green-600" : "text-red-600 border-red-600"
                    )}
                  >
                    {isAuthenticated ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Unlock className="h-4 w-4" />
                    )}
                    <span>{isAuthenticated ? "Authenticated" : "Unauthenticated"}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeatures;
