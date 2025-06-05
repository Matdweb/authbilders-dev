
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="py-20 pt-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Build Secure Authentication <span className="gradient-text">Without the Hassle</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                AuthBuilders provides ready-to-use templates and comprehensive guides for implementing
                robust authentication systems in your applications.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/tech-stack-selector">
                <Button className="bg-authbuilders-purple hover:bg-authbuilders-purple-dark text-white" size="lg">
                  Get Started
                </Button>
              </Link>
              <a href="https://github.com/authbuilders" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  View on GitHub
                </Button>
              </a>
            </div>
            <div className="mt-4 rounded-lg bg-muted p-4 font-mono text-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 flex space-x-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-muted-foreground">$ git clone https://github.com/authbuilders/templates.git</p>
              <p className="text-muted-foreground">$ cd templates/basic-auth</p>
              <p className="text-muted-foreground">$ npm install</p>
              <p className="text-muted-foreground">$ npm start</p>
              <p className="text-green-400">✓ Authentication system ready at http://localhost:3000</p>
            </div>
          </div>
          <div className="mx-auto flex items-center justify-center">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-8 lg:grid-cols-1">
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="font-bold">Login Form</h3>
                  <div className="code-block">
                    <pre><code>
                      {`import { AuthProvider } from './components/AuthForm';

function LoginPage() {
    return (
        <AuthForm
            title="Login"
            action={login}
            fields={fields}
            redirectTo="/dashboard"
            thirdPartyProviders={
                ['google', 'github']
            }
        />
    )}
  );`}
                    </code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
