
export interface Command {
    id: string;
    name: string;
    description: string;
    category: 'system' | 'network' | 'file' | 'security';
    syntax: string;
    example: string;
}

export const commands: Command[] = [
    {
        id: 'ls',
        name: 'ls',
        description: 'Lists files and directories in the current directory.',
        category: 'file',
        syntax: 'ls [options] [path]',
        example: 'ls -la /home/kali'
    },
    {
        id: 'pwd',
        name: 'pwd',
        description: 'Print Working Directory. Shows the full path of the current directory.',
        category: 'file',
        syntax: 'pwd',
        example: 'pwd'
    },
    {
        id: 'cd',
        name: 'cd',
        description: 'Change Directory. Navigates between directories.',
        category: 'file',
        syntax: 'cd [directory]',
        example: 'cd /etc'
    },
    {
        id: 'grep',
        name: 'grep',
        description: 'Global Regular Expression Print. Searches for patterns in files.',
        category: 'file',
        syntax: 'grep [pattern] [file]',
        example: 'grep "password" shadow.txt'
    },
    {
        id: 'nmap',
        name: 'nmap',
        description: 'Network Mapper. Used for network discovery and security auditing.',
        category: 'network',
        syntax: 'nmap [options] [target]',
        example: 'nmap -sV 192.168.1.1'
    }
];
