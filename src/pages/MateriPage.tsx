import React, { useState } from 'react';
import { BookOpen, Filter, Search } from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';
import { MediaCard } from '../components/MediaCard.tsx';
import { filterMediaItems } from '../utils/filterMedia.ts';
import { GradeLevel, SUBJECT_OPTIONS } from '../types/index.ts';

interface MateriPageProps {
  onNavigate: (path: string) => void;
}

export const MateriPage: React.FC<MateriPageProps> = ({ onNavigate }) => {
  const { items } = useMedia();
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'semua'>('semua');
  const [selectedSubject, setSelectedSubject] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const materiItems = filterMediaItems(items, {
    category: 'materi',
    grade: selectedGrade,
    subject: selectedSubject,
    query: searchQuery,
    sortBy: 'terbaru',
  });

  const subjects = ['semua', ...SUBJECT_OPTIONS];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold border border-white/20">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Koleksi Materi Pelajaran SD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Materi Pembelajaran</h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Eksplorasi modul materi terstruktur lengkap dengan rangkuman, tujuan pembelajaran, dan infografis menarik sesuai Kurikulum Merdeka.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi pembelajaran..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Grade filter */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Kelas:
            </span>
            {(['semua', 1, 2, 3, 4, 5, 6] as const).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  selectedGrade === g
                    ? 'bg-[#1264C0] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {g === 'semua' ? 'Semua' : `K${g}`}
              </button>
            ))}
          </div>

          {/* Subject filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg text-slate-700 cursor-pointer focus:outline-hidden"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s === 'semua' ? 'Semua Mata Pelajaran' : s}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Grid of Materi */}
      {materiItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {materiItems.map((item) => (
            <MediaCard key={item.id} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">Tidak ada materi yang sesuai</h3>
          <p className="text-xs text-slate-500">Coba ubah filter kelas atau kata kunci pencarianmu.</p>
        </div>
      )}

    </div>
  );
};
