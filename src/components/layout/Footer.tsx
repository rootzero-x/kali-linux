import { Link } from 'react-router-dom';
import { Terminal, Github, Send, Instagram, Shield } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="relative mt-auto border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden">
            {/* Top Glow Effect */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-kali-500/50 to-transparent opacity-50" />

            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

                    {/* 1. BRANDING */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                            <div className="bg-slate-900 text-kali-500 p-1.5 rounded-lg">
                                <Terminal size={20} />
                            </div>
                            <span className="font-bold text-xl tracking-tight">KALILINUX<span className="text-kali-500">.UZ</span></span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                            Learn. Practice. Master Kali Linux. An educational cybersecurity platform designed for hands-on learning and professional growth.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono text-kali-600 dark:text-kali-400 bg-kali-50 dark:bg-kali-900/10 px-3 py-1.5 rounded border border-kali-100 dark:border-kali-900/30 w-fit">
                            <Shield size={12} className="mr-1" /> EDUCATION PURPOSE ONLY
                        </div>
                    </div>

                    {/* 2. PLATFORM LINKS */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-kali-600 dark:hover:text-kali-400 transition-colors flex items-center">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/roadmaps" className="text-slate-600 dark:text-slate-400 hover:text-kali-600 dark:hover:text-kali-400 transition-colors flex items-center">
                                    Academy Roadmaps
                                </Link>
                            </li>
                            <li>
                                <Link to="/library" className="text-slate-600 dark:text-slate-400 hover:text-kali-600 dark:hover:text-kali-400 transition-colors flex items-center">
                                    Command Library
                                </Link>
                            </li>
                            <li>
                                <Link to="/challenges" className="text-slate-600 dark:text-slate-400 hover:text-kali-600 dark:hover:text-kali-400 transition-colors flex items-center">
                                    CTF Challenges
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 3. COMMUNITY */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Community</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="https://t.me/rootzero_x"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-600 dark:text-slate-400 hover:text-[#0088cc] transition-colors flex items-center group"
                                >
                                    <Send size={14} className="mr-2 group-hover:translate-x-0.5 transition-transform" /> Telegram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://instagram.com/rootzero.x"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-600 dark:text-slate-400 hover:text-[#E1306C] transition-colors flex items-center group"
                                >
                                    <Instagram size={14} className="mr-2 group-hover:translate-x-0.5 transition-transform" /> Instagram
                                </a>
                            </li>
                            {/* Placeholder for GitHub if you have one later */}
                            <li>
                                <a
                                    href="https://github.com/rootzero-x"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center group"
                                >
                                    <Github size={14} className="mr-2 group-hover:translate-x-0.5 transition-transform" /> GitHub
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 4. NEWSLETTER / LEGAL */}
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Stay Secure</h4>
                        <p className="text-xs text-slate-500 mb-4">
                            Join the elite. Get the latest tools and techniques delivered implicitly.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-3 py-2 text-sm outline-none focus:border-kali-500 w-full"
                            />
                            <button className="bg-kali-600 hover:bg-kali-700 text-white px-3 py-2 rounded transition-colors">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                        &copy; {new Date().getFullYear()} KaliLinux.uz. Released under MIT License.
                    </div>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-kali-500 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-kali-500 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
