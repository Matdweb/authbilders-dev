
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";

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

            <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-6 overflow-auto">
              <pre><code>{`src/
├── dal/
│   ├── index.ts          // DAL interface
│   ├── users.ts          // User operations
│   ├── sessions.ts       // Session management
│   ├── auth.ts           // Authentication logic
│   └── adapters/
│       ├── firebase.ts   // Firebase implementation
│       ├── mongodb.ts    // MongoDB implementation
│       └── mock.ts       // Mock for testing`}</code></pre>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Example Implementation</h2>
            <p className="leading-7 mb-4">
              Here's how a simple user DAL interface might look:
            </p>

            <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-6 overflow-auto">
              <pre><code>{`// dal/users.ts
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
}`}</code></pre>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Session Management</h2>
            <p className="leading-7 mb-4">
              The DAL should also handle session storage and retrieval:
            </p>

            <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-6 overflow-auto">
              <pre><code>{`// dal/sessions.ts
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
}`}</code></pre>
            </div>

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
