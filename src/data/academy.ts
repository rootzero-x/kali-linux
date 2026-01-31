import { roadmaps } from './roadmaps';

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index 0-3
}

export interface TerminalTask {
    id: string;
    description: string;
    command: string; // The specific command to run
    validation?: string | RegExp; // Optional regex for output validation
}

export interface Lesson {
    id: string;
    moduleId: string; // Add derived moduleId for compatibility
    title: string;
    theory: string; // Markdown content
    practiceTasks: string[]; // List of checkboxes
    terminalTasks: TerminalTask[];
    quiz: QuizQuestion[];
    xp: number;
}

export interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
}

// Flatten modules from roadmaps to create the master module list
export const modules: Module[] = roadmaps.flatMap(roadmap =>
    roadmap.modules.map(mod => ({
        id: mod.id,
        title: mod.title,
        description: roadmap.description, // Inherit description or keep simple
        lessons: mod.lessons.map(lesson => ({
            ...lesson,
            moduleId: mod.id // Inject moduleId
        }))
    }))
);
