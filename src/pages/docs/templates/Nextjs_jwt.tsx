import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";
import { FaNodeJs, FaReact, FaDatabase, FaTools, FaLinux, FaApple, FaWindows, FaLock, FaCode, FaShieldAlt } from "react-icons/fa";

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

                        <h2 className="doc-heading">🚀 Setup Process</h2>
                        <ol className="list-decimal pl-6 mb-8">
                            <li>Ensure <code>git</code> and <code>node</code> are installed on your machine.</li>
                            <li>Clone the repository:
                                <CodeBlock language="bash" filename="Clone Repository">{
                                    `git clone https://github.com/Matdweb/authbilders-nextjs-jwt your-project-name
cd your-project-name`
                                }</CodeBlock>
                            </li>
                            <li>Install degit globally:
                                <CodeBlock language="bash" filename="degit">{
                                    `npm install -g degit`
                                }</CodeBlock>
                            </li>
                            <li>Install dependencies:
                                <CodeBlock language="bash" filename="Dependencies">{
                                    `npm install`
                                }</CodeBlock>
                            </li>
                            <li>Setup environment variables:
                                <CodeBlock language="bash" filename=".env.local">{
                                    `JWT_SECRET_KEY=your_secret
RESET_TOKEN_SECRET=your_reset_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000`
                                }</CodeBlock>
                            </li>
                            <li>Run development server:
                                <CodeBlock language="bash" filename="Run Dev Server">{
                                    `npm run dev`
                                }</CodeBlock>
                            </li>
                        </ol>

                        <h2 className="doc-heading">⚙️ Tech Stack</h2>
                        <ul className="grid grid-cols-2 gap-4 mb-8">
                            <li className="flex items-center gap-2"><FaReact className="text-sky-500" /> Next.js 14 (React 18)</li>
                            <li className="flex items-center gap-2"><FaNodeJs className="text-green-500" /> Node.js</li>
                            <li className="flex items-center gap-2"><FaCode /> TypeScript</li>
                            <li className="flex items-center gap-2"><FaShieldAlt /> JWT (Jose + jsonwebtoken)</li>
                            <li className="flex items-center gap-2"><FaDatabase /> JSON Mock File DB (for dev)</li>
                            <li className="flex items-center gap-2"><FaTools /> TailwindCSS, ShadCN UI</li>
                        </ul>

                        <h2 className="doc-heading">📂 Folder Structure</h2>
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

                        <h2 className="doc-heading">🖥️ OS Differences</h2>
                        <ul className="list-disc pl-6 mb-8">
                            <li className="flex items-center gap-2"><FaWindows /> Windows: Recommended to use Git Bash or WSL for best compatibility.</li>
                            <li className="flex items-center gap-2"><FaApple /> MacOS: Fully compatible out of the box.</li>
                            <li className="flex items-center gap-2"><FaLinux /> Linux: Fully compatible.</li>
                        </ul>

                        <h2 className="doc-heading">🔑 Extract Session</h2>
                        <h3 className="font-semibold mb-2">Server Side</h3>
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

                        <h3 className="font-semibold mb-2">Client Side</h3>
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

                        <h2 className="doc-heading">👤 Auth Flows</h2>
                        <h3 className="font-semibold mb-2">Sign In</h3>
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

                        <h3 className="font-semibold mb-2">Sign Up</h3>
                        <CodeBlock language="typescript" filename="actions.ts signup">{
                            `export async function signUp(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  await addUser({ email, password });
  await sendEmailVerification(email);
}`}
                        </CodeBlock>

                        <h3 className="font-semibold mb-2">Sign Out</h3>
                        <CodeBlock language="typescript" filename="actions.ts logout">{
                            `export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}`}
                        </CodeBlock>

                        <h2 className="doc-heading">🔐 Route Protection</h2>
                        <h3 className="font-semibold mb-2">Server Side</h3>
                        <CodeBlock language="typescript" filename="protected/page.tsx">{
                            `import { getSession } from '@/app/lib/(AuthBilders)/dal/session';
const decoded = await getSession();
if (!decoded) return <NotLoggedInPage />;
return <Dashboard user={decoded} />;`}
                        </CodeBlock>

                        <h3 className="font-semibold mb-2">Middleware</h3>
                        <CodeBlock language="typescript" filename="middleware.ts">{
                            `const protectedRoutes = ["/protected"];
const path = req.nextUrl.pathname;
const token = req.cookies.get("session")?.value;
if (protectedRoutes.includes(path) && !token) {
  return redirectToLogin(req);
}`}
                        </CodeBlock>

                        <h2 className="doc-heading">🔐 API Protection</h2>
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

                        <h2 className="doc-heading">⚠️ Important Considerations</h2>
                        <ul className="list-disc pl-6 space-y-3 mb-16">
                            <li>Use secure HTTP-only cookies to store sessions</li>
                            <li>Keep secrets out of codebase via environment variables</li>
                            <li>Rotate JWT secrets periodically</li>
                            <li>Apply CSRF protection if required</li>
                            <li>Always validate incoming requests</li>
                        </ul>
                    </DocContent>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Nextjs_jwt;
