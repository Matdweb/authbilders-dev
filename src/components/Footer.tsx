
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="lg:ml-[320px] border-t border-border py-10 bg-secondary/30">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-authbuilders-purple flex items-center justify-center text-white font-bold">
                AB
              </div>
              <span className="font-bold text-xl">AuthBuilders.dev</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Empowering developers to create secure, customizable authentication systems with ease.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Documentation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/docs/getting-started" className="text-muted-foreground hover:text-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link to="/docs/installation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Installation
                </Link>
              </li>
              <li>
                <Link to="/docs/authentication" className="text-muted-foreground hover:text-foreground transition-colors">
                  Authentication
                </Link>
              </li>
              <li>
                <Link to="/docs/authorization" className="text-muted-foreground hover:text-foreground transition-colors">
                  Authorization
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Templates</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/templates/basic-auth" className="text-muted-foreground hover:text-foreground transition-colors">
                  Basic Auth
                </Link>
              </li>
              <li>
                <Link to="/templates/social-login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Social Login
                </Link>
              </li>
              <li>
                <Link to="/templates/multi-factor" className="text-muted-foreground hover:text-foreground transition-colors">
                  Multi-Factor Auth
                </Link>
              </li>
              <li>
                <Link to="/templates/jwt-auth" className="text-muted-foreground hover:text-foreground transition-colors">
                  JWT Auth
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/authbuilders" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/authbuilders" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/authbuilders" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <Link to="/contribute" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contribute
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AuthBuilders.dev. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
