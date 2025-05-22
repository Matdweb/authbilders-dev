
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

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

const DocSidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className={cn(
        "fixed inset-y-0 z-20 flex-col border-r border-border bg-background transition-all",
        "lg:sticky lg:top-[69px] lg:flex lg:h-[calc(100vh-69px)]",
        isMobileOpen ? "flex w-full" : "hidden lg:flex"
      )}>
        <div className="flex h-[69px] items-center border-b border-border px-6 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-authbuilders-purple flex items-center justify-center text-white font-bold">
              AB
            </div>
            <span className="font-bold text-xl">AuthBuilders</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <ScrollArea className="flex-1 py-6 lg:py-8">
          <div className="px-6 lg:px-8">
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
                        onClick={() => setIsMobileOpen(false)}
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
    </>
  );
};

export default DocSidebar;
