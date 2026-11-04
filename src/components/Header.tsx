import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Menu, 
  X, 
  Heart, 
  ShieldCheck, 
  Home, 
  FileText, 
  Layers, 
  Gamepad2, 
  FolderGit2, 
  GraduationCap,
  Info, 
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites } = useFavorites();
  const { isAuthenticated, adminUser } = useAuth();

  const navItems = [
    { label: 'Beranda', path: '/', icon: Home },
    { label: 'Materi', path: '/materi', icon: BookOpen },
    { label: 'LKPD', path: '/lkpd', icon: FileText },
    { label: 'Media Interaktif', path: '/media-interaktif', icon: Layers },
    { label: 'Game', path: '/game', icon: Gamepad2 },
    { label: 'Perangkat Ajar', path: '/perangkat-ajar', icon: FolderGit2 },
    { label: 'TKA', path: '/tka', icon: GraduationCap },
    { label: 'Tentang', path: '/tentang', icon: Info },
    { label: 'Kontak', path: '/kontak', icon: PhoneCall },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/pencarian?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & School Identity */}
          <button 
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 text-left group focus:outline-hidden cursor-pointer"
            aria-label="SIPID Beranda"
          >
            {/* Logo Resmi SD Negeri Mendongan di samping tulisan SIPID */}
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-blue-100 group-hover:scale-105 transition-transform shadow-xs p-0.5 shrink-0">
              <img 
                src="/assets/aistudio/05e7672d-ce71-4044-9e26-aacca4349dd2_3e6ec969.png" 
                alt="Logo Resmi SD Negeri Mendongan" 
                className="w-full h-full object-contain drop-shadow-xs"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-[#1264C0] font-sans">
                  SIPID
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-sm">
                  <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
                  SD
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                Sistem Inovasi Pembelajaran
              </span>
              <span className="text-[10px] text-slate-500 leading-tight">
                Interaktif Digital • <span className="font-semibold text-[#1264C0]">SD Negeri Mendongan</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Menu Utama">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    active
                      ? 'text-[#1264C0] bg-blue-50/80 font-bold'
                      : 'text-slate-600 hover:text-[#1264C0] hover:bg-slate-50'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <item.icon className={`w-4 h-4 ${active ? 'text-[#1264C0]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#1264C0] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions (Search, Favorites, Admin) */}
          <div className="flex items-center gap-2">
            
            {/* Quick Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari materi, LKPD, game..."
                    className="w-48 sm:w-64 pl-3 pr-8 py-1.5 text-xs bg-slate-50 border border-blue-300 rounded-full focus:outline-hidden focus:ring-2 focus:ring-blue-400 text-slate-800"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Tutup pencarian"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-slate-600 hover:text-[#1264C0] hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
                  aria-label="Buka pencarian"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Favorites Button */}
            <button
              onClick={() => onNavigate('/favorit')}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
              title="Media Favorit Saya"
              aria-label="Lihat Favorit"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full animate-pulse">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => onNavigate(isAuthenticated ? '/admin' : '/admin/login')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                isAuthenticated 
                  ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title="Portal Administrator Sekolah"
            >
              <ShieldCheck className="w-4 h-4 text-[#1264C0]" />
              <span>{isAuthenticated ? 'Admin Panel' : 'Masuk Admin'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-[#1264C0] hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Menu navigasi mobile"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                    active
                      ? 'bg-blue-50 text-[#1264C0] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${active ? 'text-[#1264C0]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onNavigate('/favorit');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-2 rounded-lg cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>Favorit ({favorites.length})</span>
            </button>

            <button
              onClick={() => {
                onNavigate(isAuthenticated ? '/admin' : '/admin/login');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-semibold text-[#1264C0] bg-blue-50 px-3 py-2 rounded-lg cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAuthenticated ? 'Admin Panel' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
