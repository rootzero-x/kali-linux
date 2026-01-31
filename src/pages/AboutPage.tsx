import { useLanguage } from '../contexts/LanguageContext';
import { Shield, Lock, Terminal, Globe } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

export const AboutPage = () => {
    const { t } = useLanguage();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold mb-6">{t('common.about')}</h1>
                <p className="text-xl text-slate-600 dark:text-slate-400">
                    Empowering the next generation of cybersecurity defenders through accessible, interactive education.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        Kali Linux UZ was born from a desire to democratize cybersecurity knowledge in Uzbekistan and beyond.
                        We believe that understanding defensive security is crucial in the modern digital age.
                    </p>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                        Our platform simulates real-world scenarios in a safe browser environment, allowing you to learn
                        tools and commands without the risk of damaging systems or breaking laws.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-slate-50 dark:bg-slate-800 border-none">
                        <CardContent className="p-6 text-center">
                            <Shield className="mx-auto h-10 w-10 text-kali-500 mb-4" />
                            <h3 className="font-bold">Defensive Focus</h3>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-50 dark:bg-slate-800 border-none">
                        <CardContent className="p-6 text-center">
                            <Lock className="mx-auto h-10 w-10 text-kali-500 mb-4" />
                            <h3 className="font-bold">Ethical Hacking</h3>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-50 dark:bg-slate-800 border-none">
                        <CardContent className="p-6 text-center">
                            <Terminal className="mx-auto h-10 w-10 text-kali-500 mb-4" />
                            <h3 className="font-bold">Interactive Labs</h3>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-50 dark:bg-slate-800 border-none">
                        <CardContent className="p-6 text-center">
                            <Globe className="mx-auto h-10 w-10 text-kali-500 mb-4" />
                            <h3 className="font-bold">Global Community</h3>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="bg-kali-600/10 rounded-2xl p-8 md:p-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Ethical Disclaimer</h2>
                <p className="max-w-3xl mx-auto text-slate-700 dark:text-slate-300">
                    This platform is strictly for educational purposes. All content is designed to teach defensive security concepts
                    and authorized testing methodologies. We do not condone or support illegal activities.
                    Misuse of the knowledge provided here is solely the responsibility of the user.
                </p>
            </div>
        </div>
    );
};
