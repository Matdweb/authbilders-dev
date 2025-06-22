
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";

const ConceptsJwt = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-1 pt-14">
        <div className="max-w-[1440px] mx-auto flex">
          <DocSidebar />
          <main className="flex-1 min-w-0">
            <DocContent
              title="JWT Deep Dive"
              description="Master JSON Web Tokens for secure, stateless authentication in modern web applications."
            >
              <h2 className="doc-heading">What are JSON Web Tokens?</h2>
              <p className="doc-paragraph">
                JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims securely between two parties.
                They're digitally signed, making them tamper-proof and perfect for authentication and information exchange.
              </p>

              <div className="doc-callout-info">
                <h3 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">
                  🔐 Security First
                </h3>
                <p className="text-blue-700 dark:text-blue-300">
                  JWTs are cryptographically signed, ensuring data integrity and authenticity. They can be signed using a secret (HMAC) or a public/private key pair (RSA/ECDSA).
                </p>
              </div>

              <h2 className="doc-heading">JWT Structure</h2>
              <p className="doc-paragraph">
                A JWT consists of three parts separated by dots (.), which are:
              </p>

              <div className="grid gap-6 md:grid-cols-3 mb-8">
                <div className="border border-border rounded-lg p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                  <h3 className="font-semibold mb-3 text-red-800 dark:text-red-200">Header</h3>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Contains metadata about the token, including the signing algorithm and token type.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                  <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Payload</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Contains the claims - statements about an entity (user) and additional data.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                  <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Signature</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Used to verify the sender and ensure the message wasn't changed along the way.
                  </p>
                </div>
              </div>

              <h3 className="doc-subheading">Example JWT Structure</h3>

              <CodeBlock language="typescript" filename="Header (Base64URL encoded)">{`
{	
  "alg": "HS256",
  "typ": "JWT"
}
`}</CodeBlock>

              <CodeBlock language="typescript" filename="Payload (Base64URL encoded)">{`
{
  "sub": "1234567890",
  "name": "John Doe", 
  "email": "john@example.com",
  "exp": 1516242622
}
`}</CodeBlock>

              <CodeBlock language="typescript" filename="Signature">{`
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
`}</CodeBlock>

              <CodeBlock language="typescript" filename="Final JWT">{`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
`}</CodeBlock>

              <h2 className="doc-heading">JWT vs Sessions</h2>
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold mb-4 text-green-600 dark:text-green-400">✅ JWT Advantages</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>Stateless - no server storage needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>Scalable across multiple servers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>Contains user information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>Cross-domain friendly</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold mb-4 text-yellow-600 dark:text-yellow-400">⚠️ JWT Considerations</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Larger payload than session IDs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Cannot be easily revoked</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Sensitive data exposure risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Token replay attacks possible</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="doc-heading">Implementation Guide</h2>

              <h3 className="doc-subheading">Creating JWTs</h3>

              <CodeBlock language="typescript" filename="jwt.ts">{`
import jwt from 'jsonwebtoken';

function createToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256' });
}
              `}</CodeBlock>

              <CodeBlock language="typescript" filename="Usage">{`
const token = createToken({
  id: '123',
  email: 'john@example.com',
  name: 'John Doe'
});
`}</CodeBlock>

              <h3 className="doc-subheading">Verifying JWTs</h3>

              <CodeBlock language="typescript" filename="jwt.ts">{`
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { success: true, payload: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
              `}</CodeBlock>

              <CodeBlock language="typescript" filename="Middleware">{`
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const result = verifyToken(token);
  
  if (!result.success) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }

  req.user = result.payload;
  next();
}
`}</CodeBlock>

              <h3 className="doc-subheading">Frontend Usage</h3>
              <CodeBlock language="typescript" filename="jwt.ts">{`
function loginUser(credentials) {
  return fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }).then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        return data.user;
      }
      throw new Error('Login failed');
    });
}
              `}</CodeBlock>

              <h2 className="doc-heading">Security Best Practices</h2>
              <div className="space-y-6 mb-8">
                <div className="doc-callout-error">
                  <h3 className="font-semibold mb-2 text-red-800 dark:text-red-200">🔒 Secret Management</h3>
                  <p className="text-red-700 dark:text-red-300 mb-2">
                    Use strong, random secrets for signing JWTs. Store them securely and rotate them regularly.
                  </p>
                  <div className="bg-red-100 dark:bg-red-900/30 rounded p-3 font-mono text-sm">
                    <code>JWT_SECRET=your-256-bit-secret-key-here</code>
                  </div>
                </div>

                <div className="doc-callout-warning">
                  <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">⏰ Token Expiration</h3>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    Always set reasonable expiration times. Short-lived tokens (15-30 minutes) with refresh token patterns are recommended for sensitive applications.
                  </p>
                </div>

                <div className="doc-callout-info">
                  <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">🍪 Storage Security</h3>
                  <p className="text-blue-700 dark:text-blue-300">
                    Consider using httpOnly cookies instead of localStorage for token storage to prevent XSS attacks.
                  </p>
                </div>
              </div>

              <h3 className="doc-subheading">Refresh Token Pattern</h3>

              <CodeBlock language="typescript" filename="Session.ts">{`
async function refreshAccessToken() {
  const response = await fetch('/api/refresh', {
    method: 'POST',
    credentials: 'include'
  });
  const data = await response.json();
  return data.accessToken;
}
              `}</CodeBlock>

              <h2 className="doc-heading">How does AuthBuilders do it?</h2>

              <div className="border border-border rounded-lg p-4 mt-4">
                <h3 className="font-semibold mb-2">🟣 JWT Handling & Token Utilities:</h3>
                <p className="text-sm text-muted-foreground mb-4">nextjs-jwt template</p>
                <p className="text-sm text-muted-foreground mb-4">
                  AuthBuilders uses a hybrid JWT approach combining <strong>JOSE</strong> for core session encryption and <strong>jsonwebtoken</strong> for specific flows like password reset and email verification. This provides:
                </p>
                <ul className="list-disc pl-6 mb-4 text-sm text-muted-foreground">
                  <li>🔐 Server-side encryption for active sessions via JOSE's <code>SignJWT</code> and <code>jwtVerify</code>.</li>
                  <li>🔄 Stateless token issuance with short expirations for password reset and email verification flows.</li>
                  <li>⚙️ Environment-isolated secret management using different keys for session and reset tokens.</li>
                </ul>
                <CodeBlock language="typescript" filename="utils/jwt.ts">{`
"use server";
import { SignJWT, jwtVerify } from "jose";
import type { Session } from "../defintions";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "";
const key = new TextEncoder().encode(secretKey);

// Session Token: Create JWT for session payload
export async function encrypt(payload: Session): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("100 sec from now")
    .sign(key);
}

// Session Token: Verify JWT from cookie/session
export async function decrypt(input: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
    return payload;
  } catch (error) {
    console.log("Decryption error:", error);
    return null;
  }
}

// Reusable token logic for password reset & email verification
const RESET_SECRET = process.env.RESET_TOKEN_SECRET!;
const RESET_TOKEN_EXP = '5m';

export async function createResetPasswordToken(email: string) {
  return jwt.sign({ email }, RESET_SECRET, { expiresIn: RESET_TOKEN_EXP });
}

export async function verifyResetPasswordToken(token: string) {
  try {
    const payload = jwt.verify(token, RESET_SECRET) as { email: string };
    return payload?.email;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function createVerificationEmailToken(email: string) {
  return jwt.sign({ email }, RESET_SECRET, { expiresIn: RESET_TOKEN_EXP });
}

export async function verifyVerificationEmailToken(token: string) {
  try {
    const payload = jwt.verify(token, RESET_SECRET) as { email: string };
    return payload?.email;
  } catch (error) {
    console.log(error);
    return;
  }
}
  `}</CodeBlock>
              </div>
              <div className="border border-border rounded-lg p-4 mt-4">
                <h3 className="font-semibold mb-2">🟣 Full JWT Flow in AuthBuilders:</h3>
                <p className="text-sm text-muted-foreground mb-4">nextjs-jwt template</p>

                <p className="text-sm text-muted-foreground mb-4">
                  AuthBuilders applies JWTs as a core mechanism for multiple flows:
                </p>

                <ul className="list-disc pl-6 mb-4 text-sm text-muted-foreground">
                  <li>🔐 <strong>Session Management:</strong> Short-lived encrypted JWTs are issued after login and stored inside an HTTP-only cookie.</li>
                  <li>📩 <strong>Password Reset & Email Verification:</strong> Stateless JWTs (with different secret) are issued for time-sensitive flows via email links.</li>
                  <li>⚙️ <strong>Server Actions Integrated:</strong> The entire flow leverages Next.js <code>"use server"</code> actions for secure server-side execution.</li>
                </ul>

                <CodeBlock language="typescript" filename="lib/actions.ts">{`
"use server";
import { cookies } from "next/headers";
import { AuthServerActionState } from "@/app/lib/(AuthBilders)/defintions";
import { successResponse, errorResponse } from "./utils/response";
import type { User } from "@/app/lib/(AuthBilders)/defintions";
import { FormDataSchema } from "./zod";
import { addUser, findUserByEmail, validateUser, resetUserPassword } from "@/app/lib/(AuthBilders)/dal/queries";
import { encrypt, createResetPasswordToken } from "./utils/jwt";
import { extractErrorDetails } from "./utils/errors";
import { sendEmailVerification } from "./utils/email";
import { passwordSchema } from "./zod";

const timeSec = 100; // Token expiration (100 seconds)

const extractUser = (user: User) => ({
  id: user?.id || '',
  email: user?.email || '',
  name: user?.name || '',
});

export async function login(_prev: AuthServerActionState, formData: FormData): Promise<AuthServerActionState> {
  const cookieStore = await cookies();
  const fields = FormDataSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!fields.success) {
    return errorResponse(['Login failed. Check input.'], fields.error.flatten().fieldErrors);
  }

  const { email, password } = fields.data;
  const user = await validateUser(email, password);
  if (!user) {
    return errorResponse(['Login failed. Invalid email or password.'], {});
  }

  const expires = new Date(Date.now() + timeSec * 1000);
  const session = await encrypt({ user, expires });
  cookieStore.set("session", session, { expires, httpOnly: true });

  return successResponse(['Logged in successfully'], { user: extractUser(user) });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function signUp(_prev: AuthServerActionState, formData: FormData): Promise<AuthServerActionState> {
  try {
    const fields = FormDataSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!fields.success) {
      return errorResponse(['Sign Up failed. Check input.'], fields.error.flatten().fieldErrors);
    }

    const { email, password } = fields.data;
    const exists = findUserByEmail(email);
    if (exists) {
      return errorResponse(['User already exists'], { email: ['Email already registered'] });
    }

    const res = await addUser({ email, password });
    if (!res?.success) {
      return errorResponse(['Failed to register user'], res?.errors || {});
    }

    const emailRes = await sendEmailVerification(email);
    if (!emailRes.success) {
      return errorResponse(['User created, but email failed', ...emailRes.message], {});
    }

    return successResponse(['User created', 'Verification email sent'], { user: res.user, data: emailRes.data });
  } catch (error) {
    const { message = 'Unexpected error occurred' } = extractErrorDetails(error);
    return errorResponse(['Failed to register user'], { email: [message] });
  }
}

export async function sendPasswordResetEmail(_prev: AuthServerActionState, formData: FormData): Promise<AuthServerActionState> {
  const email = formData.get("email") as string;
  const resetToken = await createResetPasswordToken(email);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(\`\${baseUrl}/api/reset-password/send\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, redirectUrl: \`\${baseUrl}/forgot-password/reset-password?token=\${resetToken}\` }),
    });

    const result = await response.json();
    return { success: response.ok, message: [result?.message || "Unknown server response"], data: result?.data ?? null };
  } catch (error) {
    const { message } = extractErrorDetails(error);
    return errorResponse(["Email server error", message]);
  }
}

export async function handlePasswordReset(_prev: AuthServerActionState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const validated = passwordSchema.safeParse(password);

  if (!validated.success) {
    return errorResponse(["Invalid password"], { password: validated.error.flatten().fieldErrors[0] });
  }

  try {
    await resetUserPassword(email, password);
    return successResponse(["Password updated successfully.", "You can now login with your new password"]);
  } catch {
    return errorResponse(["Failed to update password.", "Please try again"]);
  }
}
  `}</CodeBlock>
              </div>

              <div className="bg-gradient-to-r from-authbuilders-purple/10 to-authbuilders-purple-light/10 border border-authbuilders-purple/20 rounded-lg p-6 mt-12">
                <h3 className="text-lg font-semibold mb-3 text-authbuilders-purple">🚀 Next Steps</h3>
                <p className="mb-4">
                  Now that you understand JWTs, explore how to implement them in your authentication system:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="/docs/concepts/sessions" className="inline-flex items-center px-4 py-2 bg-authbuilders-purple text-white rounded-lg hover:bg-authbuilders-purple-dark transition-colors text-sm font-medium">
                    Session Management
                  </a>
                  <a href="/docs/security/backend" className="inline-flex items-center px-4 py-2 border border-authbuilders-purple text-authbuilders-purple rounded-lg hover:bg-authbuilders-purple/10 transition-colors text-sm font-medium">
                    Backend Security
                  </a>
                </div>
              </div>
            </DocContent>
          </main>
        </div>
        <Footer />
      </div>
    </div>

  );
};

export default ConceptsJwt;
