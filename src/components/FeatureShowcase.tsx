
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Key, Smartphone } from "lucide-react";

const FeatureShowcase = () => {
  const [activeTab, setActiveTab] = useState("mfa");

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Multi-Factor Authentication
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-lg">
            Enhance your application's security with our comprehensive multi-factor authentication solution
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left column: Visual demonstration */}
          <div className="rounded-xl border bg-card p-1 shadow-lg relative">
            {/* Phone mockup with code verification */}
            <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex flex-col">
                {/* Phone status bar */}
                <div className="h-6 bg-gray-900 flex items-center justify-between px-4">
                  <div className="text-white text-xs">9:41</div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-white/80"></div>
                    <div className="w-3 h-3 rounded-full bg-white/80"></div>
                    <div className="w-3 h-3 rounded-full bg-white/80"></div>
                  </div>
                </div>
                
                {/* App content */}
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-4 flex flex-col">
                  {/* App header */}
                  <div className="flex items-center justify-center py-4">
                    <div className="h-8 w-8 rounded-lg bg-authbuilders-purple flex items-center justify-center text-white font-bold mr-2">
                      AB
                    </div>
                    <span className="font-semibold text-lg">AuthBuilders</span>
                  </div>
                  
                  {/* Auth content */}
                  <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Verification Required</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Enter the code we sent to your device
                      </p>
                    </div>
                    
                    {/* Verification code input */}
                    <div className="flex justify-center space-x-2 w-full">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div 
                          key={i} 
                          className={`w-10 h-12 rounded-md border-2 ${i <= 4 ? 'border-primary bg-primary/10 flex items-center justify-center font-mono text-lg' : 'border-dashed border-muted flex items-center justify-center'}`}
                        >
                          {i === 1 && '2'}
                          {i === 2 && '4'}
                          {i === 3 && '9'}
                          {i === 4 && '3'}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col space-y-2 w-full mt-4">
                      <Button className="w-full bg-authbuilders-purple">Verify</Button>
                      <Button variant="outline" className="w-full">Resend Code</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animation overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-authbuilders-purple/20 to-transparent opacity-60"></div>
            </div>
          </div>
          
          {/* Right column: Feature details */}
          <div className="flex flex-col space-y-6">
            <Tabs 
              defaultValue={activeTab} 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="mfa" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Multi-Factor</span>
                </TabsTrigger>
                <TabsTrigger value="implementation" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <span className="hidden sm:inline">Implementation</span>
                </TabsTrigger>
                <TabsTrigger value="devices" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span className="hidden sm:inline">Device Support</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="mfa" className="space-y-4">
                <h3 className="text-2xl font-semibold">Robust Multi-Factor Authentication</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-authbuilders-purple rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>Support for SMS, email, authenticator apps, and biometric verification</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-authbuilders-purple rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>Risk-based authentication to prompt for additional verification</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-authbuilders-purple rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>One-time password (OTP) generation and verification</span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="code-block">
                    <pre><code>{`import { enableMFA } from 'auth-builders';

// Add MFA to your authentication flow
enableMFA({
  methods: ['sms', 'email', 'authenticator'],
  fallbackOptions: true,
  expiresIn: '5m'
});`}</code></pre>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="implementation" className="space-y-4">
                <h3 className="text-2xl font-semibold">Simple Implementation</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-authbuilders-purple rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>Drop-in components for verification flows</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-authbuilders-purple rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>Customizable UI to match your brand identity</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-authbuilders-purple rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>Integration with all major frontend frameworks</span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="code-block">
                    <pre><code>{`// Import the MFA component
import { MFAVerification } from 'auth-builders';

// Use it in your authentication flow
const VerificationScreen = () => (
  <MFAVerification 
    onSuccess={handleSuccess}
    onError={handleError}
    theme="light"
  />
);`}</code></pre>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="devices" className="space-y-4">
                <h3 className="text-2xl font-semibold">Universal Device Support</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-authbuilders-purple rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>Works across mobile, desktop, and tablet devices</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-authbuilders-purple rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>Support for hardware security keys like YubiKey</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 bg-authbuilders-purple rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <span>Fallback mechanisms for older devices</span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="code-block">
                    <pre><code>{`// Device detection and adaptation
import { detectDeviceCapabilities } from 'auth-builders';

const deviceSupport = detectDeviceCapabilities();

if (deviceSupport.biometricAvailable) {
  // Offer biometric authentication
  enableBiometricAuth();
}`}</code></pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="pt-6">
              <Button className="bg-authbuilders-purple hover:bg-authbuilders-purple-dark">
                Explore MFA Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
