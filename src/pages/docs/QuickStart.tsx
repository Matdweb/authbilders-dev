
import DocContent from '@/components/DocContent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DocSidebar from '@/components/DocSidebar';
import CodeBlock from '@/components/CodeBlock';

const QuickStart = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-1 pt-14">
        <div className="max-w-[1440px] mx-auto flex">
          <DocSidebar />
          <main className="flex-1 min-w-0">
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
                  <h2 className="doc-heading">2. Install degit (First Time Only)</h2>
                  <p className="doc-paragraph">
                    Make sure you have <code>git</code> and <code>degit</code> installed globally on your machine:
                  </p>

                  <CodeBlock language="bash" filename="terminal">
{`npm install -g degit`}
                  </CodeBlock>
                </section>

                <section>
                  <h2 className="doc-heading">3. Clone the Template</h2>
                  <p className="doc-paragraph">
                    Use <code>degit</code> to clone the template into your project folder:
                  </p>

                  <CodeBlock language="bash" filename="terminal">
{`degit github:[owner-username]/[template-repo-name]#[branch-name] [your-project-name]
cd [project-name]`}
                  </CodeBlock>
                </section>

                <section>
                  <h2 className="doc-heading">4. Install Dependencies</h2>
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
                  <h2 className="doc-heading">5. Environment Configuration</h2>
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
                  <h2 className="doc-heading">6. Start Development Server</h2>
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
                  <h2 className="doc-heading">7. Customize Your Authentication</h2>
                  <p className="doc-paragraph">
                    Your template comes with pre-configured authentication components. Here's a simple example of how to use them:
                  </p>
                  <CodeBlock language="typescript" filename="app/fields.ts">
{`import { passwordSchema } from '../lib/(AuthBilders)/zod'

export const fields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    schema: passwordSchema,
    onValueChange: (val) => passwordSchema.safeParse(val).success || undefined
  }
]`}
                  </CodeBlock>

                  <CodeBlock language="typescript" filename="login/page.tsx">
{`'use client';
import AuthForm from '@/components/(AuthBilders)/Form/AuthForm'
import { login } from '@/app/lib/(AuthBilders)/actions'
import { fields } from "./fields"
import Link from 'next/link'

export default function LoginPage() {
  return (
    <AuthForm
      title="Login"
      action={login}
      redirectTo='/'
      fields={fields}
      thirdPartyProviders={['google', 'github']}
      extraContent={
        <section className="mt-4 text-gray-400">
          <p className="text-center">
            Don&apos;t have an account? <Link href="/signUp" className="text-blue-500">Sign Up</Link>
          </p>
          <p className="text-center">
            A lot in mind? <Link href="/forgot-password/provide-email" className="text-blue-500 cursor-pointer">Forgot password</Link>
          </p>
        </section>
      }
    />
  )
}`}
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
      </div>
      <Footer />
    </div>
  );
};

export default QuickStart;
