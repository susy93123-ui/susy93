import React from 'react';
import { BookOpen, Sparkles, Target, Compass, Award, Users, CheckCircle2 } from 'lucide-react';
import { useMedia } from '../context/MediaContext.tsx';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { settings } = useMedia();

  const values = [
    {
      title: 'Berinovasi',
      desc: 'Terus mengembangkan media pembelajaran digital yang kreatif, adaptif, dan relevan dengan perkembangan zaman anak abad 21.',
      icon: Sparkles,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      title: 'Berinteraksi',
      desc: 'Menciptakan ruang belajar aktif dua arah antara guru, siswa, dan orang tua melalui simulasi, gamifikasi, dan lembar kerja kontekstual.',
      icon: Compass,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      title: 'Menginspirasi',
      desc: 'Menularkan semangat belajar sepanjang hayat, membangun budi pekerti luhur, dan mendorong prestasi gemilang setiap siswa.',
      icon: Target,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#084B91] via-[#1264C0] to-[#0A3D73] rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold border border-white/20">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Profil Resmi Portal SIPID</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Tentang SIPID SD Negeri Mendongan
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            {settings.aboutText || 'Sistem Inovasi Pembelajaran Interaktif Digital (SIPID) SD Negeri Mendongan merupakan portal belajar terpadu yang memadukan teknologi pembelajaran interaktif, gamifikasi dan perangkat kurikulum merdeka.'}
          </p>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((v) => {
          const Icon = v.icon;
          return (
            <div key={v.title} className={`rounded-3xl border p-8 bg-white shadow-xs space-y-3 ${v.color}`}>
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">{v.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Vision & Mission */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <span className="text-xs font-black uppercase text-[#1264C0] tracking-wider">Visi Sekolah</span>
          <h2 className="text-2xl font-black text-slate-900">
            Unggul dalam Mutu, Berkarakter Pancasila, dan Terdepan dalam Literasi Digital
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            SD Negeri Mendongan berkomitmen mendidik generasi penerus bangsa yang cerdas, berbudi pekerti luhur, berwawasan global, dan cinta tanah air melalui ekosistem belajar ramah anak.
          </p>
        </div>

        <div className="space-y-4">
          <span className="text-xs font-black uppercase text-[#31A875] tracking-wider">Misi Pengembangan Pembelajaran</span>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Menyediakan akses sumber belajar gratis, terbuka, dan terkurasi bagi seluruh peserta didik dan pendidik.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Memadukan gamifikasi edukatif dan simulasi interaktif untuk meningkatkan minat belajar siswa pada sains dan matematika.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Mendukung guru dalam menyusun dan berbagi modul ajar, perangkat kurikulum, serta instrumen asesmen Kurikulum Merdeka.</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};
