import React from 'react';
import { Heart, Eye, ArrowRight, ExternalLink, Info, BookOpen, FileText, MonitorPlay, Gamepad2, FolderGit2 } from 'lucide-react';
import { MediaItem, MediaCategory } from '../types/index.ts';
import { useFavorites } from '../context/FavoritesContext.tsx';
import { useMedia } from '../context/MediaContext.tsx';
import { getDirectMediaLink } from '../utils/linkHelpers.ts';

interface MediaCardProps {
  item: MediaItem;
  onNavigate: (path: string) => void;
  compact?: boolean;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onNavigate, compact = false }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { incrementViews } = useMedia();
  const favorited = isFavorite(item.id);

  const getCategoryTheme = (category: MediaCategory) => {
    switch (category) {
      case 'materi':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          btnBg: 'bg-[#1264C0] hover:bg-[#084B91]',
          btnText: 'Buka Materi',
          icon: BookOpen,
        };
      case 'lkpd':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          btnBg: 'bg-[#F59E0B] hover:bg-amber-600',
          btnText: 'Buka LKPD',
          icon: FileText,
        };
      case 'media-interaktif':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          btnBg: 'bg-[#31A875] hover:bg-emerald-700',
          btnText: 'Buka Media',
          icon: MonitorPlay,
        };
      case 'game':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          btnBg: 'bg-[#8B5BC7] hover:bg-purple-700',
          btnText: 'Main Sekarang',
          icon: Gamepad2,
        };
      case 'perangkat-ajar':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          btnBg: 'bg-[#F05A78] hover:bg-rose-700',
          btnText: 'Buka Dokumen',
          icon: FolderGit2,
        };
      case 'tka':
        return {
          bg: 'bg-teal-50 text-teal-700 border-teal-200',
          btnBg: 'bg-teal-600 hover:bg-teal-700',
          btnText: 'Buka Paket TKA',
          icon: FileText,
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          btnBg: 'bg-blue-600 hover:bg-blue-700',
          btnText: 'Buka Media',
          icon: BookOpen,
        };
    }
  };

  const theme = getCategoryTheme(item.category);
  const detailUrl = `/${item.category}/${item.slug}`;
  const directLink = getDirectMediaLink(item);

  // Directly connect to link when media card is clicked
  const handleOpenMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    incrementViews(item.id);

    if (directLink.isExternal) {
      window.open(directLink.url, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(directLink.url);
    }
  };

  const handleOpenDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate(detailUrl);
  };

  return (
    <div 
      onClick={handleOpenMedia}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden group hover:-translate-y-1 cursor-pointer"
      title={`Klik untuk langsung buka: ${item.title}`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback thumbnail
            e.currentTarget.src = '/assets/extracted/thumb-pencernaan.png';
          }}
        />

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-slate-500 hover:text-rose-500 shadow-xs transition-all cursor-pointer z-10"
          title={favorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          aria-label={favorited ? 'Hapus favorit' : 'Tambah favorit'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'text-rose-500 fill-rose-500' : ''}`} />
        </button>

        {/* Category Pill Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border backdrop-blur-md shadow-xs ${theme.bg}`}>
            {item.category === 'media-interaktif' ? 'Media Interaktif' : 
             item.category === 'perangkat-ajar' ? 'Perangkat Ajar' : 
             item.category.toUpperCase()}
          </span>
          {item.isDemo && (
            <span className="px-2 py-0.5 text-[10px] font-black tracking-wider uppercase bg-amber-400 text-amber-950 rounded-md shadow-xs">
              DEMO
            </span>
          )}
        </div>

        {/* Direct Link Platform Overlay Badge */}
        {directLink.isExternal ? (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold shadow-xs">
            <ExternalLink className="w-3 h-3 text-[#FFC83D]" />
            <span>{directLink.platform.name.split(' ')[0]}</span>
          </div>
        ) : null}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Metadata Badges: Kelas & Mata Pelajaran */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold">
              Kelas {item.grade}
            </span>
            <span>•</span>
            <span className="truncate">{item.subject}</span>
          </div>

          {/* Title */}
          <h4 
            className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-[#1264C0] transition-colors line-clamp-2 leading-snug"
          >
            {item.title}
          </h4>

          {/* Short Description */}
          {!compact && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Bottom Bar: Action Button & Info */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 text-[11px] text-slate-400">
            <span className="flex items-center gap-1" title={`${item.viewsCount} kali dilihat`}>
              <Eye className="w-3.5 h-3.5" />
              {item.viewsCount}
            </span>
            <button
              type="button"
              onClick={handleOpenDetail}
              className="text-slate-400 hover:text-blue-600 transition-colors font-medium flex items-center gap-0.5 hover:underline"
              title="Lihat rincian modul & tujuan belajar"
            >
              <Info className="w-3 h-3" />
              <span>Detail</span>
            </button>
          </div>

          {/* Direct Link Action Button */}
          <button
            type="button"
            onClick={handleOpenMedia}
            className={`px-3 py-1.5 rounded-xl text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${theme.btnBg} cursor-pointer group-hover:shadow-md`}
          >
            <span>{directLink.label}</span>
            {directLink.isExternal ? (
              <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            ) : (
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
