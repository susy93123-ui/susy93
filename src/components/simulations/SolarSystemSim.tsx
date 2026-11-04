import React, { useState } from 'react';
import { Compass, Info, RotateCw } from 'lucide-react';

interface PlanetInfo {
  name: string;
  order: number;
  color: string;
  size: string;
  distance: string;
  funFact: string;
}

const PLANETS: PlanetInfo[] = [
  { name: 'Merkurius', order: 1, color: 'bg-stone-400', size: 'Kecil (4.879 km)', distance: '57,9 juta km', funFact: 'Planet terdekat dengan matahari dan bersuhu sangat ekstrem.' },
  { name: 'Venus', order: 2, color: 'bg-amber-300', size: 'Sedang (12.104 km)', distance: '108,2 juta km', funFact: 'Planet terpanas di tata surya karena efek rumah kaca tebal.' },
  { name: 'Bumi', order: 3, color: 'bg-blue-500', size: 'Sedang (12.742 km)', distance: '149,6 juta km', funFact: 'Satu-satunya planet tempat tinggal kita dengan air dan oksigen berlimpah.' },
  { name: 'Mars', order: 4, color: 'bg-red-500', size: 'Kecil (6.779 km)', distance: '227,9 juta km', funFact: 'Dikenal sebagai Planet Merah karena kandungan besi oksida (karat) di tanahnya.' },
  { name: 'Yupiter', order: 5, color: 'bg-orange-300', size: 'Raksasa Gas (139.820 km)', distance: '778,5 juta km', funFact: 'Planet terbesar dengan bintik merah raksasa badai abadi.' },
  { name: 'Saturnus', order: 6, color: 'bg-yellow-200', size: 'Raksasa Berkilau (116.460 km)', distance: '1,4 miliar km', funFact: 'Memiliki sistem cincin es dan batuan paling spektakuler di tata surya.' },
  { name: 'Uranus', order: 7, color: 'bg-cyan-300', size: 'Raksasa Es (50.724 km)', distance: '2,8 miliar km', funFact: 'Berputar menggelinding miring ke samping seperti bola bowling!' },
  { name: 'Neptunus', order: 8, color: 'bg-blue-600', size: 'Raksasa Es (49.244 km)', distance: '4,5 miliar km', funFact: 'Planet terjauh dari matahari dengan angin terkuat melesat 2.000 km/jam.' },
];

export const SolarSystemSim: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetInfo>(PLANETS[2]); // Default Bumi
  const [speed, setSpeed] = useState<'normal' | 'cepat'>('normal');

  return (
    <div className="bg-slate-950 rounded-3xl p-6 text-white border-2 border-indigo-500/40 shadow-xl space-y-6">
      
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/30">
            Antariksa Interaktif
          </span>
          <h3 className="text-xl font-black text-white mt-1">Laboratorium Virtual Tata Surya Kita</h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSpeed(speed === 'normal' ? 'cepat' : 'normal')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 cursor-pointer"
          >
            <RotateCw className="w-4 h-4 text-cyan-400" />
            <span>Kecepatan: {speed === 'normal' ? 'Normal' : 'Cepat'}</span>
          </button>
        </div>
      </div>

      {/* Orbit Visualizer Container */}
      <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black flex items-center justify-center border border-slate-800">
        
        {/* Sun in Center */}
        <div className="z-10 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-red-500 shadow-[0_0_50px_rgba(245,158,11,1)] flex items-center justify-center">
          <span className="text-[10px] font-black text-amber-950">Matahari</span>
        </div>

        {/* Orbit Rings & Planet Nodes */}
        {PLANETS.map((planet, idx) => {
          const radius = 48 + idx * 16;
          const duration = speed === 'normal' ? 8 + idx * 3 : 4 + idx * 1.5;
          const isSelected = selectedPlanet.name === planet.name;

          return (
            <div
              key={planet.name}
              className="absolute rounded-full border border-slate-700/60 pointer-events-none"
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
              }}
            >
              {/* Rotating wrapper */}
              <div
                className="w-full h-full rounded-full animate-spin pointer-events-auto"
                style={{
                  animationDuration: `${duration}s`,
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                }}
              >
                {/* Planet Dot on Orbit */}
                <button
                  type="button"
                  onClick={() => setSelectedPlanet(planet)}
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 rounded-full cursor-pointer transition-transform hover:scale-150 ${
                    planet.color
                  } ${
                    isSelected ? 'ring-4 ring-yellow-400 scale-125' : 'ring-1 ring-white/50'
                  }`}
                  style={{
                    width: idx === 4 ? '14px' : idx === 5 ? '13px' : '9px',
                    height: idx === 4 ? '14px' : idx === 5 ? '13px' : '9px',
                  }}
                  title={planet.name}
                />
              </div>
            </div>
          );
        })}

        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-[11px] text-slate-300">
          💡 Klik pada planet untuk melihat data sainsnya
        </div>
      </div>

      {/* Selected Planet Fact Card */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-4 flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${selectedPlanet.color} flex items-center justify-center text-slate-950 font-black shadow-lg text-lg`}>
            {selectedPlanet.order}
          </div>
          <div>
            <h4 className="text-xl font-black text-white">{selectedPlanet.name}</h4>
            <p className="text-xs text-slate-400">Planet ke-{selectedPlanet.order} dari Matahari</p>
          </div>
        </div>

        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-[10px] block font-bold uppercase">Ukuran Fisik</span>
            <span className="font-semibold text-slate-200">{selectedPlanet.size}</span>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-[10px] block font-bold uppercase">Jarak dari Matahari</span>
            <span className="font-semibold text-slate-200">{selectedPlanet.distance}</span>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-[10px] block font-bold uppercase">Fakta Sains</span>
            <span className="font-medium text-amber-200 line-clamp-2">{selectedPlanet.funFact}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
