import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { KUIS_CERDAS_CERMAT_QUESTIONS } from '../../data/gameQuestions.ts';
import { soundEffects } from '../../utils/soundEffects.ts';
import { calculateQuestionScore, calculateStarRating, getFeedbackMessage } from '../../utils/gameLogic.ts';
import { Timer, Award, RotateCcw, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface KuisGameProps {
  onBack: () => void;
}

export const KuisCerdasCermatGame: React.FC<KuisGameProps> = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ = KUIS_CERDAS_CERMAT_QUESTIONS[currentIdx];

  // Timer countdown
  useEffect(() => {
    if (isAnswered || isGameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIdx, isAnswered, isGameOver]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    soundEffects.playWrong();
    setStreak(0);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      soundEffects.playCorrect();
      const points = calculateQuestionScore(100, streak, timeLeft / 20);
      setScore((prev) => prev + points);
      setStreak((prev) => prev + 1);
    } else {
      soundEffects.playWrong();
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx < KUIS_CERDAS_CERMAT_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(20);
    } else {
      setIsGameOver(true);
      soundEffects.playVictory();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(20);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
  };

  const maxPossibleScore = KUIS_CERDAS_CERMAT_QUESTIONS.length * 150;
  const stars = calculateStarRating(score, maxPossibleScore);
  const evaluation = getFeedbackMessage(stars, score / maxPossibleScore);

  if (isGameOver) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border-2 border-blue-200 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-[#1264C0]">
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

        <div className="bg-blue-50 rounded-2xl p-4 inline-block px-8 border border-blue-100">
          <p className="text-xs text-blue-600 font-bold uppercase">Skor Cerdas Cermat</p>
          <p className="text-4xl font-black text-[#1264C0]">{score} Poin</p>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-full bg-[#1264C0] hover:bg-[#084B91] text-white font-bold flex items-center gap-2 shadow-md cursor-pointer"
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
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-lg space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-blue-100">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Soal {currentIdx + 1} dari {KUIS_CERDAS_CERMAT_QUESTIONS.length}</span>
          <div className="flex items-center gap-1 mt-1">
            {KUIS_CERDAS_CERMAT_QUESTIONS.map((_, idx) => (
              <span
                key={idx}
                className={`w-6 h-2 rounded-full ${
                  idx === currentIdx ? 'bg-[#1264C0]' : idx < currentIdx ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-black ${
            timeLeft <= 5 ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse' : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            <Timer className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>

          {/* Score */}
          <div className="bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200">
            <span className="text-xs text-amber-800 font-bold">Skor: </span>
            <span className="text-base font-black text-amber-900">{score}</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 p-6 rounded-2xl border border-blue-200">
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
          {currentQ.question}
        </h3>
      </div>

      {/* 4 Answer Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQ.correctAnswer;
          
          let btnStyle = 'bg-white border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-800';
          if (isAnswered) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-900 font-bold';
            } else if (isSelected && !isCorrect) {
              btnStyle = 'bg-rose-100 border-2 border-rose-500 text-rose-900 font-bold';
            } else {
              btnStyle = 'bg-slate-50 border-2 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`p-4 rounded-2xl text-left text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-black text-xs text-slate-600">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>

              {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next Button */}
      {isAnswered && (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fade-in">
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong>Penjelasan:</strong> {currentQ.explanation}
          </p>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#1264C0] hover:bg-[#084B91] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>{currentIdx < KUIS_CERDAS_CERMAT_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
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
