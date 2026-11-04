import React from 'react';
import { 
  BookOpen, 
  ClipboardList, 
  MonitorPlay, 
  Gamepad2, 
  FileText, 
  PlusCircle, 
  Eye, 
  Download, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout.tsx';
import { useMedia } from '../../context/MediaContext.tsx';
import { MediaCategory } from '../../types/index.ts';

interface AdminDashboardPageProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ currentPath, onNavigate }) => {
  const { items, categoryCounts, classCounts, settings } = useMedia();

  const totalViews = items.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);
  const totalDownloads = items.reduce((acc, curr) => acc + (curr.downloadsCount || 0), 0);

  const categoryStats = [
    { title: 'Materi Pembelajaran', count: categoryCounts['materi'] || 0, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', path: '/admin/media?category=materi' },
    { title: 'LKPD Siswa', count: categoryCounts['lkpd'] || 0, icon: ClipboardList, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', path: '/admin/media?category=lkpd' },
    { title: 'Media Interaktif', count: categoryCounts['media-interaktif'] || 0, icon: MonitorPlay, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', path: '/admin/media?category=media-interaktif' },
    { title: 'Game Edukasi', count: categoryCounts['game'] || 0, icon: Gamepad2, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', path: '/admin/media?category=game' },
    { title: 'Perangkat Ajar', count: categoryCounts['perangkat-ajar'] || 0, icon: FileText, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', path: '/admin/media?category=perangkat-ajar' },
    { title: 'TKA (Tes Akademik)', count: categoryCounts['tka'] || 0, icon: GraduationCap, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', path: '/admin/media?category=tka' },
  ];

  const recentItems = [...items].slice(0, 5);

  return (
    <AdminLayout
      currentPath={currentPath}
      onNavigate={onNavigate}
      title="Ringkasan Dashboard"
      subtitle={`Statistik aktual koleksi media & kurikulum ${settings.schoolName || 'SD Negeri Mendongan'}`}
    >
      <div className="space-y-8">
        
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Koleksi Media</span>
              <p className="text-3xl font-black text-slate-900">{items.length}</p>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Berdasarkan Database Nyata
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1264C0] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pembaca / Akses</span>
              <p className="text-3xl font-black text-slate-900">{totalViews}</p>
              <span className="text-[11px] text-blue-600 font-bold">Interaksi peserta didik</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Berkas Diunduh</span>
              <p className="text-3xl font-black text-slate-900">{totalDownloads}</p>
              <span className="text-[11px] text-purple-600 font-bold">Bahan ajar siap cetak</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 5 Category Cards Summary */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-slate-900">Koleksi Aktual per Kategori</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categoryStats.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  onClick={() => onNavigate(cat.path)}
                  className={`bg-white rounded-2xl p-4 border ${cat.border} shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-900">{cat.count}</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-xs font-bold text-slate-800 block truncate">{cat.title}</span>
                    <span className="text-[10px] text-slate-400">Klik untuk kelola &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Breakdown per Kelas */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-black text-slate-900">Sebaran Konten per Tingkatan Kelas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            {([1, 2, 3, 4, 5, 6] as const).map((grade) => (
              <div key={grade} className="p-3 bg-slate-50 rounded-2xl text-center border border-slate-100">
                <span className="text-xs font-extrabold text-slate-700 block">Kelas {grade}</span>
                <span className="text-xl font-black text-[#1264C0]">{classCounts[grade] || 0}</span>
                <span className="text-[10px] text-slate-400 block">koleksi</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Items Table */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Konten Pembelajaran Terbaru</h3>
            <button
              onClick={() => onNavigate('/admin/media')}
              className="text-xs font-bold text-[#1264C0] hover:text-[#084B91] flex items-center gap-1 cursor-pointer"
            >
              <span>Kelola Semua Konten</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Judul Media</th>
                  <th className="py-3 px-3">Kategori</th>
                  <th className="py-3 px-3">Kelas & Mapel</th>
                  <th className="py-3 px-3">Format</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{item.title}</td>
                    <td className="py-3.5 px-3 uppercase text-[10px] font-black">{item.category}</td>
                    <td className="py-3.5 px-3">K{item.grade} • {item.subject}</td>
                    <td className="py-3.5 px-3">{item.fileType}</td>
                    <td className="py-3.5 px-3">
                      {item.isDemo ? (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900">
                          DEMO
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-900">
                          PUBLIK
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-right space-x-2">
                      <button
                        onClick={() => onNavigate(`/admin/media/${item.id}/edit`)}
                        className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
