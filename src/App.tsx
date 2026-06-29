import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { LessonsPage } from './pages/LessonsPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { QuizPage } from './pages/QuizPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/"           element={<HomePage />} />
            <Route path="/dashboard"  element={<DashboardPage />} />
            <Route path="/lessons"    element={<LessonsPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/quiz"       element={<QuizPage />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}
