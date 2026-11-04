import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';
import { MediaCard } from './MediaCard.tsx';

interface RecentMediaProps {
  onNavigate: (path: string) => void;
}

export const RecentMedia: React.FC<RecentMediaProps> = ({ onNavigate }) => {
  const { items } = useMedia();

  // Get demo items first (to match the 4 items shown on mockup), followed by latest
  const demoItems = items.filter((item) => item.isDemo);
  const otherItems = items.filter((item) => !item.isDemo);
  const recentList = [...demoItems, ...otherItems].slice(0, 4);

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Star className="w-6 h-6 text-[#FFC83D] fill-[#FFC83D]" />
          <span>Media Terbaru</span>
        </h3>
        <button
          onClick={() => onNavigate('/pencarian?sortBy=terbaru')}
          className="text-xs sm:text-sm font-bold text-[#1264C0] hover:text-[#084B91] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentList.map((item) => (
          <MediaCard key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};
