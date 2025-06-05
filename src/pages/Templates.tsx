
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const templates = [
  {
    title: "Basic Authentication",
    description: "Email/password authentication with user registration, login, and password reset functionality.",
    features: ["User registration", "Login", "Password reset", "Remember me", "Email verification"],
    githubUrl: "https://github.com/authbuilders/templates/basic-auth",
    docsUrl: "/docs/templates/basic-auth",
    techStack: ["React", "Express", "MongoDB"],
    difficulty: "Beginner"
  },
  {
    title: "Social Login",
    description: "Authentication using social providers like Google, GitHub, Twitter, and Facebook.",
    features: ["Multiple social providers", "User profile sync", "OAuth 2.0 implementation", "Token management"],
    githubUrl: "https://github.com/authbuilders/templates/social-login",
    docsUrl: "/docs/templates/social-login",
    techStack: ["React", "Next.js", "Prisma"],
    difficulty: "Intermediate"
  },
  {
    title: "Multi-Factor Authentication",
    description: "Enhanced security with two-factor authentication using TOTP, SMS, or email verification codes.",
    features: ["TOTP (Google Authenticator)", "SMS verification", "Email code verification", "Backup codes"],
    githubUrl: "https://github.com/authbuilders/templates/multi-factor",
    docsUrl: "/docs/templates/multi-factor",
    techStack: ["Vue", "Express", "PostgreSQL"],
    difficulty: "Advanced"
  },
  {
    title: "JWT Authentication",
    description: "Stateless authentication using JSON Web Tokens with automatic token refresh.",
    features: ["JWT implementation", "Token refresh", "Logout mechanism", "Role-based access control"],
    githubUrl: "https://github.com/authbuilders/templates/jwt-auth",
    docsUrl: "/docs/templates/jwt-auth",
    techStack: ["React", "Node.js", "MongoDB"],
    difficulty: "Intermediate"
  },
  {
    title: "Magic Link Authentication",
    description: "Passwordless authentication with secure magic links sent to users' email.",
    features: ["Email link generation", "Secure token validation", "Session management", "Link expiration"],
    githubUrl: "https://github.com/authbuilders/templates/magic-link",
    docsUrl: "/docs/templates/magic-link",
    techStack: ["React", "Firebase", "Tailwind CSS"],
    difficulty: "Intermediate"
  },
  {
    title: "Role-Based Access Control",
    description: "Comprehensive role and permission management for controlling access to resources.",
    features: ["User roles", "Permissions", "Protected routes", "Admin dashboard"],
    githubUrl: "https://github.com/authbuilders/templates/rbac",
    docsUrl: "/docs/templates/rbac",
    techStack: ["Angular", "Express", "MongoDB"],
    difficulty: "Advanced"
  }
];

const Templates = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 pt-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Authentication Templates</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready-to-use authentication templates for your projects. Clone, customize, and deploy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{template.title}</CardTitle>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      template.difficulty === "Beginner" 
                        ? "bg-green-100 text-green-800" 
                        : template.difficulty === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {template.difficulty}
                    </span>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Features</h4>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        {template.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {template.techStack.map((tech, i) => (
                          <span key={i} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to={template.docsUrl}>Docs</Link>
                  </Button>
                  <Button className="flex-1 bg-authbuilders-purple hover:bg-authbuilders-purple-dark" asChild>
                    <a href={template.githubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center bg-muted p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Need a Custom Template?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Don't see what you need? Check out our documentation for guides on building custom authentication solutions, 
              or contribute to our open source repository.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/docs">
                <Button variant="outline" size="lg">View Documentation</Button>
              </Link>
              <a href="https://github.com/authbuilders/contribute" target="_blank" rel="noopener noreferrer">
                <Button className="bg-authbuilders-purple hover:bg-authbuilders-purple-dark" size="lg">
                  Contribute
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
