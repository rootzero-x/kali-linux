import { useEffect, useState } from 'react';
import { useGamification } from '../contexts/GamificationContext';
import { useAcademy } from '../contexts/AcademyContext';
import { getLevelConfig } from '../data/gamification';
import { BadgeGrid } from '../components/gamification/BadgeGrid';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Shield, Target, Flame, Terminal, Award } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';

export const ProfilePage = () => {
    const { userXp, userLevel, userStreak, activityLog, badges, totalCommandsRun } = useGamification();
    const { completedModules } = useAcademy();
    const [levelConfig, setLevelConfig] = useState(getLevelConfig(1));

    useEffect(() => {
        setLevelConfig(getLevelConfig(userLevel));
    }, [userLevel]);

    const nextLevelXp = Math.pow(userLevel, 2) * 100;
    const prevLevelXp = Math.pow(userLevel - 1, 2) * 100;
    const progressPercent = Math.min(100, Math.max(0, ((userXp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100));

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <SeoHead title={`${levelConfig.title} | CyberNexus Profile`} description={`Level ${userLevel} Cyber Security Operative.`} />

            <div className="grid lg:grid-cols-12 gap-8">
                {/* LEFT COLUMN: Avatar & Quick Stats */}
                <div className="lg:col-span-4 space-y-6">
                    {/* AVATAR CARD */}
                    <Card className="text-center overflow-hidden border-kali-500/30 relative group">
                        {/* Background Effect */}
                        <div className="bg-slate-900 h-32 relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px_16px]" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80" />
                        </div>

                        <div className="px-6 pb-8 relative">
                            {/* Animated Cyber Ring Avatar */}
                            <div className="relative -mt-16 mb-6 inline-block">
                                {/* Rings */}
                                <div className="absolute -inset-4 rounded-full border-2 border-dashed border-kali-500/30 animate-spin-slow"></div>
                                <div className="absolute -inset-1 rounded-full border border-kali-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>

                                {/* Avatar Container */}
                                <div className="w-32 h-32 rounded-full bg-slate-950 border-4 border-slate-800 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-kali-900/50 to-blue-900/20" />
                                    <Shield size={64} className="text-kali-500 relative z-10 drop-shadow-lg" />
                                </div>

                                {/* Level Badge */}
                                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-kali-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-slate-900 shadow-lg">
                                    Lvl {userLevel}
                                </div>
                            </div>

                            <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400">
                                {levelConfig.title}
                            </h2>
                            <p className="text-kali-600 font-mono text-sm mb-6">Operative ID: #CNX-{userLevel.toString().padStart(4, '0')}</p>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                                    <span className="block font-bold text-xl text-slate-900 dark:text-white">{userXp.toLocaleString()}</span>
                                    <span className="text-slate-500 text-xs uppercase tracking-wider">Total XP</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                                    <span className="block font-bold text-xl text-slate-900 dark:text-white">{completedModules.length}</span>
                                    <span className="text-slate-500 text-xs uppercase tracking-wider">Modules</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* DETAILED STATS */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base uppercase tracking-wider text-slate-500 flex items-center">
                                <Target className="mr-2 h-4 w-4" /> Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="flex justify-between items-center group">
                                <div className="flex items-center text-slate-700 dark:text-slate-300">
                                    <Flame size={18} className="mr-3 text-orange-500 group-hover:scale-110 transition-transform" />
                                    <span>Current Streak</span>
                                </div>
                                <span className="font-bold font-mono text-lg">{userStreak} Days</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <div className="flex items-center text-slate-700 dark:text-slate-300">
                                    <Terminal size={18} className="mr-3 text-green-500 group-hover:scale-110 transition-transform" />
                                    <span>Commands Run</span>
                                </div>
                                <span className="font-bold font-mono text-lg">{totalCommandsRun || 0}</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <div className="flex items-center text-slate-700 dark:text-slate-300">
                                    <Award size={18} className="mr-3 text-yellow-500 group-hover:scale-110 transition-transform" />
                                    <span>Badges Earned</span>
                                </div>
                                <span className="font-bold font-mono text-lg">{badges?.length || 0}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COLUMN: Progress, Badges, Activity */}
                <div className="lg:col-span-8 space-y-8">
                    {/* LEVEL PROGRESS */}
                    <Card className="border-t-4 border-t-kali-500">
                        <CardHeader>
                            <div className="flex justify-between items-end">
                                <div>
                                    <CardTitle>Level Progress</CardTitle>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Keep hacking to reach <span className="text-kali-600 font-bold">{getLevelConfig(userLevel + 1)?.title || 'Max Level'}</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-black text-slate-900 dark:text-white">{Math.round(progressPercent)}%</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3 shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-kali-600 via-kali-500 to-blue-500 transition-all duration-1000 ease-out relative"
                                    style={{ width: `${progressPercent}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                                </div>
                            </div>
                            <div className="flex justify-between text-xs font-mono text-slate-500">
                                <span>Lvl {userLevel}</span>
                                <span>{Math.floor(nextLevelXp - userXp)} XP remaining</span>
                                <span>Lvl {userLevel + 1}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* BADGES GRID */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <Award className="mr-2 text-kali-500" />
                            Achievements
                            <span className="ml-3 text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full text-slate-500">
                                {badges?.length || 0} Unlocked
                            </span>
                        </h3>
                        <BadgeGrid unlockedIds={badges || []} />
                    </div>

                    {/* RECENT ACTIVITY */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Mission Log</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-0">
                                {activityLog.length > 0 ? activityLog.slice(0, 8).map((log) => (
                                    <div key={log.id} className="flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors group border-b border-slate-50 dark:border-slate-800/50 last:border-0">
                                        <div className="mr-4 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-full text-slate-400 group-hover:text-kali-500 group-hover:bg-kali-50 dark:group-hover:bg-kali-900/20 transition-colors">
                                            <Terminal size={16} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate text-slate-700 dark:text-slate-200">{log.message}</p>
                                            <p className="text-xs text-slate-400">{new Date(log.timestamp).toLocaleDateString()} • {new Date(log.timestamp).toLocaleTimeString()}</p>
                                        </div>
                                        <div className="ml-4 font-mono font-bold text-green-600 text-sm bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                                            +{log.xp} XP
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-8 text-slate-500 italic">
                                        No recent activity recorded. Start a mission!
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
