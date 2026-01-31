import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Terminal as TerminalIcon } from 'lucide-react';

export interface TerminalLine {
    type: 'input' | 'output' | 'error' | 'system' | 'success' | 'info';
    content: string;
}

export interface TerminalCommandResult {
    type: 'output' | 'error' | 'success' | 'info';
    content: string;
}

interface TerminalProps {
    className?: string;
    initialLines?: TerminalLine[];
    onCommand?: (command: string) => TerminalCommandResult | Promise<TerminalCommandResult> | string | null;
    promptLabel?: string;
    height?: string;
}

export const Terminal = ({
    className,
    initialLines = [],
    onCommand,
    promptLabel = "kali@kali:~$",
    height = "h-96"
}: TerminalProps) => {
    const [lines, setLines] = useState<TerminalLine[]>([
        { type: 'system', content: 'Kali Linux Rolling [Version 2026.1]' },
        { type: 'system', content: 'Type "help" for valid commands.' },
        ...initialLines
    ]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < history.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(history[history.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setLines([]);
        }
    };

    const executeCommand = async () => {
        const cmd = input.trim();
        if (!cmd) {
            setLines(prev => [...prev, { type: 'input', content: promptLabel + ' ' }]);
            return;
        }

        setLines(prev => [...prev, { type: 'input', content: `${promptLabel} ${cmd}` }]);
        setHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);
        setInput('');

        // Internal commands
        if (cmd === 'clear') {
            setTimeout(() => setLines([]), 10);
            return;
        }

        if (cmd === 'help') {
            setLines(prev => [...prev, { type: 'info', content: 'Available commands: help, clear, whoami, date, ls, pwd' }]);
            return;
        }

        // External handler
        if (onCommand) {
            const result = await onCommand(cmd);
            if (result !== null) {
                if (typeof result === 'string') {
                    // Backward compatibility or simple string return
                    setLines(prev => [...prev, { type: result.startsWith('Error') ? 'error' : 'output', content: result }]);
                } else {
                    // Structured result
                    setLines(prev => [...prev, { type: result.type, content: result.content }]);
                }
                return;
            }
        }

        // Default simulation for common commands if not handled
        switch (cmd.split(' ')[0]) {
            case 'whoami':
                setLines(prev => [...prev, { type: 'output', content: 'root' }]);
                break;
            case 'pwd':
                setLines(prev => [...prev, { type: 'output', content: '/home/kali' }]);
                break;
            case 'date':
                setLines(prev => [...prev, { type: 'output', content: new Date().toString() }]);
                break;
            case 'ls':
                setLines(prev => [...prev, { type: 'output', content: 'Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos' }]);
                break;
            default:
                setLines(prev => [...prev, { type: 'error', content: `bash: ${cmd.split(' ')[0]}: command not found` }]);
        }
    };

    return (
        <div className={cn("flex flex-col rounded-lg overflow-hidden bg-terminal-black border border-slate-800 shadow-2xl font-mono text-sm", height, className)} onClick={() => inputRef.current?.focus()}>
            {/* Title Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-slate-400 text-xs flex items-center gap-1">
                    <TerminalIcon size={12} />
                    kali@kali:~
                </div>
                <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Content */}
            <div
                ref={scrollRef}
                className="flex-1 p-4 overflow-y-auto terminal-scroll text-slate-300 space-y-1"
            >
                {lines.map((line, i) => (
                    <div key={i} className={cn(
                        "break-words",
                        line.type === 'error' ? "text-red-400" :
                            line.type === 'success' ? "text-green-400 font-bold" :
                                line.type === 'input' ? "text-white font-bold" :
                                    line.type === 'system' ? "text-blue-400" :
                                        line.type === 'info' ? "text-yellow-400" : "text-slate-300"
                    )}>
                        {line.content}
                    </div>
                ))}

                <div className="flex items-center animate-in fade-in">
                    <span className="text-kali-400 mr-2 font-bold select-none">{promptLabel}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-white p-0 m-0"
                        autoComplete="off"
                        spellCheck="false"
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
};
