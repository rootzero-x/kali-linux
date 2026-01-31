import { useState } from 'react';
import { commands } from '../data/commands';
import { tools } from '../data/tools';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { CodeBlock } from '../components/ui/CodeBlock';
import { Terminal as TerminalComponent, type TerminalCommandResult } from '../components/features/Terminal';
import { Search, Terminal, Settings, ExternalLink, AlertTriangle, ChevronLeft, CheckCircle } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { useGamification } from '../contexts/GamificationContext';
import { appStore } from '../shared/store/appStore';

export const LibraryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'details' | 'practice'>('details');
    const [practiceComplete, setPracticeComplete] = useState(false);
    const { addXp } = useGamification();

    const filteredCommands = commands.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredTools = tools.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openDetails = (item: any) => {
        setSelectedItem(item);
        setViewMode('details');
        setPracticeComplete(false);
        setModalOpen(true);
    };


    const handleTerminalCommand = (cmd: string): TerminalCommandResult => {
        if (!selectedItem) return { type: 'error', content: 'System Error' };

        // Simple validation logic
        const trigger = selectedItem.name.toLowerCase().split(' ')[0];

        if (cmd.trim().toLowerCase().startsWith(trigger)) {
            // Track command usage
            appStore.incrementCommandCount();

            if (cmd.includes('--help') || cmd.includes('-h')) {
                if (!practiceComplete) {
                    setPracticeComplete(true);
                    console.log(`[LibraryPage] Awarding 25 XP for ${selectedItem.name}`);
                    addXp(25, `Practiced: ${selectedItem.name}`);
                    return { type: 'success', content: `[+] Success! You ran the help command.\n[+] XP Awarded (25 XP).` };
                }
                return { type: 'info', content: `[INFO] ${selectedItem.name} help manual displayed...` };
            }
            return { type: 'output', content: `[EXEC] Running ${selectedItem.name}...\n[DONE] Execution finished.` };
        }

        return { type: 'error', content: `bash: command not found: ${cmd.split(' ')[0]}. Try running '${selectedItem.name} --help'` };
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <SeoHead title="Library | Commands & Tools" description="Comprehensive database of detailed Kali Linux commands and cybersecurity tools." />

            <div className="mb-8 max-w-2xl">
                <h1 className="text-4xl font-bold mb-4">Library</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    A comprehensive reference for Kali Linux commands and cybersecurity tools.
                </p>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                    <Input
                        placeholder="Search commands or tools..."
                        className="pl-10 h-10 md:h-12 text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <Tabs defaultValue="commands" className="space-y-8">
                <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <TabsTrigger value="commands" className="px-6 py-2 text-base">Commands ({filteredCommands.length})</TabsTrigger>
                    <TabsTrigger value="tools" className="px-6 py-2 text-base">Tools ({filteredTools.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="commands" className="animate-in fade-in slide-in-from-left-4 duration-300">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCommands.map((item) => (
                            <Card
                                key={item.id}
                                className="cursor-pointer hover:border-kali-500 hover:shadow-md transition-all group"
                                onClick={() => openDetails(item)}
                            >
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded group-hover:bg-kali-600 group-hover:text-white transition-colors">
                                            <Terminal size={20} />
                                        </div>
                                        <Badge variant="outline" className="uppercase text-[10px]">{item.category}</Badge>
                                    </div>
                                    <CardTitle className="mt-4 font-mono text-xl">{item.name}</CardTitle>
                                    <CardDescription className="line-clamp-2 mt-2">{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-mono text-kali-600 dark:text-kali-400 block truncate">
                                        {item.syntax}
                                    </code>
                                    <Button variant="link" className="px-0 mt-2 text-kali-500">
                                        View Details <ExternalLink size={14} className="ml-1" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="tools" className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTools.map((item) => (
                            <Card
                                key={item.id}
                                className="cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group"
                                onClick={() => openDetails(item)}
                            >
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <Settings size={20} />
                                        </div>
                                        <Badge variant="secondary" className="uppercase text-[10px]">{item.category}</Badge>
                                    </div>
                                    <CardTitle className="mt-4 text-xl">{item.name}</CardTitle>
                                    <CardDescription className="line-clamp-2 mt-2">{item.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {item.warning && (
                                        <div className="text-xs text-red-500 mt-2 bg-red-500/10 px-2 py-1 rounded flex items-center">
                                            <AlertTriangle size={12} className="mr-1" /> Authorized Use Only
                                        </div>
                                    )}
                                    <Button variant="link" className="px-0 mt-2 text-blue-500">
                                        Learn Tool <ExternalLink size={14} className="ml-1" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Detail Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={selectedItem?.name || 'Details'}
                className="max-w-3xl"
            >
                {selectedItem && (
                    <div className="h-full flex flex-col">
                        {viewMode === 'details' ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                                    {selectedItem.description}
                                </p>

                                {selectedItem.warning && (
                                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-red-700 dark:text-red-200">
                                                    {selectedItem.warning}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-2">
                                        {selectedItem.syntax ? 'Syntax' : 'Basic Usage'}
                                    </h4>
                                    <CodeBlock
                                        code={selectedItem.syntax || selectedItem.usage}
                                        language="bash"
                                    />
                                </div>

                                {selectedItem.example && (
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-2">Example</h4>
                                        <CodeBlock
                                            code={selectedItem.example}
                                            language="bash"
                                        />
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
                                    <Button variant="outline" onClick={() => setModalOpen(false)}>
                                        Close
                                    </Button>
                                    <Button
                                        className="bg-kali-600 hover:bg-kali-700 text-white"
                                        onClick={() => setViewMode('practice')}
                                    >
                                        <Terminal className="mr-2 h-4 w-4" /> Practice in Terminal
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col h-[500px] animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                                        <Button variant="ghost" size="sm" onClick={() => setViewMode('details')} className="mr-2 px-2">
                                            <ChevronLeft size={14} className="mr-1" /> Back
                                        </Button>
                                        <span>Practice Mode</span>
                                    </div>
                                    {practiceComplete && (
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                                            <CheckCircle size={12} className="mr-1" /> Completed
                                        </Badge>
                                    )}
                                </div>

                                <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg mb-4 text-sm text-slate-600 dark:text-slate-400">
                                    <strong>Task:</strong> Run the help command for <code>{selectedItem.name}</code> to verify it's working.
                                </div>

                                <TerminalComponent
                                    className="flex-1"
                                    height="h-full"
                                    promptLabel="student@kali:~$"
                                    onCommand={handleTerminalCommand}
                                />
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};
