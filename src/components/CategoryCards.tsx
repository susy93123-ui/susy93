import React from 'react';
import { BookOpen, ClipboardList, MonitorPlay, Gamepad2, FileText, GraduationCap, ArrowRight } from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';
import { MediaCategory } from '../types/index.ts';

interface CategoryCardsProps {
  onNavigate: (path: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onNavigate }) => {
  const { categoryCounts } = useMedia();

  const categories = [
    {
      id: 'materi' as MediaCategory,
      title: 'Materi Pembelajaran',
      description: 'Baca dan pelajari materi sesuai kurikulum.',
      path: '/materi',
      icon: BookOpen,
      iconBg: 'bg-[#1264C0]',
      cardBg: 'bg-white hover:bg-[#F0F7FF]',
      borderColor: 'border-blue-100 hover:border-blue-300',
      textColor: 'text-[#1264C0]',
      btnBg: 'bg-[#1264C0] hover:bg-[#084B91]',
      count: categoryCounts['materi'] || 0,
    },
    {
      id: 'lkpd' as MediaCategory,
      title: 'LKPD',
      description: 'Lembar kerja peserta didik untuk latihan.',
      path: '/lkpd',
      icon: ClipboardList,
      iconBg: 'bg-[#F59E0B]',
      cardBg: 'bg-white hover:bg-[#FFFBEB]',
      borderColor: 'border-amber-100 hover:border-amber-300',
      textColor: 'text-amber-600',
      btnBg: 'bg-[#F59E0B] hover:bg-amber-600',
      count: categoryCounts['lkpd'] || 0,
    },
    {
      id: 'media-interaktif' as MediaCategory,
      title: 'Media Interaktif',
      description: 'Pembelajaran lebih hidup dengan media interaktif.',
      path: '/media-interaktif',
      icon: MonitorPlay,
      iconBg: 'bg-[#31A875]',
      cardBg: 'bg-white hover:bg-[#F0FDF4]',
      borderColor: 'border-emerald-100 hover:border-emerald-300',
      textColor: 'text-emerald-600',
      btnBg: 'bg-[#31A875] hover:bg-emerald-700',
      count: categoryCounts['media-interaktif'] || 0,
    },
    {
      id: 'game' as MediaCategory,
      title: 'Game Edukasi',
      description: 'Belajar sambil bermain dengan seru.',
      path: '/game',
      icon: Gamepad2,
      iconBg: 'bg-[#8B5BC7]',
      cardBg: 'bg-white hover:bg-[#FAF5FF]',
      borderColor: 'border-purple-100 hover:border-purple-300',
      textColor: 'text-purple-600',
      btnBg: 'bg-[#8B5BC7] hover:bg-purple-700',
      count: categoryCounts['game'] || 0,
    },
    {
      id: 'perangkat-ajar' as MediaCategory,
      title: 'Perangkat Ajar',
      description: 'Dokumen dan administrasi guru lengkap.',
      path: '/perangkat-ajar',
      icon: FileText,
      iconBg: 'bg-[#F05A78]',
      cardBg: 'bg-white hover:bg-[#FFF1F2]',
      borderColor: 'border-rose-100 hover:border-rose-300',
      textColor: 'text-rose-600',
      btnBg: 'bg-[#F05A78] hover:bg-rose-700',
      count: categoryCounts['perangkat-ajar'] || 0,
    },
    {
      id: 'tka' as MediaCategory,
      title: '(TKA) Tes Kemampuan Akademik',
      description: 'Uji kemampuan akademik dan tryout siswa.',
      path: '/tka',
      icon: GraduationCap,
      iconBg: 'bg-[#0D9488]',
      cardBg: 'bg-white hover:bg-[#F0FDFA]',
      borderColor: 'border-teal-100 hover:border-teal-300',
      textColor: 'text-teal-600',
      btnBg: 'bg-[#0D9488] hover:bg-teal-700',
      count: categoryCounts['tka'] || 0,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => onNavigate(cat.path)}
              className={`rounded-2xl border ${cat.borderColor} ${cat.cardBg} p-5 flex flex-col justify-between text-center transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer group`}
            >
              {/* 3D-styled Soft Rounded Icon */}
              <div className="flex justify-center mb-3">
                <div className={`w-14 h-14 rounded-2xl ${cat.iconBg} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">
                  {cat.description}
                </p>
              </div>

              {/* Actual Collection Count from Database */}
              <div className="my-3 py-1.5 px-3 rounded-full bg-slate-50 border border-slate-100 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 mx-auto">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>{cat.count} koleksi</span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(cat.path);
                }}
                className={`w-full py-2 px-3 rounded-xl text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${cat.btnBg} shadow-xs group-hover:shadow-md cursor-pointer`}
              >
                <span>Jelajahi</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
