import { useLanguage } from '../../contexts/LanguageContext';
import { Terminal } from 'lucide-react';

export const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-bg py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-4 text-slate-400">
                    <Terminal size={16} />
                    <span className="font-mono text-sm">kali-linux.uz</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto mb-4">
                    {t('common.error') === 'An error occurred' ?
                        "Designed for educational purposes only. Learn, practice, and secure the future." :
                        "Faqat ta'lim maqsadlari uchun mo'ljallangan. O'rganing, mashq qiling va kelajakni himoya qiling."
                    }
                </p>
                <div className="text-xs text-slate-400">
                    &copy; {new Date().getFullYear()} Kali Linux UZ. MIT License.
                </div>
            </div>
        </footer>
    );
};
