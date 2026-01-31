
export interface Tool {
    id: string;
    name: string;
    description: string;
    category: 'Analysis' | 'Exploitation' | 'Sniffing' | 'Forensics' | 'Web' | 'Wireless';
    usage: string; // Basic usage string
    warning?: string;
    full_guide?: string; // Could be a markdown string
}

export const tools: Tool[] = [
    {
        id: 'nmap',
        name: 'Nmap',
        description: 'Network Mapper is the most popular free open source utility for network discovery and security auditing. It determines what hosts are available on the network, what services they are running, what OS they are running, and what packet filters/firewalls are in use.',
        category: 'Analysis',
        usage: 'nmap -sC -sV -oN nmap.txt <target_ip>',
        warning: 'Only scan networks you have explicit permission to test.'
    },
    {
        id: 'wireshark',
        name: 'Wireshark',
        description: 'The world\'s foremost network protocol analyzer. It allows you to see what\'s happening on your network at a microscopic level.',
        category: 'Sniffing',
        usage: 'wireshark (opens GUI)',
        warning: 'Capturing traffic on public networks without clear permission can be illegal.'
    },
    {
        id: 'metasploit',
        name: 'Metasploit Framework',
        description: 'A comprehensive penetration testing framework that makes hacking simple. It is the world\'s most used penetration testing software.',
        category: 'Exploitation',
        usage: 'msfconsole',
        warning: 'Strictly for authorized penetration testing only.'
    },
    {
        id: 'burpsuite',
        name: 'Burp Suite',
        description: 'The standard toolkit for web application security testing. It creates a proxy between your browser and the target application.',
        category: 'Web',
        usage: 'burpsuite (opens GUI)',
    },
    {
        id: 'hydra',
        name: 'Hydra',
        description: 'A parallelized login cracker which supports numerous protocols to attack (SSH, FTP, HTTP, etc).',
        category: 'Exploitation',
        usage: 'hydra -l user -P passlist.txt ssh://<ip>',
        warning: 'Brute-forcing without permission is illegal.'
    },
    {
        id: 'john',
        name: 'John the Ripper',
        description: 'A fast password cracker. It automatically detects password hash types.',
        category: 'Exploitation',
        usage: 'john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt',
    },
    {
        id: 'sqlmap',
        name: 'SQLMap',
        description: 'An open source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws.',
        category: 'Web',
        usage: 'sqlmap -u "http://target.com?id=1" --dbs',
        warning: 'Do not use on websites you do not own.'
    },
    {
        id: 'gobuster',
        name: 'Gobuster',
        description: 'A tool used to brute-force URIs (directories and files) in web sites, DNS subdomains, Virtual Host names on target web servers.',
        category: 'Web',
        usage: 'gobuster dir -u <url> -w <wordlist>',
    },
    {
        id: 'aircrack-ng',
        name: 'Aircrack-ng',
        description: 'A complete suite of tools to assess WiFi network security. It focuses on different areas of WiFi security: Monitoring, Attacking, Testing, and Cracking.',
        category: 'Wireless',
        usage: 'airmon-ng start wlan0',
    },
    {
        id: 'autopsy',
        name: 'Autopsy',
        description: 'A digital forensics platform and graphical interface to The Sleuth Kit® and other digital forensics tools.',
        category: 'Forensics',
        usage: 'autopsy (opens GUI)',
    },
    {
        id: 'nessus',
        name: 'Nessus',
        description: 'A proprietary vulnerability scanner developed by Tenable, Inc. Widely used for vulnerability assessments.',
        category: 'Analysis',
        usage: 'service nessusd start (then open localhost:8834)',
    },
    {
        id: 'nikto',
        name: 'Nikto',
        description: 'A web server scanner which tests web servers for dangerous files/CGIs, outdated server software, and other problems.',
        category: 'Web',
        usage: 'nikto -h <target>',
    },
    {
        id: 'netcat',
        name: 'Netcat',
        description: 'The utility that reads and writes data across network connections using TCP or UDP protocol.',
        category: 'Analysis',
        usage: 'nc -l -p 1234 (listen)',
    },
    {
        id: 'hashcat',
        name: 'Hashcat',
        description: 'World\'s fastest password cracker, supports GPU acceleration.',
        category: 'Exploitation',
        usage: 'hashcat -m 0 hash.txt dictionary.txt',
    },
    {
        id: 'maltego',
        name: 'Maltego',
        description: 'An open source intelligence (OSINT) and forensics application. It allows for the mining and gathering of information as well as the representation of this information.',
        category: 'Analysis',
        usage: 'maltego (opens GUI)',
    },
    {
        id: 'whatweb',
        name: 'WhatWeb',
        description: 'Identifies websites including CMS, blogging platforms, statistic/analytics packages, javascript libraries, web servers, and embedded devices.',
        category: 'Web',
        usage: 'whatweb <url>',
    }
];
