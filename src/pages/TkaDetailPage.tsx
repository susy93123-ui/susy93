import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Calendar, 
  User, 
  Eye, 
  Heart, 
  FileCheck, 
  CheckCircle, 
  GraduationCap, 
  Play,
  Share2,
  ExternalLink
} from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';
import { useFavorites } from '../context/FavoritesContext.tsx';
import { MediaLinksDisplay } from '../components/MediaLinksDisplay.tsx';

interface TkaDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const TkaDetailPage: React.FC<TkaDetailPageProps> = ({ slug, onNavigate }) => {
  const { getItemBySlug, incrementViews, incrementDownloads } = useMedia();
  const { isFavorite, toggleFavorite } = useFavorites();

  const item = getItemBySlug(slug);

  useEffect(() => {
    if (item) {
      incrementViews(item.id);
    }
  }, [slug]);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <GraduationCap className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-2xl font-black text-slate-800">Paket TKA Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500">Paket soal Tes Kemampuan Akademik mungkin telah dipindahkan atau diperbarui.</p>
        <button
          onClick={() => onNavigate('/tka')}
          className="px-6 py-2.5 rounded-full bg-teal-700 text-white font-bold text-sm cursor-pointer"
        >
          Kembali ke Menu TKA
        </button>
      </div>
    );
  }

  const favorited = isFavorite(item.id);

  const handleDownload = () => {
    incrementDownloads(item.id);
    if (item.externalUrl && item.externalUrl !== '#') {
      window.open(item.externalUrl, '_blank');
      return;
    }
    const element = document.createElement('a');
    const file = new Blob([item.contentBody || item.description], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${item.slug}-tka-sdn-mendongan.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/tka')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-teal-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu TKA</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(item.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              favorited ? 'bg-rose-50 border-rose-300 text-rose-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{favorited ? 'Tersimpan di Favorit' : 'Simpan Favorit'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-teal-100 text-teal-800 font-black text-xs flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Tes Kemampuan Akademik (TKA)</span>
          </span>
          <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
            Kelas {item.grade} SD
          </span>
          <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs">
            {item.subject}
          </span>
          <span className="px-3 py-1 rounded-lg bg-purple-100 text-purple-900 font-bold text-xs">
            Semester {item.semester}
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs">
            {item.curriculum}
          </span>
          {item.isDemo && (
            <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-amber-950 font-black text-xs uppercase">
              DEMO
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          {item.title}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {item.description}
        </p>

        {/* Metadata info */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-slate-400" />
            Penyusun: <strong className="text-slate-700">{item.author}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            {new Date(item.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-slate-400" />
            {item.viewsCount} kali diakses
          </span>
          <span className="flex items-center gap-1.5">
            <Download className="w-4 h-4 text-slate-400" />
            {item.downloadsCount} kali diunduh
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {item.externalUrl && (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Buka Paket di Google Drive</span>
            </a>
          )}

          <button
            onClick={() => onNavigate('/tka')}
            className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Mulai Simulasi Tes Online</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Berkas Soal ({item.fileSize || 'PDF'})</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer border border-slate-200"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak</span>
          </button>
        </div>

      </div>

      {/* Media Links Display */}
      <MediaLinksDisplay item={item} />

      {/* Target & Kriteria Kompetensi */}
      {item.learningObjectives && item.learningObjectives.length > 0 && (
        <div className="bg-teal-50/80 rounded-3xl p-6 sm:p-8 border border-teal-200 space-y-4">
          <h3 className="text-base sm:text-lg font-black text-teal-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-teal-700" />
            <span>Indikator Capaian Kemampuan Akademik:</span>
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {item.learningObjectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Deskripsi & Ringkasan Materi Ujian */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 border-b pb-3">
          Petunjuk Pengerjaan & Kisi-kisi Soal
        </h2>

        {item.coverImage && (
          <div className="rounded-2xl overflow-hidden border border-slate-200 max-w-lg mx-auto shadow-sm">
            <img 
              src={item.coverImage} 
              alt={item.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
          {item.contentBody || item.description}
        </div>
      </div>

    </div>
  );
};
