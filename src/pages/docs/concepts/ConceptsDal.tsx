
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";

const ConceptsDal = () => {
  return (
    <div className="min-h-screen min-w-96 flex flex-col">
      <Navbar />
      <div className="lg:flex lg:flex-1 lg:container pt-14">
        <DocSidebar />
        <main className="flex-1">
          <DocContent
            title="DAL (Data Access Layer)"
            description="Understanding how to structure your data access layer for secure and maintainable authentication systems."
          >
            <h2 className="text-2xl font-bold mt-8 mb-4">What is a Data Access Layer?</h2>
            <p className="leading-7 mb-4">
              A Data Access Layer (DAL) is an abstraction layer that separates your business logic from data storage operations.
              In authentication systems, the DAL handles user data, sessions, and security-related information.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Why Use a DAL?</h2>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">🔒 Security</h3>
                <p className="text-sm text-muted-foreground">
                  Centralized data access makes it easier to implement security measures and audit data operations.
                </p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">🔄 Flexibility</h3>
                <p className="text-sm text-muted-foreground">
                  Switch between different databases or storage solutions without changing business logic.
                </p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">🧪 Testability</h3>
                <p className="text-sm text-muted-foreground">
                  Mock the DAL for unit testing without requiring a real database connection.
                </p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">🏗️ Maintainability</h3>
                <p className="text-sm text-muted-foreground">
                  Organize database operations in a single layer for easier maintenance and debugging.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">DAL Structure</h2>
            <p className="leading-7 mb-4">
              A typical authentication DAL includes the following components:
            </p>

            <CodeBlock language="bash" header={false}>
              {`src/
├── dal/
│   ├── index.ts          // DAL interface
│   ├── users.ts          // User operations
│   ├── sessions.ts       // Session management
│   ├── auth.ts           // Authentication logic
│   └── adapters/
│       ├── firebase.ts   // Firebase implementation
│       ├── mongodb.ts    // MongoDB implementation
│       └── mock.ts       // Mock for testing`}
            </CodeBlock>

            <h2 className="text-2xl font-bold mt-8 mb-4">Example Implementation</h2>
            <p className="leading-7 mb-4">
              Here's how a simple user DAL interface might look:
            </p>

            <CodeBlock language="javascript" filename="dal/users.ts">{`
export interface UserDAL {
  createUser(userData: CreateUserInput): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
}

// Example Firebase implementation
export class FirebaseUserDAL implements UserDAL {
  async createUser(userData: CreateUserInput): Promise<User> {
    const userRef = await db.collection('users').add({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return { id: userRef.id, ...userData };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const snapshot = await db
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();
      
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  }
}`}
            </CodeBlock>

            <h2 className="text-2xl font-bold mt-8 mb-4">Session Management</h2>
            <p className="leading-7 mb-4">
              The DAL should also handle session storage and retrieval:
            </p>

            <CodeBlock language="javascript" filename="dal/sessions.ts">{`
export interface SessionDAL {
  createSession(userId: string, expiresAt: Date): Promise<Session>;
  getSession(sessionId: string): Promise<Session | null>;
  updateSession(sessionId: string, data: Partial<Session>): Promise<void>;
  deleteSession(sessionId: string): Promise<void>;
  deleteAllUserSessions(userId: string): Promise<void>;
}

// Example implementation
export class FirebaseSessionDAL implements SessionDAL {
  async createSession(userId: string, expiresAt: Date): Promise<Session> {
    const sessionData = {
      userId,
      expiresAt,
      createdAt: new Date(),
      isActive: true
    };
    
    const sessionRef = await db.collection('sessions').add(sessionData);
    return { id: sessionRef.id, ...sessionData };
  }
}`}
            </CodeBlock>

            <h2 className="text-2xl font-bold mt-8 mb-4">Best Practices</h2>
            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold">Use Interfaces</h3>
                <p className="text-sm text-muted-foreground">
                  Define clear interfaces for your DAL to ensure consistency across different implementations.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold">Handle Errors Gracefully</h3>
                <p className="text-sm text-muted-foreground">
                  Implement proper error handling and logging within your DAL methods.
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-semibold">Validate Input</h3>
                <p className="text-sm text-muted-foreground">
                  Always validate and sanitize input data before database operations.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold">Connection Management</h3>
                <p className="text-sm text-muted-foreground">
                  Properly manage database connections and implement connection pooling where appropriate.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">How does AuthBuilders do it?</h2>
            <p className="leading-7 mb-4">
              AuthBuilders applies a lightweight but highly scalable DAL implementation depending on the template and tech stack you choose.
              Regardless of using Firebase, JWT or any database, the DAL always exposes a consistent interface to your authentication system.
            </p>

            <div className="space-y-8">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">🟣 nextjs-firebase template:</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Firebase Admin SDK handles sessions and users directly. AuthBuilders wraps these calls inside server functions:
                </p>
                <CodeBlock language="typescript" filename="lib/dal.ts">{`
'use server';
import { cache } from 'react';
import { verifyIdToken } from './firebase/firebase-admin';
import { cookies } from 'next/headers';

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value || "";
  const decoded = await verifyIdToken(token);
  return decoded;
});`}
                </CodeBlock>
                <p className="text-sm text-muted-foreground">
                  Firebase’s native user management handles password resets, email verification and user creation.
                </p>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">🟣 nextjs-jwt template:</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Some AuthBuilders templates uses a fully mocked file-based JSON database for prototyping custom databases.
                </p>
                <CodeBlock language="typescript" filename="dal/queries.ts">{`
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import { generateUID } from '../utils/uuid';

const USERS_PATH = path.join(process.cwd(), 'src/app/lib/(AuthBilders)/data/users.json');

export const getAllUsers = (): User[] => {
  const jsonData = fs.readFileSync(USERS_PATH, 'utf-8');
  return JSON.parse(jsonData) as User[];
};

export const addUser = async ({ email, password }: { email: string; password: string; }) => {
  const hash = await bcrypt.hash(password, 10);
  const newUser = { id: generateUID(), email, password: hash, email_verified: false };
  const users = getAllUsers();
  users.push(newUser);
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
  return newUser;
};`}
                </CodeBlock>
                <p className="text-sm text-muted-foreground">
                  This model allows local testing while remaining fully portable to any production database like MongoDB or PostgreSQL.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Benefits of AuthBuilders DAL</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Unified interface:</strong> Same calling pattern across Firebase, JWT or any adapter.</li>
              <li><strong>Environment adaptable:</strong> Easily move from mock DB to production-grade DBs.</li>
              <li><strong>Secure session handling:</strong> Sessions are abstracted depending on provider (cookies, Firebase, JWT).</li>
              <li><strong>Full TypeScript support:</strong> Every DAL exposes strong typings for users and sessions.</li>
            </ul>

            <div className="bg-muted p-4 rounded-lg mt-8">
              <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
              <p>
                Learn about <a href="/docs/concepts/sessions" className="text-authbuilders-purple hover:underline">Session Management</a> or
                explore <a href="/docs/security/backend" className="text-authbuilders-purple hover:underline">Backend Security Layers</a> to implement proper security measures.
              </p>
            </div>
          </DocContent>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ConceptsDal;
