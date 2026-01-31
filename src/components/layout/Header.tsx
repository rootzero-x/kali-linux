import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Terminal } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Academy', path: '/roadmaps' },
        { label: 'Library', path: '/library' },
        { label: 'Challenges', path: '/challenges' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white group">
                    <div className="bg-kali-600 p-1.5 rounded-md text-white group-hover:bg-kali-500 transition-colors">
                        <Terminal size={20} />
                    </div>
                    <span>KALI<span className="text-kali-500">LINUX</span>.UZ</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-kali-500 relative py-1",
                                isActive(item.path)
                                    ? "text-kali-600 dark:text-kali-400"
                                    : "text-slate-600 dark:text-slate-300"
                            )}
                        >
                            {item.label}
                            {isActive(item.path) && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-kali-500 rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}>
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </Button>

                    <Link to="/profile">
                        <Button variant="default" size="sm" className="ml-2">
                            My Profile
                        </Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-bg overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={cn(
                                        "text-lg font-medium py-2 border-l-2 pl-4 transition-colors",
                                        isActive(item.path)
                                            ? "border-kali-500 text-kali-600 dark:text-kali-400 bg-kali-50 dark:bg-kali-900/20"
                                            : "border-transparent text-slate-600 dark:text-slate-300"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="sm" onClick={toggleTheme}>
                                        {theme === 'dark' ? <Sun size={16} className="mr-2" /> : <Moon size={16} className="mr-2" />}
                                        {theme === 'dark' ? 'Light' : 'Dark'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
