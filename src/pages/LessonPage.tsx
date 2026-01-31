import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roadmaps } from '../data/roadmaps';
import { useGamification } from '../contexts/GamificationContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Terminal } from '../components/features/Terminal';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { CodeBlock } from '../components/ui/CodeBlock';

export const LessonPage = () => {
    const { roadmapId, lessonId } = useParams();
    const navigate = useNavigate();
    const { completeLesson, user } = useGamification();
    const [lesson, setLesson] = useState<any>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (roadmapId && lessonId) {
            const roadmap = roadmaps.find(r => r.id === roadmapId);
            if (roadmap) {
                const foundLesson = roadmap.modules
                    .flatMap(m => m.lessons)
                    .find(l => l.id === lessonId);

                if (foundLesson) {
                    setLesson(foundLesson);
                    setIsCompleted(user.completedLessons.includes(foundLesson.id));
                }
            }
        }
    }, [roadmapId, lessonId, user.completedLessons]);

    const handleComplete = () => {
        if (lesson && !isCompleted) {
            completeLesson(lesson.id);
            setIsCompleted(true);
        }
    };

    if (!lesson) return <div className="p-8">Loading lesson...</div>;

    return (
        <div className="container mx-auto px-4 py-8 h-[calc(100vh-64px)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ChevronLeft />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">{lesson.title}</h1>
                        <p className="text-sm text-slate-500">{lesson.type.toUpperCase()} • {lesson.duration} • {lesson.xp} XP</p>
                    </div>
                </div>
                {isCompleted ? (
                    <Button variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        <CheckCircle className="mr-2 h-4 w-4" /> Completed
                    </Button>
                ) : (
                    <Button onClick={handleComplete} variant="default">
                        Mark as Complete
                    </Button>
                )}
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="theory" className="flex-1 flex flex-col">
                <TabsList className="w-full justify-start border-b border-slate-200 dark:border-slate-800 rounded-none bg-transparent p-0 mb-4">
                    <TabsTrigger value="theory" className="px-6 data-[state=active]:border-b-2 border-kali-500 rounded-none">Theory</TabsTrigger>
                    <TabsTrigger value="practice" className="px-6 data-[state=active]:border-b-2 border-kali-500 rounded-none">Practice</TabsTrigger>
                    <TabsTrigger value="terminal" className="px-6 data-[state=active]:border-b-2 border-kali-500 rounded-none">Terminal Lab</TabsTrigger>
                </TabsList>

                <TabsContent value="theory" className="flex-1 overflow-y-auto">
                    <div className="max-w-3xl space-y-6">
                        <Card className="p-8 prose dark:prose-invert max-w-none">
                            <h2>Introduction</h2>
                            <p>
                                Welcome to <strong>{lesson.title}</strong>. In this lesson, we will explore the fundamental concepts
                                necessary for your cybersecurity journey.
                            </p>

                            <h3>Key Concepts</h3>
                            <ul>
                                <li>Understanding the core purpose of the command.</li>
                                <li>Learning safe usage patterns.</li>
                                <li>Recognizing common pitfalls.</li>
                            </ul>

                            <h3>Example Usage</h3>
                            <CodeBlock code={`$ ${lesson.title.toLowerCase().split(' ')[0]} --help`} language="bash" />

                            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-4">
                                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium flex items-center">
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    Pro Tip: Always verify your target scope before running active scans.
                                </p>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="practice" className="flex-1 overflow-y-auto">
                    <div className="grid md:grid-cols-2 gap-8 h-full">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Task Checklist</h3>
                            <Card className="p-4 space-y-4">
                                {['Verify installation', 'Run basic help command', 'Execute command with verbose flag'].map((task, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                        <div className="h-5 w-5 rounded border border-slate-300 dark:border-slate-600" />
                                        <span className="text-sm">{task}</span>
                                    </div>
                                ))}
                            </Card>
                        </div>
                        <div className="bg-slate-900 rounded-lg p-4">
                            {/* Mini terminal for practice reference */}
                            <Terminal height="h-full" promptLabel="practice@lab:~$" />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="terminal" className="flex-1 min-h-[400px]">
                    <Terminal
                        className="h-full shadow-none border-0"
                        promptLabel="root@kali:~#"
                        initialLines={[
                            { type: 'system', content: 'Starting isolated environment...' },
                            { type: 'system', content: 'Target system: 10.10.10.5 (Victim)' }
                        ]}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};
