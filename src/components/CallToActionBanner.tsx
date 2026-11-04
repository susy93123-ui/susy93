import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CallToActionBannerProps {
  onNavigate: (path: string) => void;
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({ onNavigate }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#D7E9FB] via-[#E6F1FC] to-[#DDEBFA] border-2 border-blue-200/80 p-6 sm:p-10 shadow-sm">
        
        {/* Subtle decorative doodles */}
        <div className="absolute top-4 left-1/4 opacity-30 pointer-events-none">
          <Sparkles className="w-6 h-6 text-blue-500" />
        </div>
        <div className="absolute bottom-4 right-1/4 opacity-30 pointer-events-none">
          <Sparkles className="w-5 h-5 text-amber-500" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left: Chibi Boy with Lightbulb & Book */}
          <div className="hidden md:flex md:col-span-3 justify-center items-center">
            <div className="relative w-36 sm:w-44 h-auto transform hover:scale-105 transition-transform duration-300">
              <img
                src="/assets/extracted/cta-boy.png"
                alt="Siswa Belajar Ceria"
                className="w-full h-auto object-contain drop-shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Center: Text & CTA Button */}
          <div className="md:col-span-6 text-center space-y-3">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#084B91] tracking-tight">
              Jelajahi Semua Media Pembelajaran
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Temukan koleksi materi, LKPD, media interaktif, game edukasi, dan perangkat ajar untuk mendukung proses pembelajaran aktif dan bermakna.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/pencarian')}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#1264C0] hover:bg-[#084B91] text-white text-sm font-bold shadow-md shadow-blue-500/25 hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <span>Jelajahi Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Chibi Girl with Globe */}
          <div className="hidden md:flex md:col-span-3 justify-center items-center">
            <div className="relative w-36 sm:w-44 h-auto transform hover:scale-105 transition-transform duration-300">
              <img
                src="/assets/extracted/cta-girl.png"
                alt="Siswi Berprestasi"
                className="w-full h-auto object-contain drop-shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
