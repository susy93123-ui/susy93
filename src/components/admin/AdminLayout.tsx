import React from 'react';
import { 
  LayoutDashboard, 
  Files, 
  FolderTree, 
  Settings, 
  LogOut, 
  PlusCircle, 
  ArrowLeft, 
  ShieldCheck, 
  BookOpen 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPath,
  onNavigate,
  children,
  title,
  subtitle,
}) => {
  const { adminUser, logout } = useAuth();

  const menu = [
    { label: 'Ringkasan Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Kelola Media & Materi', path: '/admin/media', icon: Files },
    { label: 'Tambah Konten Baru', path: '/admin/media/tambah', icon: PlusCircle },
    { label: 'Pengaturan Kategori', path: '/admin/kategori', icon: FolderTree },
    { label: 'Pengaturan Portal', path: '/admin/pengaturan', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    onNavigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#084B91] text-white flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-blue-400/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center p-1">
                <img 
                  src="/assets/aistudio/05e7672d-ce71-4044-9e26-aacca4349dd2_3e6ec969.png" 
                  alt="Logo SD Negeri Mendongan" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-black text-lg text-white block">SIPID Admin</span>
                <span className="text-[11px] text-blue-200">SD Negeri Mendongan</span>
              </div>
            </div>

            <div className="mt-4 p-2.5 rounded-xl bg-white/10 text-xs">
              <p className="text-blue-200 text-[10px] uppercase font-bold">Pengguna Aktif</p>
              <p className="font-bold text-white truncate">{adminUser?.name || 'Administrator'}</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="p-4 space-y-1">
            {menu.map((item) => {
              const active = currentPath === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer text-left ${
                    active
                      ? 'bg-white text-[#084B91] shadow-xs'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#084B91]' : 'text-blue-200'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-blue-400/20 space-y-2">
          <button
            onClick={() => onNavigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Website Utama</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-300 hover:text-rose-100 rounded-lg hover:bg-rose-500/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/admin/media/tambah')}
              className="px-4 py-2 rounded-xl bg-[#1264C0] hover:bg-[#084B91] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Media</span>
            </button>
          </div>
        </header>

        {/* Child Pages */}
        <div className="p-6 sm:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};
