import {
    SiNextdotjs,
    SiVite,
    SiVuedotjs,
    SiAngular,
    SiFirebase,
    SiSupabase,
    SiPostgresql,
    SiMongodb,
    SiJsonwebtokens,
    SiPrisma
} from "react-icons/si";
import {
    MdEmail,
    MdSecurity,
    MdSync,
    MdLock,
    MdAutoAwesome
} from "react-icons/md";
import {
    FaUsers,
    FaShieldAlt,
    FaGithub, FaGoogle
} from "react-icons/fa";

// Helper components for icons using react-icons (same as StackSelector)
export const Icon = ({ value }: { value: string }) => {
    switch (value.toLowerCase()) {
        case 'next.js': return <SiNextdotjs className="w-8 h-8" />;
        case 'vite': return <SiVite className="w-8 h-8" />;
        case 'vue': return <SiVuedotjs className="w-8 h-8" />;
        case 'angular': return <SiAngular className="w-8 h-8" />;
        case 'firebase': return <SiFirebase className="w-8 h-8" />;
        case 'supabase': return <SiSupabase className="w-8 h-8" />;
        case 'postgresql': return <SiPostgresql className="w-8 h-8" />;
        case 'mongodb': return <SiMongodb className="w-8 h-8" />;
        case 'google': return <FaGoogle className="w-8 h-8" />;
        case 'github': return <FaGithub className="w-8 h-8" />;
        case 'email/password': return <MdEmail className="w-8 h-8" />;
        case 'social login': return <FaUsers className="w-8 h-8" />;
        case 'jwt': return <SiJsonwebtokens className="w-8 h-8" />;
        case 'nextauth': return <FaShieldAlt className="w-8 h-8" />;
        case 'oauth': return <MdSync className="w-8 h-8" />;
        case 'mfa': return <MdLock className="w-8 h-8" />;
        case 'magic link': return <MdAutoAwesome className="w-8 h-8" />;
        case 'prisma': return <SiPrisma className="w-8 h-8" />;
        default: return <MdSecurity className="w-8 h-8" />;
    }
}