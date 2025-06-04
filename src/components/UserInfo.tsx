import { useState } from "react";
import { CloseIcon } from "@/components/icons/CloseIcon";

interface UserType {
    id: string;
    name: string;
    email: string;
    image: string;
    email_verified: boolean;
}

interface SessionData {
    user: UserType;
    expires: number;
}

interface UserInfoProps {
    session: SessionData;
    setSession: (s: SessionData) => void;
    isAuthenticated?: boolean;
    sessionJson?: string;
    setSessionJson?: (s: string) => void;
}

export function UserInfo({ session, setSession, isAuthenticated, sessionJson, setSessionJson }: UserInfoProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSending, setIsSending] = useState<boolean>(false);

    const { email, name, image, email_verified } = session.user;

    const handleSendVerification = () => {
        if (email_verified) return;
        setIsSending(true);
        setTimeout(() => {
            const updatedSession = {
                ...session,
                user: { ...session.user, email_verified: true },
            };
            setSession(updatedSession);
            setSessionJson(JSON.stringify(updatedSession, null, 2));
            setIsSending(false);
        }, 1000);
    };

    const sessionDataTooltip = () => {
        if (isOpen && isAuthenticated) {
            return (
                <section className="absolute bg-gray-900 bg-opacity-80 backdrop-blur-md flex-col flex items-center justify-center z-50 p-8 rounded-lg shadow-lg border border-gray-700 max-w-md md:max-w-2xl">
                    <div className=" w-full flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-gray-400">Session data:</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-red-400 transition-colors"
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="w-full max-h-64 overflow-auto bg-gray-900 border border-gray-700 p-3 rounded-md text-xs font-mono">
                        <pre className="whitespace-pre-wrap break-words">{sessionJson}</pre>
                    </div>

                    <span className="mt-3 block text-xs font-medium text-gray-400">Email Verified:</span>
                    <button
                        onClick={handleSendVerification}
                        className={`mt-2 w-full py-2 px-4 rounded-lg text-sm font-semibold text-left flex items-center gap-2 transition-colors
        ${email_verified ? "bg-green-600/20 text-green-400 border border-green-700" : "bg-red-600/10 text-red-400 border border-red-700 hover:bg-red-600/20"}`}
                    >
                        {isSending ? (
                            <span className="inline-block w-3 h-3 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                        ) : (
                            <span className="w-2 h-2 rounded-full inline-block mr-2 bg-current"></span>
                        )}
                        {email_verified ? "Email verified" : "Send email verification"}
                    </button>
                </section>
            )
        }
    }

    return (
        <>
            {sessionDataTooltip()}
            {/* User avatar + trigger */}
            <div
                className="relative transition-all delay-150 duration-300 ease-in-out  w-full max-w-56 md:max-w-[600px] sm:max-w-80 bg-[#0e0e0e] border border-gray-800 rounded-xl shadow-xl p-4 text-gray-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="bottom-0 right-0 p-4 cursor-pointer">
                    <div className="flex items-center gap-2">
                        <img
                            src={isAuthenticated ? image : "https://avatars.githubusercontent.com/u/1027103?v=4"}
                            alt="avatar"
                            className="w-8 h-8 rounded-full border border-gray-600"
                        />
                        <div className="text-sm">
                            <div className="font-semibold text-gray-100">{(isAuthenticated && name) || "someone"}</div>
                            <div className="text-gray-400 text-xs">{(isAuthenticated && email) || "@who are you?"}</div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
