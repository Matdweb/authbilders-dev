import { useState } from 'react';
import { CloseIcon } from '@/components/icons/CloseIcon';

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

interface Props {
    session: SessionData;
    isAuthenticated?: boolean;
}


export default function ButtonAPIRequest({ session, isAuthenticated }: Props) {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [response, setResponse] = useState<string | null>(null);

    const handleAPIRequest = async () => {
        setIsPending(true);
        // Simulated API call
        setTimeout(() => {
            const data = isAuthenticated ? {
                "data": {
                    "message": "Hello from API route!",
                    "timestamp": Date.now(),
                    "user_id": session.user.id,
                    "code": 200
                },
            } : {
                "error": "Unauthorized",
                "message": "You are not authorized to access this resource.",
                "code": 401
            };
            setResponse(JSON.stringify(data, null, 2));
            setIsPending(false);
        }, 1200);
    };

    const handleDismiss = () => {
        setResponse(null);
    };

    return (
        <>
            <div className="relative group">
                <button
                    onClick={handleAPIRequest}
                    className={`relative bg-authbuilders-purple hover:bg-authbuilders-purple-dark text-white font-semibold px-5 py-2 rounded-md transition duration-300 min-w-32`}
                >
                    {isPending ? (
                        <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                    ) : (
                        'Call API Route'
                    )}
                </button>
                <div className="absolute min-w-32 left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-gray-800 text-sm text-white rounded-md px-3 py-2 shadow-md z-50">
                    <div className="font-bold text-green-400">/api/data</div>
                    <div>Request sensible data</div>
                </div>
            </div>

            {response &&
                (<div className="absolute top-32 4 z-[9999] md:max-w-md max-w-sm w-full bg-[#0e0e0e] border border-gray-800 rounded-xl shadow-xl p-4 text-gray-100">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-gray-400">API Response</span>
                        <button
                            onClick={handleDismiss}
                            className="text-gray-500 hover:text-red-400 transition-colors"
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <div className={`w-full max-h-64 overflow-auto text-xs font-mono p-3 rounded-md`}>
                        <pre className={`whitespace-pre-wrap break-words ${response.includes('error') ? 'bg-red-950 text-red-300' : 'bg-green-900 text-green-200'}`}>{response}</pre>
                    </div>
                </div>
                )}
        </>
    );
}
