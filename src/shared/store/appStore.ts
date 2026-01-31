import { storage, STORAGE_KEYS } from '../../utils/storage';
import { modules } from '../../data/academy';
import { BADGES } from '../../data/gamification';

// --- Interfaces ---

export interface ActivityLogItem {
    id: string;
    message: string;
    xp: number;
    timestamp: number;
}

export interface LessonProgress {
    theoryRead: boolean;
    practiceCompleted: boolean;
    terminalCompleted: boolean;
    quizPassed: boolean;
    completed: boolean;
    checkedTasks: string[];
}

export interface AppState {
    // Gamification
    userXp: number;
    userLevel: number;
    lastLevelSeen: number; // For modal trigger
    userStreak: number;
    badges: string[]; // Unlocked badge IDs
    activityLog: ActivityLogItem[];
    awardedIds: string[]; // Anti-farming unique IDs

    // Academy
    lessonProgress: Record<string, LessonProgress>;
    completedModules: string[];

    // Stats
    totalCommandsRun: number;

    // Daily Challenge (Basic state)
    dailyChallengeState: {
        date: string;
        completed: boolean;
        challengeId: string;
    };
}

// --- Initial State ---

const initialState: AppState = {
    userXp: 0,
    userLevel: 1,
    lastLevelSeen: 1,
    userStreak: 0,
    badges: [],
    activityLog: [],
    awardedIds: [],
    lessonProgress: {},
    completedModules: [],
    totalCommandsRun: 0,
    dailyChallengeState: { date: '', completed: false, challengeId: '' }
};

// --- Store Implementation ---

class AppStore {
    private state: AppState;
    private listeners: Set<() => void> = new Set();

    constructor() {
        this.state = this.loadState();
        // Debug Log
        console.log('[AppStore] Initialized. User XP:', this.state.userXp);
    }

    private loadState(): AppState {
        return {
            userXp: storage.get(STORAGE_KEYS.USER_XP, initialState.userXp),
            userLevel: storage.get(STORAGE_KEYS.USER_LEVEL, initialState.userLevel),
            lastLevelSeen: storage.get('kali_last_level_seen', initialState.lastLevelSeen),
            userStreak: storage.get(STORAGE_KEYS.USER_STREAK, initialState.userStreak),
            badges: storage.get('kali_badges', initialState.badges),
            activityLog: storage.get(STORAGE_KEYS.ACTIVITY_LOG, initialState.activityLog),
            awardedIds: storage.get('kali_linux_uz_v1_awarded_ids', initialState.awardedIds),
            lessonProgress: storage.get(STORAGE_KEYS.LESSON_PROGRESS, initialState.lessonProgress),
            completedModules: storage.get(STORAGE_KEYS.COMPLETED_MODULES, initialState.completedModules),
            totalCommandsRun: storage.get('kali_total_commands', initialState.totalCommandsRun),
            dailyChallengeState: storage.get(STORAGE_KEYS.DAILY_CHALLENGE_STATE, initialState.dailyChallengeState)
        };
    }

    private persistState() {
        // Save to LocalStorage
        storage.set(STORAGE_KEYS.USER_XP, this.state.userXp);
        storage.set(STORAGE_KEYS.USER_LEVEL, this.state.userLevel);
        storage.set('kali_last_level_seen', this.state.lastLevelSeen);
        storage.set(STORAGE_KEYS.USER_STREAK, this.state.userStreak);
        storage.set('kali_badges', this.state.badges);
        storage.set(STORAGE_KEYS.ACTIVITY_LOG, this.state.activityLog);
        storage.set('kali_linux_uz_v1_awarded_ids', this.state.awardedIds);
        storage.set(STORAGE_KEYS.LESSON_PROGRESS, this.state.lessonProgress);
        storage.set(STORAGE_KEYS.COMPLETED_MODULES, this.state.completedModules);
        storage.set('kali_total_commands', this.state.totalCommandsRun);
        storage.set(STORAGE_KEYS.DAILY_CHALLENGE_STATE, this.state.dailyChallengeState);

        this.notify();
    }

    public getState(): AppState {
        return this.state;
    }

    public subscribe(listener: () => void): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notify() {
        this.listeners.forEach(l => l());
    }

    // --- Actions ---

    public addXp(amount: number, reason: string, uniqueId?: string) {
        if (uniqueId && this.state.awardedIds.includes(uniqueId)) {
            console.warn(`[AppStore] XP already awarded for: ${uniqueId}. Skipping.`);
            return;
        }

        console.log(`[AppStore] Awarding ${amount} XP for: ${reason} (ID: ${uniqueId || 'none'})`);

        const newXp = this.state.userXp + amount;

        // Calculate Level: Level = sqrt(XP/100) + 1
        // Example: 0XP=Lvl1, 100XP=Lvl2, 400XP=Lvl3
        const newLevel = Math.max(1, Math.floor(Math.sqrt(newXp / 100)) + 1);

        if (newLevel > this.state.userLevel) {
            console.log(`[AppStore] Level Up! ${this.state.userLevel} -> ${newLevel}`);
        }

        const logItem: ActivityLogItem = {
            id: Date.now().toString(),
            message: reason,
            xp: amount,
            timestamp: Date.now()
        };

        const newActivityLog = [logItem, ...this.state.activityLog].slice(0, 50);
        const newAwardedIds = uniqueId ? [...this.state.awardedIds, uniqueId] : this.state.awardedIds;

        // Atomic Update
        this.state = {
            ...this.state,
            userXp: newXp,
            userLevel: newLevel,
            activityLog: newActivityLog,
            awardedIds: newAwardedIds
        };

        // Check Achievements
        this.checkAchievements();

        // Persist
        this.persistState();
    }

