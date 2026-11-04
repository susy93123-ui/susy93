import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, Droplets, Wind, RotateCcw, Play, Pause } from 'lucide-react';

export const WaterCycleSim: React.FC = () => {
  const [sunPower, setSunPower] = useState(70); // 0 to 100
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState<'evaporasi' | 'kondensasi' | 'presipitasi' | 'infiltrasi'>('evaporasi');

  // Automatic cycle highlight over time if playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev === 'evaporasi') return 'kondensasi';
        if (prev === 'kondensasi') return 'presipitasi';
        if (prev === 'presipitasi') return 'infiltrasi';
        return 'evaporasi';
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-slate-900 rounded-3xl p-6 text-white border-2 border-emerald-400/40 shadow-xl space-y-6">
      
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
            Laboratorium Alam Virtual
          </span>
          <h3 className="text-xl font-black text-white mt-1">Simulasi Interaktif Siklus Hidrologi Bumi</h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            <span>{isPlaying ? 'Jeda Siklus' : 'Lanjutkan'}</span>
          </button>
          <button
            onClick={() => {
              setSunPower(70);
              setActiveStep('evaporasi');
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
            title="Reset Simulasi"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Simulation Canvas / Stage */}
      <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-600 border border-slate-700 shadow-inner">
        
        {/* Sun Element */}
        <div 
          className="absolute top-4 right-8 transition-transform duration-500 cursor-pointer flex flex-col items-center"
          style={{ transform: `scale(${0.8 + (sunPower / 100) * 0.5})` }}
          onClick={() => setActiveStep('evaporasi')}
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-[0_0_40px_rgba(251,191,36,0.9)] flex items-center justify-center animate-spin-slow">
              <Sun className="w-10 h-10 text-amber-900 opacity-60" />
            </div>
            {sunPower > 50 && (
              <div className="absolute inset-0 rounded-full border-2 border-yellow-300/60 animate-ping" />
            )}
          </div>
          <span className="text-[10px] font-black text-amber-950 bg-yellow-300/90 px-2 py-0.5 rounded-full mt-1">
            Matahari ({sunPower}%)
          </span>
        </div>

        {/* Clouds & Rain (Kondensasi & Presipitasi) */}
        <div 
          onClick={() => setActiveStep('kondensasi')}
          className="absolute top-10 left-12 sm:left-24 transition-all duration-700 cursor-pointer"
        >
          <div className="relative">
            {/* Cloud body */}
            <div className={`w-36 h-20 rounded-full transition-colors duration-500 flex items-center justify-center ${
              activeStep === 'presipitasi' ? 'bg-slate-500 shadow-lg' : 'bg-white shadow-md'
            }`}>
              <span className={`text-xs font-black ${activeStep === 'presipitasi' ? 'text-white' : 'text-slate-700'}`}>
                Awan Uap Air
              </span>
            </div>

            {/* Falling rain drops */}
            {(activeStep === 'presipitasi' || sunPower > 60) && (
              <div className="absolute top-20 left-4 right-4 flex justify-around">
                {[1, 2, 3, 4, 5].map((d) => (
                  <div 
                    key={d} 
                    className="w-1 h-6 bg-blue-500 rounded-full animate-bounce opacity-80" 
                    style={{ animationDelay: `${d * 0.15}s` }} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rising Vapor (Evaporasi) */}
        <div 
          onClick={() => setActiveStep('evaporasi')}
          className="absolute bottom-20 right-16 flex gap-4 cursor-pointer"
        >
          {[1, 2, 3].map((v) => (
            <div
              key={v}
              className="flex flex-col items-center gap-1 animate-pulse"
              style={{ animationDelay: `${v * 0.3}s` }}
            >
              <Droplets className="w-4 h-4 text-cyan-200" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-100" />
            </div>
          ))}
        </div>

        {/* Mountain & Land Landscape (Bottom Left) */}
        <div className="absolute bottom-0 left-0 w-3/5 h-44 bg-gradient-to-tr from-emerald-800 via-emerald-700 to-emerald-600 [clip-path:polygon(0_100%,100%_100%,70%_20%,40%_50%,20%_10%)]">
          {/* Mountain Snowcap */}
          <div className="absolute top-1 left-24 w-12 h-6 bg-white/90 [clip-path:polygon(50%_0%,100%_100%,0%_100%)]" />
        </div>

        {/* Ocean & Lake (Bottom Right) */}
        <div 
          onClick={() => setActiveStep('infiltrasi')}
          className="absolute bottom-0 right-0 w-1/2 h-24 bg-gradient-to-t from-blue-700 via-blue-600 to-cyan-500 rounded-tl-full flex items-center justify-center cursor-pointer"
        >
          <div className="text-center">
            <span className="text-xs font-black text-white/90 tracking-wide drop-shadow-xs">Lautan & Sungai</span>
            <p className="text-[10px] text-blue-100 font-medium">Air Permukaan Bumi</p>
          </div>
        </div>

        {/* Step Indicator Badge on Canvas */}
        <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-xs font-bold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Tahap Aktif: <strong className="text-yellow-300 uppercase">{activeStep}</strong></span>
        </div>

      </div>

      {/* Control Sliders & Interactive Step Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/60 p-5 rounded-2xl border border-slate-700">
        
        {/* Solar Intensity Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Sun className="w-4 h-4" />
              Intensitas Panas Matahari
            </span>
            <span className="text-slate-300">{sunPower}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={sunPower}
            onChange={(e) => setSunPower(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <p className="text-[11px] text-slate-400">
            Geser untuk melihat bagaimana panas matahari mempercepat laju penguapan air laut.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300">Pilih Tahapan untuk Dipelajari:</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {[
              { id: 'evaporasi', label: '1. Penguapan' },
              { id: 'kondensasi', label: '2. Pengembunan' },
              { id: 'presipitasi', label: '3. Hujan' },
              { id: 'infiltrasi', label: '4. Penyerapan' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveStep(st.id as any)}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeStep === st.id ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Detail Explanation Box */}
      <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs sm:text-sm text-emerald-100 leading-relaxed">
        {activeStep === 'evaporasi' && (
          <p>
            ☀️ <strong>Evaporasi (Penguapan):</strong> Air di danau, sungai, dan laut dipanaskan oleh sinar matahari. Molekul air berubah menjadi uap air yang ringan dan membubung tinggi ke atmosfer.
          </p>
        )}
        {activeStep === 'kondensasi' && (
          <p>
            ☁️ <strong>Kondensasi (Pengembunan):</strong> Di lapisan atas atmosfer yang dingin, uap air berkumpul dan mendingin menjadi partikel es dan tetesan air kecil yang membentuk gumpalan awan.
          </p>
        )}
        {activeStep === 'presipitasi' && (
          <p>
            🌧️ <strong>Presipitasi (Hujan):</strong> Ketika awan sudah sangat jenuh dan berat dengan butiran air, gaya gravitasi menarik butiran tersebut jatuh kembali ke bumi sebagai tetesan hujan, salju, atau hujan es.
          </p>
        )}
        {activeStep === 'infiltrasi' && (
          <p>
            🌱 <strong>Infiltrasi & Aliran Permukaan:</strong> Air hujan yang jatuh diserap oleh tanah dan akar pepohonan, atau mengalir melalui sungai menuju muara laut untuk memulai siklus baru kembali.
          </p>
        )}
      </div>

    </div>
  );
};
