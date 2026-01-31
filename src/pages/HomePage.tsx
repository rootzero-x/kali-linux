import { } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useGamification } from '../contexts/GamificationContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Terminal as TerminalIcon, Award, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Terminal } from '../components/features/Terminal';

export const HomePage = () => {
    const { t } = useLanguage();
    const { user } = useGamification();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern opacity-5 dark:opacity-10 pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-6"
                    >
                        <motion.div variants={item}>
                            <Badge variant="outline" className="px-4 py-1 text-sm border-kali-500 text-kali-600 dark:text-kali-400">
                                v2026.1 Release / Online Learning
                            </Badge>
                        </motion.div>
                        <motion.h1 variants={item} className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                            {t('hero.title')} <span className="text-kali-500">.</span>
                        </motion.h1>
                        <motion.p variants={item} className="text-xl text-slate-600 dark:text-slate-300 max-w-lg">
                            {t('hero.subtitle')}
                        </motion.p>
                        <motion.div variants={item} className="flex flex-wrap gap-4 pt-4">
                            <Link to="/roadmaps">
                                <Button size="lg" className="rounded-full px-8 text-lg font-semibold bg-kali-600 hover:bg-kali-700">
                                    {t('hero.cta_primary')} <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="/library">
                                <Button size="lg" variant="outline" className="rounded-full px-8 text-lg border-2">
                                    {t('hero.cta_secondary')}
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div variants={item} className="pt-8 flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                                <Shield className="text-kali-500" size={18} />
                                <span>Defensive Security</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TerminalIcon className="text-kali-500" size={18} />
                                <span>Command Line</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="text-kali-500" size={18} />
                                <span>Interactive Labs</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Hero Visual (Terminal) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="hidden lg:block relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-kali-600 to-blue-600 rounded-lg blur opacity-30 animate-pulse-slow pl-1 pb-1" />
                        <Terminal
                            className="w-full shadow-2xl relative z-10"
                            height="h-[400px]"
                            initialLines={[
                                { type: 'system', content: 'Connecting to Kali Linux Learning Environment...' },
                                { type: 'system', content: 'Connection established. Welcome user.' },
                                { type: 'input', content: 'kali@kali:~$ ./start-learning.sh' },
                                { type: 'output', content: 'Initializing modules...' },
                                { type: 'output', content: '[OK] Network Analysis' },
                                { type: 'output', content: '[OK] System Administration' },
                                { type: 'output', content: '[OK] Cyber Ethics' },
                                { type: 'system', content: 'Ready to learn. Select a path to continue.' },
                            ]}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-slate-50 dark:bg-slate-900/50 py-12 border-y border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200 dark:divide-slate-800">
                    <div className="p-4">
                        <div className="text-4xl font-bold text-kali-600 dark:text-kali-400 mb-2">1,240+</div>
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t('stats.users')}</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-kali-600 dark:text-kali-400 mb-2">85+</div>
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t('stats.lessons')}</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-kali-600 dark:text-kali-400 mb-2">12</div>
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t('stats.badges')}</div>
                    </div>
                    <div className="p-4">
                        <div className="text-4xl font-bold text-kali-600 dark:text-kali-400 mb-2">{user.streak}</div>
                        <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Your Streak (Day)</div>
                    </div>
                </div>
            </section>

            {/* Featured Roadmaps */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{t('common.roadmaps')}</h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                                Curated learning paths designed to take you from beginner to advanced.
                            </p>
                        </div>
                        <Link to="/roadmaps" className="hidden md:flex items-center text-kali-600 hover:text-kali-700 font-medium">
                            View All <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Fake Data for now */}
                        {[
                            { title: "Linux Fundamentals", level: "Beginner", icon: TerminalIcon, color: "text-green-500", progress: 0 },
                            { title: "Network Analysis", level: "Intermediate", icon: Zap, color: "text-blue-500", progress: 0 },
                            { title: "Web Exploitation", level: "Advanced", icon: Shield, color: "text-red-500", progress: 0 },
                        ].map((roadmap, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-xl hover:border-kali-500/50 transition-all cursor-pointer group">
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-kali-50 dark:group-hover:bg-kali-900/20 transition-colors">
                                                <roadmap.icon className={cn("h-6 w-6", roadmap.color)} />
                                            </div>
                                            <Badge variant={roadmap.level === 'Beginner' ? 'success' : roadmap.level === 'Intermediate' ? 'warning' : 'destructive'}>
                                                {roadmap.level}
                                            </Badge>
                                        </div>
                                        <CardTitle className="mb-2">{roadmap.title}</CardTitle>
                                        <CardDescription>
                                            Step-by-step guide to mastering core skills.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                                            <span>0% Complete</span>
                                            <span>0/12 Lessons</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-kali-500 w-0" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Daily Challenge Teaser */}
            <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern opacity-10 pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                        <Award className="text-yellow-400 mr-2" />
                        <span className="font-bold text-yellow-400">Daily Challenge</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Crack the Hash</h2>
                    <p className="text-slate-300 max-w-xl mx-auto mb-8 text-lg">
                        Identify the type of the given hash and find the original plaintext using basic tools.
                        Win <span className="text-yellow-400 font-bold">+50 XP</span>.
                    </p>
                    <Link to="/challenges">
                        <Button className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-6 text-lg font-bold">
                            Accept Challenge
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};
