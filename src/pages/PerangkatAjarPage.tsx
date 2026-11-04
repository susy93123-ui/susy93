import React, { useState } from 'react';
import { FolderGit2, FileText, Filter, Search, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';
import { MediaCard } from '../components/MediaCard.tsx';
import { PerangkatSubcategory } from '../types/index.ts';

interface PerangkatAjarPageProps {
  onNavigate: (path: string) => void;
}

const SUB_CATEGORIES: PerangkatSubcategory[] = [
  'Modul Ajar',
  'RPP',
  'ATP',
  'CP',
  'Program Tahunan',
  'Program Semester',
  'Bahan Asesmen',
  'Kisi-kisi & Soal',
  'Rubrik Penilaian',
  'Remedial & Pengayaan',
  'Administrasi Kelas',
];

export const PerangkatAjarPage: React.FC<PerangkatAjarPageProps> = ({ onNavigate }) => {
  const { items } = useMedia();
  const [selectedSubcat, setSelectedSubcat] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const perangkatItems = items.filter((item) => {
    if (item.category !== 'perangkat-ajar') return false;
    if (selectedSubcat !== 'semua' && item.perangkatType !== selectedSubcat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold border border-white/20">
            <FolderGit2 className="w-4 h-4 text-rose-200" />
            <span>Administrasi & Kurikulum Guru SD</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Perangkat Ajar Guru</h1>
          <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
            Pusat dokumen kurikulum lengkap bagi pendidik: Modul Ajar, ATP, CP, Prota, Promes, instrumen asesmen, dan administrasi kelas SD Negeri Mendongan.
          </p>
        </div>
      </div>

      {/* Subcategory Pills Carousel / Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari modul ajar, ATP, CP, Prota..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-rose-500 text-slate-800"
            />
          </div>

          <div className="text-xs text-slate-500">
            Menampilkan <strong className="text-slate-800">{perangkatItems.length}</strong> dokumen
          </div>
        </div>

        {/* 11 Subcategories Buttons */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          <button
            onClick={() => setSelectedSubcat('semua')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              selectedSubcat === 'semua'
                ? 'bg-[#F05A78] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua ({items.filter((i) => i.category === 'perangkat-ajar').length})
          </button>
          {SUB_CATEGORIES.map((cat) => {
            const count = items.filter((i) => i.category === 'perangkat-ajar' && i.perangkatType === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedSubcat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  selectedSubcat === cat
                    ? 'bg-[#F05A78] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  selectedSubcat === cat ? 'bg-white/20 text-white' : count > 0 ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Documents */}
      {perangkatItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {perangkatItems.map((item) => (
            <MediaCard key={item.id} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">
            Dokumen untuk kategori “{selectedSubcat}” belum diunggah
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Perangkat ajar ini sedang dalam proses penyusunan dan kurasi oleh tim kurikulum SD Negeri Mendongan. Silakan cek kembali atau pilih kategori lainnya.
          </p>
          <button
            onClick={() => setSelectedSubcat('semua')}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
          >
            Tampilkan Semua Perangkat
          </button>
        </div>
      )}
    </div>
  );
};
