import { useParams, Link } from 'react-router-dom';
import { commands } from '../data/commands';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ChevronLeft, Terminal, AlertTriangle, Play, CheckCircle } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { CodeBlock } from '../components/ui/CodeBlock';
import { Terminal as TerminalComponent } from '../components/features/Terminal';
import { useState } from 'react';
import { useGamification } from '../contexts/GamificationContext';

export const CommandDetailPage = () => {
    const { id } = useParams();
    const { addXp } = useGamification();
    const [activeTab, setActiveTab] = useState<'info' | 'practice'>('info');
    const [practiceComplete, setPracticeComplete] = useState(false);

    const command = commands.find(c => c.id === id);

    if (!command) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <Link to="/library">
                    <Button variant="outline"><ChevronLeft className="mr-2 h-4 w-4" /> Back to Library</Button>
                </Link>
                <div className="mt-8">Command not found</div>
            </div>
        );
    }

    const handleTaskComplete = () => {
        if (!practiceComplete) {
            setPracticeComplete(true);
            addXp(50, `Mastered command: ${command.name}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <SeoHead title={`${command.name} Command`} description={command.description} />

            <div className="mb-6">
                <Link to="/library" className="inline-flex items-center text-slate-500 hover:text-kali-500 transition-colors mb-4">
                    <ChevronLeft size={16} className="mr-1" /> Back to Library
                </Link>
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-mono font-bold text-slate-900 dark:text-white">{command.name}</h1>
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
                <div className="mt-2 inline-block bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded text-xs font-mono text-slate-500 uppercase">
                    {command.category}
                </div>
            </div>

            {activeTab === 'info' ? (
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent className="prose dark:prose-invert max-w-none">
                                <p>{command.description}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Syntax</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CodeBlock code={command.syntax} language="bash" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Examples</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-slate-500 mb-2 font-medium">Basic Usage</p>
                                    <CodeBlock code={command.example || `${command.name} --help`} language="bash" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-slate-50 dark:bg-slate-900 border-none">
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-slate-200 dark:bg-slate-800 p-2 rounded-lg">
                                            <Terminal size={24} className="text-kali-500" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold opacity-70">Difficulty</div>
                                            <div>Beginner</div>
                                        </div>
                                    </div>
                                    <Button className="w-full" onClick={() => setActiveTab('practice')}>
                                        Start Practice <Play size={16} className="ml-2" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <div className="flex gap-3">
                                <AlertTriangle className="text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
                                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                                    <strong>Safety:</strong> This command can be destructive. Use with caution.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[600px] flex flex-col gap-4">
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                        <div>
                            <h3 className="font-bold">Practice Task</h3>
                            <p className="text-sm text-slate-500">View the manual or help page for this command.</p>
                        </div>
                        {practiceComplete ? (
                            <div className="flex items-center text-green-500 font-bold bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded">
                                <CheckCircle size={16} className="mr-2" /> Completed
                            </div>
                        ) : (
                            <div className="text-sm text-slate-500 italic">
                                Type command below...
                            </div>
                        )}
                    </div>

                    <TerminalComponent
                        className="flex-1"
                        promptLabel="student@kali:~$"
                        onCommand={(cmd) => {
                            // Simple validation for now, will be enhanced in step 3
                            if (cmd.trim().startsWith(command.name) && (cmd.includes('--help') || cmd.includes('-h'))) {
                                handleTaskComplete();
                                return "Success! You found the help page. (+50 XP)";
                            }
                            return "";
                        }}
                    />
                </div>
            )}
        </div>
    );
};
