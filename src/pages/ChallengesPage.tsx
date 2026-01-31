import { useGamification } from '../contexts/GamificationContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Terminal, CheckCircle, Trophy, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import { Terminal as TerminalComponent } from '../components/features/Terminal';
import { SeoHead } from '../components/seo/SeoHead';

export const ChallengesPage = () => {
    const { dailyChallenge, isDailyChallengeCompleted, completeDailyChallenge, userStreak } = useGamification();
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    const handleCommand = (cmd: string) => {
        if (!dailyChallenge) return { type: 'error' as const, content: 'No challenge active' };

        // Very basic validation logic for the demo - matches the requested command
        // In real app, this would use a regex from the challenge data
        if (cmd.trim() === dailyChallenge.command || cmd.trim().includes(dailyChallenge.command)) {
            // Success
            setTimeout(() => {
                completeDailyChallenge();
                setIsTerminalOpen(false);
            }, 1500);
            return { type: 'success' as const, content: `[+] Correct! Challenge verified.\n[+] ${dailyChallenge.xp} XP Awarded.` };
        }

        return { type: 'error' as const, content: `[-] Incorrect command. Try again.` };
    };

    if (!dailyChallenge) return <div>Loading challenge...</div>;

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <SeoHead title="Daily Challenge | Kali Linux Academy" description="Complete your daily Kali Linux challenge to earn XP and build your streak." />

            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-kali-600 to-blue-500 bg-clip-text text-transparent">Daily Challenge</h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Sharpen your skills with a unique challenge every day. Consistency is key to mastery.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-none">
                    <CardContent className="flex items-center p-6">
                        <div className="p-3 bg-white/20 rounded-full mr-4">
                            <Trophy size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium opacity-90">Current Streak</p>
                            <h3 className="text-3xl font-bold">{userStreak} Days</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-none">
                    <CardContent className="flex items-center p-6">
                        <div className="p-3 bg-white/20 rounded-full mr-4">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium opacity-90">Time Remaining</p>
                            <h3 className="text-3xl font-bold">23h 15m</h3>
                            {/* Static for now, could be dynamic */}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-none">
                    <CardContent className="flex items-center p-6">
                        <div className="p-3 bg-white/20 rounded-full mr-4">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium opacity-90">Today's Status</p>
                            <h3 className="text-3xl font-bold">{isDailyChallengeCompleted ? "Completed" : "Pending"}</h3>
                        </div>
                        {isDailyChallengeCompleted && <div className="ml-auto text-4xl opacity-50"><CheckCircle /></div>}
                    </CardContent>
                </Card>
            </div>

            {/* Main Challenge Card */}
            <Card className={`border-2 ${isDailyChallengeCompleted ? 'border-green-500/50' : 'border-kali-500/50'} overflow-hidden shadow-lg transition-all`}>
                <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 pb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <Badge className="mb-2 bg-kali-100 text-kali-700 hover:bg-kali-200 border-none px-3 py-1">
                                {dailyChallenge.category}
                            </Badge>
                            <CardTitle className="text-3xl font-bold mt-1">{dailyChallenge.title}</CardTitle>
                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                <span className={`flex items-center ${dailyChallenge.difficulty === 'Easy' ? 'text-green-500' :
                                    dailyChallenge.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                                    }`}>
                                    Difficulty: {dailyChallenge.difficulty}
                                </span>
                                <span className="flex items-center text-kali-500">
                                    Reward: {dailyChallenge.xp} XP
                                </span>
                            </div>
                        </div>
                        {isDailyChallengeCompleted ? (
                            <Badge className="bg-green-500 text-white px-4 py-2 text-sm">
                                <CheckCircle size={16} className="mr-2" />
                                Completed
                            </Badge>
                        ) : (
                            <div className="text-4xl text-slate-200 dark:text-slate-700">
                                <Calendar />
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="prose dark:prose-invert max-w-none mb-8">
                        <h3 className="text-xl font-semibold mb-2">Instructions</h3>
                        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                            {dailyChallenge.description}
                        </p>
                    </div>

                    {isDailyChallengeCompleted ? (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 bg-green-100 dark:bg-green-800 rounded-full animate-bounce">
                                    <CheckCircle size={32} className="text-green-600 dark:text-green-200" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">Challenge Conquered!</h3>
                            <p className="text-green-600 dark:text-green-400">
                                You have successfully completed today's challenge. Come back tomorrow for a new one!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {!isTerminalOpen ? (
                                <Button
                                    size="lg"
                                    className="w-full text-lg h-14 bg-kali-600 hover:bg-kali-700 text-white shadow-lg hover:shadow-kali-500/20 transition-all"
                                    onClick={() => setIsTerminalOpen(true)}
                                >
                                    <Terminal className="mr-2" /> Start Challenge Terminal
                                </Button>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="bg-slate-900 rounded-t-lg p-3 flex items-center justify-between border-b border-white/10">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                        </div>
                                        <span className="text-xs text-slate-400 font-mono">root@kali: ~</span>
                                    </div>
                                    <TerminalComponent
                                        height="h-[400px]"
                                        onCommand={handleCommand as any}
                                        promptLabel="root@kali:~#"
                                    />
                                    <div className="mt-4 flex justify-end">
                                        <Button variant="ghost" className="text-slate-500" onClick={() => setIsTerminalOpen(false)}>
                                            Cancel Challenge
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
