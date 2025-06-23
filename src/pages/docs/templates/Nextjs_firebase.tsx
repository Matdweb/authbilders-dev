import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";
import { motion } from "framer-motion";
import {
    FaNodeJs,
    FaShieldAlt,
    FaDatabase,
    FaLinux,
    FaApple,
    FaWindows,
    FaGithub,
} from "react-icons/fa";
import {
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiFirebase,
    SiZod,
} from "react-icons/si";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};
const iconHoverVariants = { hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } } };
const cardHover = {
    hover: { scale: 1.02, y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", transition: { duration: 0.3 } },
};

export default function Nextjs_Firebase() {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Navbar />
            <div className="flex-1 pt-14 max-w-[1440px] mx-auto flex">
                <DocSidebar />
                <main className="flex-1 min-w-0">
                    <DocContent title="Next.js + Firebase Template" description="Complete guide for using our authentication template powered by Firebase Auth.">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">

                            {/* Setup & Installation */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">🚀 Setup & Installation</h2>
                                <motion.div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg" whileHover={cardHover.hover}>
                                    <ol className="list-decimal pl-8 space-y-6">
                                        {[
                                            { step: "Ensure Git & Node are installed", title: "Console", code: ["# Git ", "git --version", "# Node.js ", "node -v"] },
                                            { step: "Install degit", title: "Degit", code: ["npm install -g degit"] },
                                            { step: "Download template", title: "Download template", code: ["degit github:Matdweb/authbilders-nextjs-firebase my-firebase-app"] },
                                            { step: "Install dependencies", title: "Dependencies", code: ["cd my-firebase-app", "npm install"] },
                                            { step: "Setup environment variables", title: ".env.local", code: ["NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api", "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_domain", "NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id", "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket", "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id", "NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id\n", "FIREBASE_ADMIN_SDK_KEY=your_admin_key_obj\n", "NEXT_PUBLIC_BASE_URL=http://localhost:3000", "RESEND_API_KEY=re_RDMexc4T_8UpSCeN7dBF9dVJXrnnvStZg", "RESET_TOKEN_SECRET=your_secret"] },
                                            { step: "Run dev server", title: "Run Dev Server", code: ["npm run dev"] },
                                        ].map((item, idx) => (
                                            <motion.li key={idx} variants={listItemVariants} className="text-md leading-relaxed text-slate-700 dark:text-slate-300">
                                                {item.step}
                                                <CodeBlock language="bash" filename={item.title}>{item.code.join("\n")}</CodeBlock>
                                            </motion.li>
                                        ))}
                                    </ol>
                                </motion.div>
                            </motion.section>

                            {/* Pro Tips */}
                            <motion.section variants={itemVariants}>
                                <motion.div whileHover={cardHover.hover}>
                                    <div className="doc-callout-info">
                                        <p className="font-medium mb-2">💡 Pro Tips</p>
                                        1. Learn about <a href="#" className="text-authbuilders-purple hover:underline">How to get Firebase env variables</a> here. <br />
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
                                        { icon: FaNodeJs, label: "Node.js", color: "text-green-500" },
                                        { icon: SiTypescript, label: "TypeScript", color: "text-blue-500" },
                                        { icon: SiFirebase, label: "Firebase", color: "text-orange-500" },
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

                            {/* Folder Structure */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">📂 Folder Structure</h2>
                                <motion.div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg" whileHover={cardHover.hover}>
                                    <CodeBlock language="bash" filename="src Structure">{`
src/
├── app/
│   ├── (AuthBilders)/
│   │   └── (routes)
│   ├── api/
│   │   └── (AuthBilders)/
│   ├── lib/
│   │   ├── (AuthBilders)/
│   │   │   ├── firebase
│   │   │   ├── utils
│   ├── components/
│   │   └── (AuthBilders)/`}</CodeBlock>
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
                                <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">🔑 Extract verifed Session</h2>
                                <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Server Side</h3>
                                <p className="text-md leading-relaxed text-slate-700 dark:text-slate-300 mb-6">You can easliy extract the session, only if it is verified by <code className="font-mono px-1 py-0.5 bg-muted text-sm rounded">firebase-admin</code> sdk, like this:</p>
                                <motion.div whileHover={cardHover.hover}>
                                    <CodeBlock language="typescript" filename="page.tsx">{`
import { verifySession } from "../lib/(AuthBilders)/dal";

export default async function App() {
  const decoded = await verifySession();
  return (...)
}}`}</CodeBlock>
                                </motion.div>
                                <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Client Side</h3>
                                <p className="text-md leading-relaxed text-slate-700 dark:text-slate-300 mb-6">You can't call the <code className="font-mono px-1 py-0.5 bg-muted text-sm rounded">verifySession()</code> on the client, so you can create a <code className="font-mono px-1 py-0.5 bg-muted text-sm rounded">Server Wrapper</code> to call the session from there and then passed it as prop</p>
                                <motion.div whileHover={cardHover.hover}>
                                    <CodeBlock language="typescript" filename="ServerWrapper.tsx">{`
import { verifySession } from "./lib/(AuthBilders)/dal";

export default async function ServerWrapper() {
    const decoded = await verifySession();
    return <ClientComponent session={decoded}/>;
}
`}</CodeBlock>
                                </motion.div>
                                <motion.div whileHover={cardHover.hover}>
                                    <CodeBlock language="typescript" filename="ClientComponent.tsx">{`
'use client';
import { DecodedIdToken } from "firebase-admin/auth";

interface Props { session: DecodedIdToken | undefined }
export function ClientComponent({ session }: Props) {
  if(session){
    return (...)
  }
}
`}</CodeBlock>
                                </motion.div>
                            </motion.section>

                            {/* Extract Session */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">🚫 Extract unverifed Session</h2>
                                <p className="text-md leading-relaxed text-slate-700 dark:text-slate-300 mb-6">We don't recommend using sessions not verifed by <code className="font-mono px-1 py-0.5 bg-muted text-sm rounded">firebase-admin</code></p>
                                <motion.div whileHover={cardHover.hover}>
                                    <CodeBlock language="typescript" filename="firebase.ts">{`
import { getAuth } from 'firebase/auth';
import { cookies } from 'next/headers';

export async function getServerSession() {
  const token = cookies().get('session')?.value;
  return token;
}`}</CodeBlock>
                                </motion.div>
                            </motion.section>

                            {/* Sign‑In, Sign‑Up, Sign‑Out */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">👤 Auth Flows</h2>
                                {/* Sign In */}
                                <motion.div variants={itemVariants}>
                                    <h3 className="text-2xl font-semibold mb-6">Log In</h3>
                                    <CodeBlock language="typescript" filename="actions.ts">{`
                                    export async function login() {
  const { email, password } = fields.data

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    const token = (await user.getIdTokenResult()).token
    await setAuthCookie(token)

    return successResponse(['Logged in successfully'], {
      user: extractUser(user)
    })
  } catch (error) {
    const { code, message } = extractErrorDetails(error)
    return errorResponse(
      ['Login failed', code === 'auth/invalid-credential' ? 'Invalid credentials' : message],
      {}
    )
  }
}
                                    `}</CodeBlock>
                                </motion.div>
                                {/* Sign Up */}
                                <motion.div variants={itemVariants}>
                                    <h3 className="text-2xl font-semibold mb-6">Sign Up</h3>
                                    <CodeBlock language="typescript" filename="actions.ts">{`
                                    
export async function signUp() {
  const { email, password } = fields.data

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    const emailRes = await sendEmailVerification(email)

    return successResponse(['User created', 'Verification email sent'], {
      user: user,
      data: emailRes.data,
    })
  } catch (error) {
    const { code, message } = extractErrorDetails(error)
    return errorResponse(
      ['Login failed', code === 'auth/invalid-credential' ? 'Invalid credentials' : message],
      {}
    )
  }
}
                                    `}</CodeBlock>
                                </motion.div>
                                {/* Sign Out */}
                                <motion.div variants={itemVariants}>
                                    <h3 className="text-2xl font-semibold mb-6">Sign Out</h3>
                                    <CodeBlock language="typescript" filename="signOut.ts">{`
export async function signOut(): Promise<AuthServerActionState> {
  await signOutFirebase(auth)
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
                                    `}</CodeBlock>
                                </motion.div>
                            </motion.section>
                            {/* More info */}
                            <motion.section variants={itemVariants}>
                                <motion.div whileHover={cardHover.hover}>
                                    <div className="doc-callout-info">
                                        <p className="font-medium mb-2">💡 es-lint solutions</p>
                                        We have created a <code className="font-mono px-1 py-0.5 bg-muted text-sm rounded">successResponse()</code> and <code className="font-mono px-1 py-0.5 bg-muted text-sm rounded">errorResponse()</code> functions for consistency and ease of work. Use them as shown with the <code className="font-mono px-1 py-0.5 bg-muted text-sm rounded">extractErrorDetails()</code> to follow es-lint rules and be production compliant <br />
                                    </div>
                                </motion.div>
                            </motion.section>

                            {/* Auth Forms */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">
                                    📋 AuthForm.tsx
                                </h2>

                                <div className="space-y-10">
                                    {/* Login */}
                                    <motion.div variants={itemVariants}>
                                        <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Log In</h3>
                                        <motion.div whileHover={cardHover.hover}>
                                            <CodeBlock language="typescript" filename="login/page.tsx">{
                                                `'use client';
import AuthForm from '@/components/(AuthBilders)/Form/AuthForm'
import { passwordSchema } from '../lib/(AuthBilders)/zod'
import { login } from '@/app/lib/(AuthBilders)/actions'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <AuthForm
      title="Login"
      action={login}
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
`}
                                            </CodeBlock>
                                        </motion.div>
                                    </motion.div>

                                    {/* Sign Up */}
                                    <motion.div variants={itemVariants}>
                                        <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Sign Up</h3>
                                        <motion.div whileHover={cardHover.hover}>
                                            <CodeBlock language="typescript" filename="signup/page.tsx">{
                                                `'use client';
import AuthForm from '@/components/(AuthBilders)/Form/AuthForm'
import { passwordSchema } from '../lib/(AuthBilders)/zod'
import { signUp } from '@/app/lib/(AuthBilders)/actions'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <AuthForm
      title="Sign Up"
      action={signUp}
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
        <section className="mt-8 text-gray-400">
          <p className="text-center">
            You already have an account? <Link href="/login" className="text-blue-500">Login</Link>
          </p>
        </section>
      }
    />
  )
}
`}
                                            </CodeBlock>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.section>

                            {/* Route Protection */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">🔐 Route Protection</h2>
                                <CodeBlock language="typescript" filename="middleware.ts">{`const protectedRoutes = ["/protected"];
const path = req.nextUrl.pathname;
const token = req.cookies.get("session")?.value;
if (protectedRoutes.includes(path) && !token) {
  return redirectToLogin(req);
} `}</CodeBlock>
                            </motion.section>

                            {/* API Protection */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">🔐 API Protection</h2>
                                <motion.div whileHover={cardHover.hover}>
                                    <CodeBlock language="typescript" filename="app/api/data/route.ts">{`export async function GET() {
  const decoded = await verifySession();
  if (!session) return new Response('Unauthorized', { status: 401 });
  return new Response(JSON.stringify({ uid: session.user_id }));
}`}</CodeBlock>
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
                                        Clone the Firebase template and launch your Next.js app with Firebase Auth now!
                                    </p>
                                    <motion.div className="flex flex-wrap gap-4" variants={containerVariants}>
                                        <motion.a href="https://github.com/Matdweb/authbilders-nextjs-firebase" target="_blank" rel="noopener noreferrer" variants={itemVariants} className="inline-flex items-center gap-2 px-6 py-3 bg-authbuilders-purple text-white rounded-xl hover:bg-authbuilders-purple-dark shadow-lg">
                                            <FaGithub className="w-5 h-5" /> View on GitHub
                                        </motion.a>
                                        <motion.a href="/docs/concepts/firebase" variants={itemVariants} className="inline-flex items-center gap-2 px-6 py-3 border border-authbuilders-purple text-authbuilders-purple rounded-xl hover:bg-authbuilders-purple/10 shadow-lg">
                                            <FaShieldAlt className="w-5 h-5" /> Learn Firebase Concepts
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
    );
}
