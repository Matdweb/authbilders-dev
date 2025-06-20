import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";

const ConceptsAuthentication = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-1 pt-14">
        <div className="max-w-[1440px] mx-auto flex">
          <DocSidebar />
          <main className="flex-1 min-w-0">
            <DocContent
              title="What is Authentication?"
              description="Understanding the fundamentals of user authentication and how it secures your applications."
            >
              <h2 className="text-2xl font-bold mt-8 mb-4">Authentication vs Authorization</h2>
              <p className="leading-7 mb-4">
                Authentication and authorization are often confused, but they serve different purposes:
              </p>
              
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>Who are you?</strong><br />
                    Verifying the identity of a user through credentials like passwords, tokens, or biometrics.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">Authorization</h3>
                  <p className="text-sm text-muted-foreground">
                    <strong>What can you do?</strong><br />
                    Determining what actions an authenticated user is allowed to perform.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">Authentication Methods</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">1. Email/Password Authentication</h3>
              <p className="leading-7 mb-4">
                The most common form of authentication where users provide an email address and password.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Pros:</strong> Simple to implement, familiar to users</li>
                <li><strong>Cons:</strong> Vulnerable to password attacks, requires password management</li>
                <li><strong>Best for:</strong> Most web applications with user accounts</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">2. Social Login (OAuth)</h3>
              <p className="leading-7 mb-4">
                Allow users to sign in using their existing accounts from providers like Google, GitHub, or Facebook.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Pros:</strong> No password management, faster signup, trusted providers</li>
                <li><strong>Cons:</strong> Dependency on third-party services, less control</li>
                <li><strong>Best for:</strong> Consumer applications, developer tools</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">3. Magic Links</h3>
              <p className="leading-7 mb-4">
                Passwordless authentication where users receive a secure link via email to sign in.
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Pros:</strong> No passwords to remember, secure, good UX</li>
                <li><strong>Cons:</strong> Requires email access, potential delays</li>
                <li><strong>Best for:</strong> B2B applications, admin dashboards</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Authentication Flow</h2>
              <p className="leading-7 mb-4">
                A typical authentication flow involves several steps:
              </p>
              
              <div className="bg-muted rounded-lg p-4 mb-6">
                <ol className="list-decimal pl-6 space-y-3">
                  <li><strong>User attempts to access protected resource</strong></li>
                  <li><strong>System checks for valid authentication</strong></li>
                  <li><strong>If not authenticated, redirect to login</strong></li>
                  <li><strong>User provides credentials</strong></li>
                  <li><strong>System validates credentials</strong></li>
                  <li><strong>If valid, create session/token</strong></li>
                  <li><strong>User gains access to protected resource</strong></li>
                </ol>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">Security Considerations</h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-200">⚠️ Important Security Tips</h3>
                <ul className="list-disc pl-6 space-y-2 text-yellow-700 dark:text-yellow-300">
                  <li>Always hash passwords using bcrypt or similar</li>
                  <li>Implement rate limiting to prevent brute force attacks</li>
                  <li>Use HTTPS for all authentication endpoints</li>
                  <li>Implement proper session management</li>
                  <li>Consider multi-factor authentication for sensitive applications</li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded-lg mt-8">
                <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
                <p>
                  Learn about <a href="/docs/concepts/authorization" className="text-authbuilders-purple hover:underline">Authorization & RBAC</a> or 
                  dive into <a href="/docs/concepts/jwt" className="text-authbuilders-purple hover:underline">JWT Deep Dive</a> to understand token-based authentication.
                </p>
              </div>
            </DocContent>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConceptsAuthentication;
