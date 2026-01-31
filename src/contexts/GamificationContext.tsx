import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface UserProgress {
    xp: number;
    level: number;
    streak: number;
    lastLoginDate: string;
    completedLessons: string[];
    badges: string[];
}

interface GamificationContextType {
    user: UserProgress;
    addXp: (amount: number) => void;
    completeLesson: (lessonId: string) => void;
    unlockBadge: (badgeId: string) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const INITIAL_USER: UserProgress = {
    xp: 0,
    level: 1,
    streak: 0,
    lastLoginDate: new Date().toISOString().split('T')[0],
    completedLessons: [],
    badges: [],
};

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProgress>(INITIAL_USER);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('kali_user');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setUser(parsed);
                checkStreak(parsed);
            } catch (e) {
                console.error("Failed to parse user progress", e);
            }
        } else {
            localStorage.setItem('kali_user', JSON.stringify(INITIAL_USER));
        }
    }, []);

    // Persist to local storage whenever user changes
    useEffect(() => {
        localStorage.setItem('kali_user', JSON.stringify(user));
    }, [user]);

    const checkStreak = (currentUser: UserProgress) => {
        const today = new Date().toISOString().split('T')[0];
        if (currentUser.lastLoginDate !== today) {
            // Simple streak logic: if last login was yesterday, increment. If older, reset (unless it's 0).
            // For simplicity, we'll implement a robust check later.
            // For now: update last login.
            setUser(prev => ({ ...prev, lastLoginDate: today }));
        }
    };

    const addXp = (amount: number) => {
        setUser(prev => {
            const newXp = prev.xp + amount;
            // Level up logic: Level = floor(sqrt(XP / 100)) + 1 or similar.
            // Simple: every 500 XP is a level.
            const newLevel = Math.floor(newXp / 500) + 1;

            if (newLevel > prev.level) {
                // Could trigger a toast here
                console.log("Level Up!");
            }

            return { ...prev, xp: newXp, level: newLevel };
        });
    };

    const completeLesson = (lessonId: string) => {
        if (!user.completedLessons.includes(lessonId)) {
            setUser(prev => ({
                ...prev,
                completedLessons: [...prev.completedLessons, lessonId]
            }));
            addXp(100); // 100 XP per lesson
        }
    };

    const unlockBadge = (badgeId: string) => {
        if (!user.badges.includes(badgeId)) {
            setUser(prev => ({
                ...prev,
                badges: [...prev.badges, badgeId]
            }));
        }
    };

    return (
        <GamificationContext.Provider value={{ user, addXp, completeLesson, unlockBadge }}>
            {children}
        </GamificationContext.Provider>
    );
};

export const useGamification = () => {
    const context = useContext(GamificationContext);
    if (context === undefined) {
        throw new Error('useGamification must be used within a GamificationProvider');
    }
    return context;
};
