import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { Layout } from './components/layout/Layout';

// Pages
import { HomePage } from './pages/HomePage';
import { RoadmapsPage } from './pages/RoadmapsPage';
import { LibraryPage } from './pages/LibraryPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LessonPage } from './pages/LessonPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <GamificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="roadmaps" element={<RoadmapsPage />} />
                <Route path="roadmaps/:roadmapId" element={<RoadmapsPage />} /> {/* Ideally a specific detail page, reusing list for now or handled inside */}
                <Route path="roadmaps/:roadmapId/lesson/:lessonId" element={<LessonPage />} />
                <Route path="library" element={<LibraryPage />} />
                <Route path="challenges" element={<ChallengesPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </GamificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
