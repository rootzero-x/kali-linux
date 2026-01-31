import type { BadgeConfig } from '../../data/gamification';
import { BADGES } from '../../data/gamification';
// import { Card } from '../ui/Card'; // Unused
import { Lock, CheckCircle } from 'lucide-react';
import * as Icons from 'lucide-react';

interface BadgeProps {
    badge: BadgeConfig;
    unlocked: boolean;
}

const BadgeCard = ({ badge, unlocked }: BadgeProps) => {
    // Dynamic Icon
    const IconComponent = (Icons as any)[badge.icon] || Icons.Award;

    return (
        <div className="group relative">
            <div className={`
                relative p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center text-center h-full
                ${unlocked
                    ? 'bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border-kali-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                    : 'bg-slate-100 dark:bg-slate-900 border-transparent opacity-60 grayscale hover:opacity-100 transition-opacity'
                }
            `}>
                <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center mb-3 text-3xl shadow-inner
                    ${unlocked ? 'bg-kali-100 dark:bg-kali-900/30 text-kali-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}
                `}>
                    <IconComponent size={32} />
                </div>

                <h4 className="font-bold text-sm mb-1">{badge.name}</h4>
                <p className="text-xs text-slate-500 mb-2 leading-tight">{badge.description}</p>

                {unlocked ? (
                    <span className="mt-auto inline-flex items-center text-[10px] font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                        <CheckCircle size={10} className="mr-1" /> UNLOCKED
                    </span>
                ) : (
                    <span className="mt-auto inline-flex items-center text-[10px] font-bold text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        <Lock size={10} className="mr-1" /> {badge.xpReward} XP
                    </span>
                )}
            </div>

            {/* Tooltip Effect */}
            <div className="absolute inset-0 bg-kali-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity pointer-events-none" />
        </div>
    );
};

export const BadgeGrid = ({ unlockedIds }: { unlockedIds: string[] }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {BADGES.map(badge => (
                <BadgeCard
                    key={badge.id}
                    badge={badge}
                    unlocked={unlockedIds.includes(badge.id)}
                />
            ))}
        </div>
    );
};