    public ackLevelUp() {
        if (this.state.userLevel > this.state.lastLevelSeen) {
            console.log('[AppStore] Acknowledging Level Up');
            this.state = {
                ...this.state,
                lastLevelSeen: this.state.userLevel
            };
            this.persistState();
        }
    }

    private checkAchievements() {
        const newBadges = [...this.state.badges];
        let badgeAwarded = false;

        const awardBadge = (id: string) => {
            if (!this.state.badges.includes(id)) {
                console.log(`[AppStore] Badge Unlocked: ${id}`);
                newBadges.push(id);
                this.addXp(BADGES.find(b => b.id === id)?.xpReward || 0, `Badge Unlocked: ${id}`, `badge-${id}`);
                badgeAwarded = true;
                // Toast notification should be handled by UI listening to changes
            }
        };

        // 1. First Blood
        const lessonsCompleted = Object.values(this.state.lessonProgress).filter(p => p.completed).length;
        if (lessonsCompleted >= 1) awardBadge('first-blood');

        // 2. Command Runner
        if (this.state.totalCommandsRun >= 50) awardBadge('command-runner');

        // 3. Roadmaps
        // Check Linux Fundamentals (mod-lin-1)
        if (this.state.completedModules.includes('mod-lin-1')) awardBadge('linux-scholar'); // simplified for demo

        // 4. Night Hacker
        const hour = new Date().getHours();
        if (lessonsCompleted > 0 && (hour >= 22 || hour < 4)) {
            // This needs to be checked at the moment of completion, passed as context
            // For now, we will rely on logic inside completeLesson or specific triggers
        }

        // 5. Level 10
        if (this.state.userLevel >= 10) awardBadge('kali-master');

        if (badgeAwarded) {
            this.state = {
                ...this.state,
                badges: newBadges
            };
            // No persist here, addXp will persist. But if addXp wasn't called (0 XP badge?), persist.
            // addXp calls persist, so we are good.
        }
    }

    public incrementCommandCount() {
        this.state = {
            ...this.state,
            totalCommandsRun: (this.state.totalCommandsRun || 0) + 1
        };
        this.checkAchievements();
        this.persistState();
    }

    public updateLessonProgress(lessonId: string, key: keyof LessonProgress, value: boolean | string[]) {
        const currentProgress = this.state.lessonProgress[lessonId] || {
            theoryRead: false,
            practiceCompleted: false,
            terminalCompleted: false,
            quizPassed: false,
            completed: false,
            checkedTasks: []
        };

        const updatedProgress = { ...currentProgress, [key]: value };

        this.state = {
            ...this.state,
            lessonProgress: {
                ...this.state.lessonProgress,
                [lessonId]: updatedProgress
            }
        };

        this.persistState();
    }

    public completeLesson(lessonId: string, xpAmount: number, lessonTitle: string): boolean {
        const p = this.state.lessonProgress[lessonId];

        // Safety check if progress doesn't exist yet
        if (!p) {
            console.error(`[AppStore] Error: Progress not found for lesson ${lessonId}`);
            return false;
        }

        // Strict Gating: ensure all gates are met
        if (!p.theoryRead || !p.practiceCompleted || !p.terminalCompleted || !p.quizPassed) {
            console.warn(`[AppStore] Lesson ${lessonId} incomplete. Gates not met.`);
            return false;
        }

        const uniqueKey = `lesson-${lessonId}`;
        const alreadyAwarded = this.state.awardedIds.includes(uniqueKey);

        if (p.completed || alreadyAwarded) {
            // Ensure completed flag is true just in case
            if (!p.completed) this.updateLessonProgress(lessonId, 'completed', true);
            return true;
        }

        // Specialized Badge Logic: Night Hacker
        const hour = new Date().getHours();
        if (hour >= 22 || hour < 4) {
            // We can't call awardBadge directly as it's private, but checkAchievements will handle it if we flag it?
            // Better: just trigger a check. But we need state.
            // Let's add specific logic in checkAchievements or just assume checks happen.
            // For Night Hacker, we need to know WHEN it happened.
            // Simplification: We will just check strict time in checkAchievements or here.

            // To be safe, let's just create a manual trigger for special context badges? 
            // Or just check time in checkAchievements if we store lastActivityTime.
            // For now, let's keep it simple.
        }

        // 1. Award XP (persists state)
        this.addXp(xpAmount, `Lesson Completed: ${lessonTitle}`, uniqueKey);

        // 2. Mark complete (persists state again)
        this.updateLessonProgress(lessonId, 'completed', true);

        // 3. Check Module Completion
        this.checkModuleCompletion(lessonId);

        return true;
    }

    private checkModuleCompletion(lessonId: string) {
        // Find which module this lesson belongs to
        const module = modules.find(m => m.lessons.some(l => l.id === lessonId));
        if (!module) return;

        // Check if all lessons are completed
        // We use state because we just updated it
        const allDone = module.lessons.every(l => {
            return this.state.lessonProgress[l.id]?.completed;
        });

        if (allDone && !this.state.completedModules.includes(module.id)) {
            console.log(`[AppStore] Module Mastery: ${module.title}`);
            const newCompleted = [...this.state.completedModules, module.id];

            this.state = {
                ...this.state,
                completedModules: newCompleted
            };

            // Award XP for module
            this.addXp(500, `Module Mastery: ${module.title}`, `module-${module.id}`);
        }
    }

    // Daily Challenge
    public updateDailyChallengeState(date: string, completed: boolean, challengeId: string) {
        this.state = {
            ...this.state,
            dailyChallengeState: { date, completed, challengeId }
        };
        this.persistState();
    }
}

export const appStore = new AppStore();

