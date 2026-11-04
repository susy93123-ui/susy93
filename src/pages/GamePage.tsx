import React from 'react';
import { Gamepad2, Trophy, Star, Sparkles, Play, Award } from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';
import { MediaCard } from '../components/MediaCard.tsx';

interface GamePageProps {
  onNavigate: (path: string) => void;
}

export const GamePage: React.FC<GamePageProps> = ({ onNavigate }) => {
  const { items } = useMedia();
  const gameItems = items.filter((item) => item.category === 'game');

  const featuredGames = [
    {
      title: 'Tebak Gambar Pancaindra',
      slug: 'tebak-gambar-pancaindra',
      description: 'Tebak nama dan fungsi 5 indra manusia melalui petunjuk gambar ceria dan teka-teki huruf.',
      tag: 'Kelas 3 • Bahasa Indonesia',
      icon: '👁️',
      color: 'from-purple-600 to-indigo-600',
      badge: 'Game Unggulan DEMO',
    },
    {
      title: 'Kuis Cerdas Cermat Juara Kelas',
      slug: 'kuis-cerdas-cermat-sains-matematika',
      description: 'Tantangan pilihan ganda berwaktu seputar sains alam, logika berhitung, dan fakta seru.',
      tag: 'Kelas 5 • IPAS & Matematika',
      icon: '🧠',
      color: 'from-blue-600 to-cyan-600',
      badge: 'Multi-Pilihan & Timer',
    },
    {
      title: 'Tantangan Benar atau Salah',
      slug: 'tantangan-benar-atau-salah-alam',
      description: 'Aksi cepat memutuskan apakah pernyataan ilmiah tentang alam sekitar itu BENAR atau SALAH.',
      tag: 'Kelas 4 • IPAS',
      icon: '⚡',
      color: 'from-emerald-600 to-teal-600',
      badge: 'Refleks & Streak Combo',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold border border-white/20">
            <Gamepad2 className="w-4 h-4 text-amber-300" />
            <span>Zona Belajar Sambil Bermain</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Game Edukasi SIPID</h1>
          <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
            Belajar jadi tidak membosankan! Mainkan game edukasi interaktif dengan karakter 3D chibi yang seru, kumpulkan bintang, dan uji wawasanmu.
          </p>
        </div>
      </div>

      {/* Featured 3 Playable Games Arena */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <span>Game Siap Main Langsung</span>
          </h2>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            3 Game Terverifikasi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGames.map((g) => (
            <div
              key={g.slug}
              className="bg-white rounded-3xl border-2 border-purple-100 p-6 flex flex-col justify-between hover:border-purple-300 hover:shadow-xl transition-all duration-200 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-3 bg-purple-50 rounded-2xl border border-purple-100 group-hover:scale-110 transition-transform">
                    {g.icon}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg">
                    {g.badge}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-purple-600 block mb-1">{g.tag}</span>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                    {g.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {g.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => onNavigate(`/game/${g.slug}`)}
                  className="w-full py-3 rounded-2xl bg-[#8B5BC7] hover:bg-purple-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Main Sekarang</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Game Repository Grid */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h3 className="text-lg font-black text-slate-800">Semua Koleksi Game Sekolah</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gameItems.map((item) => (
            <MediaCard key={item.id} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

    </div>
  );
};
