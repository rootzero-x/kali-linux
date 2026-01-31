import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    className?: string;
}

export const CodeBlock = ({ code, language = 'bash', showLineNumbers = false, className }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.trim().split('\n');

    return (
        <div className={cn("relative rounded-lg overflow-hidden border border-slate-800 bg-terminal-black shadow-md font-mono text-sm group", className)}>
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2 text-slate-400">
                    <Terminal size={14} />
                    <span className="text-xs uppercase font-semibold">{language}</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-slate-400 hover:text-white"
                    onClick={handleCopy}
                    title="Copy code"
                >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </Button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-slate-300">
                    {lines.map((line, i) => (
                        <div key={i} className="table-row">
                            {showLineNumbers && (
                                <span className="table-cell text-slate-600 select-none pr-4 text-right min-w-[2rem]">
                                    {i + 1}
                                </span>
                            )}
                            <div className="table-cell">
                                {/* Simple syntax highlighting based on regex could act here. For now, just clean text. */}
                                {line.startsWith('$') || line.startsWith('#') ? (
                                    <>
                                        <span className="text-kali-500 font-bold select-none">{line.substring(0, 1)} </span>
                                        <span className="text-white">{line.substring(1)}</span>
                                    </>
                                ) : (
                                    <span className={cn(
                                        line.startsWith('//') ? "text-slate-500 italic" : "",
                                        line.includes('error') ? "text-red-400" : ""
                                    )}>
                                        {line}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </pre>
            </div>
        </div>
    );
};
