export interface Tool {
    id: string;
    name: string;
    description: string;
    category: 'Analysis' | 'Exploitation' | 'Sniffing' | 'Forensics';
    usage: string;
    warning?: string;
}

export const tools: Tool[] = [
    {
        id: 'nmap',
        name: 'Nmap',
        description: 'Network Mapper. Utility for network discovery and security auditing.',
        category: 'Analysis',
        usage: 'nmap -A -T4 192.168.1.5',
        warning: 'Only scan networks you have permission to test.'
    },
    {
        id: 'wireshark',
        name: 'Wireshark',
        description: 'Network protocol analyzer. It lets you capture and interactively browse the traffic running on a computer network.',
        category: 'Sniffing',
        usage: 'wireshark',
        warning: 'Use with caution on public networks.'
    },
    {
        id: 'metasploit',
        name: 'Metasploit',
        description: 'Penetration testing software that provides information about security vulnerabilities.',
        category: 'Exploitation',
        usage: 'msfconsole',
        warning: 'Strictly for authorized penetration testing only.'
    },
    {
        id: 'hydra',
        name: 'Hydra',
        description: 'Parallelized login cracker which supports numerous protocols to attack.',
        category: 'Exploitation',
        usage: 'hydra -l user -P passlist.txt ftp://192.168.1.5',
        warning: 'Brute-forcing without permission is illegal.'
    }
];
