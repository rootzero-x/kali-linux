
import React, { createContext, useContext, useState, useEffect } from 'react';
import { modules, type Lesson } from '../data/academy';
import { appStore, type LessonProgress } from '../shared/store/appStore';

interface AcademyContextType {
    currentModuleId: string | null;
    currentLessonId: string | null;
    lessonProgress: Record<string, LessonProgress>;
    completedModules: string[];

    // Actions
    updateLessonProgress: (lessonId: string, key: keyof LessonProgress, value: boolean | string[]) => void;
    completeLesson: (lessonId: string, xp: number, title: string) => boolean; // Updated sig needs XP access or passed in
    canUnlockLesson: (lessonId: string) => boolean;

    // Getters
    getLessonProgress: (lessonId: string) => LessonProgress;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Sync with store
    const [state, setState] = useState(appStore.getState());

    useEffect(() => {
        const unsubscribe = appStore.subscribe(() => {
            setState(appStore.getState());
        });
        return unsubscribe;
    }, []);

    const [currentModuleId] = useState<string | null>(null);
    const [currentLessonId] = useState<string | null>(null);

    const getLessonProgress = (lessonId: string): LessonProgress => {
        return state.lessonProgress[lessonId] || {
            theoryRead: false,
            practiceCompleted: false,
            terminalCompleted: false,
            quizPassed: false,
            completed: false,
            checkedTasks: []
        };
    };

    const updateLessonProgress = (lessonId: string, key: keyof LessonProgress, value: boolean | string[]) => {
        appStore.updateLessonProgress(lessonId, key, value);
    };

    const completeLesson = (lessonId: string, xp: number, title: string): boolean => {
        return appStore.completeLesson(lessonId, xp, title);
    };

    const canUnlockLesson = (lessonId: string): boolean => {
        // Find previous lesson
        // logic: if index 0 of module 0, yes.
        // else if previous lesson completed, yes.

        // We can optimize this by calculating all open lessons, but linear scan is fine for now
        let prevLesson: Lesson | null = null;

        for (const m of modules) {
            for (let i = 0; i < m.lessons.length; i++) {
                if (m.lessons[i].id === lessonId) {
                    if (i === 0) {
                        // Check previous module?
                        const modIndex = modules.indexOf(m);
                        if (modIndex === 0) return true; // First lesson of first module is open

                        // Check if prev module is done?
                        // Or checks last lesson of prev module
                        const prevMod = modules[modIndex - 1];
                        const lastLessonOfPrev = prevMod.lessons[prevMod.lessons.length - 1];
                        return !!state.lessonProgress[lastLessonOfPrev.id]?.completed;
                    } else {
                        prevLesson = m.lessons[i - 1];
                        return !!state.lessonProgress[prevLesson.id]?.completed;
                    }
                }
            }
        }
        return false;
    };

    return (
        <AcademyContext.Provider value={{
            currentModuleId,
            currentLessonId,
            lessonProgress: state.lessonProgress,
            completedModules: state.completedModules,
            updateLessonProgress,
            completeLesson,
            canUnlockLesson,
            getLessonProgress
        }}>
            {children}
        </AcademyContext.Provider>
    );
};

export const useAcademy = () => {
    const context = useContext(AcademyContext);
    if (!context) throw new Error("useAcademy must be used within AcademyProvider");
    return context;
};
