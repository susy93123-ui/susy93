import React, { useState, useEffect } from 'react';
import { Search, Filter, RotateCcw, SlidersHorizontal, BookOpen } from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';
import { MediaCard } from '../components/MediaCard.tsx';
import { filterMediaItems, FilterOptions } from '../utils/filterMedia.ts';
import { MediaCategory, GradeLevel, SUBJECT_OPTIONS } from '../types/index.ts';

interface SearchPageProps {
  onNavigate: (path: string) => void;
  initialQuery?: string;
  initialGrade?: GradeLevel;
  initialCategory?: MediaCategory;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  onNavigate,
  initialQuery = '',
  initialGrade,
  initialCategory,
}) => {
  const { items } = useMedia();

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<MediaCategory | 'semua'>(initialCategory || 'semua');
  const [grade, setGrade] = useState<GradeLevel | 'semua'>(initialGrade || 'semua');
  const [subject, setSubject] = useState<string>('semua');
  const [semester, setSemester] = useState<1 | 2 | 'semua'>('semua');
  const [curriculum, setCurriculum] = useState<string>('semua');
  const [sortBy, setSortBy] = useState<'terbaru' | 'terpopuler' | 'abjad'>('terbaru');

  // Sync if initial params change
  useEffect(() => {
    if (initialQuery !== undefined) setQuery(initialQuery);
    if (initialGrade !== undefined) setGrade(initialGrade);
    if (initialCategory !== undefined) setCategory(initialCategory);
  }, [initialQuery, initialGrade, initialCategory]);

  const filterOptions: FilterOptions = {
    query,
    category,
    grade,
    subject,
    semester,
    curriculum,
    sortBy,
  };

  const results = filterMediaItems(items, filterOptions);

  const handleReset = () => {
    setQuery('');
    setCategory('semua');
    setGrade('semua');
    setSubject('semua');
    setSemester('semua');
    setCurriculum('semua');
    setSortBy('terbaru');
  };

  const subjectsList = ['semua', ...SUBJECT_OPTIONS];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Search Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Pusat Pencarian Sumber Belajar
        </h1>
        
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari berdasarkan judul, topik, mata pelajaran, atau kata kunci..."
            className="w-full pl-12 pr-4 py-3 text-sm sm:text-base bg-slate-50 border-2 border-blue-200 focus:border-[#1264C0] rounded-2xl focus:outline-hidden text-slate-800"
          />
        </div>
      </div>

      {/* Filter Sidebar & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Filters Panel (Left 3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#1264C0]" />
              Filter Pencarian
            </span>
            <button
              onClick={handleReset}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Category filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Kategori Media</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden"
            >
              <option value="semua">Semua Kategori</option>
              <option value="materi">Materi Pembelajaran</option>
              <option value="lkpd">LKPD</option>
              <option value="media-interaktif">Media Interaktif</option>
              <option value="game">Game Edukasi</option>
              <option value="perangkat-ajar">Perangkat Ajar</option>
            </select>
          </div>

          {/* Grade filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Tingkatan Kelas</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['semua', 1, 2, 3, 4, 5, 6] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrade(g)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    grade === g
                      ? 'bg-[#1264C0] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {g === 'semua' ? 'Semua' : `K${g}`}
                </button>
              ))}
            </div>
          </div>

          {/* Subject filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Mata Pelajaran</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden"
            >
              {subjectsList.map((s) => (
                <option key={s} value={s}>
                  {s === 'semua' ? 'Semua Mata Pelajaran' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Semester */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Semester</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['semua', 1, 2] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSemester(s)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    semester === s
                      ? 'bg-[#1264C0] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s === 'semua' ? 'Semua' : `Sem ${s}`}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 block">Urutkan Hasil</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden"
            >
              <option value="terbaru">Terbaru Ditambahkan</option>
              <option value="terpopuler">Paling Banyak Dilihat</option>
              <option value="abjad">Abjad (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Results Grid (Right 9 cols) */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Menemukan <strong className="text-slate-900 font-bold">{results.length}</strong> media pembelajaran
            </span>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {results.map((item) => (
                <MediaCard key={item.id} item={item} onNavigate={onNavigate} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-black text-slate-800">Tidak ada media yang cocok</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Coba sesuaikan kata kunci pencarian atau tekan tombol <strong>Reset</strong> untuk menampilkan seluruh media.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-blue-50 text-[#1264C0] font-bold text-xs hover:bg-blue-100 cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
