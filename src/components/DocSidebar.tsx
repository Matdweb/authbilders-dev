
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface DocLink {
  title: string;
  href: string;
  disabled?: boolean;
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
    title: "Core Concepts",
    links: [
      { title: "What is Authentication?", href: "/docs/concepts/authentication" },
      { title: "DAL (Data Access Layer)", href: "/docs/concepts/dal" },
      { title: "Authorization & RBAC", href: "/docs/concepts/authorization" },
      { title: "JWT Deep Dive", href: "/docs/concepts/jwt" },
      { title: "Session Management", href: "/docs/concepts/sessions" },
      { title: "Magic Links", href: "/docs/concepts/magic-links" },
      { title: "Multi-Factor Auth (MFA)", href: "/docs/concepts/mfa" },
    ],
  },
  {
    title: "Templates",
    links: [
      { title: "Next.js + Firebase", href: "/docs/templates/nextjs-firebase" },
      { title: "Next.js + JWT (Mocked DB)", href: "/docs/templates/nextjs-jwt" },
      { title: "Next.js + NextAuth.js", href: "/docs/templates/nextjs-nextauth" },
      { title: "Vite (Coming Soon)", href: "/docs/templates/vite", disabled: true },
    ],
  },
  {
    title: "Built-in Components",
    links: [
      { title: "Count Down Timer", href: "/docs/components/timer" },
      { title: "User Info + Session", href: "/docs/components/user-info" },
      { title: "Call API Button", href: "/docs/components/api-button" },
      { title: "AuthForm", href: "/docs/components/authForm" },
    ],
  },
  {
    title: "Service Integrations",
    links: [
      { title: "Firebase", href: "/docs/integrations/firebase" },
      { title: "NextAuth.js", href: "/docs/integrations/nextauth" },
      { title: "Resend", href: "/docs/integrations/resend" },
      { title: "GitHub Login", href: "/docs/integrations/github" },
      { title: "Google Login", href: "/docs/integrations/google" },
    ],
  },
  {
    title: "Security & Best Practices",
    links: [
      { title: "Password Handling", href: "/docs/security/passwords" },
      { title: "Session Expiry + Storage", href: "/docs/security/sessions" },
      { title: "Frontend Security Tips", href: "/docs/security/frontend" },
      { title: "Backend Security Layers", href: "/docs/security/backend" },
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
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          link.disabled && "opacity-50 pointer-events-none"
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
