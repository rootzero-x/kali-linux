import { useState } from 'react';
import { commands } from '../data/commands';
import { tools } from '../data/tools';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Search, Terminal, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LibraryPage = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCommands = commands.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredTools = tools.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8 max-w-2xl">
                <h1 className="text-4xl font-bold mb-4">{t('nav.library')}</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    A comprehensive reference for Kali Linux commands and cybersecurity tools.
                </p>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                    <Input
                        placeholder={t('common.search_placeholder')}
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
                            <Card key={item.id} className="cursor-pointer hover:border-kali-500 hover:shadow-md transition-all group">
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
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {filteredCommands.length === 0 && (
                        <div className="text-center py-12 text-slate-500">
                            No commands found matching "{searchTerm}"
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="tools" className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTools.map((item) => (
                            <Card key={item.id} className="cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group">
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
                                        <div className="text-xs text-red-500 mt-2 bg-red-500/10 px-2 py-1 rounded">
                                            ⚠️ {item.warning}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {filteredTools.length === 0 && (
                        <div className="text-center py-12 text-slate-500">
                            No tools found matching "{searchTerm}"
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};
