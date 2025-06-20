import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";

const ConceptsMagicLinks = () => {
  return (
    <div className="min-h-screen min-w-96 flex flex-col">
      <Navbar />
      <div className="lg:flex lg:flex-1 lg:container pt-14">
        <DocSidebar />
        <main className="flex-1">
          <DocContent
            title="Magic Links"
            description="Implementing passwordless authentication with secure email-based magic links."
          >
            <h2 className="text-2xl font-bold mt-8 mb-4">What are Magic Links?</h2>
            <p className="leading-7 mb-4">
              Magic links are a passwordless authentication method where users receive a secure, time-limited link via email to sign in. 
              No passwords required – just click the link and you're authenticated.
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-200">✨ Benefits</h3>
              <ul className="list-disc pl-6 space-y-1 text-green-700 dark:text-green-300">
                <li>No passwords to remember or manage</li>
                <li>Reduced password-related security risks</li>
                <li>Better user experience for many users</li>
                <li>Automatic email verification</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">How Magic Links Work</h2>
            <div className="bg-muted rounded-lg p-4 mb-6">
              <ol className="list-decimal pl-6 space-y-3">
                <li><strong>User enters email address</strong></li>
                <li><strong>Server generates secure token</strong></li>
                <li><strong>Token is stored with expiration time</strong></li>
                <li><strong>Email sent with magic link containing token</strong></li>
                <li><strong>User clicks link in email</strong></li>
                <li><strong>Server validates token and creates session</strong></li>
                <li><strong>User is authenticated and redirected</strong></li>
              </ol>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Implementation Example</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">1. Generate Magic Link</h3>
            <CodeBlock language="typescript" filename="auth/generateMagicLink.ts">{`
import crypto from 'crypto';

interface MagicLinkToken {
  token: string;
  email: string;
  expiresAt: Date;
  used: boolean;
}

async function generateMagicLink(email: string): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  await tokenStore.save({ token, email, expiresAt, used: false });
  return \`\${process.env.BASE_URL}/auth/verify?token=\${token}\`;
}`}</CodeBlock>

            <h3 className="text-xl font-semibold mt-6 mb-3">2. Send Email</h3>
            <CodeBlock language="typescript" filename="auth/sendMagicLink.ts">{`
async function sendMagicLink(email: string) {
  const magicLink = await generateMagicLink(email);
  const emailTemplate = \`
    <h1>Sign in to Your Account</h1>
    <p>Click the link below to sign in. This link expires in 15 minutes.</p>
    <a href="\${magicLink}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Sign In Now</a>
    <p>If you didn't request this, you can safely ignore this email.</p>
  \`;
  await emailService.send({ to: email, subject: 'Your sign-in link', html: emailTemplate });
}`}</CodeBlock>

            <h3 className="text-xl font-semibold mt-6 mb-3">3. Verify Magic Link</h3>
            <CodeBlock language="typescript" filename="auth/verifyMagicLink.ts">{`
async function verifyMagicLink(token: string): Promise<User | null> {
  const tokenData = await tokenStore.findByToken(token);
  if (!tokenData) throw new Error('Invalid or expired link');
  if (tokenData.expiresAt < new Date()) {
    await tokenStore.delete(token);
    throw new Error('Link has expired');
  }
  if (tokenData.used) throw new Error('Link has already been used');
  await tokenStore.markAsUsed(token);
  let user = await userStore.findByEmail(tokenData.email);
  if (!user) {
    user = await userStore.create({ email: tokenData.email, emailVerified: true });
  }
  return user;
}`}</CodeBlock>

            <h2 className="text-2xl font-bold mt-8 mb-4">Frontend Implementation</h2>
            <CodeBlock language="typescript" filename="components/MagicLinkForm.tsx">{`
function MagicLinkForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkSent, setIsLinkSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch('/api/auth/magic-link', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      setIsLinkSent(true);
    } catch (error) {
      console.error('Failed to send magic link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLinkSent) {
    return <div className="text-center"><h2>Check your email</h2><p>We've sent a sign-in link to {email}</p></div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
      <button type="submit" disabled={isLoading}>{isLoading ? 'Sending...' : 'Send Magic Link'}</button>
    </form>
  );
}`}</CodeBlock>

            <h2 className="text-2xl font-bold mt-8 mb-4">Security Considerations</h2>
            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold">Token Security</h3>
                <p className="text-sm text-muted-foreground">Use cryptographically secure random tokens (crypto.randomBytes, not Math.random).</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-semibold">Short Expiration</h3>
                <p className="text-sm text-muted-foreground">Keep expiration times short (5-15 minutes) to limit exposure window.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold">One-Time Use</h3>
                <p className="text-sm text-muted-foreground">Ensure tokens can only be used once and are deleted after use.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold">Rate Limiting</h3>
                <p className="text-sm text-muted-foreground">Implement rate limiting to prevent email bombing attacks.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">UX Best Practices</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">💡 User Experience Tips</h3>
              <ul className="list-disc pl-6 space-y-2 text-blue-700 dark:text-blue-300">
                <li>Provide clear instructions about checking email and spam folders</li>
                <li>Allow users to request a new link if the first expires</li>
                <li>Show loading states during email sending</li>
                <li>Redirect to intended destination after authentication</li>
                <li>Provide fallback authentication methods for email delivery issues</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Common Pitfalls</h2>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2 text-red-800 dark:text-red-200">⚠️ Avoid These Mistakes</h3>
              <ul className="list-disc pl-6 space-y-2 text-red-700 dark:text-red-300">
                <li>Using predictable or weak tokens</li>
                <li>Not implementing proper rate limiting</li>
                <li>Making tokens too long-lived</li>
                <li>Not handling email delivery failures gracefully</li>
                <li>Forgetting to clean up expired tokens from database</li>
              </ul>
            </div>

            <div className="bg-muted p-4 rounded-lg mt-8">
              <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
              <p>
                Learn about <a href="/docs/concepts/mfa" className="text-authbuilders-purple hover:underline">Multi-Factor Authentication</a> for additional security or 
                explore <a href="/docs/integrations/resend" className="text-authbuilders-purple hover:underline">Email Service Integration</a> for reliable email delivery.
              </p>
            </div>
          </DocContent>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ConceptsMagicLinks;
