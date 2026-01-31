
import { modules } from '../data/academy';
import { useAcademy } from '../contexts/AcademyContext';
import { Card, CardDescription, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BookOpen, Lock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/seo/SeoHead';

export const AcademyPage = () => {
    const { completedModules, lessonProgress } = useAcademy();

    const getModuleProgress = (moduleId: string) => {
        const moduleLessons = modules.find(m => m.id === moduleId)?.lessons || [];
        if (moduleLessons.length === 0) return 0;

        const completedCount = moduleLessons.filter(l => lessonProgress[l.id]?.completed).length;
        return Math.round((completedCount / moduleLessons.length) * 100);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <SeoHead title="Cyber Academy | Kali Linux Masterclass" description="Structured learning path from Linux basics to advanced penetration testing." />

            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-kali-600 to-cyan-500 bg-clip-text text-transparent">Cyber Academy</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">
                    Master the art of ethical hacking through our structured curriculum.
                    Each module is strictly gated to ensure you master the concepts before moving forward.
                </p>
            </div>

            <div className="space-y-8">
                {modules.map((module, index) => {
                    const isCompleted = completedModules.includes(module.id);
                    const progress = getModuleProgress(module.id);
                    // Lock logic: First module unlocked, others require previous module completion
                    const isLocked = index > 0 && !completedModules.includes(modules[index - 1].id);

                    return (
                        <Card key={module.id} className={`overflow-hidden transition-all ${isLocked ? 'opacity-70 grayscale' : 'hover:shadow-lg hover:border-kali-500/50'}`}>
                            <div className="flex flex-col md:flex-row">
                                <div className="bg-slate-100 dark:bg-slate-900 w-full md:w-64 p-8 flex flex-col justify-center items-center text-center border-r border-slate-200 dark:border-slate-800">
                                    <div className={`p-4 rounded-full mb-4 ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                        {isCompleted ? <Trophy size={32} /> : isLocked ? <Lock size={32} /> : <BookOpen size={32} />}
                                    </div>
                                    <h3 className="font-mono text-xl font-bold">Module {index + 1}</h3>
                                    <Badge variant={isCompleted ? "success" : "secondary"} className="mt-2">
                                        {isCompleted ? "Completed" : isLocked ? "Locked" : "In Progress"}
                                    </Badge>
                                </div>
                                <div className="flex-1 p-6 md:p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <CardTitle className="text-2xl mb-2">{module.title}</CardTitle>
                                            <CardDescription className="text-base line-clamp-2">{module.description}</CardDescription>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-semibold text-slate-500">{progress}% Complete</span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
                                        <div
                                            className="bg-kali-600 h-full transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>

                                    {!isLocked && (
                                        <div className="mt-8 flex justify-end">
                                            <Link to={`/academy/${module.id}`}>
                                                <Button disabled={isLocked} className="bg-kali-600 hover:bg-kali-700">
                                                    {progress === 100 ? "Review Module" : progress === 0 ? "Start Module" : "Continue Learning"}
                                                </Button>
                                            </Link>
                                        </div>
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
