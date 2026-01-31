import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Terminal } from '../components/features/Terminal';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
    return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh]">
            <div className="max-w-2xl w-full text-center space-y-8">
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-4">404</h1>
                <p className="text-xl text-slate-600 dark:text-slate-400">
                    The requested resource could not be found.
                </p>

                <div className="bg-slate-900 rounded-lg overflow-hidden shadow-2xl mx-auto max-w-lg text-left">
                    <Terminal
                        height="h-48"
                        initialLines={[
                            { type: 'input', content: 'curl https://kali-linux.uz' + window.location.pathname },
                            { type: 'error', content: '404 Not Found' },
                            { type: 'system', content: 'Initiating recovery protocol...' }
                        ]}
                    />
                </div>

                <div className="pt-8">
                    <Link to="/">
                        <Button size="lg">
                            <Home className="mr-2 h-4 w-4" /> Return Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
