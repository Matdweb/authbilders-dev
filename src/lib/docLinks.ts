interface DocLink {
    title: string;
    href: string;
    disabled?: boolean;
}

interface DocCategory {
    title: string;
    links: DocLink[];
}

export const docLinks: DocCategory[] = [
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