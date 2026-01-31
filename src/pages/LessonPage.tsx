
import { useParams, useNavigate, Link } from 'react-router-dom';
import { modules } from '../data/academy';
import { useAcademy } from '../contexts/AcademyContext';
import { useState, useEffect } from 'react';
import { Terminal as TerminalComponent } from '../components/features/Terminal';
import { Button } from '../components/ui/Button';

import { CheckCircle, ChevronLeft, ChevronRight, Terminal, BookOpen, BrainCircuit, Lock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';

// Simple Markdown Renderer to avoid dependency hell
const SimpleMarkdown = ({ content }: { content: string }) => {
    return (
        <div className="space-y-4">
            {content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-6 mb-4">{line.replace('# ', '')}</h1>;
                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-5 mb-3">{line.replace('## ', '')}</h2>;
                if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-4 mb-2">{line.replace('### ', '')}</h3>;
                if (line.startsWith('1. ')) return <li key={i} className="ml-6 list-decimal pl-1">{line.replace(/^1\. /, '')}</li>;
                if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-kali-500 pl-4 italic bg-slate-100 p-2 my-2">{line.replace('> ', '')}</blockquote>;
                if (line.trim() === '') return <br key={i} />;
                return <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed">{line}</p>;
            })}
        </div>
    );
};

