
import { useParams, Link } from 'react-router-dom';
import { modules } from '../data/academy';
import { useAcademy } from '../contexts/AcademyContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ChevronLeft, Lock, PlayCircle, CheckCircle, BookOpen } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';

export const ModulePage = () => {
    const { moduleId } = useParams();
    const { completedModules, lessonProgress, canUnlockLesson } = useAcademy();

    const module = modules.find(m => m.id === moduleId);

    if (!module) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Module not found</h1>
                <Link to="/academy">
                    <Button>Back to Academy</Button>
                </Link>
            </div>
        );
    }

    const isModuleCompleted = completedModules.includes(module.id);

    // Calculate progress
    const moduleLessons = module.lessons;
    const completedCount = moduleLessons.filter(l => lessonProgress[l.id]?.completed).length;
    const progressPercent = Math.round((completedCount / moduleLessons.length) * 100);

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <SeoHead title={`${module.title} | Cyber Academy`} description={module.description} />

            <div className="mb-8">
                <Link to="/academy" className="text-slate-500 hover:text-kali-600 flex items-center mb-4 transition-colors">
                    <ChevronLeft size={16} className="mr-1" /> Back to Academy
                </Link>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
                        <p className="text-slate-600 dark:text-slate-400">{module.description}</p>
                    </div>
                    <Badge variant={isModuleCompleted ? "success" : "secondary"} className="self-start md:self-center px-3 py-1 text-sm">
                        {isModuleCompleted ? "Completed" : `${progressPercent}% Complete`}
                    </Badge>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-12">
                <div
                    className="bg-kali-600 h-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <div className="space-y-4">
                {module.lessons.map((lesson, index) => {
                    const lessonState = lessonProgress[lesson.id];
                    const isCompleted = lessonState?.completed;

                    // Simple lock logic relying on context or checking previous lesson
                    // We can use the helper from context
                    const isLocked = !canUnlockLesson(lesson.id) && !isCompleted;

                    return (
                        <Card key={lesson.id} className={`transition-all ${isLocked ? 'opacity-60 bg-slate-50 dark:bg-slate-900/50' : 'hover:border-kali-500 hover:shadow-md'}`}>
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className={`p-2 rounded-full flex-shrink-0 ${isCompleted ? 'bg-green-100 text-green-600' :
                                        isLocked ? 'bg-slate-100 text-slate-400' :
                                            'bg-blue-50 text-kali-600'
                                        }`}>
                                        {isCompleted ? <CheckCircle size={20} /> : isLocked ? <Lock size={20} /> : <PlayCircle size={20} />}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-lg truncate flex items-center">
                                            <span className="text-slate-400 font-mono text-sm mr-2">#{index + 1}</span>
                                            {lesson.title.split(':').pop()?.trim() || lesson.title}
                                        </h3>
                                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                                            <span className="flex items-center gap-1"><BookOpen size={12} /> Theory</span>
                                            <span>•</span>
                                            <span>{lesson.terminalTasks.length > 0 ? 'Hands-on Lab' : 'Quiz'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {isLocked ? (
                                        <Button variant="ghost" disabled size="sm">Locked</Button>
                                    ) : (
                                        <Link to={`/academy/${module.id}/lesson/${lesson.id}`}>
                                            <Button size="sm" variant={isCompleted ? "outline" : "default"} className={isCompleted ? "" : "bg-kali-600 hover:bg-kali-700"}>
                                                {isCompleted ? "Review" : "Start"}
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
