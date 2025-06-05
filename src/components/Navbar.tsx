
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

// Import the documentation structure from DocSidebar
interface DocLink {
  title: string;
  href: string;
}

interface DocCategory {
  title: string;
  links: DocLink[];
}

const docLinks: DocCategory[] = [
  {
    title: "Getting Started",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Authentication",
    links: [
      { title: "Email/Password Auth", href: "/docs/authentication/email-password" },
      { title: "Social Login", href: "/docs/authentication/social-login" },
      { title: "Multi-Factor Auth", href: "/docs/authentication/multi-factor" },
      { title: "Magic Links", href: "/docs/authentication/magic-links" },
      { title: "JWT Authentication", href: "/docs/authentication/jwt" },
    ],
  },
  {
    title: "Authorization",
    links: [
      { title: "Role-Based Access", href: "/docs/authorization/role-based" },
      { title: "Permission-Based Access", href: "/docs/authorization/permission-based" },
      { title: "Protected Routes", href: "/docs/authorization/protected-routes" },
    ],
  },
  {
    title: "Guides",
    links: [
      { title: "Securing APIs", href: "/docs/guides/securing-apis" },
      { title: "Session Management", href: "/docs/guides/session-management" },
      { title: "Password Storage", href: "/docs/guides/password-storage" },
      { title: "Security Best Practices", href: "/docs/guides/security-best-practices" },
    ],
  },
  {
    title: "Templates",
    links: [
      { title: "Basic Auth", href: "/docs/templates/basic-auth" },
      { title: "Social Login", href: "/docs/templates/social-login" },
      { title: "Multi-Factor Auth", href: "/docs/templates/multi-factor" },
    ],
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith('/docs');

  return (
    <nav className="border-b border-border fixed top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-authbuilders-purple flex items-center justify-center text-white font-bold">
              AB
            </div>
            <span className="font-bold text-xl">AuthBuilders.dev</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
            Documentation
          </Link>
          <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
            Templates
          </Link>
          <Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
            Guides
          </Link>
          <a
            href="https://github.com/authbuilders"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <ThemeToggle />
          <Link to="/tech-stack-selector">
            <Button className="bg-authbuilders-purple hover:bg-authbuilders-purple-dark text-white">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile menu and docs sidebar buttons */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />

          {/* Documentation Sidebar Sheet (only show on docs pages) */}
          {isDocsPage && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open documentation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] max-w-sm p-0">
                <div className="h-full flex flex-col">
                  <div className="flex h-[69px] items-center border-b border-border px-6">
                    <Link to="/" className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-authbuilders-purple flex items-center justify-center text-white font-bold">
                        AB
                      </div>
                      <span className="font-bold text-xl">AuthBuilders</span>
                    </Link>
                  </div>

                  <ScrollArea className="flex-1 py-6">
                    <div className="px-6">
                      <div className="space-y-6">
                        {docLinks.map((category, i) => (
                          <div key={i} className="space-y-2">
                            <h4 className="font-semibold text-sm tracking-tight">
                              {category.title}
                            </h4>
                            <div className="grid grid-flow-row gap-1">
                              {category.links.map((link, j) => (
                                <Link
                                  key={j}
                                  to={link.href}
                                  className={cn(
                                    "flex w-full items-center rounded-md border border-transparent px-2 py-1.5 text-sm transition-colors",
                                    location.pathname === link.href
                                      ? "bg-muted font-medium text-foreground"
                                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                  )}
                                >
                                  {link.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Main mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${isDocsPage && 'hidden md:block'} px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isMenuOpen ? "hidden" : "block"}
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isMenuOpen ? "block" : "hidden"}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} border-b border-border`}>
        <div className="container py-4 space-y-3">
          <Link
            to="/docs"
            className="block text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Documentation
          </Link>
          <Link
            to="/templates"
            className="block text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Templates
          </Link>
          <Link
            to="/guides"
            className="block text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Guides
          </Link>
          <a
            href="https://github.com/authbuilders"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            GitHub
          </a>
          <Button
            className="w-full bg-authbuilders-purple hover:bg-authbuilders-purple-dark"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
