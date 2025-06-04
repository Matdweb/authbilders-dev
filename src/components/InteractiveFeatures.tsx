
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Timer, User, Zap, Lock, Unlock, X, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
    id: "abc123",
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
  const [timeLeft, setTimeLeft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showApiResponse, setShowApiResponse] = useState(false);
  const [showUserTooltip, setShowUserTooltip] = useState(false);

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

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = session.expires - now;

      if (remaining <= 0) {
        setTimeLeft("00:00:00");
      } else {
        const hours = Math.floor(remaining / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        const seconds = remaining % 60;
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session.expires]);

  const handleApiRequest = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowApiResponse(true);
  };

  const handleSendVerification = () => {
    const updatedSession = {
      ...session,
      user: { ...session.user, email_verified: true }
    };
    setSession(updatedSession);
    setSessionJson(JSON.stringify(updatedSession, null, 2));
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
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Session Expires In</h3>
          <div className="font-mono text-4xl font-bold bg-slate-900 text-green-400 px-6 py-4 rounded-lg border">
            {timeLeft}
          </div>
        </div>
      </div>
    );
  };

  const renderSessionTab = () => {
    if (!isValidJson) return renderErrorState();

    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <TooltipProvider>
          <Tooltip open={showUserTooltip} onOpenChange={setShowUserTooltip}>
            <TooltipTrigger asChild>
              <div className="cursor-pointer">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={session.user.image} alt={session.user.name} />
                  <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <pre className="text-xs">
                {JSON.stringify({
                  name: session.user.name,
                  email: session.user.email,
                  image: session.user.image
                }, null, 2)}
              </pre>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">{session.user.name}</h3>
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        </div>

        <div className="flex items-center space-x-2">
          {session.user.email_verified ? (
            <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
              <Check className="h-4 w-4" />
              <span className="text-sm">Email Verified</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 px-3 py-1 rounded-full">
                <X className="h-4 w-4" />
                <span className="text-sm">Email Not Verified</span>
              </div>
              <Button size="sm" onClick={handleSendVerification}>
                Send Verification
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderApiTab = () => {
    if (!isValidJson) return renderErrorState();

    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6 relative">
        <Button
          onClick={handleApiRequest}
          disabled={isLoading}
          className="bg-authbuilders-purple hover:bg-authbuilders-purple-dark"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending Request...
            </>
          ) : (
            "Send API Request"
          )}
        </Button>

        {showApiResponse && (
          <Card className="absolute top-16 left-0 right-0 z-10 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Response</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiResponse(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-slate-900 text-green-400 p-3 rounded overflow-auto">
                {`{
  "status": "success",
  "user": "${session.user.name}",
  "timestamp": ${Date.now()}
}`}
              </pre>
            </CardContent>
          </Card>
        )}
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
            "border-2 transition-colors",
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
