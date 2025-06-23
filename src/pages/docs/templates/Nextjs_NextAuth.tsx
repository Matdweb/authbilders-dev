import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";
import { motion } from "framer-motion";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiJsonwebtokens, SiZod, } from "react-icons/si";
import { FaNodeJs, FaGithub, FaShieldAlt, FaDatabase, } from "react-icons/fa";
import {
    FaLinux,
    FaApple,
    FaWindows,
} from "react-icons/fa";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};
const iconHoverVariants = { hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } } };
const cardHover = { hover: { scale: 1.02, y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", transition: { duration: 0.3 } } };

const Nextjs_NextAuth = () => {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Navbar />
            <div className="flex-1 pt-14">
                <div className="max-w-[1440px] mx-auto flex">
                    <DocSidebar />
                    <main className="flex-1 min-w-0">
                        <DocContent title="Next.js + NextAuth Template" description="Complete guide for using our authentication template powered by NextAuth.js.">
                            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">

                                {/* Setup */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">🚀 Setup & Installation</h2>
                                    <motion.div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg" whileHover={cardHover.hover}>
                                        <ol className="list-decimal pl-8 space-y-6">
                                            {[
                                                { step: "Ensure git and node are installed on your machine.", title: "Console", code: [`# Git`, `$ git --version`, `# Node.js`, `$ node -v`] },
                                                { step: "Install degit", title: "Degit", code: [`npm install -g degit`] },
                                                { step: "Get template", title: "Download template", code: [`degit github:Matdweb/authbilders-nextjs-nextauth my-new-app`] },
                                                { step: "Dependencies", title: "Dependencies", code: [`cd my-new-app`, `npm install`] },
                                                { step: "Add .env", title: ".env.local", code: [`GOOGLE_CLIENT_ID=your_google_client_id`, `GOOGLE_CLIENT_SECRET=your_google_client_secret\n`, `GITHUB_CLIENT_ID=your_github_client_id`, `GITHUB_CLIENT_SECRET=your_github_client_secret\n`, `NEXTAUTH_SECRET=your_secret`, `NEXTAUTH_URL=http://localhost:3000\n`, `JWT_SECRET_KEY=your_secret`, `RESEND_API_KEY=your_resend_api_key`, `RESET_TOKEN_SECRET=your_secret`, `NEXT_PUBLIC_BASE_URL=http://localhost:3000`] },
                                                { step: "Start dev server", title: "Run Dev Server", code: [`npm run dev`] }
                                            ].map((item, idx) => (
                                                <motion.li key={idx} variants={listItemVariants} className="text-md leading-relaxed text-slate-700 dark:text-slate-300">
                                                    {item.step}
                                                    <CodeBlock language="bash" filename={item.title}>{
                                                        item.code.join("\n")
                                                    }</CodeBlock>
                                                </motion.li>
                                            ))}
                                        </ol>
                                    </motion.div>
                                </motion.section>

                                <motion.section variants={itemVariants}>
                                    <motion.div whileHover={cardHover.hover}>
                                        <div className="doc-callout-info">
                                            <p className="font-medium mb-2">💡 Pro Tips</p>
                                            1. Learn about <a href="#" className="text-authbuilders-purple hover:underline">How to get Google third party secrets</a> here. <br />
                                            1. Learn about <a href="#" className="text-authbuilders-purple hover:underline">How to get Github third party secrets</a> here. <br />
                                            2. Take a look to <a href="/docs/integrations/resend" className="text-authbuilders-purple hover:underline">Resend setup guide</a> to get the right env variable value. <br />
                                            3. Visit <a href="https://randomkeygen.com/" className="text-authbuilders-purple hover:underline">randomkeygen.com</a> to generate secret keys.
                                        </div>
                                    </motion.div>
                                </motion.section>

                                {/* Tech Stack */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">⚙️ Tech Stack</h2>
                                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { icon: SiNextdotjs, label: "Next.js 15", color: "text-black dark:text-white" },
                                            { icon: FaShieldAlt, label: "NextAuth.js", color: "text-blue-600" },
                                            { icon: FaNodeJs, label: "Node.js", color: "text-green-500" },
                                            { icon: SiTypescript, label: "TypeScript", color: "text-blue-500" },
                                            { icon: SiJsonwebtokens, label: "JWT (Jose + jsonwebtoken)", color: "text-purple-500" },
                                            { icon: FaDatabase, label: "JSON Mock File DB (for dev)", color: "text-orange-500" },
                                            { icon: SiTailwindcss, label: "TailwindCSS, Hero UI", color: "text-cyan-500" },
                                            { icon: SiZod, label: "Zod", color: "text-blue-500" }
                                        ].map((tech, i) => (
                                            <motion.div key={i} variants={listItemVariants} whileHover={cardHover.hover} className="flex items-center gap-4 p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300">
                                                <motion.div variants={iconHoverVariants} whileHover="hover"><tech.icon className={`w-10 h-10 ${tech.color}`} /></motion.div>
                                                <span className="text-lg font-medium text-slate-700 dark:text-slate-300">{tech.label}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.section>

                                {/* Folder */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">📂 Folder Structure</h2>
                                    <motion.div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg" whileHover={cardHover.hover}>
                                        <CodeBlock language="bash" filename="src Directory">{
                                            `src/
├── pages/
│   ├── api/auth/[...nextauth].ts
│   ├── signin.tsx
│   └── protected.tsx
├── lib/
│   └── nextauth.ts
├── components/(AuthBilders)/
└── styles/`
                                        }</CodeBlock>
                                    </motion.div>
                                </motion.section>

                                {/* OS Differences */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">
                                        🖥️ OS Differences
                                    </h2>
                                    <motion.div className="grid gap-6">
                                        {[
                                            { icon: FaWindows, text: "Windows: Recommended to use Git Bash or WSL for best compatibility.", color: "text-blue-500" },
                                            { icon: FaApple, text: "MacOS: Fully compatible out of the box.", color: "text-slate-600" },
                                            { icon: FaLinux, text: "Linux: Fully compatible.", color: "text-orange-500" }
                                        ].map((os, index) => (
                                            <motion.div
                                                key={index}
                                                variants={listItemVariants}
                                                whileHover={cardHover.hover}
                                                className="flex items-center gap-4 p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300"
                                            >
                                                <motion.div variants={iconHoverVariants} whileHover="hover">
                                                    <os.icon className={`w-8 h-8 ${os.color}`} />
                                                </motion.div>
                                                <span className="text-lg text-slate-700 dark:text-slate-300">
                                                    {os.text}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.section>

                                {/* Extract Session */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">
                                        🔑 Extract Session
                                    </h2>

                                    <div className="space-y-8">
                                        <motion.div variants={itemVariants}>
                                            <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Server Side</h3>
                                            <motion.div whileHover={cardHover.hover}>
                                                <CodeBlock language="typescript" filename="app/protected">{
                                                    `import { getServerSession } from "next-auth";

export default async function App() {
    const session = await getServerSession();

    return (...)
}`}
                                                </CodeBlock>
                                            </motion.div>
                                        </motion.div>

                                        <motion.div variants={itemVariants}>
                                            <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Client Side</h3>
                                            <motion.div whileHover={cardHover.hover}>
                                                <CodeBlock language="typescript" filename="app/protected.ts">{
                                                    `'use client';
import { useSession } from "next-auth/react";

export default function App() {
     const { data: session } = useSession();

    return (...)
}`}
                                                </CodeBlock>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.section>

                                <motion.section variants={itemVariants}>
                                    <div className="space-y-10">
                                        {/* Sign In */}
                                        <motion.section variants={itemVariants}>
                                            <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">🕵🏻‍♂️ AuthForm Strategy: next-auth</h2>

                                            <motion.div
                                                className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg"
                                                whileHover={cardHover.hover}
                                            >
                                                <p className="text-md leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                                                    The <code className="font-mono px-1 py-0.5 bg-muted text-sm rounded">AuthForm</code> component accepts a
                                                    <code className="font-mono px-1 py-0.5 bg-muted text-sm rounded">strategy</code> prop that switches the behavior
                                                    between <strong>server actions</strong> and <strong>NextAuth.js</strong> flows.
                                                    <br /><br />
                                                    When <code className="font-mono bg-muted px-1 py-0.5 text-sm rounded">strategy="next-auth"</code>, the form bypasses server actions and directly calls NextAuth’s sign-in method using credentials strategy.
                                                </p>

                                                <CodeBlock language="tsx" filename="components/AuthForm.tsx">{`
if (strategy === "next-auth") {
  const response = await handleNextAuthSignIn({
    email,
    password,
    redirectTo
  });

  if (response.error) {
    setErrors({ ["next-auth"]: response.error });
    return;
  }
}`}</CodeBlock>

                                                <p className="text-md leading-relaxed text-slate-700 dark:text-slate-300 mt-6">
                                                    This hands control to <code className="font-mono bg-muted px-1 py-0.5 text-sm rounded">next-auth/react</code>’s
                                                    <code className="font-mono px-1 py-0.5 bg-muted text-sm rounded">signIn()</code> API:
                                                </p>

                                                <CodeBlock language="typescript" filename="utils/next-auth.ts">{`
export async function handleNextAuthSignIn({
  email, password, redirectTo
}: {
  email: string;
  password: string;
  redirectTo?: string;
}) {
  const res = await signIn("credentials", {
    email,
    password,
    callbackUrl: redirectTo || "/",
    redirect: false,
  });

  if (res?.error) return { error: "Invalid email or password" };
  return { error: null };
}`}</CodeBlock>
                                                <p className="text-md leading-relaxed text-slate-700 dark:text-slate-300 mt-6">
                                                    And this is how to setup the <code className="font-mono px-1 py-0.5 bg-muted text-sm rounded">AuthForm</code> on your login page
                                                </p>
                                                <CodeBlock language="typescript" filename="login/page.tsx">{`
'use client';
import AuthForm from '@/components/(AuthBilders)/Form/AuthForm'
import { passwordSchema } from '../lib/(AuthBilders)/zod';
import Link from 'next/link'

export default function LoginPage() {
    return (
        <AuthForm
            title="Login"
            strategy="next-auth"
            redirectTo='/'
            fields={[
                {
                    name: 'email',
                    label: 'Email',
                    type: 'email',
                    required: true,
                },
                {
                    name: 'password',
                    label: 'Password',
                    type: 'password',
                    required: true,
                    schema: passwordSchema,
                    onValueChange: (val) => passwordSchema.safeParse(val).success || undefined
                }
            ]}
            thirdPartyProviders={['google', 'github']}
            extraContent={
                <section className="mt-4 text-gray-400">
                    <p className="text-center">
                        Don&apos;t have an account? <Link href="/signUp" className="text-blue-500">Sign Up</Link>
                    </p>
                    <p className="text-center">
                        A lot in mind? <Link href="/forgot-password/provide-email" className="text-blue-500 cursor-pointer">Forgot password</Link>
                    </p>
                </section>
            }
        />
    )
}
`}</CodeBlock>
                                            </motion.div>

                                            <motion.div whileHover={cardHover.hover} className="doc-callout-info mt-6">
                                                <p className="font-medium mb-2">💡 Why Use `next-auth` Strategy?</p>
                                                Useful for templates powered by NextAuth.js, where credential validation and session handling are
                                                handled by the built-in provider middleware.
                                            </motion.div>
                                        </motion.section>

                                        <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">
                                            👤 Auth Flows
                                        </h2>

                                        {/* Sign Up */}
                                        <motion.div variants={itemVariants}>
                                            <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Sign Up</h3>
                                            <motion.div whileHover={cardHover.hover}>
                                                <CodeBlock language="typescript" filename="actions.ts signup">{
                                                    `export async function signUp(formData: FormData) {
    try {
        const email = formData.get('email');
        const password = formData.get('password');
        const exists = findUserByEmail(email);

        if (exists) {
            return errorResponse(['User already exists'], {
                email: ['Email already registered']
            });
        }

        await addUser({ email, password });
        await sendEmailVerification(email)
    }`}
                                                </CodeBlock>
                                            </motion.div>
                                        </motion.div>

                                        {/* Sign Out */}
                                        <motion.div variants={itemVariants}>
                                            <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Sign Out</h3>
                                            <motion.div whileHover={cardHover.hover}>
                                                <CodeBlock language="jsx" filename="actions.ts logout">{
                                                    `'use client';
import { signOut } from 'next-auth/react'

export default function ButtonLogout() {
    return (
        <p onClick={() => signOut()}>
            Sign out
        </p>
    )
}`}
                                                </CodeBlock>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.section>

                                {/* next-auth config */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">🔧 api/auth/[...nextauth]</h2>

                                    <motion.div
                                        className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg"
                                        whileHover={cardHover.hover}
                                    >
                                        <p className="text-md leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                                            This file sets up authentication providers and defines how sessions and JWT tokens behave. The configuration enables users to sign in via OAuth (Google/GitHub) or credentials (email/password), stores sessions as JWTs, and customizes data passed to the frontend.
                                        </p>

                                        <CodeBlock language="typescript" filename="api/auth/[...nextauth]/route.ts">{`
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from 'bcrypt';
import { User } from "@/app/lib/(AuthBilders)/defintions"
import { getAllUsers } from "@/app/lib/(AuthBilders)/dal/queries"

const time_seconds = 60 * 60 * 1 // 1 hour

const handler = NextAuth({
  // 🔐 Providers: Enable multiple login options
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // 🔍 Find matching user
        const users = await getAllUsers()
        const user = users.find(u => u.email === credentials?.email)
        if (!user || !user.password) return null

        // 🔐 Verify password
        const valid = await bcrypt.compare(credentials!.password, user.password)
        if (!valid) return null

        // ✅ Return user object for session
        return {
          id: user.id || "",
          email: user.email,
          name: user.name,
          email_verified: user.email_verified,
        };
      }
    })
  ],

  // 🕒 Session behavior
  session: {
    strategy: 'jwt',
    maxAge: time_seconds
  },

  // 🔐 JWT lifespan
  jwt: {
    maxAge: time_seconds
  },

  // 🔁 Extend JWT + session
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.id = user.id;
        token.email_verified = (user as User).email_verified;
      }
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.expires = token.exp as string;
      const provider = token.provider;
      session.user = {
        id: token.id,
        provider,
        access_token: token.accessToken,
        name: token.name,
        email: token.email,
        image: token.picture,
        email_verified: (provider === "credentials") ? token.email_verified : true,
      } as User;
      return session;
    }
  },

  // 📍 Override default sign-in page
  pages: {
    signIn: '/login'
  },

  // 🔐 Secret for token encryption
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
`}</CodeBlock>

                                        <div className="doc-callout-info mt-6">
                                            <p className="font-medium mb-2">💡 Section Breakdown</p>
                                            <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
                                                <li><strong>Providers:</strong> Users can sign in using Google, GitHub, or email+password credentials.</li>
                                                <li><strong>authorize:</strong> Verifies credentials manually using bcrypt and returns a user object if valid.</li>
                                                <li><strong>Session strategy:</strong> JWT-based, stored in client-side cookies for scalability.</li>
                                                <li><strong>Callbacks:</strong> Augment token & session with provider-specific values like access token and verified email.</li>
                                                <li><strong>Pages:</strong> Custom <code className="font-mono px-1 py-0.5 bg-muted rounded">/login</code> route is used instead of default NextAuth UI.</li>
                                                <li><strong>Secret:</strong> Needed to sign and verify JWTs. Defined via <code className="font-mono px-1 py-0.5 bg-muted rounded">NEXTAUTH_SECRET</code>.</li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                </motion.section>

                                {/* Route Protection */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">
                                        🔐 Route Protection
                                    </h2>

                                    <div className="space-y-10">
                                        <motion.div variants={itemVariants}>
                                            <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Middleware</h3>
                                            <motion.div whileHover={cardHover.hover}>
                                                <CodeBlock language="typescript" filename="middleware.ts">{
                                                    `import { withAuth } from 'next-auth/middleware'
export default withAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ token }) {
      return !!token
    },
  },
})
export const config = { matcher: ["/protected"] }`}
                                                </CodeBlock>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.section>

                                {/* API Protection */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">
                                        🔐 API Protection
                                    </h2>
                                    <motion.div whileHover={cardHover.hover}>
                                        <CodeBlock language="typescript" filename="api/data/route.ts">{
                                            `import { User } from "@/app/lib/(AuthBilders)/defintions";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return Response.json({ error: "Unauthorized", code: 401 });
  }
  return Response.json({ message: "Hello", user_id: (session?.user as User)?.id });
}`}
                                        </CodeBlock>
                                    </motion.div>
                                </motion.section>


                                {/* Next Steps */}
                                <motion.section variants={itemVariants} className="pb-16">
                                    <motion.div className="bg-gradient-to-r from-authbuilders-purple/10 to-authbuilders-purple-light/10 border border-authbuilders-purple/20 rounded-2xl p-8 shadow-lg">
                                        <h3 className="text-2xl font-bold mb-6 text-authbuilders-purple flex items-center gap-3">
                                            <motion.div variants={iconHoverVariants} whileHover="hover"><FaGithub className="w-8 h-8" /></motion.div>
                                            🚀 Ready to Start?
                                        </h3>
                                        <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
                                            Clone the repo and begin building your Next.js app with NextAuth implemented out-of-the-box.
                                        </p>
                                        <motion.div className="flex flex-wrap gap-4" variants={containerVariants}>
                                            <motion.a href="https://github.com/Matdweb/authbilders-nextjs-nextauth" target="_blank" rel="noopener noreferrer" variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-2 px-6 py-3 bg-authbuilders-purple text-white rounded-xl hover:bg-authbuilders-purple-dark transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
                                                <FaGithub className="w-5 h-5" /> View on GitHub
                                            </motion.a>
                                            <motion.a href="/docs/concepts/nextauth" variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-2 px-6 py-3 border border-authbuilders-purple text-authbuilders-purple rounded-xl hover:bg-authbuilders-purple/10 transition-all duration-300 font-medium">
                                                <FaShieldAlt className="w-5 h-5" /> Learn about NextAuth
                                            </motion.a>
                                        </motion.div>
                                    </motion.div>
                                </motion.section>
                            </motion.div>
                        </DocContent>
                    </main>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Nextjs_NextAuth;