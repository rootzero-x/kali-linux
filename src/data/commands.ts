
export interface Command {
    id: string;
    name: string;
    description: string;
    category: 'system' | 'network' | 'file' | 'security' | 'process' | 'user';
    syntax: string;
    example: string;
    safe_usage?: string;
}

export const commands: Command[] = [
    // File Operations
    { id: 'ls', name: 'ls', description: 'List directory contents.', category: 'file', syntax: 'ls [options] [path]', example: 'ls -la /home' },
    { id: 'cd', name: 'cd', description: 'Change the shell working directory.', category: 'file', syntax: 'cd [dir]', example: 'cd /var/www' },
    { id: 'pwd', name: 'pwd', description: 'Print name of current/working directory.', category: 'file', syntax: 'pwd', example: 'pwd' },
    { id: 'mkdir', name: 'mkdir', description: 'Make directories.', category: 'file', syntax: 'mkdir [options] directory', example: 'mkdir -p project/src' },
    { id: 'rm', name: 'rm', description: 'Remove files or directories.', category: 'file', syntax: 'rm [options] file', example: 'rm -rf temp_folder', safe_usage: 'Be extremely careful with -rf option.' },
    { id: 'cp', name: 'cp', description: 'Copy files and directories.', category: 'file', syntax: 'cp [options] source dest', example: 'cp file.txt backup.txt' },
    { id: 'mv', name: 'mv', description: 'Move (rename) files.', category: 'file', syntax: 'mv [options] source dest', example: 'mv old.txt new.txt' },
    { id: 'touch', name: 'touch', description: 'Change file timestamps (or create empty file).', category: 'file', syntax: 'touch file', example: 'touch newfile.txt' },
    { id: 'cat', name: 'cat', description: 'Concatenate files and print on the standard output.', category: 'file', syntax: 'cat [file]', example: 'cat /etc/passwd' },
    { id: 'less', name: 'less', description: 'Opposite of more; allows backward movement in file.', category: 'file', syntax: 'less [file]', example: 'less large_log.txt' },
    { id: 'head', name: 'head', description: 'Output the first part of files.', category: 'file', syntax: 'head [options] file', example: 'head -n 5 file.txt' },
    { id: 'tail', name: 'tail', description: 'Output the last part of files.', category: 'file', syntax: 'tail [options] file', example: 'tail -f /var/log/syslog' },
    { id: 'grep', name: 'grep', description: 'Print lines that match patterns.', category: 'file', syntax: 'grep [pattern] [file]', example: 'grep "error" server.log' },
    { id: 'find', name: 'find', description: 'Search for files in a directory hierarchy.', category: 'file', syntax: 'find [path] [expression]', example: 'find . -name "*.conf"' },
    { id: 'tar', name: 'tar', description: 'An archiving utility.', category: 'file', syntax: 'tar [options] [archive] [files]', example: 'tar -czvf backup.tar.gz /home/user' },
    { id: 'chmod', name: 'chmod', description: 'Change file mode bits.', category: 'file', syntax: 'chmod [mode] file', example: 'chmod 755 script.sh' },
    { id: 'chown', name: 'chown', description: 'Change file owner and group.', category: 'file', syntax: 'chown [owner]:[group] file', example: 'chown root:root /etc/shadow' },

    // System
    { id: 'uname', name: 'uname', description: 'Print system information.', category: 'system', syntax: 'uname [options]', example: 'uname -a' },
    { id: 'hostname', name: 'hostname', description: 'Show or set the system\'s host name.', category: 'system', syntax: 'hostname', example: 'hostname' },
    { id: 'uptime', name: 'uptime', description: 'Tell how long the system has been running.', category: 'system', syntax: 'uptime', example: 'uptime' },
    { id: 'whoami', name: 'whoami', description: 'Print effective userid.', category: 'system', syntax: 'whoami', example: 'whoami' },
    { id: 'id', name: 'id', description: 'Print user and group identities.', category: 'system', syntax: 'id [user]', example: 'id root' },
    { id: 'date', name: 'date', description: 'Print or set the system date and time.', category: 'system', syntax: 'date', example: 'date' },
    { id: 'history', name: 'history', description: 'GNU History Library.', category: 'system', syntax: 'history', example: 'history | grep ls' },

    // Process
    { id: 'ps', name: 'ps', description: 'Report a snapshot of the current processes.', category: 'process', syntax: 'ps [options]', example: 'ps aux' },
    { id: 'top', name: 'top', description: 'Display Linux processes.', category: 'process', syntax: 'top', example: 'top' },
    { id: 'kill', name: 'kill', description: 'Send a signal to a process.', category: 'process', syntax: 'kill [pid]', example: 'kill 9822' },
    { id: 'systemctl', name: 'systemctl', description: 'Control the systemd system and service manager.', category: 'process', syntax: 'systemctl [command] [unit]', example: 'systemctl status ssh' },

    // Network
    { id: 'ip', name: 'ip', description: 'Show / manipulate routing, network devices, interfaces and tunnels.', category: 'network', syntax: 'ip [options] object', example: 'ip addr show' },
    { id: 'ifconfig', name: 'ifconfig', description: 'Configure a network interface.', category: 'network', syntax: 'ifconfig [interface]', example: 'ifconfig eth0' },
    { id: 'ping', name: 'ping', description: 'Send ICMP ECHO_REQUEST to network hosts.', category: 'network', syntax: 'ping [host]', example: 'ping 8.8.8.8' },
    { id: 'netstat', name: 'netstat', description: 'Print network connections, routing tables, interface statistics.', category: 'network', syntax: 'netstat [options]', example: 'netstat -tuln' },
    { id: 'ss', name: 'ss', description: 'Another utility to investigate sockets.', category: 'network', syntax: 'ss [options]', example: 'ss -tuln' },
    { id: 'traceroute', name: 'traceroute', description: 'Print the route packets trace to network host.', category: 'network', syntax: 'traceroute [host]', example: 'traceroute google.com' },
    { id: 'dig', name: 'dig', description: 'DNS lookup utility.', category: 'network', syntax: 'dig [domain]', example: 'dig kali.org' },
    { id: 'nslookup', name: 'nslookup', description: 'Query Internet name servers interactively.', category: 'network', syntax: 'nslookup [domain]', example: 'nslookup google.com' },
    { id: 'wget', name: 'wget', description: 'The non-interactive network downloader.', category: 'network', syntax: 'wget [options] [url]', example: 'wget https://example.com/file.zip' },
    { id: 'curl', name: 'curl', description: 'Transfer data from or to a server.', category: 'network', syntax: 'curl [options] [url]', example: 'curl -I https://kali.org' },

    // Security / Pentest (Basic)
    { id: 'nmap', name: 'nmap', description: 'Network exploration tool and security / port scanner.', category: 'security', syntax: 'nmap [options] target', example: 'nmap -sV localhost' },
    { id: 'nc', name: 'nc', description: 'Netcat - TCP/IP swiss army knife.', category: 'security', syntax: 'nc [options] host port', example: 'nc -zv 192.168.1.1 22' },
    { id: 'tcpdump', name: 'tcpdump', description: 'Dump traffic on a network.', category: 'security', syntax: 'tcpdump [options]', example: 'tcpdump -i eth0 port 80' },
    { id: 'hashcat', name: 'hashcat', description: 'World\'s fastest and most advanced password recovery utility.', category: 'security', syntax: 'hashcat [options]', example: 'hashcat -m 0 hash.txt wordlist.txt' },
    { id: 'john', name: 'john', description: 'John the Ripper password cracker.', category: 'security', syntax: 'john [options] [file]', example: 'john --wordlist=rockyou.txt hash' },
    { id: 'hydra', name: 'hydra', description: 'Fast network logon cracker.', category: 'security', syntax: 'hydra [options] target', example: 'hydra -l user -P passes.txt ssh://127.0.0.1' },
    { id: 'gobuster', name: 'gobuster', description: 'Directory/File, DNS and VHost busting tool associated with Go.', category: 'security', syntax: 'gobuster dir [options]', example: 'gobuster dir -u http://10.10.10.10 -w common.txt' },
    { id: 'nikto', name: 'nikto', description: 'Web server scanner.', category: 'security', syntax: 'nikto [options]', example: 'nikto -h http://localhost' },
];
