import React, { useEffect } from 'react';
import { ArrowLeft, Heart, ExternalLink, Info, CheckCircle2, MonitorPlay } from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';
import { useFavorites } from '../context/FavoritesContext.tsx';
import { WaterCycleSim } from '../components/simulations/WaterCycleSim.tsx';
import { SolarSystemSim } from '../components/simulations/SolarSystemSim.tsx';
import { MediaLinksDisplay } from '../components/MediaLinksDisplay.tsx';

interface MediaInteraktifDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const MediaInteraktifDetailPage: React.FC<MediaInteraktifDetailPageProps> = ({ slug, onNavigate }) => {
  const { getItemBySlug, incrementViews } = useMedia();
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
        <h2 className="text-2xl font-black text-slate-800">Media Interaktif Tidak Ditemukan</h2>
        <button
          onClick={() => onNavigate('/media-interaktif')}
          className="px-6 py-2.5 rounded-full bg-[#31A875] text-white font-bold text-sm cursor-pointer"
        >
          Kembali ke Daftar Media
        </button>
      </div>
    );
  }

  const favorited = isFavorite(item.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/media-interaktif')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#31A875] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Media Interaktif</span>
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
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs">
            Media Pembelajaran Interaktif
          </span>
          <span className="px-3 py-1 rounded-lg bg-blue-100 text-[#1264C0] font-bold text-xs">
            Kelas {item.grade} SD
          </span>
          <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs">
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

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Live Interactive Embed Area */}
      <div className="space-y-4">
        {item.slug === 'simulasi-interaktif-siklus-air' || item.interactiveType === 'water-cycle-sim' ? (
          <WaterCycleSim />
        ) : item.slug === 'laboratorium-virtual-tata-surya' || item.interactiveType === 'solar-system-sim' ? (
          <SolarSystemSim />
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
            {item.coverImage && (
              <div className="rounded-2xl overflow-hidden border border-emerald-200/80 max-w-md mx-auto shadow-sm mb-4">
                <img 
                  src={item.coverImage} 
                  alt={item.title} 
                  className="w-full h-auto object-cover max-h-64"
                />
              </div>
            )}
            <MonitorPlay className="w-16 h-16 text-[#31A875] mx-auto" />
            <h3 className="text-xl font-bold text-slate-800">Media Pembelajaran Berbasis Web</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Simulasi interaktif ini berjalan langsung di browser atau melalui tautan media pembelajaran interaktif resmi.
            </p>
            {item.externalUrl && (
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#31A875] hover:bg-emerald-700 text-white font-bold text-sm inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka Media Pembelajaran</span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Media Links Display */}
      <MediaLinksDisplay item={item} />

      {/* Learning Goals */}
      {item.learningObjectives && item.learningObjectives.length > 0 && (
        <div className="bg-emerald-50/70 rounded-3xl p-6 sm:p-8 border border-emerald-200 space-y-3">
          <h3 className="text-base font-black text-emerald-950 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Tujuan Pembelajaran Interaktif:</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-emerald-900">
            {item.learningObjectives.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};
