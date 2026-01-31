import { useState } from 'react';
import { getDailyChallenge } from '../data/challenges';
import { useGamification } from '../contexts/GamificationContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Award, HelpCircle } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { useLanguage } from '../contexts/LanguageContext';

export const ChallengesPage = () => {
    const challenge = getDailyChallenge();
    const { addXp } = useGamification();
    const { t } = useLanguage();
    const [answer, setAnswer] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [showHint, setShowHint] = useState(false);

    // Check if simplified already completed today (in a real app, track daily challenge ID in user)
    // For now, allow retry.

    const handleSubmit = () => {
        if (answer.trim().toLowerCase() === challenge.answer.toLowerCase()) {
            setStatus('success');
            addXp(challenge.xp);
        } else {
            setStatus('error');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">{t('common.daily_challenge')}</h1>

            <div className="max-w-2xl mx-auto">
                <Card className="border-t-4 border-t-yellow-400">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <Badge variant="outline" className="mb-2 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 border-yellow-400/20">
                                {challenge.difficulty} • {challenge.xp} XP
                            </Badge>
                            <Award className="text-yellow-500" size={24} />
                        </div>
                        <CardTitle className="text-3xl">{challenge.title}</CardTitle>
                        <CardDescription className="text-lg mt-2">
                            {challenge.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold mb-2 text-slate-900 dark:text-white">Question:</h3>
                            <p className="text-lg font-mono text-kali-600 dark:text-kali-400">{challenge.question}</p>
                        </div>

                        <div className="space-y-4">
                            <Input
                                placeholder="Enter your answer..."
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className={status === 'error' ? 'border-red-500 focus-visible:ring-red-500' : ''}
                                disabled={status === 'success'}
                            />
                            {status === 'error' && (
                                <p className="text-red-500 text-sm">Incorrect answer. Try again.</p>
                            )}
                            {status === 'success' && (
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg flex items-center">
                                    <Award className="mr-2" size={20} />
                                    Correct! You earned {challenge.xp} XP.
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="ghost" onClick={() => setShowHint(true)}>
                            <HelpCircle className="mr-2 h-4 w-4" /> Need a Hint?
                        </Button>
                        <Button onClick={handleSubmit} disabled={status === 'success' || !answer}>
                            Submit Answer
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <Modal isOpen={showHint} onClose={() => setShowHint(false)} title="Hint">
                <p className="text-lg">{challenge.hint}</p>
                <div className="mt-6 flex justify-end">
                    <Button onClick={() => setShowHint(false)}>Got it</Button>
                </div>
            </Modal>
        </div>
    );
};
