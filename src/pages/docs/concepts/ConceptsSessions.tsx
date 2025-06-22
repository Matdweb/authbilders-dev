
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";

const ConceptsSessions = () => {
  return (
    <div className="min-h-screen min-w-96 flex flex-col">
      <Navbar />
      <div className="lg:flex lg:flex-1 lg:container pt-14">
        <DocSidebar />
        <main className="flex-1">
          <DocContent
            title="Session Management"
            description="Understanding how to securely manage user sessions in web applications."
          >
            <h2 className="text-2xl font-bold mt-8 mb-4">What are Sessions?</h2>
            <p className="leading-7 mb-4">
              Sessions maintain user state across multiple requests in stateless HTTP protocol.
              They're essential for keeping users logged in as they navigate your application.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Session Storage Options</h2>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Server-Side Sessions</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Session data stored on the server, client gets a session ID cookie.
                </p>
                <div className="text-xs">
                  <p className="text-green-600 dark:text-green-400">✓ More secure</p>
                  <p className="text-green-600 dark:text-green-400">✓ Can store large data</p>
                  <p className="text-red-600 dark:text-red-400">✗ Server memory usage</p>
                  <p className="text-red-600 dark:text-red-400">✗ Scaling complexity</p>
                </div>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">Client-Side Sessions (JWT)</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Session data encoded in tokens stored on the client.
                </p>
                <div className="text-xs">
                  <p className="text-green-600 dark:text-green-400">✓ Stateless</p>
                  <p className="text-green-600 dark:text-green-400">✓ Easy to scale</p>
                  <p className="text-red-600 dark:text-red-400">✗ Token size limits</p>
                  <p className="text-red-600 dark:text-red-400">✗ Can't revoke easily</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Server-Side Session Implementation</h2>
            <p className="leading-7 mb-4">
              Here's how to implement secure server-side sessions:
            </p>

            <CodeBlock language="typescript" filename="session-manager.ts">{`
interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
  isActive: boolean;
}

class SessionManager {
  async createSession(userId: string, options: SessionOptions): Promise<Session> {
    const session: Session = {
      id: generateSecureId(),
      userId,
      expiresAt: new Date(Date.now() + options.maxAge),
      createdAt: new Date(),
      isActive: true,
    };
    await this.sessionStore.save(session);
    return session;
  }
  async validateSession(sessionId: string): Promise<Session | null> {
    const session = await this.sessionStore.get(sessionId);
    if (!session || !session.isActive) return null;
    if (session.expiresAt < new Date()) {
      await this.destroySession(sessionId);
      return null;
    }
    return session;
  }
}`}</CodeBlock>

            <h2 className="text-2xl font-bold mt-8 mb-4">Session Security</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">Secure Cookie Configuration</h3>
            <CodeBlock language="typescript" filename="cookie-config.ts">{`
            // Express.js cookie configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'sessionId',
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 86400000,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: false
}));
`}</CodeBlock>

            <h3 className="text-xl font-semibold mt-6 mb-3">Session Rotation</h3>
            <p className="leading-7 mb-4">
              Regenerate session IDs after authentication to prevent session fixation attacks:
            </p>

            <CodeBlock language="typescript" filename="rotate-session.ts">{`
async function login(email: string, password: string) {
  const user = await validateCredentials(email, password);
  if (user) {
    if (req.session.id) await destroySession(req.session.id);
    const newSession = await createSession(user.id, { userAgent: req.headers['user-agent'], ipAddress: req.ip });
    res.cookie('sessionId', newSession.id, cookieOptions);
  }
}
`}</CodeBlock>

            <h2 className="text-2xl font-bold mt-8 mb-4">Session Expiration Strategies</h2>

            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold">Absolute Expiration</h3>
                <p className="text-sm text-muted-foreground">
                  Session expires after a fixed time regardless of activity.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold">Sliding Expiration</h3>
                <p className="text-sm text-muted-foreground">
                  Session extends on each request, expires after inactivity period.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold">Hybrid Approach</h3>
                <p className="text-sm text-muted-foreground">
                  Combines both: sliding with maximum absolute limit.
                </p>
              </div>
            </div>

            <CodeBlock language="typescript" filename="sliding-expiration.ts">{`
async function extendSession(sessionId: string): Promise<void> {
  const session = await sessionStore.get(sessionId);
  if (session && session.isActive) {
    const now = new Date();
    const slidingExpiry = new Date(now.getTime() + SLIDING_WINDOW);
    const absoluteExpiry = new Date(session.createdAt.getTime() + MAX_SESSION_AGE);
    session.expiresAt = slidingExpiry < absoluteExpiry ? slidingExpiry : absoluteExpiry;
    await sessionStore.update(sessionId, session);
  }
}`}</CodeBlock>

            <h2 className="text-2xl font-bold mt-8 mb-4">Session Storage Options</h2>

            <div className="grid gap-4 mb-6">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Memory Store</h3>
                <p className="text-sm text-muted-foreground">Fast but not scalable, lost on restart.</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">⚠️ Development only</p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Redis</h3>
                <p className="text-sm text-muted-foreground">Fast, persistent, supports expiration.</p>
                <p className="text-xs text-green-600 dark:text-green-400">✓ Recommended for production</p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Database</h3>
                <p className="text-sm text-muted-foreground">Persistent, queryable, but slower.</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">→ Good for complex session data</p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-200">🔒 Security Best Practices</h3>
              <ul className="list-disc pl-6 space-y-2 text-yellow-700 dark:text-yellow-300">
                <li>Always use HTTPS in production</li>
                <li>Set secure, httpOnly, and sameSite cookie flags</li>
                <li>Implement session rotation on privilege changes</li>
                <li>Monitor for unusual session patterns</li>
                <li>Provide user session management (view/revoke active sessions)</li>
              </ul>
            </div>

            <div className="bg-muted p-4 rounded-lg mt-8">
              <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
              <p>
                Learn about <a href="/docs/concepts/jwt" className="text-authbuilders-purple hover:underline">JWT Deep Dive</a> for stateless alternatives or
                explore <a href="/docs/security/sessions" className="text-authbuilders-purple hover:underline">Session Security</a> for advanced protection techniques.
              </p>
            </div>
          </DocContent>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ConceptsSessions;
