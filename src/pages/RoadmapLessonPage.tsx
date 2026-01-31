import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { roadmaps } from '../data/roadmaps';
import { Button } from '../components/ui/Button';
import { ChevronLeft, CheckCircle, Terminal as TerminalIcon, BookOpen, ListChecks, HelpCircle, ArrowRight } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Checkbox } from '../components/ui/Checkbox';
import { Terminal } from '../components/features/Terminal';
import { Badge } from '../components/ui/Badge';
import { useAcademy } from '../contexts/AcademyContext';

const RoadmapLessonPage = () => {
    const { roadmapId, lessonId } = useParams();
    const navigate = useNavigate();
    const { updateLessonProgress, lessonProgress, completeLesson } = useAcademy();

    const [activeTab, setActiveTab] = useState("theory");
    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [terminalSuccess, setTerminalSuccess] = useState(false);

    const roadmap = roadmaps.find(r => r.id === roadmapId);
    // Flatten modules to find lesson
    const lesson = roadmap?.modules.flatMap(m => m.lessons).find(l => l.id === lessonId);

    // Find next lesson for navigation
    const allLessons = roadmap?.modules.flatMap(m => m.lessons) || [];
    const currentIndex = allLessons.findIndex(l => l.id === lessonId);
    const nextLesson = currentIndex !== -1 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

    useEffect(() => {
        // Reset state on lesson change
        setActiveTab("theory");
        setQuizAnswers({});
        setQuizSubmitted(false);
        setTerminalSuccess(false);
    }, [lessonId]);

    if (!roadmap || !lesson) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
                <Link to={roadmapId ? `/roadmaps/${roadmapId}` : '/roadmaps'}>
                    <Button variant="outline"><ChevronLeft className="mr-2 h-4 w-4" /> Back to Roadmap</Button>
                </Link>
            </div>
        );
    }

    const currentProgress = lessonProgress[lesson.id];
    const isCompleted = currentProgress?.completed;

    const handleTerminalCommand = (cmd: string) => {
        const requiredCmd = lesson.terminalTasks[0]?.command;
        if (cmd.trim() === requiredCmd) {
            setTerminalSuccess(true);
            updateLessonProgress(lesson.id, 'terminalCompleted', true);
            return { type: 'success' as const, content: `Success! Task completed.` };
        }
        return null; // Default behavior
    };

    const handleQuizSubmit = () => {
        setQuizSubmitted(true);
        const allCorrect = lesson.quiz.every(q => quizAnswers[q.id] === q.correctAnswer);
        if (allCorrect) {
            updateLessonProgress(lesson.id, 'quizPassed', true);
        }
    };

    const handleCompleteLesson = () => {
        // Fix: Do not manually update progress here. completeLesson checks if already completed.
        // If we mark it completed first, completeLesson will skip awarding XP.
        // updateLessonProgress(lesson.id, 'completed', true); <-- REMOVED

        console.log(`[RoadmapLessonPage] Completing lesson: ${lesson.title}`);
        completeLesson(lesson.id, lesson.xp, lesson.title);

        if (nextLesson) {
            navigate(`/roadmaps/${roadmapId}/lesson/${nextLesson.id}`);
        } else {
            navigate(`/roadmaps/${roadmapId}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <SeoHead title={`${lesson.title} | ${roadmap.title}`} description={`Lesson: ${lesson.title}`} />

            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link to={`/roadmaps/${roadmapId}`} className="text-slate-500 hover:text-kali-600 flex items-center mb-2 transition-colors">
                        <ChevronLeft size={16} className="mr-1" /> Back to {roadmap.title}
                    </Link>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        {lesson.title}
                        {isCompleted && <CheckCircle className="text-green-500" />}
                    </h1>
                    <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{lesson.duration}</Badge>
                        <Badge variant="secondary" className="capitalize">{lesson.type}</Badge>
                        <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-200">+{lesson.xp} XP</Badge>
                    </div>
                </div>
                {isCompleted && nextLesson && (
                    <Button onClick={() => navigate(`/roadmaps/${roadmapId}/lesson/${nextLesson.id}`)} className="bg-kali-600 hover:bg-kali-700">
                        Next Lesson <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                    <TabsTrigger value="theory" className="flex items-center gap-2">
                        <BookOpen size={16} /> <span className="hidden sm:inline">Theory</span>
                    </TabsTrigger>
                    <TabsTrigger value="practice" className="flex items-center gap-2">
                        <ListChecks size={16} /> <span className="hidden sm:inline">Practice</span>
                    </TabsTrigger>
                    <TabsTrigger value="terminal" className="flex items-center gap-2">
                        <TerminalIcon size={16} /> <span className="hidden sm:inline">Lab</span>
                    </TabsTrigger>
                    <TabsTrigger value="quiz" className="flex items-center gap-2">
                        <HelpCircle size={16} /> <span className="hidden sm:inline">Quiz</span>
                    </TabsTrigger>
                </TabsList>

                {/* Theory Tab */}
                <TabsContent value="theory" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Lesson Content</CardTitle>
                        </CardHeader>
                        <CardContent className="prose dark:prose-invert max-w-none">
                            {lesson.theory.split('\n').map((line, i) => {
                                if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-6 mb-4">{line.replace('# ', '')}</h1>;
                                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-5 mb-3">{line.replace('## ', '')}</h2>;
                                if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-4 mb-2">{line.replace('### ', '')}</h3>;
                                if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.replace('- ', '')}</li>;
                                return <p key={i} className="mb-2 text-slate-700 dark:text-slate-300 leading-relaxed">{line}</p>
                            })}
                        </CardContent>
                    </Card>
                    <div className="mt-4 flex justify-end">
                        <Button onClick={() => {
                            updateLessonProgress(lesson.id, 'theoryRead', true);
                            setActiveTab('practice');
                        }}>
                            Mark as Read & Continue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </TabsContent>

                {/* Practice Tab */}
                <TabsContent value="practice" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Practice Checklist</CardTitle>
                            <CardDescription>Complete the following tasks to reinforce learning.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {lesson.practiceTasks.map((task, i) => (
                                <div key={i} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <Checkbox
                                        id={`task-${i}`}
                                        checked={(currentProgress?.checkedTasks || []).includes(`task-${i}`)}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            const currentChecked = currentProgress?.checkedTasks || [];
                                            let newChecked;
                                            if (checked) {
                                                newChecked = [...currentChecked, `task-${i}`];
                                            } else {
                                                newChecked = currentChecked.filter(t => t !== `task-${i}`);
                                            }
                                            updateLessonProgress(lesson.id, 'checkedTasks', newChecked);
                                        }}
                                    />
                                    <label htmlFor={`task-${i}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1">
                                        {task}
                                    </label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <div className="mt-4 flex justify-end">
                        <Button
                            disabled={(currentProgress?.checkedTasks || []).length !== lesson.practiceTasks.length}
                            onClick={() => {
                                updateLessonProgress(lesson.id, 'practiceCompleted', true);
                                setActiveTab('terminal');
                            }}
                        >
                            Complete Practice & Continue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </TabsContent>

                {/* Terminal Tab */}
                <TabsContent value="terminal" className="animate-in fade-in slide-in-from-bottom-2">
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lab Objective</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md border-l-4 border-kali-500 mb-4">
                                        <h4 className="font-bold mb-1">Required Command</h4>
                                        <code className="bg-black text-green-400 px-2 py-1 rounded text-sm block w-full">{lesson.terminalTasks[0]?.command}</code>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        {lesson.terminalTasks[0]?.description}. Type the command exactly as shown in the terminal.
                                    </p>
                                    {terminalSuccess && (
                                        <div className="flex items-center text-green-600 font-bold bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                            <CheckCircle className="mr-2 h-5 w-5" /> Lab Passed!
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-2">
                            <Terminal
                                height="h-[500px]"
                                onCommand={handleTerminalCommand}
                                initialLines={[{ type: 'system', content: 'Sandbox environment initialized.' }]}
                            />
                        </div>
                    </div>
                    {terminalSuccess && (
                        <div className="mt-4 flex justify-end">
                            <Button onClick={() => setActiveTab('quiz')}>
                                Maintain Momentum <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </TabsContent>

                {/* Quiz Tab */}
                <TabsContent value="quiz" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle>Knowledge Check</CardTitle>
                            <CardDescription>Verify your understanding to complete this lesson.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {lesson.quiz.map((q, i) => (
                                <div key={q.id} className="space-y-4">
                                    <h3 className="font-semibold text-lg">{i + 1}. {q.question}</h3>
                                    <div className="grid gap-3">
                                        {q.options.map((option, idx) => {
                                            const isSelected = quizAnswers[q.id] === idx;
                                            const showResult = quizSubmitted;
                                            const isCorrect = idx === q.correctAnswer;
                                            const isWrongSelection = showResult && isSelected && !isCorrect;

                                            let borderClass = "border-slate-200 dark:border-slate-700";
                                            if (showResult && isCorrect) borderClass = "border-green-500 bg-green-50 dark:bg-green-900/20";
                                            if (isWrongSelection) borderClass = "border-red-500 bg-red-50 dark:bg-red-900/20";
                                            if (!showResult && isSelected) borderClass = "border-kali-500 bg-kali-50 dark:bg-kali-900/20";

                                            return (
                                                <div
                                                    key={idx}
                                                    onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [q.id]: idx })}
                                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${borderClass}`}
                                                >
                                                    <div className="flex items-center">
                                                        <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${isSelected ? 'border-kali-500' : 'border-slate-400'}`}>
                                                            {isSelected && <div className="w-2 h-2 rounded-full bg-kali-500" />}
                                                        </div>
                                                        {option}
                                                        {showResult && isCorrect && <CheckCircle className="ml-auto text-green-500 h-5 w-5" />}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            {quizSubmitted && (
                                <div className={`p-4 rounded-lg text-center ${Object.keys(quizAnswers).length === lesson.quiz.length && lesson.quiz.every(q => quizAnswers[q.id] === q.correctAnswer) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {lesson.quiz.every(q => quizAnswers[q.id] === q.correctAnswer) ? "All Correct! Lesson Complete." : "Some answers are incorrect. Retrying..."}
                                </div>
                            )}

                            {!quizSubmitted ? (
                                <Button className="w-full" onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length !== lesson.quiz.length}>
                                    Submit Answers
                                </Button>
                            ) : (
                                <div className="flex gap-4">
                                    {!lesson.quiz.every(q => quizAnswers[q.id] === q.correctAnswer) && (
                                        <Button variant="outline" className="flex-1" onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}>
                                            Retry Quiz
                                        </Button>
                                    )}
                                    {lesson.quiz.every(q => quizAnswers[q.id] === q.correctAnswer) && (
                                        <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleCompleteLesson}>
                                            Complete Lesson
                                        </Button>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
export default RoadmapLessonPage;
