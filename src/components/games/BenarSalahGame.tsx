import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BENAR_SALAH_QUESTIONS, TrueFalseQuestion } from '../../data/gameQuestions.ts';
import { soundEffects } from '../../utils/soundEffects.ts';
import { calculateStarRating, getFeedbackMessage } from '../../utils/gameLogic.ts';
import { Check, X, Award, RotateCcw, Sparkles } from 'lucide-react';

interface BenarSalahGameProps {
  onBack: () => void;
}

export const BenarSalahGame: React.FC<BenarSalahGameProps> = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastResult, setLastResult] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ: TrueFalseQuestion = BENAR_SALAH_QUESTIONS[currentIdx];

  const handleAnswer = (userChoice: boolean) => {
    const isCorrect = userChoice === currentQ.isCorrect;
    if (isCorrect) {
      soundEffects.playCorrect();
      setScore((prev) => prev + 100 + streak * 25);
      setStreak((prev) => prev + 1);
    } else {
      soundEffects.playWrong();
      setStreak(0);
    }

    setLastResult({
      isCorrect,
      explanation: currentQ.explanation,
    });
  };

  const handleNext = () => {
    setLastResult(null);
    if (currentIdx < BENAR_SALAH_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsGameOver(true);
      soundEffects.playVictory();
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setLastResult(null);
    setIsGameOver(false);
  };

  const maxPossibleScore = BENAR_SALAH_QUESTIONS.length * 150;
  const stars = calculateStarRating(score, maxPossibleScore);
  const evaluation = getFeedbackMessage(stars, score / maxPossibleScore);

  if (isGameOver) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border-2 border-emerald-200 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-[#31A875]">
          <Award className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900">{evaluation.title}</h2>
          <p className="text-slate-600 text-sm">{evaluation.subtitle}</p>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-3 text-4xl">
          {[1, 2, 3].map((s) => (
            <span key={s} className={s <= stars ? 'text-amber-400 scale-110' : 'text-slate-200'}>
              ★
            </span>
          ))}
        </div>

        <div className="bg-emerald-50 rounded-2xl p-4 inline-block px-8 border border-emerald-100">
          <p className="text-xs text-emerald-600 font-bold uppercase">Skor Tebakan Tepat</p>
          <p className="text-4xl font-black text-emerald-700">{score} Poin</p>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-full bg-[#31A875] hover:bg-emerald-700 text-white font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Main Lagi</span>
          </button>
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
          >
            Kembali ke Menu Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-lg space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Tantangan {currentIdx + 1} dari {BENAR_SALAH_QUESTIONS.length}
          </span>
          <div className="flex items-center gap-1 mt-1">
            {BENAR_SALAH_QUESTIONS.map((_, idx) => (
              <span
                key={idx}
                className={`w-6 h-2 rounded-full ${
                  idx === currentIdx ? 'bg-[#31A875]' : idx < currentIdx ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
              <span>{streak}x Combo!</span>
            </div>
          )}
          <div className="bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
            <span className="text-xs text-emerald-600 font-bold">Skor: </span>
            <span className="text-base font-black text-emerald-800">{score}</span>
          </div>
        </div>
      </div>

      {/* Statement Card */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 p-8 rounded-3xl border border-emerald-100 text-center min-h-[140px] flex items-center justify-center">
        <p className="text-lg sm:text-xl font-black text-slate-800 leading-relaxed">
          “{currentQ.statement}”
        </p>
      </div>

      {/* Decision Buttons */}
      {!lastResult ? (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            onClick={() => handleAnswer(true)}
            className="py-6 px-4 rounded-2xl bg-[#31A875] hover:bg-emerald-700 text-white font-black text-xl sm:text-2xl flex flex-col items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:scale-102 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-7 h-7" />
            </div>
            <span>BENAR</span>
          </button>

          <button
            type="button"
            onClick={() => handleAnswer(false)}
            className="py-6 px-4 rounded-2xl bg-[#F05A78] hover:bg-rose-700 text-white font-black text-xl sm:text-2xl flex flex-col items-center justify-center gap-2 shadow-lg shadow-rose-600/30 hover:scale-102 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <X className="w-7 h-7" />
            </div>
            <span>SALAH</span>
          </button>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-fade-in text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-black text-sm">
            {lastResult.isCorrect ? (
              <span className="text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Jawabanmu Tepat!
              </span>
            ) : (
              <span className="text-rose-700 bg-rose-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                <X className="w-4 h-4" /> Kurang Tepat, Coba Lagi!
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
            {lastResult.explanation}
          </p>

          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-full bg-[#1264C0] hover:bg-[#084B91] text-white font-bold text-sm shadow-md cursor-pointer"
          >
            {currentIdx < BENAR_SALAH_QUESTIONS.length - 1 ? 'Lanjut ke Soal Berikutnya' : 'Selesai & Lihat Skor'}
          </button>
        </div>
      )}

      {/* Exit */}
      <div className="pt-2 text-center">
        <button
          onClick={onBack}
          className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          Keluar ke Daftar Game
        </button>
      </div>
    </div>
  );
};
