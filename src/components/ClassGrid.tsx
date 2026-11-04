import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';
import { GradeLevel } from '../types/index.ts';

interface ClassGridProps {
  onSelectGrade: (grade: GradeLevel) => void;
  onViewAll: () => void;
}

export const ClassGrid: React.FC<ClassGridProps> = ({ onSelectGrade, onViewAll }) => {
  const { classCounts } = useMedia();

  const classList: {
    grade: GradeLevel;
    label: string;
    avatar: string;
    bgClass: string;
    hoverClass: string;
    borderClass: string;
    textClass: string;
  }[] = [
    {
      grade: 1,
      label: 'Kelas 1',
      avatar: '/assets/extracted/avatar-k1.png',
      bgClass: 'bg-[#FFC83D]',
      hoverClass: 'hover:bg-[#f5be31]',
      borderClass: 'border-amber-300',
      textClass: 'text-amber-950',
    },
    {
      grade: 2,
      label: 'Kelas 2',
      avatar: '/assets/extracted/avatar-k2.png',
      bgClass: 'bg-[#31A875]',
      hoverClass: 'hover:bg-[#289666]',
      borderClass: 'border-emerald-400',
      textClass: 'text-white',
    },
    {
      grade: 3,
      label: 'Kelas 3',
      avatar: '/assets/extracted/avatar-k3.png',
      bgClass: 'bg-[#1264C0]',
      hoverClass: 'hover:bg-[#0e52a0]',
      borderClass: 'border-blue-300',
      textClass: 'text-white',
    },
    {
      grade: 4,
      label: 'Kelas 4',
      avatar: '/assets/extracted/avatar-k4.png',
      bgClass: 'bg-[#8B5BC7]',
      hoverClass: 'hover:bg-[#7b4cb7]',
      borderClass: 'border-purple-300',
      textClass: 'text-white',
    },
    {
      grade: 5,
      label: 'Kelas 5',
      avatar: '/assets/extracted/avatar-k5.png',
      bgClass: 'bg-[#F05A78]',
      hoverClass: 'hover:bg-[#dc4866]',
      borderClass: 'border-rose-300',
      textClass: 'text-white',
    },
    {
      grade: 6,
      label: 'Kelas 6',
      avatar: '/assets/extracted/avatar-k6.png',
      bgClass: 'bg-[#20B2AA]',
      hoverClass: 'hover:bg-[#1a9a93]',
      borderClass: 'border-teal-300',
      textClass: 'text-white',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>Koleksi Berdasarkan Kelas</span>
        </h3>
        <button
          onClick={onViewAll}
          className="text-xs font-bold text-[#1264C0] hover:text-[#084B91] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 6 Class Cards in 3x2 Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
        {classList.map((c) => {
          const count = classCounts[c.grade] || 0;
          return (
            <button
              key={c.grade}
              type="button"
              onClick={() => onSelectGrade(c.grade)}
              className={`${c.bgClass} ${c.hoverClass} rounded-2xl p-3.5 flex flex-col items-center justify-center text-center transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer group border-2 ${c.borderClass}`}
              aria-label={`Pilih ${c.label}`}
            >
              {/* Chibi Clay Avatar */}
              <div className="w-14 h-14 rounded-full bg-white/20 p-1 flex items-center justify-center mb-2 overflow-hidden shadow-xs group-hover:scale-110 transition-transform">
                <img
                  src={c.avatar}
                  alt={c.label}
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    // fallback if needed
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Class Label */}
              <span className={`text-base font-black tracking-tight ${c.textClass}`}>
                {c.label}
              </span>

              {/* Count */}
              <span className={`text-[11px] font-semibold opacity-90 mt-0.5 ${c.textClass}`}>
                {count} media
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
