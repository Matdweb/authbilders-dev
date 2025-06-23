import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
const cardHover = { hover: { scale: 1.02, y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", transition: { duration: 0.3 } } };
const iconHoverVariants = { hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } } };

export default function ServiceFirebase() {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Navbar />
            <div className="flex-1 pt-14">
                <div className="max-w-[1440px] mx-auto flex">
                    <DocSidebar />
                    <main className="flex-1 min-w-0">
                        <DocContent
                            title="Firebase Setup Guide"
                            description="Step‑by‑step integration of Firebase (Auth + Admin SDK) into your Next.js app."
                        >
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-12"
                            >

                                {/* 1) Account & Project */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">1️⃣ Firebase Account & Project</h2>
                                    <motion.div
                                        className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg"
                                        whileHover={cardHover.hover}
                                    >
                                        <ol className="list-decimal pl-5 space-y-4 text-slate-700 dark:text-slate-300">
                                            <li>Go to <a href="https://console.firebase.google.com" className="text-authbuilders-purple hover:underline">Firebase Console</a> and log in with Google.</li>
                                            <li>Click “Add project”, enter name, skip analytics, and create it.</li>
                                            <li>Note down your <strong>Project ID</strong>.</li>
                                        </ol>
                                    </motion.div>
                                </motion.section>

                                {/* 2) Add Web App */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">2️⃣ Add Web App & Get Env Vars</h2>
                                    <motion.div
                                        className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg"
                                        whileHover={cardHover.hover}
                                    >
                                        <p className="mb-4 text-slate-700 dark:text-slate-300">
                                            Register a web app in your Firebase Project to get your configuration.
                                        </p>
                                        <CodeBlock language="bash" filename=".env.local">{`
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
                    `}</CodeBlock>
                                    </motion.div>
                                </motion.section>

                                {/* 3) Enable Auth Providers */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">3️⃣ Enable Auth Providers</h2>
                                    <motion.div
                                        className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg"
                                        whileHover={cardHover.hover}
                                    >
                                        <ul className="list-disc pl-6 space-y-3 text-slate-700 dark:text-slate-300">
                                            <li>Go to Authentication → ➕ Get Started.</li>
                                            <li>Enable Email/Password provider.</li>
                                            <li>Enable Google (add support email).</li>
                                            <li>Optional: enable GitHub (requires Client ID/Secret).</li>
                                        </ul>
                                    </motion.div>
                                </motion.section>

                                {/* 4) Admin SDK */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">4️⃣ Configure Admin SDK</h2>
                                    <motion.div
                                        className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg"
                                        whileHover={cardHover.hover}
                                    >
                                        <ol className="list-decimal pl-6 space-y-3 text-slate-700 dark:text-slate-300">
                                            <li>Navigate to Project settings → Service Accounts → Generate new private key.</li>
                                            <li>Save JSON safely and populate `.env.local` (server-side only):</li>
                                        </ol>
                                        <CodeBlock language="bash" filename=".env.local server">{`
FIREBASE_CLIENT_EMAIL="..."
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----"
                    `}</CodeBlock>
                                        <p className="mt-4 text-sm text-muted-foreground">*Never commit private keys—use a secrets manager or CI/CD environment variables.*</p>
                                    </motion.div>
                                </motion.section>

                                {/* 5) Install Admin SDK */}
                                <motion.section variants={itemVariants}>
                                    <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">5️⃣ Install & Initialize Admin SDK</h2>
                                    <motion.div
                                        className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg"
                                        whileHover={cardHover.hover}
                                    >
                                        <CodeBlock language="bash" filename="terminal">{`
npm install firebase-admin
                    `}</CodeBlock>
                                        <CodeBlock language="typescript" filename="lib/firebaseAdmin.ts">{`
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_KEY!);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const verifyIdToken = (token: string) => admin.auth().verifyIdToken(token);
export const revokeRefreshTokens = (uid: string) => admin.auth().revokeRefreshTokens(uid);
                    `}</CodeBlock>
                                    </motion.div>
                                </motion.section>

                                {/* Summary */}
                                <motion.section variants={itemVariants}>
                                    <motion.div
                                        className="bg-gradient-to-r from-authbuilders-purple/10 to-authbuilders-purple-light/10 border border-authbuilders-purple/20 rounded-2xl p-6 shadow-lg"
                                        whileHover={cardHover.hover}
                                    >
                                        <h3 className="text-2xl font-bold mb-4 text-authbuilders-purple">📘 Setup Summary</h3>
                                        <ul className="list-disc pl-6 text-slate-700 dark:text-slate-300 space-y-2">
                                            <li>✅ Firebase web app registered + Auth enabled</li>
                                            <li>✅ Env vars set for both client & server</li>
                                            <li>✅ Admin SDK initialized securely</li>
                                            <li>✅ Protected your API with verified Firebase tokens</li>
                                        </ul>
                                    </motion.div>
                                </motion.section>

                                {/* Next Steps */}
                                <motion.section variants={itemVariants} className="pb-16">
                                    <motion.div
                                        className="bg-gradient-to-r from-authbuilders-purple/10 to-authbuilders-purple-light/10 border border-authbuilders-purple/20 rounded-2xl p-8 shadow-lg"
                                        whileHover={cardHover.hover}
                                    >
                                        <h3 className="text-2xl font-bold mb-6 text-authbuilders-purple flex items-center gap-3">
                                            <motion.div variants={iconHoverVariants} whileHover="hover">
                                                <FaGithub className="w-8 h-8" />
                                            </motion.div>
                                            🚀 Continue with Security Concepts
                                        </h3>
                                        <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
                                            Now that Firebase is integrated, explore how to secure user roles, implement server-side sessions, or enable multi‑factor authentication.
                                        </p>
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
}
