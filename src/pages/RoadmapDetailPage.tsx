import { useParams, Link, useNavigate } from 'react-router-dom';
import { roadmaps } from '../data/roadmaps';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ChevronLeft, CheckCircle, Lock } from 'lucide-react';
import { useAcademy } from '../contexts/AcademyContext';
import { SeoHead } from '../components/seo/SeoHead';

const RoadmapDetailPage = () => {
    const { roadmapId } = useParams();
    const navigate = useNavigate();
    const { lessonProgress } = useAcademy();

    const roadmap = roadmaps.find(r => r.id === roadmapId);

    if (!roadmap) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Roadmap not found</h1>
                <Link to="/roadmaps">
                    <Button variant="outline"><ChevronLeft className="mr-2 h-4 w-4" /> Back to Roadmaps</Button>
                </Link>
            </div>
        );
    }

    const totalLessons = roadmap.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
    const completedInRoadmap = roadmap.modules.flatMap(m => m.lessons).filter(l => lessonProgress[l.id]?.completed).length;
    const progress = Math.round((completedInRoadmap / totalLessons) * 100) || 0;

    return (
        <div className="container mx-auto px-4 py-12">
            <SeoHead title={roadmap.title} description={roadmap.description} />

            <div className="mb-8">
                <Link to="/roadmaps" className="inline-flex items-center text-slate-500 hover:text-kali-500 mb-4 transition-colors">
                    <ChevronLeft size={16} className="mr-1" /> Back to Roadmaps
                </Link>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl md:text-4xl font-bold">{roadmap.title}</h1>
                            <Badge variant={roadmap.level === 'Beginner' ? 'success' : 'warning'}>{roadmap.level}</Badge>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">{roadmap.description}</p>
                    </div>
                    <Card className="w-full md:w-64 bg-slate-50 dark:bg-slate-800/50 border-none">
                        <CardContent className="p-4">
                            <div className="flex justify-between text-sm mb-2 font-mono">
                                <span>Progress</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-kali-500 transition-all duration-1000" style={{ width: `${progress}%` }} />
                            </div>
                            <div className="mt-4 text-xs text-center text-slate-500">
                                {completedInRoadmap} / {totalLessons} lessons completed
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {roadmap.modules.map((module, modIdx) => (
                    <Card key={module.id} className="overflow-hidden">
                        <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 py-4">
                            <CardTitle className="text-lg flex items-center">
                                <span className="bg-slate-200 dark:bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                                    {modIdx + 1}
                                </span>
                                {module.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {module.lessons.map((lesson, _lessIdx) => {
                                    const isCompleted = lessonProgress[lesson.id]?.completed;
                                    const isLocked = false;

                                    return (
                                        <div
                                            key={lesson.id}
                                            onClick={() => !isLocked && navigate(`/roadmaps/${roadmap.id}/lesson/${lesson.id}`)}
                                            className={`p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {isCompleted ? (
                                                    <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                                                ) : isLocked ? (
                                                    <Lock className="text-slate-400 w-5 h-5 flex-shrink-0" />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex-shrink-0" />
                                                )}
                                                <div>
                                                    <div className="font-medium text-slate-900 dark:text-slate-200">
                                                        {lesson.title}
                                                    </div>
                                                    <div className="text-xs text-slate-500 flex items-center gap-2">
                                                        <span>{lesson.duration}</span>
                                                        <span>•</span>
                                                        <span className="uppercase text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 rounded text-slate-500 font-bold">
                                                            {lesson.type}
                                                        </span>
                                                        {lesson.xp > 0 && <span className="text-yellow-500 font-bold">+{lesson.xp} XP</span>}
                                                    </div>
                                                </div>
                                            </div>

                                            <Button size="sm" variant={isCompleted ? "outline" : "default"} className={isCompleted ? "border-green-200 text-green-600 hover:text-green-700" : ""}>
                                                {isCompleted ? "Resume" : "Start"}
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
export default RoadmapDetailPage;
