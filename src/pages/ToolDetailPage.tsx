import { useParams, Link } from 'react-router-dom';
import { tools } from '../data/tools';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ChevronLeft, Terminal, AlertTriangle, Settings, CheckCircle, Play } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { CodeBlock } from '../components/ui/CodeBlock';
import { Terminal as TerminalComponent } from '../components/features/Terminal';
import { useState } from 'react';
import { useGamification } from '../contexts/GamificationContext';

export const ToolDetailPage = () => {
    const { id } = useParams();
    const { addXp } = useGamification();
    const [activeTab, setActiveTab] = useState<'info' | 'practice'>('info');
    const [practiceComplete, setPracticeComplete] = useState(false);

    const tool = tools.find(t => t.id === id);

    if (!tool) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <Link to="/library">
                    <Button variant="outline"><ChevronLeft className="mr-2 h-4 w-4" /> Back to Library</Button>
                </Link>
                <div className="mt-8">Tool not found</div>
            </div>
        );
    }

    const handleTaskComplete = () => {
        if (!practiceComplete) {
            setPracticeComplete(true);
            addXp(100, `Mastered tool: ${tool.name}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <SeoHead title={`${tool.name} - Cyber Tool`} description={tool.description} />

            <div className="mb-6">
                <Link to="/library" className="inline-flex items-center text-slate-500 hover:text-kali-500 transition-colors mb-4">
                    <ChevronLeft size={16} className="mr-1" /> Back to Library
                </Link>
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-mono font-bold text-slate-900 dark:text-white">{tool.name}</h1>
                    <div className="flex gap-2">
                        <Button
                            variant={activeTab === 'info' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('info')}
                        >
                            Overview
                        </Button>
                        <Button
                            variant={activeTab === 'practice' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('practice')}
                            className={activeTab === 'practice' ? 'bg-kali-600 hover:bg-kali-700' : ''}
                        >
                            <Terminal size={16} className="mr-2" /> Practice
                        </Button>
                    </div>
                </div>
                <div className="mt-2 inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded text-xs font-mono uppercase">
                    {tool.category}
                </div>
            </div>

            {activeTab === 'info' ? (
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="prose dark:prose-invert max-w-none">
                                <p>{tool.description}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Usage</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CodeBlock code={`${tool.name.toLowerCase()} --help`} language="bash" />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-slate-50 dark:bg-slate-900 border-none">
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                                            <Settings size={24} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold opacity-70">Type</div>
                                            <div>CLI Tool</div>
                                        </div>
                                    </div>
                                    <Button className="w-full" onClick={() => setActiveTab('practice')}>
                                        Start Practice <Play size={16} className="ml-2" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {tool.warning && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <div className="flex gap-3">
                                    <AlertTriangle className="text-red-600 dark:text-red-500 flex-shrink-0" />
                                    <div className="text-sm text-red-800 dark:text-red-200">
                                        <strong>Warning:</strong> {tool.warning}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="h-[600px] flex flex-col gap-4">
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                        <div>
                            <h3 className="font-bold">Practice Task</h3>
                            <p className="text-sm text-slate-500">Initiate the tool to verify installation and view version.</p>
                        </div>
                        {practiceComplete ? (
                            <div className="flex items-center text-green-500 font-bold bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded">
                                <CheckCircle size={16} className="mr-2" /> Completed
                            </div>
                        ) : (
                            <div className="text-sm text-slate-500 italic">
                                Waiting for input...
                            </div>
                        )}
                    </div>

                    <TerminalComponent
                        className="flex-1"
                        promptLabel="root@kali:~#"
                        onCommand={(cmd) => {
                            if (cmd.trim().toLowerCase().includes(tool.name.toLowerCase())) {
                                handleTaskComplete();
                                return `[+] Starting ${tool.name} v2.4...\n[+] Initialized.`;
                            }
                            return "";
                        }}
                    />
                </div>
            )}
        </div>
    );
};
