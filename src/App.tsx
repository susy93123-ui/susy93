import React, { useState, useEffect } from 'react';
import { MediaProvider } from './context/MediaContext.tsx';
import { FavoritesProvider } from './context/FavoritesContext.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';

// Pages
import { HomePage } from './pages/HomePage.tsx';
import { MateriPage } from './pages/MateriPage.tsx';
import { MateriDetailPage } from './pages/MateriDetailPage.tsx';
import { LkpdPage } from './pages/LkpdPage.tsx';
import { LkpdDetailPage } from './pages/LkpdDetailPage.tsx';
import { MediaInteraktifPage } from './pages/MediaInteraktifPage.tsx';
import { MediaInteraktifDetailPage } from './pages/MediaInteraktifDetailPage.tsx';
import { GamePage } from './pages/GamePage.tsx';
import { GamePlayPage } from './pages/GamePlayPage.tsx';
import { PerangkatAjarPage } from './pages/PerangkatAjarPage.tsx';
import { PerangkatAjarDetailPage } from './pages/PerangkatAjarDetailPage.tsx';
import { TkaPage } from './pages/TkaPage.tsx';
import { TkaDetailPage } from './pages/TkaDetailPage.tsx';
import { SearchPage } from './pages/SearchPage.tsx';
import { FavoritesPage } from './pages/FavoritesPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage.tsx';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.tsx';
import { AdminMediaListPage } from './pages/admin/AdminMediaListPage.tsx';
import { AdminMediaFormPage } from './pages/admin/AdminMediaFormPage.tsx';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage.tsx';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage.tsx';

function MainRouter() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search || '/';
    }
    return '/';
  });

  const { isAuthenticated } = useAuth();

  // Listen to popstate for browser Back/Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    try {
      window.history.pushState({}, '', path);
    } catch {
      // ignore
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // URL parsing
  const [pathname, searchStr] = currentPath.split('?');
  const searchParams = new URLSearchParams(searchStr || '');

  // Render view
  const renderContent = () => {
    // 1. Home
    if (pathname === '/' || pathname === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Search
    if (pathname === '/pencarian') {
      const q = searchParams.get('q') || '';
      const grade = searchParams.get('grade') ? Number(searchParams.get('grade')) as any : undefined;
      const category = searchParams.get('category') as any;
      return (
        <SearchPage
          onNavigate={navigate}
          initialQuery={q}
          initialGrade={grade}
          initialCategory={category}
        />
      );
    }

    // 3. Favorites
    if (pathname === '/favorit') {
      return <FavoritesPage onNavigate={navigate} />;
    }

    // 4. About & Contact
    if (pathname === '/tentang') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (pathname === '/kontak') {
      return <ContactPage />;
    }

    // 5. Materi
    if (pathname === '/materi') {
      return <MateriPage onNavigate={navigate} />;
    }
    if (pathname.startsWith('/materi/')) {
      const slug = pathname.replace('/materi/', '');
      return <MateriDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 6. LKPD
    if (pathname === '/lkpd') {
      return <LkpdPage onNavigate={navigate} />;
    }
    if (pathname.startsWith('/lkpd/')) {
      const slug = pathname.replace('/lkpd/', '');
      return <LkpdDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 7. Media Interaktif
    if (pathname === '/media-interaktif') {
      return <MediaInteraktifPage onNavigate={navigate} />;
    }
    if (pathname.startsWith('/media-interaktif/')) {
      const slug = pathname.replace('/media-interaktif/', '');
      return <MediaInteraktifDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 8. Game
    if (pathname === '/game') {
      return <GamePage onNavigate={navigate} />;
    }
    if (pathname.startsWith('/game/')) {
      const slug = pathname.replace('/game/', '');
      return <GamePlayPage slug={slug} onNavigate={navigate} />;
    }

    // 9. Perangkat Ajar
    if (pathname === '/perangkat-ajar') {
      return <PerangkatAjarPage onNavigate={navigate} />;
    }
    if (pathname.startsWith('/perangkat-ajar/')) {
      const slug = pathname.replace('/perangkat-ajar/', '');
      return <PerangkatAjarDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 10. TKA (Tes Kemampuan Akademik)
    if (pathname === '/tka') {
      return <TkaPage onNavigate={navigate} />;
    }
    if (pathname.startsWith('/tka/')) {
      const slug = pathname.replace('/tka/', '');
      return <TkaDetailPage slug={slug} onNavigate={navigate} />;
    }

    // 11. Admin Routes
    if (pathname === '/admin/login') {
      return <AdminLoginPage onNavigate={navigate} />;
    }

    // Protected Admin Routes
    if (pathname.startsWith('/admin')) {
      if (!isAuthenticated) {
        return <AdminLoginPage onNavigate={navigate} />;
      }

      if (pathname === '/admin' || pathname === '/admin/') {
        return <AdminDashboardPage currentPath="/admin" onNavigate={navigate} />;
      }
      if (pathname === '/admin/media') {
        return <AdminMediaListPage currentPath="/admin/media" onNavigate={navigate} />;
      }
      if (pathname === '/admin/media/tambah' || pathname === '/admin/media/new') {
        return <AdminMediaFormPage currentPath="/admin/media/tambah" onNavigate={navigate} />;
      }
      if (pathname.startsWith('/admin/media/') && pathname.endsWith('/edit')) {
        const parts = pathname.split('/');
        const editId = parts[3]; // /admin/media/:id/edit
        return <AdminMediaFormPage currentPath="/admin/media" onNavigate={navigate} editId={editId} />;
      }
      if (pathname === '/admin/kategori') {
        return <AdminCategoriesPage currentPath="/admin/kategori" onNavigate={navigate} />;
      }
      if (pathname === '/admin/pengaturan') {
        return <AdminSettingsPage currentPath="/admin/pengaturan" onNavigate={navigate} />;
      }
    }

    // Fallback 404
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="text-3xl font-black text-slate-900">404 - Halaman Tidak Ditemukan</h2>
        <p className="text-xs text-slate-500">Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 rounded-full bg-[#1264C0] text-white text-xs font-bold cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  };

  const isAdminSection = pathname.startsWith('/admin') && pathname !== '/admin/login' && isAuthenticated;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F9FF] text-slate-800">
      {!isAdminSection && <Header currentPath={pathname} onNavigate={navigate} />}
      <div className="flex-1">{renderContent()}</div>
      {!isAdminSection && <Footer onNavigate={navigate} />}
    </div>
  );
}

export default function App() {
  return (
    <MediaProvider>
      <FavoritesProvider>
        <AuthProvider>
          <MainRouter />
        </AuthProvider>
      </FavoritesProvider>
    </MediaProvider>
  );
}
