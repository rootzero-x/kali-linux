
import { roadmaps } from '../data/roadmaps';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RoadmapsPage = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">Learning Roadmaps</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Structured paths designed to guide you from basics to advanced cybersecurity concepts.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {roadmaps.map((roadmap) => (
                    <Card key={roadmap.id} className="flex flex-col h-full hover:shadow-lg transition-shadow border-t-4 border-t-kali-500">
                        <CardHeader>
                            <div className="flex justify-between items-center mb-2">
                                <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800">
                                    {roadmap.modules.length} Modules
                                </Badge>
                                <Badge
                                    variant={roadmap.level === 'Beginner' ? 'success' : roadmap.level === 'Intermediate' ? 'warning' : 'destructive'}
                                >
                                    {roadmap.level}
                                </Badge>
                            </div>
                            <CardTitle className="text-2xl mb-2">{roadmap.title}</CardTitle>
                            <CardDescription className="text-base">{roadmap.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="mt-auto pt-6">
                            <div className="space-y-4">
                                {/* Module Preview */}
                                <div className="space-y-2">
                                    {roadmap.modules.slice(0, 2).map((mod, idx) => (
                                        <div key={idx} className="flex items-center text-sm text-slate-500 dark:text-slate-400 p-2 bg-slate-50 dark:bg-slate-800/50 rounded">
                                            <BookOpen size={16} className="mr-2 text-kali-500" />
                                            <span className="flex-1 truncate">{mod.title}</span>
                                            <span className="text-xs opacity-70">{mod.lessons.length} lessons</span>
                                        </div>
                                    ))}
                                    {roadmap.modules.length > 2 && (
                                        <div className="text-xs text-center text-slate-400 italic">
                                            + {roadmap.modules.length - 2} more modules
                                        </div>
                                    )}
                                </div>

                                <Link to={`/roadmaps/${roadmap.id}`} className="block">
                                    <Button className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                                        Start Roadmap <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
