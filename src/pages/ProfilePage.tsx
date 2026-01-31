import { useGamification } from '../contexts/GamificationContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Terminal, Award, Zap, Shield } from 'lucide-react';

export const ProfilePage = () => {
    const { user } = useGamification();
    const { t } = useLanguage();

    // Mock badges for display logic
    const allBadges = [
        { id: 'b1', name: 'Script Kiddie', icon: Terminal, description: 'Completed your first lesson' },
        { id: 'b2', name: 'Hacker', icon: Shield, description: ' reached level 5' },
        { id: 'b3', name: 'Elite', icon: Zap, description: '7 day streak' },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">{t('common.profile')}</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* User Stats Card */}
                <Card className="md:col-span-1 bg-gradient-to-br from-kali-900 to-slate-900 text-white border-none">
                    <CardHeader className="text-center">
                        <div className="w-24 h-24 bg-kali-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold shadow-lg shadow-kali-500/30">
                            {user.level}
                        </div>
                        <CardTitle className="text-2xl">Level {user.level}</CardTitle>
                        <p className="text-kali-300">Cyber Security Enthusiast</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                            <span className="text-slate-400">Total XP</span>
                            <span className="font-mono text-xl text-yellow-400">{user.xp}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                            <span className="text-slate-400">Streak</span>
                            <span className="font-mono text-xl text-green-400">{user.streak} Days</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400">Completed Lessons</span>
                            <span className="font-mono text-xl">{user.completedLessons.length}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Achievements / Badges */}
                <div className="md:col-span-2 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Award className="text-kali-500" />
                            Achievements
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {allBadges.map((badge) => {
                                const isUnlocked = user.level > 1; // Fake unlock logic for demo
                                return (
                                    <Card key={badge.id} className={`text-center transition-all ${isUnlocked ? 'border-kali-500/50 bg-kali-50/50 dark:bg-kali-900/10' : 'opacity-50 grayscale'}`}>
                                        <CardContent className="pt-6">
                                            <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${isUnlocked ? 'bg-kali-100 dark:bg-kali-900 text-kali-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
                                                <badge.icon size={24} />
                                            </div>
                                            <h3 className="font-bold mb-1">{badge.name}</h3>
                                            <p className="text-xs text-slate-500">{badge.description}</p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Activity Heatmap (Fake) */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Activity</h2>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex gap-1 overflow-x-auto pb-2">
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-4 h-4 rounded-sm flex-shrink-0 ${Math.random() > 0.7 ? 'bg-kali-500' :
                                                Math.random() > 0.5 ? 'bg-kali-300' : 'bg-slate-100 dark:bg-slate-800'
                                                }`}
                                            title={`Day ${i + 1}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs text-slate-400 mt-2">Last 30 days of learning activity.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
