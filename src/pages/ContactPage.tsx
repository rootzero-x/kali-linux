import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Mail, Send } from 'lucide-react';

export const ContactPage = () => {
    const { t } = useLanguage();
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-lg mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">{t('common.contact')}</h1>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Get in Touch</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {status === 'success' ? (
                            <div className="text-center py-12 animate-in fade-in">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                                <p className="text-slate-500">We'll get back to you shortly.</p>
                                <Button className="mt-6" variant="outline" onClick={() => setStatus('idle')}>
                                    Send Another
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <Input placeholder="John Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input type="email" placeholder="john@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Message</label>
                                    <textarea
                                        className="flex min-h-[120px] w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-card px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kali-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:text-slate-100"
                                        placeholder="How can we help?"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" isLoading={status === 'submitting'}>
                                    <Mail className="mr-2 h-4 w-4" /> Send Message
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
