
import { createBrowserRouter, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';
import App from './App';
import { Loader2 } from 'lucide-react';

// Loading Fallback
const PageLoader = () => (
    <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-kali-600" />
    </div>
);

// Lazy Load Pages
const HomePage = React.lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const LibraryPage = React.lazy(() => import('./pages/LibraryPage').then(module => ({ default: module.LibraryPage })));
// const ToolsPage = React.lazy(() => import('./pages/ToolsPage')); // Merged into Library
// const CommandsPage = React.lazy(() => import('./pages/CommandsPage')); // Merged into Library
const ChallengesPage = React.lazy(() => import('./pages/ChallengesPage').then(module => ({ default: module.ChallengesPage })));
const RoadmapPage = React.lazy(() => import('./pages/RoadmapsPage').then(module => ({ default: module.RoadmapsPage }))); // Renaming if needed
const ProfilePage = React.lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

// New Academy Pages
// We might need to create an AcademyPage that lists modules
// And a LessonPage
// For now assuming existing structure matches or I will create them
// The user asked for "Modules & Lessons" so likely an index page and a detail page.
// I will point to AcademyPage (not created yet, will create)
const AcademyPage = React.lazy(() => import('./pages/Academy').then(module => ({ default: module.AcademyPage })));
const LessonPage = React.lazy(() => import('./pages/LessonPage').then(module => ({ default: module.LessonPage })));

const ModulePage = React.lazy(() => import('./pages/ModulePage').then(module => ({ default: module.ModulePage })));

const RoadmapDetailPage = React.lazy(() => import('./pages/RoadmapDetailPage'));
const RoadmapLessonPage = React.lazy(() => import('./pages/RoadmapLessonPage'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Navigate to="/404" />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense>
            },
            {
                path: 'library',
                element: <Suspense fallback={<PageLoader />}><LibraryPage /></Suspense>
            },
            {
                path: 'challenges',
                element: <Suspense fallback={<PageLoader />}><ChallengesPage /></Suspense>
            },
            {
                path: 'academy',
                element: <Suspense fallback={<PageLoader />}><AcademyPage /></Suspense>
            },
            {
                path: 'academy/:moduleId',
                element: <Suspense fallback={<PageLoader />}><ModulePage /></Suspense>
            },
            {
                path: 'academy/:moduleId/lesson/:lessonId',
                element: <Suspense fallback={<PageLoader />}><LessonPage /></Suspense>
            },
            {
                path: 'roadmaps',
                element: <Suspense fallback={<PageLoader />}><RoadmapPage /></Suspense>
            },
            {
                path: 'roadmaps/:roadmapId',
                element: <Suspense fallback={<PageLoader />}><RoadmapDetailPage /></Suspense>
            },
            {
                path: 'roadmaps/:roadmapId/lesson/:lessonId',
                element: <Suspense fallback={<PageLoader />}><RoadmapLessonPage /></Suspense>
            },
            {
                path: 'profile',
                element: <Suspense fallback={<PageLoader />}><ProfilePage /></Suspense>
            },
            {
                path: 'about',
                element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense>
            },
            {
                path: 'contact',
                element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense>
            },
            {
                path: '*',
                element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>
            }
        ]
    }
]);
