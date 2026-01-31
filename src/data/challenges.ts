
export interface Challenge {
    id: string;
    title: string;
    description: string;
    xp: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    question: string;
    answer: string; // Hashed or plain (plain for now)
    hint: string;
}

export const challenges: Challenge[] = [
    {
        id: 'c1',
        title: 'Crack the Hash',
        description: 'Identify the hash type and find the original value.',
        xp: 50,
        difficulty: 'Easy',
        question: 'What is the MD5 hash of "kali"?',
        answer: 'b085d1bf4cff8b1045750d03b1caa481', // MD5 of "kali"
        hint: 'Use a hash calculator tool.'
    },
    {
        id: 'c2',
        title: 'Port Identification',
        description: 'Which common service runs on port 22?',
        xp: 50,
        difficulty: 'Easy',
        question: 'Service name (lowercase)',
        answer: 'ssh',
        hint: 'Secure Shell'
    }
];

export const getDailyChallenge = () => {
    // Simple rotation based on date
    const day = new Date().getDate();
    return challenges[day % challenges.length];
};
