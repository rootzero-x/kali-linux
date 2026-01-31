import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '../../contexts/GamificationContext';
import { getLevelConfig } from '../../data/gamification';
import { Button } from '../ui/Button';
import { Shield, Sparkles } from 'lucide-react';
import ReactConfetti from 'react-confetti';
import { useEffect, useState } from 'react';

export const LevelUpModal = () => {
    const { userLevel, lastLevelSeen, ackLevelUp } = useGamification();
    const [show, setShow] = useState(false);
    const [levelConfig, setLevelConfig] = useState(getLevelConfig(1));

    useEffect(() => {
        if (userLevel > lastLevelSeen) {
            setShow(true);
            setLevelConfig(getLevelConfig(userLevel));
        } else {
            setShow(false);
        }
    }, [userLevel, lastLevelSeen]);

    const handleClaim = () => {
        ackLevelUp();
        setShow(false);
    };

    if (!show) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <ReactConfetti recycle={false} numberOfPieces={200} />

                <motion.div
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    className="relative w-full max-w-md bg-slate-900 border-2 border-kali-500 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                >
                    {/* Header Effect */}
                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-kali-600/50 to-transparent" />

                    <div className="relative p-8 text-center flex flex-col items-center">
                        <div className="mb-6 relative">
                            <div className="absolute inset-0 bg-kali-500 blur-2xl opacity-50 animate-pulse" />
                            <Shield size={80} className="text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                className="absolute -inset-4 border-2 border-dashed border-white/30 rounded-full"
                            />
                        </div>

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-extrabold text-white mb-2 tracking-tight"
                        >
                            LEVEL UP!
                        </motion.h2>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: 'spring' }}
                            className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-kali-400 to-blue-400 mb-4"
                        >
                            {userLevel}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 mb-6 border border-white/10"
                        >
                            <p className="text-slate-300 text-sm uppercase tracking-wider mb-1">New Rank</p>
                            <h3 className="text-2xl font-bold text-white">{levelConfig.title}</h3>
                        </motion.div>

                        <div className="space-y-2 mb-8 w-full">
                            <h4 className="text-kali-400 font-semibold text-sm uppercase flex items-center justify-center gap-2">
                                <Sparkles size={14} /> Unlocked Perks
                            </h4>
                            {levelConfig.perks.map((perk, i) => (
                                <div key={i} className="text-slate-300 text-sm bg-slate-800/50 py-1 rounded">
                                    {perk}
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={handleClaim}
                            className="w-full bg-gradient-to-r from-kali-600 to-blue-600 hover:from-kali-500 hover:to-blue-500 text-white font-bold py-6 text-lg shadow-lg hover:shadow-kali-500/25 transition-all"
                        >
                            CLAIM REWARDS
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
