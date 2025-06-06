
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";

const ConceptsJwt = () => {
  return (
    <div className="min-h-screen min-w-96 flex flex-col">
      <Navbar />
      <div className="lg:flex lg:flex-1 lg:container pt-14">
        <DocSidebar />
        <main className="flex-1">
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
            <div className="bg-muted rounded-lg p-6 font-mono text-sm mb-8 overflow-auto border border-border">
              <pre><code>{`// Header (Base64URL encoded)
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload (Base64URL encoded)
{
  "sub": "1234567890",
  "name": "John Doe", 
  "email": "john@example.com",
  "iat": 1516239022,
  "exp": 1516242622
}

// Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)

// Final JWT
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`}</code></pre>
            </div>

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
            <div className="bg-muted rounded-lg p-6 font-mono text-sm mb-8 overflow-auto border border-border">
              <pre><code>{`import jwt from 'jsonwebtoken';

// Create a JWT
function createToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '24h'
  });
}

// Usage
const token = createToken({
  id: '123',
  email: 'john@example.com',
  name: 'John Doe'
});`}</code></pre>
            </div>

            <h3 className="doc-subheading">Verifying JWTs</h3>
            <div className="bg-muted rounded-lg p-6 font-mono text-sm mb-8 overflow-auto border border-border">
              <pre><code>{`// Verify and decode JWT
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { 
      success: true, 
      payload: decoded 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// Middleware for protecting routes
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
}`}</code></pre>
            </div>

            <h3 className="doc-subheading">Frontend Usage</h3>
            <div className="bg-muted rounded-lg p-6 font-mono text-sm mb-8 overflow-auto border border-border">
              <pre><code>{`// Store JWT in localStorage (consider httpOnly cookies for better security)
function loginUser(credentials) {
  return fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      return data.user;
    }
    throw new Error('Login failed');
  });
}

// Include JWT in API requests
function apiRequest(url, options = {}) {
  const token = localStorage.getItem('authToken');
  
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? \`Bearer \${token}\` : '',
      ...options.headers
    }
  });
}

// Check if token is expired
function isTokenExpired(token) {
  if (!token) return true;
  
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}`}</code></pre>
            </div>

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
            <div className="bg-muted rounded-lg p-6 font-mono text-sm mb-8 overflow-auto border border-border">
              <pre><code>{`// Refresh token implementation
class TokenManager {
  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
  }

  async login(credentials) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();
    
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    
    // Store refresh token securely (httpOnly cookie recommended)
    document.cookie = \`refreshToken=\${data.refreshToken}; HttpOnly; Secure; SameSite=Strict\`;
    
    return data.user;
  }

  async refreshAccessToken() {
    const response = await fetch('/api/refresh', {
      method: 'POST',
      credentials: 'include' // Include httpOnly cookies
    });

    if (response.ok) {
      const data = await response.json();
      this.accessToken = data.accessToken;
      return true;
    }
    
    // Refresh failed, redirect to login
    this.logout();
    return false;
  }

  async apiRequest(url, options = {}) {
    let response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': \`Bearer \${this.accessToken}\`,
        ...options.headers
      }
    });

    // If token expired, try to refresh
    if (response.status === 401) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        // Retry the request with new token
        response = await fetch(url, {
          ...options,
          headers: {
            'Authorization': \`Bearer \${this.accessToken}\`,
            ...options.headers
          }
        });
      }
    }

    return response;
  }
}`}</code></pre>
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
  );
};

export default ConceptsJwt;
