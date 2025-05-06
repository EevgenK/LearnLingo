import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/shared/ProtectedRoute/ProtectedRoute';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const TeachersPage = lazy(() => import('./pages/TeachersPage/TeachersPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute redirectTo="/">
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
