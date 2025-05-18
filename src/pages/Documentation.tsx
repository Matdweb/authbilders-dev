
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 lg:container">
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
              <li>Pre-built templates for common authentication patterns</li>
              <li>Components that follow security best practices</li>
              <li>Documentation on implementing and customizing authentication flows</li>
              <li>Framework-agnostic solutions that work with your existing tech stack</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Getting Started</h2>
            <p className="leading-7">
              The quickest way to get started with AuthBuilders is to clone one of our template repositories:
            </p>
            <div className="code-block mt-4 mb-6">
              <pre><code>
                {`git clone https://github.com/authbuilders/templates.git
cd templates/basic-auth
npm install
npm start`}
              </code></pre>
            </div>
            <p className="leading-7">
              This will give you a working authentication system that you can customize to your needs.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Core Concepts</h2>
            <p className="leading-7">
              Before diving into the implementation details, it's helpful to understand the core concepts of authentication and authorization:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Authentication</strong>: Verifying the identity of a user or system</li>
              <li><strong>Authorization</strong>: Determining what actions a verified user can perform</li>
              <li><strong>JWT</strong>: JSON Web Tokens, a stateless method for representing claims between parties</li>
              <li><strong>OAuth</strong>: An open standard for access delegation, commonly used for social login</li>
              <li><strong>Multi-Factor Authentication</strong>: Adding additional verification steps beyond a password</li>
            </ul>

            <div className="bg-muted p-4 rounded-lg mt-8">
              <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
              <p>
                Continue to the <a href="/docs/installation" className="text-authbuilders-purple hover:underline">Installation</a> guide to set up AuthBuilders in your project,
                or explore the <a href="/docs/quick-start" className="text-authbuilders-purple hover:underline">Quick Start</a> guide for a fast integration.
              </p>
            </div>
          </DocContent>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Documentation;
