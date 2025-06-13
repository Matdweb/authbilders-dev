
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";
import { 
    FaNodeJs, 
    FaReact, 
    FaDatabase, 
    FaTools, 
    FaLinux, 
    FaApple, 
    FaWindows, 
    FaLock, 
    FaCode, 
    FaShieldAlt,
    FaGithub
} from "react-icons/fa";
import { 
    SiNextdotjs, 
    SiTypescript, 
    SiTailwindcss, 
    SiJsonwebtokens,
    SiVercel 
} from "react-icons/si";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4 }
    }
};

const iconHoverVariants = {
    hover: { 
        scale: 1.1, 
        rotate: 5,
        transition: { duration: 0.2 }
    }
};

const cardVariants = {
    hover: {
        scale: 1.02,
        y: -5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        transition: { duration: 0.3 }
    }
};

const Nextjs_jwt = () => {
    return (
        <div className="min-h-screen min-w-96 flex flex-col">
            <Navbar />
            <div className="lg:flex lg:flex-1 lg:container pt-14">
                <DocSidebar />
                <main className="flex-1">
                    <DocContent
                        title="Next.js JWT Template"
                        description="Complete documentation for the Next.js + JWT Authentication Template."
                    >
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-12"
                        >
                            {/* Setup Process */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-authbuilders-purple to-authbuilders-purple-light bg-clip-text text-transparent">
                                    🚀 Setup Process
                                </h2>
                                <motion.div 
                                    className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg"
                                    whileHover={cardVariants.hover}
                                >
                                    <ol className="list-decimal pl-8 space-y-6">
                                        {[
                                            "Ensure git and node are installed on your machine.",
                                            "Clone the repository:",
                                            "Install degit globally:",
                                            "Install dependencies:", 
                                            "Setup environment variables:",
                                            "Run development server:"
                                        ].map((step, index) => (
                                            <motion.li 
                                                key={index}
                                                variants={listItemVariants}
                                                className="text-lg leading-relaxed text-slate-700 dark:text-slate-300"
                                            >
                                                {step}
                                                {index === 1 && (
                                                    <CodeBlock language="bash" filename="Clone Repository">{
                                                        `git clone https://github.com/Matdweb/authbilders-nextjs-jwt your-project-name
cd your-project-name`
                                                    }</CodeBlock>
                                                )}
                                                {index === 2 && (
                                                    <CodeBlock language="bash" filename="degit">{
                                                        `npm install -g degit`
                                                    }</CodeBlock>
                                                )}
                                                {index === 3 && (
                                                    <CodeBlock language="bash" filename="Dependencies">{
                                                        `npm install`
                                                    }</CodeBlock>
                                                )}
                                                {index === 4 && (
                                                    <CodeBlock language="bash" filename=".env.local">{
                                                        `JWT_SECRET_KEY=your_secret
RESET_TOKEN_SECRET=your_reset_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000`
                                                    }</CodeBlock>
                                                )}
                                                {index === 5 && (
                                                    <CodeBlock language="bash" filename="Run Dev Server">{
                                                        `npm run dev`
                                                    }</CodeBlock>
                                                )}
                                            </motion.li>
                                        ))}
                                    </ol>
                                </motion.div>
                            </motion.section>

                            {/* Tech Stack */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-authbuilders-purple to-authbuilders-purple-light bg-clip-text text-transparent">
                                    ⚙️ Tech Stack
                                </h2>
                                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { icon: SiNextdotjs, text: "Next.js 14 (React 18)", color: "text-black dark:text-white" },
                                        { icon: FaNodeJs, text: "Node.js", color: "text-green-500" },
                                        { icon: SiTypescript, text: "TypeScript", color: "text-blue-500" },
                                        { icon: SiJsonwebtokens, text: "JWT (Jose + jsonwebtoken)", color: "text-purple-500" },
                                        { icon: FaDatabase, text: "JSON Mock File DB (for dev)", color: "text-orange-500" },
                                        { icon: SiTailwindcss, text: "TailwindCSS, ShadCN UI", color: "text-cyan-500" }
                                    ].map((tech, index) => (
                                        <motion.div
                                            key={index}
                                            variants={listItemVariants}
                                            whileHover={cardVariants.hover}
                                            className="flex items-center gap-4 p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300"
                                        >
                                            <motion.div variants={iconHoverVariants} whileHover="hover">
                                                <tech.icon className={`w-10 h-10 ${tech.color}`} />
                                            </motion.div>
                                            <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
                                                {tech.text}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.section>

                            {/* Folder Structure */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-authbuilders-purple to-authbuilders-purple-light bg-clip-text text-transparent">
                                    📂 Folder Structure
                                </h2>
                                <motion.div 
                                    className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg"
                                    whileHover={cardVariants.hover}
                                >
                                    <CodeBlock language="bash" filename="src Structure">{
                                        `src/
├── app/
│   ├── api/
│   ├── lib/
│   │   ├── (AuthBilders)/
│   │   │   ├── actions
│   │   │   ├── dal
│   │   │   ├── utils
│   │   │   ├── zod
│   │   └── definitions.ts
│   ├── components/
│   │   └── (AuthBilders)
│   └── routes/`
                                    }</CodeBlock>
                                </motion.div>
                            </motion.section>

                            {/* OS Differences */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-authbuilders-purple to-authbuilders-purple-light bg-clip-text text-transparent">
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
                                            whileHover={cardVariants.hover}
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
                                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-authbuilders-purple to-authbuilders-purple-light bg-clip-text text-transparent">
                                    🔑 Extract Session
                                </h2>
                                
                                <div className="space-y-8">
                                    <motion.div variants={itemVariants}>
                                        <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Server Side</h3>
                                        <motion.div whileHover={cardVariants.hover}>
                                            <CodeBlock language="typescript" filename="dal/session.ts">{
                                                `"use server";
import { cookies } from "next/headers";
import { decrypt } from "../utils/jwt";

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}`}
                                            </CodeBlock>
                                        </motion.div>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Client Side</h3>
                                        <motion.div whileHover={cardVariants.hover}>
                                            <CodeBlock language="typescript" filename="hooks/useSession.ts">{
                                                `import { useEffect, useState } from 'react';

export function useSession() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    fetch('/api/session').then(res => res.json()).then(data => setSession(data));
  }, []);
  return session;
}`}
                                            </CodeBlock>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.section>

                            {/* Auth Flows */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-authbuilders-purple to-authbuilders-purple-light bg-clip-text text-transparent">
                                    👤 Auth Flows
                                </h2>
                                
                                <div className="space-y-10">
                                    {/* Sign In */}
                                    <motion.div variants={itemVariants}>
                                        <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Sign In</h3>
                                        <motion.div whileHover={cardVariants.hover}>
                                            <CodeBlock language="typescript" filename="actions.ts login">{
                                                `export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const user = await validateUser(email, password);
  if (!user) throw new Error('Invalid credentials');
  const token = await encrypt({ user, expires: new Date(Date.now() + 100000) });
  cookies().set("session", token, { httpOnly: true });
}`}
                                            </CodeBlock>
                                        </motion.div>
                                    </motion.div>

                                    {/* Sign Up */}
                                    <motion.div variants={itemVariants}>
                                        <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Sign Up</h3>
                                        <motion.div whileHover={cardVariants.hover}>
                                            <CodeBlock language="typescript" filename="actions.ts signup">{
                                                `export async function signUp(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  await addUser({ email, password });
  await sendEmailVerification(email);
}`}
                                            </CodeBlock>
                                        </motion.div>
                                    </motion.div>

                                    {/* Sign Out */}
                                    <motion.div variants={itemVariants}>
                                        <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Sign Out</h3>
                                        <motion.div whileHover={cardVariants.hover}>
                                            <CodeBlock language="typescript" filename="actions.ts logout">{
                                                `export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}`}
                                            </CodeBlock>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.section>

                            {/* Route Protection */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-authbuilders-purple to-authbuilders-purple-light bg-clip-text text-transparent">
                                    🔐 Route Protection
                                </h2>
                                
                                <div className="space-y-10">
                                    <motion.div variants={itemVariants}>
                                        <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Server Side</h3>
                                        <motion.div whileHover={cardVariants.hover}>
                                            <CodeBlock language="typescript" filename="protected/page.tsx">{
                                                `import { getSession } from '@/app/lib/(AuthBilders)/dal/session';
const decoded = await getSession();
if (!decoded) return <NotLoggedInPage />;
return <Dashboard user={decoded} />;`}
                                            </CodeBlock>
                                        </motion.div>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">Middleware</h3>
                                        <motion.div whileHover={cardVariants.hover}>
                                            <CodeBlock language="typescript" filename="middleware.ts">{
                                                `const protectedRoutes = ["/protected"];
const path = req.nextUrl.pathname;
const token = req.cookies.get("session")?.value;
if (protectedRoutes.includes(path) && !token) {
  return redirectToLogin(req);
}`}
                                            </CodeBlock>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.section>

                            {/* API Protection */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-authbuilders-purple to-authbuilders-purple-light bg-clip-text text-transparent">
                                    🔐 API Protection
                                </h2>
                                <motion.div whileHover={cardVariants.hover}>
                                    <CodeBlock language="typescript" filename="api/data/route.ts">{
                                        `import { getSession } from '@/app/lib/(AuthBilders)/dal/session';
export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Unauthorized", code: 401 });
  }
  return Response.json({ message: "Hello", user_id: session?.user?.id });
}`}
                                    </CodeBlock>
                                </motion.div>
                            </motion.section>

                            {/* Important Considerations */}
                            <motion.section variants={itemVariants}>
                                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-authbuilders-purple to-authbuilders-purple-light bg-clip-text text-transparent">
                                    ⚠️ Important Considerations
                                </h2>
                                <motion.div 
                                    className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-700 shadow-lg"
                                    whileHover={cardVariants.hover}
                                >
                                    <ul className="space-y-4">
                                        {[
                                            "Use secure HTTP-only cookies to store sessions",
                                            "Keep secrets out of codebase via environment variables",
                                            "Rotate JWT secrets periodically",
                                            "Apply CSRF protection if required",
                                            "Always validate incoming requests"
                                        ].map((item, index) => (
                                            <motion.li 
                                                key={index}
                                                variants={listItemVariants}
                                                className="flex items-start gap-3 text-lg text-yellow-800 dark:text-yellow-200"
                                            >
                                                <motion.div variants={iconHoverVariants} whileHover="hover">
                                                    <FaShieldAlt className="w-5 h-5 mt-1 text-yellow-600 dark:text-yellow-400" />
                                                </motion.div>
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </motion.section>

                            {/* Next Steps */}
                            <motion.section variants={itemVariants} className="pb-16">
                                <motion.div 
                                    className="bg-gradient-to-r from-authbuilders-purple/10 to-authbuilders-purple-light/10 border border-authbuilders-purple/20 rounded-2xl p-8 shadow-lg"
                                    whileHover={cardVariants.hover}
                                >
                                    <h3 className="text-2xl font-bold mb-6 text-authbuilders-purple flex items-center gap-3">
                                        <motion.div variants={iconHoverVariants} whileHover="hover">
                                            <FaGithub className="w-8 h-8" />
                                        </motion.div>
                                        🚀 Ready to Get Started?
                                    </h3>
                                    <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
                                        Clone this template and start building your authenticated Next.js application with JWT tokens today!
                                    </p>
                                    <motion.div 
                                        className="flex flex-wrap gap-4"
                                        variants={containerVariants}
                                    >
                                        <motion.a 
                                            href="https://github.com/Matdweb/authbilders-nextjs-jwt" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-authbuilders-purple text-white rounded-xl hover:bg-authbuilders-purple-dark transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                                        >
                                            <FaGithub className="w-5 h-5" />
                                            View on GitHub
                                        </motion.a>
                                        <motion.a 
                                            href="/docs/concepts/jwt" 
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="inline-flex items-center gap-2 px-6 py-3 border border-authbuilders-purple text-authbuilders-purple rounded-xl hover:bg-authbuilders-purple/10 transition-all duration-300 font-medium"
                                        >
                                            <SiJsonwebtokens className="w-5 h-5" />
                                            Learn JWT Concepts
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
};

export default Nextjs_jwt;
