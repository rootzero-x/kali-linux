export interface LevelConfig {
    level: number;
    title: string;
    xpRequired: number; // Total XP required to reach this level
    perks: string[];
}

export interface BadgeConfig {
    id: string;
    name: string;
    description: string;
    icon: string; // Lucide icon name or emoji
    xpReward: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// XP Curve: Level up gets progressively harder
// Lvl 1: 0 XP
// Lvl 2: 100 XP
// Lvl 3: 400 XP
// Lvl 4: 900 XP
// ... Lvl X: (X-1)^2 * 100
export const LEVELS: LevelConfig[] = [
    { level: 1, title: 'Cyber Recruit', xpRequired: 0, perks: ['Basic Access'] },
    { level: 2, title: 'Cyber Operative', xpRequired: 100, perks: ['Custom Avatar Border'] },
    { level: 3, title: 'Security Analyst', xpRequired: 400, perks: ['Access to Labs'] },
    { level: 4, title: 'Threat Hunter', xpRequired: 900, perks: ['Advanced Tools'] },
    { level: 5, title: 'Red Team Apprentice', xpRequired: 1600, perks: ['Exploit Modules'] },
    { level: 6, title: 'Red Team Operator', xpRequired: 2500, perks: ['C2 Frameworks'] },
    { level: 7, title: 'Exploit Engineer', xpRequired: 3600, perks: ['0-Day Research'] },
    { level: 8, title: 'Cyber Elite', xpRequired: 4900, perks: ['Elite Badge'] },
    { level: 9, title: 'Master Hacker', xpRequired: 6400, perks: ['Mentor Status'] },
    { level: 10, title: 'Kali Linux Master', xpRequired: 8100, perks: ['Legendary Status'] }
];

export const BADGES: BadgeConfig[] = [
    {
        id: 'first-blood',
        name: 'First Blood',
        description: 'Complete your first lesson.',
        icon: 'Droplet',
        xpReward: 50,
        rarity: 'common'
    },
    {
        id: 'command-runner',
        name: 'Command Runner',
        description: 'Run 50 terminal commands.',
        icon: 'Terminal',
        xpReward: 100,
        rarity: 'common'
    },
    {
        id: 'quiz-master',
        name: 'Quiz Master',
        description: 'Pass 10 quizzes with 100% score.',
        icon: 'Brain',
        xpReward: 200,
        rarity: 'rare'
    },
    {
        id: 'linux-scholar',
        name: 'Linux Scholar',
        description: 'Complete the Linux Fundamentals roadmap.',
        icon: 'BookOpen',
        xpReward: 300,
        rarity: 'rare'
    },
    {
        id: 'network-ninja',
        name: 'Network Ninja',
        description: 'Complete the Network Analysis roadmap.',
        icon: 'Network',
        xpReward: 300,
        rarity: 'rare'
    },
    {
        id: 'web-warrior',
        name: 'Web Warrior',
        description: 'Complete the Web Application Security roadmap.',
        icon: 'Globe',
        xpReward: 300,
        rarity: 'rare'
    },
    {
        id: 'streak-7',
        name: 'Dedicated',
        description: 'Maintain a 7-day learning streak.',
        icon: 'Flame',
        xpReward: 500,
        rarity: 'epic'
    },
    {
        id: 'night-hacker',
        name: 'Night Hacker',
        description: 'Complete a lesson between 10 PM and 4 AM.',
        icon: 'Moon',
        xpReward: 150,
        rarity: 'epic'
    },
    {
        id: 'completionist',
        name: 'Completionist',
        description: 'Unlock all modules in the Academy.',
        icon: 'Trophy',
        xpReward: 1000,
        rarity: 'legendary'
    },
    {
        id: 'kali-master',
        name: 'Kali Master',
        description: 'Reach Level 10.',
        icon: 'Shield',
        xpReward: 5000,
        rarity: 'legendary'
    }
];

export const getLevelConfig = (level: number) => LEVELS.find(l => l.level === level) || LEVELS[LEVELS.length - 1];
export const getBadgeConfig = (id: string) => BADGES.find(b => b.id === id);
