
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { challenges, type Challenge } from '../data/challenges';
import { appStore, type ActivityLogItem } from '../shared/store/appStore';

interface GamificationContextType {
    userXp: number;
    userLevel: number;
    lastLevelSeen: number;
    userStreak: number;
    badges: string[];
    totalCommandsRun: number;
    addXp: (amount: number, reason: string, uniqueId?: string) => void;
    dailyChallenge: Challenge | null;
    isDailyChallengeCompleted: boolean;
    completeDailyChallenge: () => void;
    activityLog: ActivityLogItem[];
    awardedIds: string[];
    ackLevelUp: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Sync with global store
    const [state, setState] = useState(appStore.getState());

    useEffect(() => {
        const unsubscribe = appStore.subscribe(() => {
            setState(appStore.getState());
        });
        return unsubscribe;
    }, []);

    // Derived daily challenge logic (keeping it here since it's "view logic" or "controller logic")
    // But persistence needs to go through store.
    const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null);

    useEffect(() => {
        initializeDailyChallenge();
    }, []); // Run once on mount

    const getTodayString = () => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const initializeDailyChallenge = () => {
        const today = getTodayString();
        const savedState = state.dailyChallengeState; // From store

        // We also need used IDs, handled by basic storage for now as it's not critical to global "progress" checks yet,
        // OR we can add them to store? 
        // For simplicity let's rely on storage directly for "used challenge IDs" as it's config data, not progress data.
        const usedIds = storage.get<string[]>(STORAGE_KEYS.USED_CHALLENGE_IDS, []);

        let challengeId = '';

        if (savedState.date === today && savedState.challengeId) {
            challengeId = savedState.challengeId;
        } else {
            // New allocation logic needed if store is stale date
            // However, store might have loaded old date.
            // If store date != today, we pick new one and update store.

            const available = challenges.filter(c => !usedIds.includes(c.id));
            const pool = available.length > 0 ? available : challenges;
            const seed = today.split('-').reduce((a, b) => a + parseInt(b), 0);
            const index = seed % pool.length;
            const selected = pool[index];
            challengeId = selected.id;

            // Update Store for today
            appStore.updateDailyChallengeState(today, false, challengeId);

            // Update used IDs local
            if (!usedIds.includes(challengeId)) {
                storage.set(STORAGE_KEYS.USED_CHALLENGE_IDS, [...usedIds, challengeId]);
            }
        }

        const foundChallenge = challenges.find(c => c.id === challengeId);
        setDailyChallenge(foundChallenge || challenges[0]);
    };

    const addXp = (amount: number, reason: string, uniqueId?: string) => {
        appStore.addXp(amount, reason, uniqueId);
    };

    const completeDailyChallenge = () => {
        if (state.dailyChallengeState.completed || !dailyChallenge) return;

        appStore.addXp(dailyChallenge.xp, `Daily Challenge: ${dailyChallenge.title}`);
        appStore.updateDailyChallengeState(getTodayString(), true, dailyChallenge.id);
    };

    return (
        <GamificationContext.Provider value={{
            userXp: state.userXp,
            userLevel: state.userLevel,
            lastLevelSeen: state.lastLevelSeen, // Added
            userStreak: state.userStreak,
            badges: state.badges, // Added
            totalCommandsRun: state.totalCommandsRun, // Added
            addXp,
            dailyChallenge,
            isDailyChallengeCompleted: state.dailyChallengeState.completed && state.dailyChallengeState.date === getTodayString(),
            completeDailyChallenge,
            activityLog: state.activityLog,
            awardedIds: state.awardedIds,
            ackLevelUp: appStore.ackLevelUp.bind(appStore) // Added
        }}>
            {children}
        </GamificationContext.Provider>
    );
};

export const useGamification = () => {
    const context = useContext(GamificationContext);
    if (!context) throw new Error("useGamification must be used within GamificationProvider");
    return context;
};
