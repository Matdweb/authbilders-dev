
import DocContent from '@/components/DocContent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DocSidebar from '@/components/DocSidebar';
import CodeBlock from '@/components/CodeBlock';

const QuickStart = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <aside className="w-80 shrink-0">
          <DocSidebar />
        </aside>
        <main className="flex-1">
          <DocContent
            title="Quick Start Guide"
            description="Get up and running with AuthBuilders in under 5 minutes. Choose your tech stack and deploy a complete authentication system."
          >
            <div className="space-y-8">
              <section>
                <h2 className="doc-heading">1. Choose Your Template</h2>
                <p className="doc-paragraph">
                  Start by selecting a template that matches your tech stack. We support various combinations of frontend frameworks, backend services, and authentication methods.
                </p>
                
                <div className="doc-callout-info">
                  <p className="font-medium mb-2">💡 Pro Tip</p>
                  <p>Visit our <a href="/tech-stack-selector" className="text-primary hover:underline">Tech Stack Selector</a> to find the perfect template for your needs.</p>
                </div>
              </section>

              <section>
                <h2 className="doc-heading">2. Clone the Repository</h2>
                <p className="doc-paragraph">
                  Once you've chosen your template, clone the repository and navigate to your project directory:
                </p>
                
                <CodeBlock language="bash" filename="terminal">
{`# For Next.js + Firebase template
git clone --branch nextjs-firebase https://github.com/authbuilders/templates.git my-auth-app
cd my-auth-app`}
                </CodeBlock>
              </section>

              <section>
                <h2 className="doc-heading">3. Install Dependencies</h2>
                <p className="doc-paragraph">
                  Install the required packages using your preferred package manager:
                </p>
                
                <CodeBlock language="bash" filename="package-installation">
{`# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install`}
                </CodeBlock>
              </section>

              <section>
                <h2 className="doc-heading">4. Environment Configuration</h2>
                <p className="doc-paragraph">
                  Create a <code>.env.local</code> file in your project root and add your environment variables:
                </p>
                
                <CodeBlock language="bash" filename=".env.local">
{`# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# NextAuth Configuration (if using NextAuth)
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=your_database_connection_string`}
                </CodeBlock>

                <div className="doc-callout-warning">
                  <p className="font-medium mb-2">⚠️ Security Note</p>
                  <p>Never commit your <code>.env.local</code> file to version control. Add it to your <code>.gitignore</code> file.</p>
                </div>
              </section>

              <section>
                <h2 className="doc-heading">5. Start Development Server</h2>
                <p className="doc-paragraph">
                  Launch your development server and start building:
                </p>
                
                <CodeBlock language="bash" filename="development">
{`# Start the development server
npm run dev

# Your app will be available at:
# http://localhost:3000`}
                </CodeBlock>
              </section>

              <section>
                <h2 className="doc-heading">6. Customize Your Authentication</h2>
                <p className="doc-paragraph">
                  Your template comes with pre-configured authentication components. Here's a simple example of how to use them:
                </p>
                
                <CodeBlock language="typescript" filename="components/LoginForm.tsx">
{`import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User is now logged in
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-lg"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-lg"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};`}
                </CodeBlock>
              </section>

              <section>
                <h2 className="doc-heading">Next Steps</h2>
                <p className="doc-paragraph">
                  Congratulations! You now have a working authentication system. Here are some next steps to consider:
                </p>
                
                <ul className="doc-list">
                  <li><a href="/docs/concepts/authentication" className="text-primary hover:underline">Learn about authentication concepts</a></li>
                  <li><a href="/docs/concepts/authorization" className="text-primary hover:underline">Implement role-based access control</a></li>
                  <li><a href="/docs/concepts/sessions" className="text-primary hover:underline">Configure session management</a></li>
                  <li><a href="/docs/concepts/mfa" className="text-primary hover:underline">Add multi-factor authentication</a></li>
                </ul>

                <div className="doc-callout-success">
                  <p className="font-medium mb-2">🚀 Ready to Deploy?</p>
                  <p>Check out our deployment guides for Vercel, Netlify, and other platforms in the Templates section.</p>
                </div>
              </section>
            </div>
          </DocContent>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default QuickStart;
