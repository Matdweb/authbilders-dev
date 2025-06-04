
import { useState, useEffect } from "react";
import { Check, Download, Play, Server } from "lucide-react";

interface TerminalSimulatorProps {
  gitBranch: string;
  githubUrl: string;
}

const TerminalSimulator = ({ gitBranch, githubUrl }: TerminalSimulatorProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const lines = [
    {
      text: `git clone --branch ${gitBranch} ${githubUrl}.git`,
      icon: <Download className="w-4 h-4 text-blue-400" />,
      delay: 1000
    },
    {
      text: "Cloning project...",
      icon: <div className="w-4 h-4 border-2 border-t-transparent border-yellow-400 rounded-full animate-spin"></div>,
      delay: 1200
    },
    {
      text: "Installing dependencies...",
      icon: <div className="w-4 h-4 border-2 border-t-transparent border-orange-400 rounded-full animate-spin"></div>,
      delay: 1500
    },
    {
      text: "Starting server: npm run dev",
      icon: <Play className="w-4 h-4 text-green-400" />,
      delay: 800
    },
    {
      text: "✅ Authentication system ready at http://localhost:3000",
      icon: <Server className="w-4 h-4 text-green-400" />,
      delay: 0
    }
  ];

  useEffect(() => {
    // Reset animation when props change
    setCurrentLine(0);
    setDisplayedText("");
    setIsTyping(true);
  }, [gitBranch, githubUrl]);

  useEffect(() => {
    if (!isTyping || currentLine >= lines.length) return;

    const currentLineText = lines[currentLine].text;
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < currentLineText.length) {
        setDisplayedText(prev => prev + currentLineText[charIndex]);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        
        // Move to next line after delay
        setTimeout(() => {
          setDisplayedText(prev => prev + "\n");
          setCurrentLine(prev => prev + 1);
        }, lines[currentLine].delay);
      }
    }, 50); // Typing speed

    return () => clearInterval(typeInterval);
  }, [currentLine, isTyping]);

  const completedLines = displayedText.split('\n').slice(0, -1);
  const currentTypingLine = displayedText.split('\n').slice(-1)[0];

  return (
    <div className="bg-[#0e0e0e] border border-green-500/30 rounded-lg p-4 font-mono text-xs max-h-52 overflow-auto">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-400 text-xs">Terminal</span>
      </div>
      
      <div className="space-y-2">
        {completedLines.map((line, index) => (
          <div key={index} className="flex items-start gap-2">
            {lines[index]?.icon}
            <span className="text-green-400 leading-relaxed">{line}</span>
          </div>
        ))}
        
        {currentLine < lines.length && (
          <div className="flex items-start gap-2">
            {lines[currentLine]?.icon}
            <span className="text-green-400 leading-relaxed">
              {currentTypingLine}
              {isTyping && <span className="animate-pulse">|</span>}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalSimulator;
