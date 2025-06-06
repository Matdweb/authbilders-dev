
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";

const QuickStart = () => {
  return (
    <div className="min-h-screen min-w-96 flex flex-col">
      <Navbar />
      <div className="lg:flex lg:flex-1 lg:container pt-14">
        <DocSidebar />
        <main className="flex-1">
          <DocContent
            title="Quick Start"
            description="Get up and running with AuthBuilders in under 5 minutes."
          >
            <h2 className="text-2xl font-bold mt-8 mb-4">Prerequisites</h2>
            <p className="leading-7 mb-4">
              Before getting started, make sure you have the following installed:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Node.js 16.x or later</li>
              <li>Git</li>
              <li>Your preferred code editor</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Step 1: Choose Your Template</h2>
            <p className="leading-7 mb-4">
              Select a template that matches your tech stack. We offer several pre-configured options:
            </p>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Next.js + Firebase</h3>
                <p className="text-sm text-muted-foreground">Full-stack authentication with Firebase backend</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Next.js + JWT</h3>
                <p className="text-sm text-muted-foreground">JWT-based auth with mocked database</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Step 2: Clone the Repository</h2>
            <p className="leading-7 mb-4">
              Use our interactive tech stack selector or clone directly:
            </p>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-6 overflow-auto">
              <pre><code>{`# For Next.js + Firebase template
git clone --branch nextjs-firebase https://github.com/authbuilders/templates.git my-auth-app
cd my-auth-app`}</code></pre>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Step 3: Install Dependencies</h2>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-6 overflow-auto">
              <pre><code>{`npm install
# or
yarn install
# or
pnpm install`}</code></pre>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Step 4: Configure Environment</h2>
            <p className="leading-7 mb-4">
              Copy the environment template and add your configuration:
            </p>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-6 overflow-auto">
              <pre><code>{`cp .env.example .env.local
# Edit .env.local with your API keys`}</code></pre>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Step 5: Start Development</h2>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-6 overflow-auto">
              <pre><code>{`npm run dev`}</code></pre>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-8">
              <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-200">🎉 Success!</h3>
              <p className="text-green-700 dark:text-green-300">
                Your authentication system is now running at <code className="bg-green-100 dark:bg-green-800 px-1 rounded">http://localhost:3000</code>
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg mt-8">
              <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
              <p>
                Continue to the <a href="/docs/concepts/authentication" className="text-authbuilders-purple hover:underline">Authentication Concepts</a> guide to understand how the system works,
                or explore our <a href="/docs/templates/nextjs-firebase" className="text-authbuilders-purple hover:underline">Template Documentation</a> for customization options.
              </p>
            </div>
          </DocContent>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default QuickStart;