export const LessonPage = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const { getLessonProgress, updateLessonProgress, completeLesson, canUnlockLesson } = useAcademy();

    // Find Lesson Data
    const module = modules.find(m => m.lessons.some(l => l.id === lessonId));
    const lesson = module?.lessons.find(l => l.id === lessonId);

    const [subTab, setSubTab] = useState('practice');
    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
    const [quizResult, setQuizResult] = useState<'pass' | 'fail' | null>(null);
    const [terminalOutput, setTerminalOutput] = useState('');

    const progress = getLessonProgress(lessonId || '');

    useEffect(() => {
        if (lessonId) {
            // Reset local state on lesson change logic if needed
            setQuizResult(null);
            setQuizAnswers({});
        }
    }, [lessonId]);

    if (!lesson || !module) return <div>Lesson not found</div>;

    // Check Gating
    if (!canUnlockLesson(lesson.id) && !progress.completed) {
        return (
            <div className="container mx-auto p-12 text-center">
                <Lock size={48} className="mx-auto text-slate-400 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Lesson Locked</h2>
                <p className="text-slate-600">Please complete the previous lessons first.</p>
                <Button onClick={() => navigate('/academy')} className="mt-4">Back to Academy</Button>
            </div>
        );
    }

    const handleReadScroll = (e: any) => {
        // Simple logic: if scrolled to bottom, mark theory read
        const bottom = Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) < 50;
        if (bottom && !progress.theoryRead) {
            updateLessonProgress(lesson.id, 'theoryRead', true);
        }
    };

    // Fallback for short content that doesn't scroll
    useEffect(() => {
        // Auto-mark theory read after 5 seconds if not scrolled
        const timer = setTimeout(() => {
            if (!progress.theoryRead) updateLessonProgress(lesson.id, 'theoryRead', true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [lesson.id, progress.theoryRead]);

    const runTerminalCheck = (cmd: string) => {
        // Check against terminal tasks
        // For now, match any task command
        const matchedTask = lesson.terminalTasks.find(t =>
            cmd.trim() === t.command || cmd.includes(t.command)
        );

        if (matchedTask) {
            updateLessonProgress(lesson.id, 'terminalCompleted', true);
            return { type: 'success', content: `[+] Success: ${matchedTask.description} verified.` };
        }
        return { type: 'output', content: 'Command executed.' };
    };

    const submitQuiz = () => {
        let allCorrect = true;

        lesson.quiz.forEach(q => {
            if (quizAnswers[q.id] !== q.correctAnswer) allCorrect = false;
        });

        if (allCorrect) {
            setQuizResult('pass');
            updateLessonProgress(lesson.id, 'quizPassed', true);
        } else {
            setQuizResult('fail');
            updateLessonProgress(lesson.id, 'quizPassed', false);
        }
    };

    const handleCompleteLesson = () => {
        const success = completeLesson(lesson.id, lesson.xp, lesson.title);
        if (success) {
            // Find next lesson
            const currentIndex = module.lessons.findIndex(l => l.id === lesson.id);
            if (currentIndex < module.lessons.length - 1) {
                navigate(`/academy/${module.id}/lesson/${module.lessons[currentIndex + 1].id}`);
            } else {
                navigate(`/academy/${module.id}`); // Back to module
            }
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            {/* Left Panel: Theory */}
            <div className="w-1/2 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-950">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-center text-sm text-slate-500 mb-2">
                        <Link to={`/academy/${module.id}`} className="hover:text-kali-600 transition-colors">
                            <span className="uppercase tracking-wider font-bold">{module.title}</span>
                        </Link>
                        <ChevronRight size={14} className="mx-2" />
                        <span>Lesson {(module.lessons.findIndex(l => l.id === lesson.id) || 0) + 1}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{lesson.title}</h1>
                </div>

                <div
                    className="flex-1 overflow-y-auto p-8"
                    onScroll={handleReadScroll}
                >
                    <SimpleMarkdown content={lesson.theory} />

                    <div className="mt-12 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-300">
                        <strong>Reading Progress:</strong> {progress.theoryRead ? "Completed" : "Read to the bottom to complete"}
                    </div>
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                    <Button variant="outline" onClick={() => navigate(`/academy/${module.id}`)}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Module
                    </Button>
                    <Button
                        onClick={handleCompleteLesson}
                        disabled={!progress.theoryRead || !progress.practiceCompleted || !progress.terminalCompleted || !progress.quizPassed}
                        className={progress.completed ? "bg-green-600 hover:bg-green-700" : "bg-kali-600"}
                    >
                        {progress.completed ? "Lesson Completed" : "Mark as Complete"} <CheckCircle className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Right Panel: Interactive Tabs */}
            <div className="w-1/2 flex flex-col bg-slate-100 dark:bg-slate-900">
                <Tabs value={subTab} onValueChange={setSubTab} className="flex-1 flex flex-col">
                    <div className="px-4 pt-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                        <TabsList className="w-full justify-start bg-transparent p-0 h-auto gap-6">
                            <TabsTrigger
                                value="practice"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-kali-500 rounded-none pb-3 px-1"
                            >
                                <div className="flex items-center gap-2">
                                    <BookOpen size={16} /> Practice
                                    {progress.practiceCompleted && <CheckCircle size={14} className="text-green-500" />}
                                </div>
                            </TabsTrigger>
                            <TabsTrigger
                                value="terminal"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-kali-500 rounded-none pb-3 px-1"
                            >
                                <div className="flex items-center gap-2">
                                    <Terminal size={16} /> Lab
                                    {progress.terminalCompleted && <CheckCircle size={14} className="text-green-500" />}
                                </div>
                            </TabsTrigger>
                            <TabsTrigger
                                value="quiz"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-kali-500 rounded-none pb-3 px-1"
                            >
                                <div className="flex items-center gap-2">
                                    <BrainCircuit size={16} /> Quiz
                                    {progress.quizPassed && <CheckCircle size={14} className="text-green-500" />}
                                </div>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-y-auto p-0">
                        <TabsContent value="practice" className="h-full m-0 p-6 space-y-6">
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-lg mb-4">Practice Checklist</h3>
                                <div className="space-y-4">
                                    {lesson.practiceTasks.map((task, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 rounded hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center ${progress.practiceCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300'}`}>
                                                {progress.practiceCompleted && <CheckCircle size={12} />}
                                            </div>
                                            <span className="text-slate-700 dark:text-slate-300">{task}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                                    <Button
                                        className="w-full"
                                        onClick={() => updateLessonProgress(lesson.id, 'practiceCompleted', true)}
                                        disabled={progress.practiceCompleted}
                                        variant={progress.practiceCompleted ? "outline" : "default"}
                                    >
                                        {progress.practiceCompleted ? "Practice Verified" : "I have completed these tasks"}
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="terminal" className="h-full m-0 flex flex-col">
                            <div className="bg-slate-900 text-slate-300 p-2 text-xs font-mono border-b border-white/10 flex justify-between px-4 items-center">
                                <span>Kali Linux Lab Environment</span>
                                <Badge variant={progress.terminalCompleted ? "success" : "outline"}>
                                    {progress.terminalCompleted ? "Lab Completed" : "Active"}
                                </Badge>
                            </div>
                            <TerminalComponent
                                className="flex-1"
                                height="h-full"
                                onCommand={runTerminalCheck as any}
                                promptLabel="student@kali:~/lab$"
                            />
                            <div className="bg-slate-800 p-4 text-sm text-slate-300">
                                <p className="font-bold mb-2">Lab Task:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    {lesson.terminalTasks.map(t => (
                                        <li key={t.id}>{t.description} (Command: <code>{t.command}</code>)</li>
                                    ))}
                                </ul>
                            </div>
                        </TabsContent>

                        <TabsContent value="quiz" className="h-full m-0 p-6">
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                                <h3 className="font-bold text-lg mb-6">Knowledge Check</h3>

                                {quizResult === 'fail' && (
                                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                                        <Lock size={16} className="mr-2" /> Incorrect. Review the theory and try again.
                                    </div>
                                )}

                                <div className="space-y-8">
                                    {lesson.quiz.map((q, i) => (
                                        <div key={q.id}>
                                            <p className="font-medium mb-3">
                                                <span className="text-slate-400 mr-2">{i + 1}.</span>
                                                {q.question}
                                            </p>
                                            <div className="space-y-2">
                                                {q.options.map((opt, optIndex) => (
                                                    <div
                                                        key={optIndex}
                                                        className={`p-3 rounded-lg border cursor-pointer transition-all ${quizAnswers[q.id] === optIndex
                                                            ? 'border-kali-500 bg-kali-50 dark:bg-kali-900/20 text-kali-700 dark:text-kali-300'
                                                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                                            }`}
                                                        onClick={() => !progress.quizPassed && setQuizAnswers(prev => ({ ...prev, [q.id]: optIndex }))}
                                                    >
                                                        {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <Button
                                        className="w-full"
                                        onClick={submitQuiz}
                                        disabled={progress.quizPassed || Object.keys(quizAnswers).length < lesson.quiz.length}
                                        variant={progress.quizPassed ? "success" : "default"}
                                    >
                                        {progress.quizPassed ? "Quiz Passed!" : "Submit Answers"}
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};
