// app/docs/services/resend/page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";
import { motion } from "framer-motion";
import { itemVariants, cardVariants } from "@/lib/animations";

const ServiceResendDoc = () => {
    return (
        <div className="min-h-screen min-w-96 flex flex-col">
            <Navbar />
            <div className="lg:flex lg:flex-1 lg:container pt-14">
                <DocSidebar />
                <main className="flex-1">
                    <DocContent
                        title="Resend Email Service"
                        description="How to configure and use Resend for transactional email delivery in your project."
                    >
                        <motion.section variants={itemVariants}>
                            <h2 className="text-4xl font-bold mb-8 doc-heading pb-8">✉️ Resend API Key Setup</h2>

                            <motion.div
                                className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg space-y-6"
                                whileHover={cardVariants.hover}
                            >
                                <p className="text-md leading-relaxed text-slate-700 dark:text-slate-300">
                                    Resend is used for reliable email delivery. Here’s how to get started with your API key and use it in your template.
                                </p>

                                {/* Step-by-step */}
                                <ol className="list-decimal pl-5 space-y-4 text-slate-700 dark:text-slate-300">
                                    <li>
                                        <strong>Sign up / Log in:</strong>{" "}
                                        <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-authbuilders-purple hover:underline">
                                            https://resend.com
                                        </a>
                                    </li>
                                    <li>
                                        <strong>Navigate to:</strong>{" "}
                                        <a href="https://resend.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-authbuilders-purple hover:underline">
                                            Dashboard → API Keys
                                        </a>
                                    </li>
                                    <li>
                                        Click <code className="bg-muted px-1 rounded">Create API Key</code> → Choose{" "}
                                        <span className="text-green-600 font-medium">Sending access</span> → Copy your key.
                                    </li>
                                    <li>
                                        Add to your environment:
                                        <CodeBlock language="bash" filename=".env.local">{`RESEND_API_KEY=your_real_key_here`}</CodeBlock>
                                    </li>
                                </ol>

                                {/* Integration example */}
                                <h3 className="text-xl font-semibold mt-8 mb-2 ">🔌 Integration Example</h3>
                                <CodeBlock language="typescript" filename="app/api/send/route.ts">{`
import { Resend } from 'resend';
import { MyEmailTemplate } from '@/components/email/MyEmailTemplate';

export async function POST() {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  const { data, error } = await resend.emails.send({
    from: 'YourName <you@yourdomain.com>',
    to: ['user@example.com'],
    subject: 'Welcome to AuthBuilders!',
    react: MyEmailTemplate({ name: "User" }),
  });

  return Response.json(error ? { error } : data, { status: error ? 400 : 200 });
}
                `}</CodeBlock>

                                {/* Pro Tips */}
                                <motion.div whileHover={cardVariants.hover}>
                                    <div className="doc-callout-info">
                                        <p className="font-medium mb-2">💡 Pro Tips</p>
                                        <ul className="list-disc pl-6 text-sm space-y-1">
                                            <li>Use <strong>Sending access</strong> to avoid unnecessary permissions.</li>
                                            <li>Visit <a href="https://resend.com/domains" target="_blank" className="text-authbuilders-purple hover:underline">Dashboard → Domains</a> to verify your sender domain.</li>
                                            <li>Never expose your key in client-side code. Use <code>.env.local</code> and <code>process.env</code>.</li>
                                            <li>You can test with addresses like <code>delivered@resend.dev</code> or <code>bounced@resend.dev</code>.</li>
                                        </ul>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.section>
                    </DocContent>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ServiceResendDoc;
