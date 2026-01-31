
export interface Lesson {
    id: string;
    title: string;
    duration: string; // e.g. "15 min"
    type: 'theory' | 'terminal' | 'quiz';
    xp: number;
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface Roadmap {
    id: string;
    title: string;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    modules: Module[];
}

export const roadmaps: Roadmap[] = [
    {
        id: 'linux-fundamentals',
        title: 'Linux Fundamentals',
        description: 'Master the core concepts of Linux, the file system, and essential commands.',
        level: 'Beginner',
        modules: [
            {
                id: 'module-1',
                title: 'Introduction to Shell',
                lessons: [
                    { id: 'l1', title: 'What is Shell?', duration: '5 min', type: 'theory', xp: 50 },
                    { id: 'l2', title: 'Basic Navigation (ls, cd, pwd)', duration: '15 min', type: 'terminal', xp: 100 },
                    { id: 'l3', title: 'File Manipulation (touch, mkdir)', duration: '15 min', type: 'terminal', xp: 100 },
                ]
            },
            {
                id: 'module-2',
                title: 'Permissions & Security',
                lessons: [
                    { id: 'l4', title: 'Understanding Permissions (chmod)', duration: '20 min', type: 'terminal', xp: 150 },
                    { id: 'l5', title: 'User Management (sudo, useradd)', duration: '20 min', type: 'terminal', xp: 150 },
                ]
            }
        ]
    },
    {
        id: 'network-analysis',
        title: 'Network Analysis',
        description: 'Learn how to analyze network traffic and understand protocols.',
        level: 'Intermediate',
        modules: [
            {
                id: 'net-1',
                title: 'Networking Basics',
                lessons: [
                    { id: 'nl1', title: 'IP Addresses & Ports', duration: '10 min', type: 'theory', xp: 100 },
                    { id: 'nl2', title: 'Using Ping & Traceroute', duration: '15 min', type: 'terminal', xp: 100 },
                ]
            },
            {
                id: 'net-2',
                title: 'Scanning with Nmap',
                lessons: [
                    { id: 'nl3', title: 'Nmap Basics', duration: '20 min', type: 'terminal', xp: 200 },
                ]
            }
        ]
    }
];
