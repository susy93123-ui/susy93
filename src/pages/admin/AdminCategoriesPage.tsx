import React from 'react';
import { FolderTree, BookOpen, ClipboardList, MonitorPlay, Gamepad2, FileText, GraduationCap, ArrowRight } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout.tsx';
import { useMedia } from '../../context/MediaContext.tsx';
import { MediaCategory } from '../../types/index.ts';

interface AdminCategoriesPageProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AdminCategoriesPage: React.FC<AdminCategoriesPageProps> = ({ currentPath, onNavigate }) => {
  const { categoryCounts, items } = useMedia();

  const categoriesConfig: {
    id: MediaCategory;
    name: string;
    description: string;
    color: string;
    icon: any;
    allowedFormats: string[];
  }[] = [
    {
      id: 'materi',
      name: 'Materi Pembelajaran',
      description: 'Modul teks, presentasi infografis, dan ringkasan konsep kurikulum.',
      color: 'border-blue-300 bg-blue-50/50 text-[#1264C0]',
      icon: BookOpen,
      allowedFormats: ['PDF', 'PPTX', 'HTML5', 'Video'],
    },
    {
      id: 'lkpd',
      name: 'Lembar Kerja Peserta Didik (LKPD)',
      description: 'Lembar aktivitas latihan soal, eksperimen, dan tugas berstruktur siswa.',
      color: 'border-amber-300 bg-amber-50/50 text-amber-600',
      icon: ClipboardList,
      allowedFormats: ['PDF', 'DOCX', 'Lembar Cetak'],
    },
    {
      id: 'media-interaktif',
      name: 'Media Pembelajaran Interaktif',
      description: 'Simulasi laboratorium virtual, model visual dinamis, dan manipulatif digital.',
      color: 'border-emerald-300 bg-emerald-50/50 text-emerald-600',
      icon: MonitorPlay,
      allowedFormats: ['HTML5 Canvas', 'Web App', 'Simulasi'],
    },
    {
      id: 'game',
      name: 'Game Edukasi',
      description: 'Permainan tebak gambar, kuis cerdas cermat, dan teka-teki logika ramah anak.',
      color: 'border-purple-300 bg-purple-50/50 text-purple-600',
      icon: Gamepad2,
      allowedFormats: ['Web Game', 'Gamifikasi'],
    },
    {
      id: 'perangkat-ajar',
      name: 'Perangkat Ajar & Kurikulum',
      description: 'Modul ajar, ATP, CP, Prota, Promes, dan instrumen asesmen guru SD.',
      color: 'border-rose-300 bg-rose-50/50 text-rose-600',
      icon: FileText,
      allowedFormats: ['DOCX', 'XLSX', 'PDF'],
    },
    {
      id: 'tka',
      name: 'TKA (Tes Kemampuan Akademik)',
      description: 'Bank soal asesmen terstandar, simulasi tes literasi & numerasi, dan tryout akademik.',
      color: 'border-teal-300 bg-teal-50/50 text-teal-700',
      icon: GraduationCap,
      allowedFormats: ['Online Test', 'CBT', 'PDF Soal', 'Google Form'],
    },
  ];

  return (
    <AdminLayout
      currentPath={currentPath}
      onNavigate={onNavigate}
      title="Pengaturan & Struktur Kategori"
      subtitle="Konfigurasi 6 pilar utama media pembelajaran pada portal SIPID."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesConfig.map((cat) => {
            const Icon = cat.icon;
            const count = categoryCounts[cat.id] || 0;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${cat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-black text-slate-800">
                      {count} Konten
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900">{cat.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.description}</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase mb-1">
                      Format Didukung:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.allowedFormats.map((f) => (
                        <span key={f} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate(`/admin/media?category=${cat.id}`)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Lihat Koleksi Kategori Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};
