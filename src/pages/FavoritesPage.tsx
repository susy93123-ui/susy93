import React from 'react';
import { Heart, Trash2, Info, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext.tsx';
import { useMedia } from '../context/MediaContext.tsx';
import { MediaCard } from '../components/MediaCard.tsx';

interface FavoritesPageProps {
  onNavigate: (path: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onNavigate }) => {
  const { favorites, clearFavorites } = useFavorites();
  const { items } = useMedia();

  const favoriteItems = items.filter((item) => favorites.includes(item.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>Koleksi Favorit Pribadi</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Media Favorit Saya</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Daftar media belajar yang kamu simpan untuk diakses kembali dengan cepat.
          </p>
        </div>

        {favoriteItems.length > 0 && (
          <button
            onClick={clearFavorites}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Kosongkan Favorit</span>
          </button>
        )}
      </div>

      {/* LocalStorage Notice */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-900">
        <Info className="w-5 h-5 text-[#1264C0] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Pemberitahuan Penyimpanan:</strong> Seluruh media favorit ini disimpan di penyimpanan lokal (<em>localStorage</em>) peramban Anda. Anda dapat langsung membuka dan menandai materi tanpa perlu membuat akun atau login. Harap diingat bahwa daftar ini hanya tersimpan pada peramban/perangkat yang sedang Anda gunakan saat ini.
        </p>
      </div>

      {/* Cards Grid */}
      {favoriteItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteItems.map((item) => (
            <MediaCard key={item.id} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-400">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-800">Belum Ada Media Favorit</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Klik ikon hati pada kartu media apa saja untuk menyimpannya di sini agar mudah kamu buka saat belajar kembali.
          </p>
          <button
            onClick={() => onNavigate('/')}
            className="px-6 py-2.5 rounded-xl bg-[#1264C0] text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Jelajahi Media Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
