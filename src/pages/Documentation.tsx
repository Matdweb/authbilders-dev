
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";
import { Link } from "react-router-dom";

const Documentation = () => {
  return (
    <div className="min-h-screen min-w-96 flex flex-col">
      <Navbar />
      <div className="lg:flex lg:flex-1 lg:container pt-14">
        <DocSidebar />
        <main className="flex-1">
          <DocContent
            title="Introduction"
            description="Learn about AuthBuilders and how to get started with our authentication solutions."
          >
            <h2 className="text-2xl font-bold mt-8 mb-4">What is AuthBuilders?</h2>
            <p className="leading-7">
              AuthBuilders is a comprehensive toolkit for implementing authentication and authorization in your web applications.
              It provides ready-to-use templates, customizable components, and detailed guides to help developers implement secure
              authentication systems without starting from scratch.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Why Use AuthBuilders?</h2>
            <p className="leading-7">
              Authentication is a critical part of web applications, but implementing it securely can be challenging.
              AuthBuilders aims to simplify this process by providing:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Pre-built templates</strong> for common authentication patterns</li>
              <li><strong>Built-in components</strong> that follow security best practices</li>
              <li><strong>Documentation</strong> on implementing and customizing authentication flows</li>
              <li><strong>Multiple Frameworks</strong> solutions that work with your existing tech stack</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Getting Started</h2>
            <p className="leading-7">
              The quickest way to get started with AuthBuilders is to clone one of our template repositories:
            </p>
            <CodeBlock language="bash" filename="Terminal">
              {`degit github:[owner-username]/[template-repo-name]#[branch-name] [your-project-name]
cd [project-name]
npm install
npm run dev`}
            </CodeBlock>
            <p className="leading-7">
              This will give you a working authentication system that you can customize to your needs.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Core Concepts</h2>
            <p className="leading-7">
              Before diving into the implementation details, it's helpful to understand the core concepts of authentication and authorization:
            </p>
            <div className="grid gap-4 md:grid-cols-2 mb-6 pt-4">
              <Link to="/docs/concepts/authentication/">
                <div className="border border-border rounded-lg p-4 group hover:bg-authbuilders-purple">
                  <h3 className="font-semibold mb-2 ">🔒 Authentication</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white">
                    Verifying the identity of a user or system
                  </p>
                </div>
              </Link>
              <Link to="/docs/concepts/authorization/">
                <div className="border border-border rounded-lg p-4 group hover:bg-authbuilders-purple">
                  <h3 className="font-semibold mb-2 ">🙍‍♂️ Authorization</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white">
                    Determining what actions a verified user can perform
                  </p>
                </div>
              </Link>
              <Link to="/docs/concepts/jwt/">
                <div className="border border-border rounded-lg p-4 group hover:bg-authbuilders-purple">
                  <h3 className="font-semibold mb-2 ">📀 JWT</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white">
                    JSON Web Tokens, a stateless method for representing claims between parties
                  </p>
                </div>
              </Link>
              <Link to="/docs/concepts/oauth/">
                <div className="border border-border rounded-lg p-4 group hover:bg-authbuilders-purple">
                  <h3 className="font-semibold mb-2 ">🪪 OAuth</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white">
                    An open standard for access delegation, commonly used for social login
                  </p>
                </div>
              </Link>
              <Link to="/docs/concepts/mfa/">
                <div className="border border-border rounded-lg p-4 group hover:bg-authbuilders-purple">
                  <h3 className="font-semibold mb-2 ">🪜 Multi-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white">
                    Adding additional verification steps beyond a password
                  </p>
                </div>
              </Link>
            </div>
            <div className="bg-muted p-4 rounded-lg mt-8">
              <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
              <p>
                Explore the <a href="/docs/quick-start" className="text-authbuilders-purple hover:underline">Quick Start</a> guide for a fast integration.
              </p>
            </div>
          </DocContent>
        </main>
      </div>
      <Footer />
    </div >
  );
};

export default Documentation;
