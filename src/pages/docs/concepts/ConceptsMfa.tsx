import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocSidebar from "@/components/DocSidebar";
import DocContent from "@/components/DocContent";
import CodeBlock from "@/components/CodeBlock";

const ConceptsMfa = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-1 pt-14">
        <div className="max-w-[1440px] mx-auto flex">
          <DocSidebar />
          <main className="flex-1 min-w-0">
            <DocContent
              title="Multi-Factor Auth (MFA)"
              description="Adding an extra layer of security with multi-factor authentication implementation."
            >
              <h2 className="text-2xl font-bold mt-8 mb-4">What is Multi-Factor Authentication?</h2>
              <p className="leading-7 mb-4">
                Multi-Factor Authentication (MFA) adds an extra layer of security by requiring users to provide two or more verification factors to gain access.
                Even if one factor is compromised, the additional factors help protect the account.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Authentication Factors</h2>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Something You Know</h3>
                  <p className="text-sm text-muted-foreground mb-2">Knowledge factors</p>
                  <ul className="text-xs space-y-1">
                    <li>• Password</li>
                    <li>• PIN</li>
                    <li>• Security questions</li>
                  </ul>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">Something You Have</h3>
                  <p className="text-sm text-muted-foreground mb-2">Possession factors</p>
                  <ul className="text-xs space-y-1">
                    <li>• Phone (SMS/App)</li>
                    <li>• Hardware token</li>
                    <li>• Smart card</li>
                  </ul>
                </div>
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Something You Are</h3>
                  <p className="text-sm text-muted-foreground mb-2">Inherence factors</p>
                  <ul className="text-xs space-y-1">
                    <li>• Fingerprint</li>
                    <li>• Face recognition</li>
                    <li>• Voice recognition</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">TOTP (Time-based One-Time Password)</h2>
              <p className="leading-7 mb-4">
                TOTP is the most common MFA method, generating time-sensitive codes using apps like Google Authenticator or Authy.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Implementation Example</h3>
              <CodeBlock language="bash" filename="setup">{`
npm install otplib qrcode
`}</CodeBlock>
              <CodeBlock language="typescript" filename="mfa/totp.ts">{`
import { authenticator } from 'otplib';
import QRCode from 'qrcode';

// Generate secret for new user
function generateTOTPSecret(userEmail: string, appName: string = 'AuthBuilders') {
  const secret = authenticator.generateSecret();
  const otpauthURL = authenticator.keyuri(userEmail, appName, secret);
  return { secret, otpauthURL };
}

// Generate QR code for easy setup
async function generateQRCode(otpauthURL: string): Promise<string> {
  return await QRCode.toDataURL(otpauthURL);
}

// Verify TOTP token
function verifyTOTP(token: string, secret: string): boolean {
  return authenticator.verify({ token, secret, window: 1 });
}`}</CodeBlock>

              <h2 className="text-2xl font-bold mt-8 mb-4">MFA Setup Flow</h2>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <ol className="list-decimal pl-6 space-y-3">
                  <li><strong>User enables MFA in account settings</strong></li>
                  <li><strong>Server generates TOTP secret</strong></li>
                  <li><strong>Display QR code to user</strong></li>
                  <li><strong>User scans QR code with authenticator app</strong></li>
                  <li><strong>User enters verification code</strong></li>
                  <li><strong>Server validates code and enables MFA</strong></li>
                  <li><strong>Generate backup codes for recovery</strong></li>
                </ol>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Frontend Setup Component</h3>
              <CodeBlock language="typescript" filename="components/MFASetup.tsx">{`
function MFASetup() {
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  
  useEffect(() => {
    // Initialize MFA setup
    initializeMFA();
  }, []);
  
  const initializeMFA = async () => {
    const response = await fetch('/api/auth/mfa/setup', { method: 'POST', credentials: 'include' });
    const { qrCode } = await response.json();
    setQrCode(qrCode);
  };
  
  const verifyAndEnable = async () => {
    setIsVerifying(true);
    const response = await fetch('/api/auth/mfa/verify', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      credentials: 'include', body: JSON.stringify({ code: verificationCode })
    });
    const { success, backupCodes } = await response.json();
    if (success) setBackupCodes(backupCodes); // Show success state and backup codes
    setIsVerifying(false);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <h2>Setup Two-Factor Authentication</h2>
      
      {qrCode && (
        <div className="text-center mb-4">
          <img src={qrCode} alt="QR Code" className="mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">
            Scan this QR code with your authenticator app
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Enter 6-digit code"
          maxLength={6}
          className="w-full text-center text-2xl tracking-widest"
        />
        
        <button
          onClick={verifyAndEnable}
          disabled={verificationCode.length !== 6 || isVerifying}
          className="w-full"
        >
          {isVerifying ? 'Verifying...' : 'Enable MFA'}
        </button>
      </div>
      
      {backupCodes.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-semibold mb-2">Backup Codes</h3>
          <p className="text-sm mb-3">Save these codes in a safe place:</p>
          <div className="grid grid-cols-2 gap-2 font-mono text-sm">
            {backupCodes.map((code, index) => (
              <div key={index} className="bg-white p-2 rounded border">
                {code}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`}</CodeBlock>

              <h2 className="text-2xl font-bold mt-8 mb-4">Login with MFA</h2>
              <CodeBlock language="typescript" filename="auth/loginWithMFA.ts">{`
async function loginWithMFA(email: string, password: string, mfaCode?: string) {
  // First, validate email/password  
  const user = await validateCredentials(email, password);
  if (!user) throw new Error('Invalid credentials');

  // Check if user has MFA enabled
  if (user.mfaEnabled) {
    if (!mfaCode) {
      return { requiresMFA: true, partialToken: generatePartialToken(user.id) };
    }
    // Verify MFA code
    const isValidMFA = verifyTOTP(mfaCode, user.mfaSecret) || await verifyBackupCode(user.id, mfaCode);
    if (!isValidMFA) throw new Error('Invalid MFA code');
  }
  // Create full session
  const session = await createSession(user.id);
  return { success: true, sessionId: session.id };
}`}</CodeBlock>

              <CodeBlock language="typescript" filename="auth/login-mfa.ts">{`
function LoginForm() {
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [mfaCode, setMfaCode] = useState('');
  const [partialToken, setPartialToken] = useState('');
  
  const handleInitialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await login(credentials.email, credentials.password);
      
      if (result.requiresMFA) {
        setPartialToken(result.partialToken);
        setStep('mfa');
      } else {
        // Login successful, redirect
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  if (step === 'mfa') {
    return (
      <form onSubmit={handleMFAVerification}>
        <h2>Enter Authentication Code</h2>
        <input
          type="text"
          value={mfaCode}
          onChange={(e) => setMfaCode(e.target.value)}
          placeholder="6-digit code"
          maxLength={6}
        />
        <button type="submit">Verify</button>
      </form>
    );
  }
  
  // Return credentials form...
}`}</CodeBlock>

              <h2 className="text-2xl font-bold mt-8 mb-4">Backup Codes</h2>
              <p className="leading-7 mb-4">
                Backup codes provide recovery access when the primary MFA device is unavailable.
              </p>
              <CodeBlock language="typescript" filename="auth/backupCodes.ts">{`
function generateBackupCodes(): string[] {
  const codes = [];
  for (let i = 0; i < 10; i++) {
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push(code);
  }
  return codes;
}

// Store hashed backup codes
async function storeBackupCodes(userId: string, codes: string[]) {
  const hashedCodes = await Promise.all(codes.map(code => bcrypt.hash(code, 10)));
  await db.backupCodes.create({ userId, codes: hashedCodes, createdAt: new Date() });
}

// Verify and consume backup code
async function verifyBackupCode(userId: string, code: string): Promise<boolean> {
  const backupCodes = await db.backupCodes.findByUserId(userId);
  for (const [index, hashedCode] of backupCodes.codes.entries()) {
    if (await bcrypt.compare(code, hashedCode)) {
      backupCodes.codes.splice(index, 1);
      await db.backupCodes.update(userId, backupCodes);
      return true;
    }
  }
  return false;
}`}</CodeBlock>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-200">🔒 Security Best Practices</h3>
                <ul className="list-disc pl-6 space-y-2 text-yellow-700 dark:text-yellow-300">
                  <li>Allow small time window tolerance for TOTP verification</li>
                  <li>Rate limit MFA attempts to prevent brute force attacks</li>
                  <li>Provide backup codes for account recovery</li>
                  <li>Log MFA events for security monitoring</li>
                  <li>Consider step-up authentication for sensitive operations</li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded-lg mt-8">
                <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
                <p>
                  Learn about <a href="/docs/security/backend" className="text-authbuilders-purple hover:underline">Backend Security Layers</a> or
                  explore <a href="/docs/templates/nextjs-firebase" className="text-authbuilders-purple hover:underline">Template Implementation</a> to see MFA in action.
                </p>
              </div>
            </DocContent>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConceptsMfa;
