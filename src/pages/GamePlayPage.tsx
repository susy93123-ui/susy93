import React from 'react';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { TebakGambarGame } from '../components/games/TebakGambarGame.tsx';
import { KuisCerdasCermatGame } from '../components/games/KuisCerdasCermatGame.tsx';
import { BenarSalahGame } from '../components/games/BenarSalahGame.tsx';

interface GamePlayPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const GamePlayPage: React.FC<GamePlayPageProps> = ({ slug, onNavigate }) => {
  const handleBack = () => {
    onNavigate('/game');
  };

  const renderGame = () => {
    switch (slug) {
      case 'tebak-gambar-pancaindra':
        return <TebakGambarGame onBack={handleBack} />;
      case 'kuis-cerdas-cermat-sains-matematika':
        return <KuisCerdasCermatGame onBack={handleBack} />;
      case 'tantangan-benar-atau-salah-alam':
        return <BenarSalahGame onBack={handleBack} />;
      default:
        // Default to Tebak Gambar if unknown
        return <TebakGambarGame onBack={handleBack} />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-purple-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Pilihan Game</span>
        </button>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Game Edukasi Aktif</span>
        </span>
      </div>

      {renderGame()}
    </div>
  );
};
