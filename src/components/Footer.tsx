import React from 'react';
import { BookOpen, Youtube, Facebook, Instagram } from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const { settings } = useMedia();

  return (
    <footer className="bg-[#084B91] text-white pt-12 pb-8 border-t-4 border-[#FFC83D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-blue-400/20">
          
          {/* Col 1: Identity & Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 p-1">
                <img 
                  src="/assets/aistudio/05e7672d-ce71-4044-9e26-aacca4349dd2_3e6ec969.png" 
                  alt="Logo SD Negeri Mendongan" 
                  className="w-full h-full object-contain drop-shadow-xs"
                />
              </div>
              <div>
                <span className="text-2xl font-black tracking-wider text-white">SIPID</span>
                <p className="text-xs text-blue-100 font-medium leading-tight">
                  Sistem Inovasi Pembelajaran<br />Interaktif Digital
                </p>
                <p className="text-xs font-bold text-[#FFC83D] mt-0.5">
                  {settings.schoolName || 'SD Negeri Mendongan'}
                </p>
              </div>
            </div>

            <p className="text-xs text-blue-200/90 leading-relaxed max-w-sm">
              Slogan: <span className="text-[#FFC83D] font-semibold italic">“{settings.slogan || 'Berinovasi, Berinteraksi, Menginspirasi.'}”</span>
            </p>
            <p className="text-[11px] text-blue-200/80 leading-relaxed">
              Mewujudkan pembelajaran abad 21 yang ceria, interaktif, inklusif, dan bermakna bagi seluruh murid sekolah dasar.
            </p>
          </div>

          {/* Col 2: Menu Cepat (Left sub-column) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold tracking-wide uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFC83D]" />
              Menu Cepat
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
              <button 
                onClick={() => onNavigate('/')} 
                className="text-left text-blue-200 hover:text-[#FFC83D] transition-colors cursor-pointer"
              >
                Beranda
              </button>
              <button 
                onClick={() => onNavigate('/media-interaktif')} 
                className="text-left text-blue-200 hover:text-[#FFC83D] transition-colors cursor-pointer"
              >
                Media Interaktif
              </button>
              <button 
                onClick={() => onNavigate('/materi')} 
                className="text-left text-blue-200 hover:text-[#FFC83D] transition-colors cursor-pointer"
              >
                Materi
              </button>
              <button 
                onClick={() => onNavigate('/game')} 
                className="text-left text-blue-200 hover:text-[#FFC83D] transition-colors cursor-pointer"
              >
                Game Edukasi
              </button>
              <button 
                onClick={() => onNavigate('/lkpd')} 
                className="text-left text-blue-200 hover:text-[#FFC83D] transition-colors cursor-pointer"
              >
                LKPD
              </button>
              <button 
                onClick={() => onNavigate('/perangkat-ajar')} 
                className="text-left text-blue-200 hover:text-[#FFC83D] transition-colors cursor-pointer"
              >
                Perangkat Ajar
              </button>
              <button 
                onClick={() => onNavigate('/tka')} 
                className="text-left text-blue-200 hover:text-[#FFC83D] transition-colors cursor-pointer"
              >
                TKA (Tes Kemampuan Akademik)
              </button>
              <button 
                onClick={() => onNavigate('/tentang')} 
                className="text-left text-blue-200 hover:text-[#FFC83D] transition-colors cursor-pointer"
              >
                Profil Sekolah
              </button>
              <button 
                onClick={() => onNavigate('/kontak')} 
                className="text-left text-blue-200 hover:text-[#FFC83D] transition-colors cursor-pointer"
              >
                Hubungi Kami
              </button>
            </div>
          </div>

          {/* Col 3: Tentang SIPID */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold tracking-wide uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#31A875]" />
              Tentang SIPID
            </h4>
            <p className="text-xs text-blue-100/90 leading-relaxed mb-3">
              {settings.aboutText || 'Sistem Inovasi Pembelajaran Interaktif Digital (SIPID) SD Negeri Mendongan merupakan portal belajar terpadu yang memadukan teknologi pembelajaran interaktif, gamifikasi dan perangkat kurikulum merdeka.'}
            </p>
            <div className="text-[11px] text-blue-200 space-y-1">
              <p>📍 {settings.address}</p>
              {settings.phone ? <p>📞 {settings.phone}</p> : null}
              <p>✉️ {settings.email || 'mendongansdn@gmail.com'}</p>
            </div>
          </div>

          {/* Col 4: Ikuti Kami */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold tracking-wide uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F05A78]" />
              Ikuti Kami
            </h4>
            <p className="text-xs text-blue-200 mb-3">Kanal Informasi Resmi SD Negeri Mendongan</p>
            <div className="flex items-center gap-2.5">
              {/* YouTube */}
              <a 
                href={settings.youtubeUrl || "https://www.youtube.com/@sdnegerimendongan9981"} 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                title="Kanal YouTube SD Negeri Mendongan"
                aria-label="YouTube SD Negeri Mendongan"
              >
                <Youtube className="w-4 h-4 text-white" />
              </a>

              {/* Instagram */}
              <a 
                href={settings.instagramUrl || "https://www.instagram.com/sdnmendongan/"} 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                title="Akun Instagram SD Negeri Mendongan"
                aria-label="Instagram SD Negeri Mendongan"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>

              {/* TikTok */}
              <a 
                href={settings.tiktokUrl || "https://www.tiktok.com/@sdnmendongan"} 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-black flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                title="Akun TikTok SD Negeri Mendongan"
                aria-label="TikTok SD Negeri Mendongan"
              >
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.891 2.896 2.896 0 0 1-2.89-2.89 2.896 2.896 0 0 1 2.89-2.892c.38 0 .741.074 1.074.21V9.502a6.34 6.34 0 0 0-1.074-.092C5.975 9.41 3 12.385 3 15.962s2.975 6.472 6.551 6.472c3.576 0 6.552-2.895 6.552-6.472V8.41a8.16 8.16 0 0 0 4.908 1.637v-3.36a4.805 4.805 0 0 1-1.422-.001z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-200/80 gap-3">
          <p>© {currentYear} {settings.schoolName || 'SD Negeri Mendongan'}. Semua hak dilindungi.</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('/admin/login')}
              className="text-blue-300 hover:text-white transition-colors cursor-pointer"
            >
              Area Guru & Administrator
            </button>
            <span>•</span>
            <span className="text-[#FFC83D] font-semibold">SIPID Versi 2026.1</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
