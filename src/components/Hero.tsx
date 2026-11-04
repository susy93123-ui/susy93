import React, { useState, useRef, useEffect } from 'react';
import { Search, Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';

interface HeroProps {
  onSearch: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [browserBlockedAudio, setBrowserBlockedAudio] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { settings } = useMedia();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set unmuted by default as requested
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          setBrowserBlockedAudio(false);
        })
        .catch(() => {
          // Browser autoplay policy requires user interaction before playing audio
          // Keep video playing muted, and automatically unmute on the user's very first gesture
          video.muted = true;
          setIsMuted(true);
          setBrowserBlockedAudio(true);
          video.play().catch(() => {});

          const unlockAudio = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              setIsMuted(false);
              setBrowserBlockedAudio(false);
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
          };

          window.addEventListener('click', unlockAudio, { once: true });
          window.addEventListener('touchstart', unlockAudio, { once: true });
          window.addEventListener('keydown', unlockAudio, { once: true });
        });
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      setBrowserBlockedAudio(false);
      if (nextMuted === false && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E6F0FA] via-[#EDF5FF] to-[#F5F9FF] border-b border-blue-100">
      
      {/* Background Graphic from Reference Image */}
      <div className="absolute inset-0 z-0 opacity-90 pointer-events-none hidden md:block">
        <img 
          src="/assets/extracted/hero-banner.png" 
          alt="SD Negeri Mendongan Hero Background" 
          className="w-full h-full object-cover object-right-bottom"
          onError={(e) => {
            // If image fails, fallback gracefully
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Soft gradient mask on left so text is 100% crisp and readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#E8F1FC] via-[#E8F1FC]/90 to-transparent w-full md:w-3/5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Greeting, Giant Title, Subtitle, Slogan & Search Bar */}
          <div className="lg:col-span-7 space-y-5 text-left pt-1">
            
            {/* Top Greeting */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-[#084B91] text-xs sm:text-sm font-bold tracking-wide">
              <span>Selamat Datang di</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1264C0]" />
              <span>{settings.schoolName || 'SD Negeri Mendongan'}</span>
            </div>

            {/* Giant Title SIPID */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1264C0] leading-[1.05] drop-shadow-xs">
              SIPID
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-snug">
              Pusat Media Pembelajaran dan<br className="hidden sm:inline" />
              Perangkat Ajar Sekolah Dasar
            </p>

            {/* Slogan Pill Badge */}
            <div>
              <div className="inline-block bg-[#FFC83D] text-[#084B91] px-4 py-1.5 rounded-xl font-black text-sm sm:text-base shadow-sm transform -rotate-0.5">
                “{settings.slogan || 'Berinovasi, Berinteraksi, Menginspirasi.'}”
              </div>
            </div>

            {/* Video Siswa / Guru Animasi - Langsung ditaruh di bawah tulisan slogan */}
            <div 
              style={{ width: '352px', height: '332.073px', maxWidth: '100%' }}
              className="bg-white/95 backdrop-blur-xs rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 shadow-xl shadow-blue-900/10 border-2 border-blue-200/90 ring-4 ring-blue-50/80 relative group my-2 flex flex-col justify-between overflow-hidden"
            >
              
              {/* Header Badge */}
              <div className="flex items-center justify-between px-1 pb-1 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 tracking-wide">
                    Sapaan Siswa SD Negeri Mendongan
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-100">
                  <Sparkles className="w-2.5 h-2.5" />
                  Video Profil
                </span>
              </div>

              {/* Video Container */}
              <div className="relative flex-1 min-h-0 rounded-xl overflow-hidden bg-slate-900 shadow-inner">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  poster="/assets/extracted/hero-chibi.png"
                  className="w-full h-full object-cover"
                  aria-label="Video sambutan anak-anak SD Negeri Mendongan"
                >
                  <source src="/assets/welcome-video.mp4" type="video/mp4" />
                  <source src="/assets/aistudio/Anak-anak_melambaikan_tangan_men__06fb06fe_1080p_5af4dcad.mp4" type="video/mp4" />
                  Browser Anda tidak mendukung pemutar video.
                </video>

                {/* Overlaid Sound Toggle Button */}
                <div className="absolute top-2 right-2 z-20">
                  <button
                    type="button"
                    onClick={toggleSound}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-md cursor-pointer ${
                      isMuted 
                        ? 'bg-[#FFC83D] text-[#084B91] hover:bg-amber-300 ring-2 ring-white animate-pulse' 
                        : 'bg-emerald-600/90 hover:bg-emerald-700 text-white ring-2 ring-emerald-300/60 shadow-md backdrop-blur-xs'
                    }`}
                    title={isMuted ? 'Nyalakan suara video' : 'Matikan suara'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-3 h-3 text-[#084B91]" />
                        <span>🔊 {browserBlockedAudio ? 'Klik Bersuara' : 'Nyalakan Suara'}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3 text-emerald-200" />
                        <span>🔊 Suara Aktif</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Overlaid Play/Pause Control on Bottom Left */}
                <div className="absolute bottom-2 left-2 z-20 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
                    title={isPlaying ? 'Jeda video' : 'Putar video'}
                    aria-label={isPlaying ? 'Jeda video' : 'Putar video'}
                  >
                    {isPlaying ? (
                      <Pause className="w-3 h-3" />
                    ) : (
                      <Play className="w-3 h-3 fill-current" />
                    )}
                  </button>
                </div>
              </div>

              {/* Subtitle Caption Underneath */}
              <div className="mt-1.5 px-2 py-1 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-between text-[11px] shrink-0">
                <p className="font-semibold text-[#084B91] truncate">
                  👋 “Halo! Selamat datang di SIPID SD Negeri Mendongan”
                </p>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded-md ml-2 shrink-0">
                  Ramah Anak
                </span>
              </div>

            </div>

            {/* Big Search Bar */}
            <div className="pt-2 max-w-xl">
              <form 
                onSubmit={handleSearchSubmit}
                className="relative flex items-center bg-white rounded-full shadow-lg shadow-blue-900/5 border-2 border-blue-200 focus-within:border-[#1264C0] focus-within:ring-4 focus-within:ring-blue-100 transition-all p-1.5"
              >
                <div className="pl-4 pr-2 text-slate-400">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Cari materi, LKPD, game, atau perangkat ajar..."
                  className="w-full py-2.5 text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden"
                  aria-label="Cari media pembelajaran"
                />
                <button
                  type="submit"
                  className="bg-[#1264C0] hover:bg-[#084B91] text-white px-5 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-blue-600/30 cursor-pointer"
                  aria-label="Tombol cari"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Cari</span>
                </button>
              </form>

              {/* Quick Keywords */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-600">Paling dicari:</span>
                {['Sistem Pencernaan', 'Bangun Datar', 'Siklus Air', 'TKA (Tes Akademik)', 'Game Pancaindra', 'Modul Ajar'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onSearch(tag)}
                    className="bg-white/80 hover:bg-blue-50 text-[#1264C0] px-2.5 py-1 rounded-full border border-blue-200/80 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Ruang bebas agar ilustrasi latar belakang terlihat utuh */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none min-h-[320px]" aria-hidden="true" />

        </div>
      </div>
    </section>
  );
};
