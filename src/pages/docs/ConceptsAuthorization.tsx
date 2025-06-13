
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";

const ConceptsAuthorization = () => {
  return (
    <div className="min-h-screen min-w-96 flex flex-col">
      <Navbar />
      <div className="lg:flex lg:flex-1 lg:container pt-14">
        <DocSidebar />
        <main className="flex-1">
          <DocContent
            title="Authorization & RBAC"
            description="Implementing role-based access control and permission systems for secure applications."
          >
            <h2 className="text-2xl font-bold mt-8 mb-4">Understanding Authorization</h2>
            <p className="leading-7 mb-4">
              Authorization determines what an authenticated user can do within your application.
              It's the second step in the security process, following authentication.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">💡 Key Concept</h3>
              <p className="text-blue-700 dark:text-blue-300">
                Authentication asks "Who are you?" while Authorization asks "What are you allowed to do?"
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Authorization Models</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">1. Role-Based Access Control (RBAC)</h3>
            <p className="leading-7 mb-4">
              RBAC assigns permissions to roles, and roles to users. It's the most common authorization model.
            </p>

            <CodeBlock language="typescript" header={false}>
              {`// Example RBAC structure
const roles = {
  admin: {
    permissions: ['read', 'write', 'delete', 'manage_users']
  },
  editor: {
    permissions: ['read', 'write']
  },
  viewer: {
    permissions: ['read']
  }
};

const user = {
  id: '123',
  email: 'john@example.com',
  roles: ['editor']
  };`}
            </CodeBlock>

            <h3 className="text-xl font-semibold mt-6 mb-3">2. Attribute-Based Access Control (ABAC)</h3>
            <p className="leading-7 mb-4">
              ABAC uses attributes (user, resource, environment) to make authorization decisions. More flexible but complex.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3. Access Control Lists (ACL)</h3>
            <p className="leading-7 mb-4">
              ACL grants specific permissions to specific users for specific resources. Good for fine-grained control.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Implementing RBAC</h2>
            <p className="leading-7 mb-4">
              Here's how to implement a basic RBAC system:
            </p>

            <CodeBlock language="typescript" filename="types/auth.ts">{`
export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  email: string;
  roles: Role[];
}

// utils/authorization.ts
export function hasPermission(user: User, permission: string): boolean {
  return user.roles.some(role =>
    role.permissions.some(p => p.name === permission)
  );
}

export function hasRole(user: User, roleName: string): boolean {
  return user.roles.some(role => role.name === roleName);
}

// Example usage
if (hasPermission(currentUser, 'delete_post')) {
  // Allow user to delete posts
}`}</CodeBlock>

            <h2 className="text-2xl font-bold mt-8 mb-4">Protected Routes</h2>
            <p className="leading-7 mb-4">
              Implement route-level authorization to protect sensitive pages:
            </p>

            <CodeBlock language="typescript" filename="components/ProtectedRoute.tsx">{`
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredPermission, 
  requiredRole 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (requiredPermission && !hasPermission(user, requiredPermission)) {
    return <AccessDenied />;
  }
  
  if (requiredRole && !hasRole(user, requiredRole)) {
    return <AccessDenied />;
  }
  
  return <>{children}</>;
}

// Usage in routes
<Route 
  path="/admin" 
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>`}
            </CodeBlock>

            <h2 className="text-2xl font-bold mt-8 mb-4">API Authorization</h2>
            <p className="leading-7 mb-4">
              Protect your API endpoints with middleware that checks user permissions:
            </p>

            <CodeBlock language="typescript" filename="middleware/auth.ts">{`
export function requirePermission(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // Set by authentication middleware
    
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!hasPermission(user, permission)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
}

// Usage
app.delete('/api/posts/:id', 
  authenticateToken,
  requirePermission('delete_post'),
  deletePost
  );`}
            </CodeBlock>

            <h2 className="text-2xl font-bold mt-8 mb-4">Best Practices</h2>
            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold">Principle of Least Privilege</h3>
                <p className="text-sm text-muted-foreground">
                  Grant users the minimum permissions necessary to perform their tasks.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold">Centralize Authorization Logic</h3>
                <p className="text-sm text-muted-foreground">
                  Keep authorization logic in reusable functions and middleware.
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-semibold">Regular Permission Audits</h3>
                <p className="text-sm text-muted-foreground">
                  Regularly review and update user permissions to maintain security.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold">Fail Securely</h3>
                <p className="text-sm text-muted-foreground">
                  When in doubt, deny access rather than allowing it.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-16 mb-6 flex items-center gap-2">
              {/* <span className="inline-block w-3 h-3 bg-purple-500 rounded-full"></span>  */}
              How does AuthBuilders do it?
            </h2>

            <p className="leading-7 mb-4">
              AuthBuilders combines route protection, middleware authorization, and API-level guards across all templates, while adapting to the selected provider.
            </p>


            {/* 🟣 Server-Side Route Protection (Firebase Template) */}
            <div className="border border-border rounded-lg p-4 mt-4">
              <h3 className="font-semibold mb-2">🟣 Server-Side Route Protection:</h3>
              <p className="text-sm text-muted-foreground mb-4">nextjs-firebase template</p>
              <CodeBlock language="typescript" filename="/protected/page.tsx">{`
import { verifySession } from "@/app/lib/(AuthBilders)/dal";
const decoded = await verifySession();
if (!decoded) {
  return <NotLoggedInPage />;
}
return <Dashboard user={decoded} />;
  `}</CodeBlock>
            </div>

            {/* 🟣 API Endpoint Protection */}
            <div className="border border-border rounded-lg p-4 mt-4">
              <h3 className="font-semibold mb-2">🟣 API Endpoint Protection:</h3>
              <p className="text-sm text-muted-foreground mb-4">nextjs-firebase template</p>
              <CodeBlock language="typescript" filename="/api/data/route.ts">{`
import { verifySession } from "@/app/lib/(AuthBilders)/dal";
const decoded = await verifySession();
if (!decoded) {
  return Response.json({ error: "Unauthorized", code: 401 });
}
return Response.json({
  message: "Hello from API route!",
  user_id: decoded.user_id,
  timestamp: new Date().toISOString(),
  code: 200
});
  `}</CodeBlock>
            </div>

            {/* 🟣 Middleware Protection */}
            <div className="border border-border rounded-lg p-4 mt-4">
              <h3 className="font-semibold mb-2">🟣 Middleware Protection:</h3>
              <p className="text-sm text-muted-foreground mb-4">nextjs-firebase & nextjs-jwt templates</p>
              <CodeBlock language="typescript" filename="middleware.ts">{`
const protectedRoutes = ["/protected"];
const path = req.nextUrl.pathname;
const token = req.cookies.get("session")?.value;

if (protectedRoutes.includes(path) && !token) {
  return redirectToLogin(req);
}
  `}</CodeBlock>
            </div>

            {/* 🟣 Server Protection (JWT Template) */}
            <div className="border border-border rounded-lg p-4 mt-4">
              <h3 className="font-semibold mb-2">🟣 Server Protection:</h3>
              <p className="text-sm text-muted-foreground mb-4">nextjs-jwt template</p>
              <CodeBlock language="typescript" filename="dal/session.ts">{`
"use server";
import { cookies } from "next/headers";
import { decrypt } from "../utils/jwt";

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
  `}</CodeBlock>
            </div>

            <div className="bg-muted p-4 rounded-lg mt-8">
              <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
              <p>
                Learn about <a href="/docs/concepts/jwt" className="text-authbuilders-purple hover:underline">JWT Deep Dive</a> for token-based authorization or
                explore <a href="/docs/security/backend" className="text-authbuilders-purple hover:underline">Backend Security Layers</a> for implementation details.
              </p>
            </div>

          </DocContent>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ConceptsAuthorization;
