import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  ClipboardList, 
  CheckCircle, 
  User, 
  Calendar, 
  Eye, 
  Heart,
  FileCheck2,
  FileDown,
  ExternalLink
} from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';
import { useFavorites } from '../context/FavoritesContext.tsx';
import { MediaLinksDisplay } from '../components/MediaLinksDisplay.tsx';

interface LkpdDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const LkpdDetailPage: React.FC<LkpdDetailPageProps> = ({ slug, onNavigate }) => {
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
        <h2 className="text-2xl font-black text-slate-800">LKPD Tidak Ditemukan</h2>
        <button
          onClick={() => onNavigate('/lkpd')}
          className="px-6 py-2.5 rounded-full bg-[#F59E0B] text-white font-bold text-sm cursor-pointer"
        >
          Kembali ke Daftar LKPD
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
    element.download = `${item.slug}-lkpd-sdn-mendongan.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/lkpd')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#F59E0B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Koleksi LKPD</span>
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
          <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-800 font-black text-xs">
            Lembar Kerja Siswa (LKPD)
          </span>
          <span className="px-3 py-1 rounded-lg bg-blue-100 text-[#1264C0] font-bold text-xs">
            Kelas {item.grade} SD
          </span>
          <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
            {item.subject}
          </span>
          {item.isDemo && (
            <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-amber-950 font-black text-xs uppercase">
              DEMO
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          {item.title}
        </h1>

        {/* Info badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-100 text-xs text-amber-950">
          <div>
            <span className="text-[10px] text-amber-700 font-bold uppercase block">Format Berkas</span>
            <span className="font-bold">{item.fileType}</span>
          </div>
          <div>
            <span className="text-[10px] text-amber-700 font-bold uppercase block">Ukuran File</span>
            <span className="font-bold">{item.fileSize || '2.4 MB'}</span>
          </div>
          <div>
            <span className="text-[10px] text-amber-700 font-bold uppercase block">Jumlah Diunduh</span>
            <span className="font-bold">{item.downloadsCount} kali</span>
          </div>
          <div>
            <span className="text-[10px] text-amber-700 font-bold uppercase block">Penyusun</span>
            <span className="font-bold truncate">{item.author}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {item.externalUrl && (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Buka LKPD di Google Drive</span>
            </a>
          )}
          <button
            onClick={handleDownload}
            className="px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-amber-600 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh LKPD Siap Cetak</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Langsung</span>
          </button>
        </div>
      </div>

      {/* Media Links Display */}
      <MediaLinksDisplay item={item} />

      {/* Worksheet Preview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 border-b pb-3">
          <FileCheck2 className="w-5 h-5 text-[#F59E0B]" />
          <span>Pratinjau Lembar Kerja</span>
        </h3>

        {/* Gambar Sampul LKPD */}
        {item.coverImage && (
          <div className="rounded-2xl overflow-hidden border border-amber-200/80 max-w-md mx-auto shadow-sm bg-white">
            <img 
              src={item.coverImage} 
              alt={`Sampul ${item.title}`} 
              className="w-full h-auto object-cover max-h-72"
            />
          </div>
        )}

        <div className="border-2 border-dashed border-amber-200 rounded-2xl p-6 bg-[#FFFDF5] space-y-4">
          <div className="text-center pb-4 border-b border-amber-200">
            <h4 className="font-black text-lg text-amber-950 uppercase">SD NEGERI MENDONGAN</h4>
            <p className="text-xs text-amber-800">LEMBAR KERJA PESERTA DIDIK (LKPD) - {item.subject.toUpperCase()}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium py-2 border-b border-amber-100">
            <div>Nama Siswa/Kelompok: ................................</div>
            <div>Kelas / No. Absen: ...................................</div>
          </div>

          <div className="text-slate-800 text-sm whitespace-pre-line leading-relaxed pt-2">
            {item.contentBody || item.description}
          </div>
        </div>
      </div>

    </div>
  );
};
