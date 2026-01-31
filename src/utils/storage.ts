
const STORAGE_PREFIX = 'kali_linux_uz_v1_';

export const STORAGE_KEYS = {
    USER_XP: `${STORAGE_PREFIX}user_xp`,
    USER_LEVEL: `${STORAGE_PREFIX}user_level`,
    USER_STREAK: `${STORAGE_PREFIX}user_streak`,
    LAST_LOGIN_DATE: `${STORAGE_PREFIX}last_login_date`,
    COMPLETED_LESSONS: `${STORAGE_PREFIX}completed_lessons`, // JSON string of array
    COMPLETED_MODULES: `${STORAGE_PREFIX}completed_modules`, // JSON string of array
    LESSON_PROGRESS: `${STORAGE_PREFIX}lesson_progress`, // JSON: { lessonId: { theory: bool, practice: bool, terminal: bool, quiz: bool } }
    DAILY_CHALLENGE_STATE: `${STORAGE_PREFIX}daily_challenge_state`, // JSON: { date: string, completed: bool, challengeId: string }
    USED_CHALLENGE_IDS: `${STORAGE_PREFIX}used_challenge_ids`, // JSON string of array
    BADGES: `${STORAGE_PREFIX}earned_badges`,
    ACTIVITY_LOG: `${STORAGE_PREFIX}activity_log`,
    THEME: `${STORAGE_PREFIX}theme`
};

export const storage = {
    get: <T>(key: string, defaultValue: T): T => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error reading storage key "${key}":`, error);
            return defaultValue;
        }
    },

    set: <T>(key: string, value: T): void => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing storage key "${key}":`, error);
        }
    },

    remove: (key: string): void => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing storage key "${key}":`, error);
        }
    },

    clear: (): void => {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error clearing storage:", error);
        }
    }
};
