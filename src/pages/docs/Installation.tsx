import DocContent from '@/components/DocContent';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DocSidebar from '@/components/DocSidebar';
import CodeBlock from '@/components/CodeBlock';

const Installation = () => {
  return (
    <div className="min-h-screen min-w-96 flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-1 pt-14">
        <div className="max-w-[1440px] mx-auto lg:flex lg:gap-8 lg:px-4">
          <DocSidebar />
          <main className="flex-1 min-w-0">
            <DocContent
              title="Installation"
              description="Install and prepare your environment to work with AuthBuilders templates."
            >
              <div className="space-y-8">
                <section>
                  <h2 className="doc-heading">1. Prerequisites</h2>
                  <p className="doc-paragraph">
                    Make sure you have the following installed on your system:
                  </p>
                  <CodeBlock language="bash" filename="check-install">
{`# Git
$ git --version

# Node.js
$ node -v

# npm (comes with Node.js)
$ npm -v`}
                  </CodeBlock>
                </section>

                <section>
                  <h2 className="doc-heading">2. Install degit</h2>
                  <p className="doc-paragraph">
                    <code>degit</code> is used to clone templates without linking to the Git history.
                  </p>
                  <CodeBlock language="bash" filename="terminal">
{`npm install -g degit`}
                  </CodeBlock>
                </section>

                <section>
                  <h2 className="doc-heading">3. Clone a Template</h2>
                  <p className="doc-paragraph">
                    Use the command below to clone your desired stack template:
                  </p>
                  <CodeBlock language="bash" filename="clone-template">
{`degit github:authbuilders/templates/nextjs-firebase my-auth-app
cd my-auth-app
// add real project name
`}
                  </CodeBlock>
                </section>

                <section>
                  <h2 className="doc-heading">4. Install Dependencies</h2>
                  <p className="doc-paragraph">
                    Use your preferred package manager to install the dependencies:
                  </p>
                  <CodeBlock language="bash" filename="package-installation">
{`# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install`}
                  </CodeBlock>
                </section>

                <section>
                  <h2 className="doc-heading">5. Environment Setup</h2>
                  <p className="doc-paragraph">
                    Add your keys and configuration to a <code>.env.local</code> file:
                  </p>
                  <CodeBlock language="bash" filename=".env.local">
{`NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000

DATABASE_URL=your_database_connection_string`}
                  </CodeBlock>

                  <div className="doc-callout-warning">
                    <p className="font-medium mb-2">⚠️ Security Note</p>
                    <p>Never commit your <code>.env.local</code> file. Always add it to your <code>.gitignore</code>.</p>
                  </div>
                </section>

                <section>
                  <h2 className="doc-heading">6. Start the Server</h2>
                  <p className="doc-paragraph">
                    Launch your app locally with:
                  </p>
                  <CodeBlock language="bash" filename="start-server">
{`npm run dev`}
                  </CodeBlock>

                  <p className="doc-paragraph">
                    Your app will be available at <code>http://localhost:3000</code>.
                  </p>
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

export default Installation;
