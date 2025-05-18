
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const guides = [
  {
    title: "Understanding Authentication Basics",
    description: "Learn the fundamental concepts of authentication and how they apply to modern web applications.",
    url: "/docs/guides/authentication-basics",
    tags: ["beginner", "concept"],
    readTime: "5 min read",
  },
  {
    title: "Implementing Secure Password Storage",
    description: "Best practices for storing and handling user passwords to prevent security vulnerabilities.",
    url: "/docs/guides/password-storage",
    tags: ["intermediate", "security"],
    readTime: "8 min read",
  },
  {
    title: "JWT Authentication Deep Dive",
    description: "Understand how JWT works and how to implement it properly in your application.",
    url: "/docs/guides/jwt-deep-dive",
    tags: ["advanced", "implementation"],
    readTime: "12 min read",
  },
  {
    title: "Setting Up OAuth 2.0",
    description: "Step-by-step guide to implementing OAuth 2.0 for social login functionality.",
    url: "/docs/guides/oauth-setup",
    tags: ["intermediate", "implementation"],
    readTime: "10 min read",
  },
  {
    title: "Securing API Endpoints",
    description: "Learn how to protect your API endpoints with proper authentication and authorization.",
    url: "/docs/guides/securing-apis",
    tags: ["advanced", "security"],
    readTime: "15 min read",
  },
  {
    title: "Multi-Factor Authentication Implementation",
    description: "A comprehensive guide to adding MFA to your authentication system.",
    url: "/docs/guides/mfa-implementation",
    tags: ["advanced", "implementation"],
    readTime: "18 min read",
  },
  {
    title: "Session Management Best Practices",
    description: "Learn how to properly manage user sessions for security and usability.",
    url: "/docs/guides/session-management",
    tags: ["intermediate", "security"],
    readTime: "9 min read",
  },
  {
    title: "Role-Based Access Control (RBAC)",
    description: "Implementing RBAC to control what resources users can access in your application.",
    url: "/docs/guides/rbac",
    tags: ["advanced", "implementation"],
    readTime: "14 min read",
  }
];

const tagColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
  concept: "bg-blue-100 text-blue-800",
  implementation: "bg-purple-100 text-purple-800",
  security: "bg-orange-100 text-orange-800",
};

const Guides = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Authentication Guides</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In-depth guides and tutorials to help you implement authentication in your applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {guide.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className={`px-2 py-1 text-xs font-medium rounded-full ${tagColors[tag] || "bg-gray-100 text-gray-800"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {guide.readTime}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-authbuilders-purple hover:bg-authbuilders-purple-dark" asChild>
                    <Link to={guide.url}>Read Guide</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Can't Find What You Need?</h2>
            <p className="mb-6 max-w-2xl mx-auto text-muted-foreground">
              Check out our comprehensive documentation or join our community to ask questions and get help from other developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/docs">
                <Button variant="outline" size="lg">Browse All Documentation</Button>
              </Link>
              <a href="https://github.com/authbuilders/discussions" target="_blank" rel="noopener noreferrer">
                <Button className="bg-authbuilders-purple hover:bg-authbuilders-purple-dark" size="lg">
                  Join Community
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

export default Guides;
