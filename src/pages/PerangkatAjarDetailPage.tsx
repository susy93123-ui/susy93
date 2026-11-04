import React, { useEffect } from 'react';
import { ArrowLeft, Download, Printer, Heart, FolderGit2, Calendar, User, FileText, CheckCircle2, ExternalLink } from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';
import { useFavorites } from '../context/FavoritesContext.tsx';
import { MediaLinksDisplay } from '../components/MediaLinksDisplay.tsx';

interface PerangkatAjarDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const PerangkatAjarDetailPage: React.FC<PerangkatAjarDetailPageProps> = ({ slug, onNavigate }) => {
  const { getItemBySlug, incrementViews, incrementDownloads } = useMedia();
  const { isFavorite, toggleFavorite } = useFavorites();
  const item = getItemBySlug(slug);

  useEffect(() => {
    if (item) {
      incrementViews(item.id);
    }
  }, [item?.id]);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-800">Perangkat Ajar Tidak Ditemukan</h2>
        <button
          onClick={() => onNavigate('/perangkat-ajar')}
          className="px-6 py-2.5 rounded-full bg-[#F05A78] text-white font-bold text-sm cursor-pointer"
        >
          Kembali ke Perangkat Ajar
        </button>
      </div>
    );
  }

  const favorited = isFavorite(item.id);

  const handleDownload = () => {
    incrementDownloads(item.id);
    const element = document.createElement('a');
    const file = new Blob([item.contentBody || item.description], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${item.slug}-sdn-mendongan.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/perangkat-ajar')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#F05A78] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Perangkat Ajar</span>
        </button>

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

      {/* Main Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-rose-100 text-rose-800 font-black text-xs">
            {item.perangkatType || 'Perangkat Ajar'}
          </span>
          <span className="px-3 py-1 rounded-lg bg-blue-100 text-[#1264C0] font-bold text-xs">
            Kelas {item.grade} SD
          </span>
          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs">
            {item.curriculum}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          {item.title}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          {item.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {item.externalUrl && (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Buka Dokumen di Google Drive</span>
            </a>
          )}
          <button
            onClick={handleDownload}
            className="px-6 py-3 rounded-xl bg-[#F05A78] hover:bg-rose-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-rose-500/20 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Berkas Lengkap ({item.fileSize || 'DOCX / PDF'})</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Dokumen</span>
          </button>
        </div>
      </div>

      {/* Media Links Display */}
      <MediaLinksDisplay item={item} />

      {/* Document Content / Preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-lg font-black text-slate-900 border-b pb-3">
          Pratinjau Isi Dokumen Kurikulum
        </h3>
        {item.coverImage && (
          <div className="my-4 rounded-2xl overflow-hidden border border-slate-200 max-w-md mx-auto shadow-sm">
            <img 
              src={item.coverImage} 
              alt={item.title} 
              className="w-full h-auto object-cover max-h-72"
            />
          </div>
        )}
        <div className="text-slate-800 text-sm whitespace-pre-line leading-relaxed">
          {item.contentBody || item.description}
        </div>
      </div>
    </div>
  );
};
