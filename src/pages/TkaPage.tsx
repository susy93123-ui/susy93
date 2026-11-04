import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  Award, 
  Clock, 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  Download, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  HelpCircle,
  FileText,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMedia } from '../context/MediaContext.tsx';
import { TkaQuestion, TKA_SAMPLE_QUESTIONS } from '../data/tkaQuestions.ts';
import { GradeLevel } from '../types/index.ts';
import { MediaCard } from '../components/MediaCard.tsx';

interface TkaPageProps {
  onNavigate: (path: string) => void;
}

export const TkaPage: React.FC<TkaPageProps> = ({ onNavigate }) => {
  const { items } = useMedia();
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'semua'>('semua');
  const [activeTab, setActiveTab] = useState<'simulasi' | 'bank-soal'>('simulasi');

  // Interactive Simulation State
  const [simGrade, setSimGrade] = useState<number>(5);
  const [isExamActive, setIsExamActive] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

  // Filter TKA items from media database
  const tkaMediaItems = items.filter((item) => {
    if (item.category !== 'tka') return false;
    if (selectedGrade !== 'semua' && item.grade !== selectedGrade) return false;
    return true;
  });

  // Filter simulation questions based on selected grade
  const examQuestions = TKA_SAMPLE_QUESTIONS.filter((q) => {
    if (simGrade === 0) return true;
    return q.grade === simGrade || (simGrade === 5 && q.grade === 6) || (simGrade === 4 && q.grade === 5);
  }).slice(0, 5);

  const currentQuestion = examQuestions[currentQIndex] || examQuestions[0];

  const handleStartExam = (grade: number) => {
    setSimGrade(grade);
    setCurrentQIndex(0);
    setUserAnswers({});
    setExamSubmitted(false);
    setTimeLeft(15 * 60);
    setIsExamActive(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSelectAnswer = (qId: string, optionIdx: number) => {
    if (examSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    examQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / examQuestions.length) * 100);
  };

  const handleSubmitExam = () => {
    setExamSubmitted(true);
    const finalScore = calculateScore();
    if (finalScore >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] p-8 sm:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-teal-100 text-xs font-bold tracking-wide border border-white/20">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>Tes Kemampuan Akademik (TKA) • SD Negeri Mendongan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Asesmen & Uji Kemampuan Akademik Terpadu
          </h1>

          <p className="text-teal-50 text-sm sm:text-base leading-relaxed">
            Wadah latihan, simulasi asesmen kompetensi, dan uji pemahaman siswa meliputi bidang <strong>Numerasi Berhitung</strong>, <strong>Literasi Membaca</strong>, <strong>Sains & Penalaran IPAS</strong>, serta <strong>Logika Analitis</strong>.
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold">
            <div className="flex items-center gap-2 bg-black/20 px-3.5 py-2 rounded-xl backdrop-blur-xs border border-white/10">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Standar Kurikulum Merdeka</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-3.5 py-2 rounded-xl backdrop-blur-xs border border-white/10">
              <Clock className="w-4 h-4 text-teal-200" />
              <span>Simulasi Interaktif & Timer</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-3.5 py-2 rounded-xl backdrop-blur-xs border border-white/10">
              <FileText className="w-4 h-4 text-blue-200" />
              <span>Bank Soal & Tryout PDF</span>
            </div>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-4 -bottom-10 opacity-15 pointer-events-none hidden md:block">
          <GraduationCap className="w-96 h-96 text-white" />
        </div>
      </div>

      {/* Tabs Switcher: Simulasi Interaktif vs Bank Soal */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('simulasi')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'simulasi'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Simulasi Ujian Online TKA</span>
          </button>

          <button
            onClick={() => setActiveTab('bank-soal')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'bank-soal'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Bank Soal & Paket Tryout ({tkaMediaItems.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SIMULASI UJIAN ONLINE TKA INTERAKTIF */}
      {activeTab === 'simulasi' && (
        <div className="space-y-8">
          
          {!isExamActive ? (
            /* Mode Pilih Kelas untuk Ujian */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-bold text-xs uppercase tracking-wider">
                  Mulai Simulasi
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Pilih Tingkat Kelas untuk Ujian TKA
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Simulasi interaktif dengan timer mandiri, skor otomatis, dan pembahasan lengkap setiap butir soal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                {[
                  { grade: 1, title: 'TKA Kelas 1 SD', desc: 'Pengenalan Angka, Huruf & Observasi Visual', badge: 'Calistung' },
                  { grade: 2, title: 'TKA Kelas 2 SD', desc: 'Penjumlahan, Pengurangan & Membaca Nyaring', badge: 'Fase A' },
                  { grade: 3, title: 'TKA Kelas 3 SD', desc: 'Perkalian Dasar, Lingkungan Alam & Kosakata', badge: 'Fase B' },
                  { grade: 4, title: 'TKA Kelas 4 SD', desc: 'Numerasi Kontekstual, Membaca Teks & IPAS', badge: 'Asesmen' },
                  { grade: 5, title: 'TKA Kelas 5 SD', desc: 'Pecahan, Luas Bangun, Penalaran Logika Sains', badge: 'Prioritas' },
                  { grade: 6, title: 'TKA Kelas 6 SD', desc: 'Tryout Kelulusan, Logika Abstrak & Pemecahan Masalah', badge: 'Ujian Akhir' },
                ].map((item) => (
                  <div
                    key={item.grade}
                    onClick={() => handleStartExam(item.grade)}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-teal-50/40 hover:border-teal-300 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                        {item.grade}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 group-hover:text-teal-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-teal-700">
                      <span>Mulai Simulasi 5 Soal</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Mode Pengerjaan Ujian Aktif */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md space-y-8 animate-fade-in">
              
              {/* Exam Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-teal-100 text-teal-800 text-xs font-black">
                      Simulasi TKA Kelas {simGrade}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-bold text-slate-600">
                      Soal {currentQIndex + 1} dari {examQuestions.length}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    Uji Kemampuan {currentQuestion?.subjectType || 'Akademik'}
                  </h2>
                </div>

                {/* Score & Action Button */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsExamActive(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 border border-slate-200 cursor-pointer"
                  >
                    Kembali ke Menu TKA
                  </button>
                  {!examSubmitted ? (
                    <button
                      onClick={handleSubmitExam}
                      className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Kirim & Nilai Ujian</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartExam(simGrade)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Ulangi Simulasi</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Hasil Nilai Jika Sudah Dikirim */}
              {examSubmitted && (
                <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-teal-700 text-white flex flex-col items-center justify-center font-black shadow-md shrink-0">
                      <span className="text-2xl leading-none">{calculateScore()}</span>
                      <span className="text-[10px] text-teal-200 uppercase">Skor</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-teal-900">
                        {calculateScore() >= 80 ? '🎉 Luar Biasa! Nilai Sangat Memuaskan' : calculateScore() >= 60 ? '👍 Bagus! Terus Tingkatkan Belajar' : '💪 Perlu Latihan Lebih Lanjut'}
                      </h3>
                      <p className="text-xs text-teal-700">
                        Kamu menjawab {Object.entries(userAnswers).filter(([id, ans]) => examQuestions.find(q => q.id === id)?.correctAnswer === ans).length} dari {examQuestions.length} soal dengan benar. Simak pembahasan di bawah.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-white text-teal-800 text-xs font-bold border border-teal-200 shadow-2xs">
                      Tingkat: Kelas {simGrade} SD
                    </span>
                  </div>
                </div>
              )}

              {/* Butir Soal Aktif */}
              <div className="space-y-6">
                
                {/* Question Text */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-800">
                    <HelpCircle className="w-4 h-4" />
                    <span>Bidang: {currentQuestion.subjectType}</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-800 whitespace-pre-line leading-relaxed">
                    {currentQuestion.question}
                  </p>
                </div>

                {/* Option Choices */}
                <div className="space-y-3">
                  {currentQuestion.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentQuestion.id] === optIdx;
                    const isCorrect = currentQuestion.correctAnswer === optIdx;
                    
                    let optionStyle = 'bg-white border-slate-200 hover:border-teal-400 hover:bg-slate-50 text-slate-700';

                    if (examSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-50 border-rose-300 text-rose-800';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-teal-50 border-teal-600 text-teal-900 font-bold ring-2 ring-teal-200';
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectAnswer(currentQuestion.id, optIdx)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="text-xs sm:text-sm">{opt}</span>
                        </div>

                        {examSubmitted && isCorrect && (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Jawaban Benar</span>
                          </span>
                        )}
                        {examSubmitted && isSelected && !isCorrect && (
                          <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>Pilihan Anda</span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pembahasan Soal jika sudah dinilai */}
                {examSubmitted && (
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                    <strong className="block font-black text-blue-950">💡 Pembahasan Resmi:</strong>
                    <p className="leading-relaxed">{currentQuestion.explanation}</p>
                  </div>
                )}

              </div>

              {/* Navigation Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {/* Quick Number Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {examQuestions.map((q, idx) => {
                    const answered = userAnswers[q.id] !== undefined;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQIndex(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          currentQIndex === idx
                            ? 'bg-teal-700 text-white shadow-xs'
                            : answered
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={currentQIndex === examQuestions.length - 1}
                  onClick={() => setCurrentQIndex((prev) => Math.min(examQuestions.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* TAB 2: BANK SOAL & BERKAS TRYOUT TKA */}
      {activeTab === 'bank-soal' && (
        <div className="space-y-6">
          
          {/* Grade Filter Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2">Filter Tingkatan:</span>
            <button
              onClick={() => setSelectedGrade('semua')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                selectedGrade === 'semua'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Semua Kelas ({tkaMediaItems.length})
            </button>
            {[1, 2, 3, 4, 5, 6].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g as GradeLevel)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  selectedGrade === g
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Kelas {g}
              </button>
            ))}
          </div>

          {/* Media Items Grid */}
          {tkaMediaItems.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
              <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">Belum ada paket TKA untuk kelas ini</h3>
              <p className="text-xs text-slate-500">Pilih kelas lain atau tambahkan paket soal TKA baru melalui panel admin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tkaMediaItems.map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
