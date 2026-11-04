import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TEBAK_GAMBAR_QUESTIONS, TebakGambarItem } from '../../data/gameQuestions.ts';
import { soundEffects } from '../../utils/soundEffects.ts';
import { calculateStarRating, getFeedbackMessage } from '../../utils/gameLogic.ts';
import { Eye, Sparkles, RotateCcw, HelpCircle, CheckCircle2, Award } from 'lucide-react';

interface TebakGambarGameProps {
  onBack: () => void;
}

export const TebakGambarGame: React.FC<TebakGambarGameProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userLetters, setUserLetters] = useState<string[]>([]);
  const [shuffledBank, setShuffledBank] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ: TebakGambarItem = TEBAK_GAMBAR_QUESTIONS[currentIndex];
  const targetWord = currentQ?.targetWord || '';

  // Setup question letters bank
  useEffect(() => {
    if (!currentQ) return;
    setUserLetters(new Array(targetWord.length).fill(''));
    setShowHint(false);
    setFeedback('idle');

    // Create randomized letters pool with target word letters + 4 extra random letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const targetLetters = targetWord.split('');
    const extraCount = Math.max(2, 8 - targetLetters.length);
    const extras: string[] = [];
    for (let i = 0; i < extraCount; i++) {
      extras.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }

    const combined = [...targetLetters, ...extras];
    // Fisher-Yates shuffle
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    setShuffledBank(combined);
  }, [currentIndex, targetWord]);

  // Click letter from bank
  const handleSelectLetter = (letter: string, bankIdx: number) => {
    soundEffects.playClick();
    const firstEmptyIdx = userLetters.findIndex((l) => l === '');
    if (firstEmptyIdx !== -1) {
      const nextUser = [...userLetters];
      nextUser[firstEmptyIdx] = letter;
      setUserLetters(nextUser);

      // Check if word is complete
      if (firstEmptyIdx === targetWord.length - 1) {
        checkSubmission(nextUser.join(''));
      }
    }
  };

  // Remove letter from answer slot
  const handleRemoveLetter = (slotIdx: number) => {
    soundEffects.playClick();
    const nextUser = [...userLetters];
    nextUser[slotIdx] = '';
    setUserLetters(nextUser);
    setFeedback('idle');
  };

  const checkSubmission = (word: string) => {
    if (word.toUpperCase() === targetWord.toUpperCase()) {
      // Correct!
      soundEffects.playCorrect();
      setFeedback('correct');
      const earned = 100 + streak * 20;
      setScore((prev) => prev + earned);
      setStreak((prev) => prev + 1);

      setTimeout(() => {
        if (currentIndex < TEBAK_GAMBAR_QUESTIONS.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          // Completed all!
          setIsGameOver(true);
          soundEffects.playVictory();
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }, 1500);
    } else {
      // Wrong!
      soundEffects.playWrong();
      setFeedback('wrong');
      setStreak(0);
      setTimeout(() => {
        setUserLetters(new Array(targetWord.length).fill(''));
        setFeedback('idle');
      }, 1000);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
    setUserLetters([]);
  };

  const maxScore = TEBAK_GAMBAR_QUESTIONS.length * 150;
  const stars = calculateStarRating(score, maxScore);
  const evaluation = getFeedbackMessage(stars, score / maxScore);

  if (isGameOver) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border-2 border-purple-200 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
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

        <div className="bg-purple-50 rounded-2xl p-4 inline-block px-8">
          <p className="text-xs text-purple-600 font-bold uppercase">Skor Akhir Kamu</p>
          <p className="text-4xl font-black text-purple-700">{score} Poin</p>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-full bg-[#8B5BC7] hover:bg-purple-700 text-white font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Main Lagi</span>
          </button>
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
          >
            Kembali ke Daftar Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-lg space-y-6">
      
      {/* Top Header: Progress & Score */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-100">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Soal {currentIndex + 1} dari {TEBAK_GAMBAR_QUESTIONS.length}</span>
          <div className="flex items-center gap-1 mt-1">
            {TEBAK_GAMBAR_QUESTIONS.map((_, idx) => (
              <span
                key={idx}
                className={`w-6 h-2 rounded-full ${
                  idx === currentIndex ? 'bg-[#8B5BC7]' : idx < currentIndex ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
              <span>{streak}x Combo!</span>
            </div>
          )}
          <div className="bg-purple-50 px-4 py-1.5 rounded-full border border-purple-200">
            <span className="text-xs text-purple-600 font-bold">Skor: </span>
            <span className="text-base font-black text-purple-800">{score}</span>
          </div>
        </div>
      </div>

      {/* Center Image / Clue Card */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 text-center border border-purple-100 relative">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-white shadow-md flex items-center justify-center p-3 mb-3 border-2 border-purple-200">
          <Eye className="w-12 h-12 text-[#8B5BC7]" />
        </div>

        <p className="text-sm sm:text-base font-bold text-slate-800 max-w-md mx-auto">
          {currentQ.clue}
        </p>

        {showHint && (
          <div className="mt-3 text-xs text-purple-800 bg-purple-100/80 p-2.5 rounded-xl border border-purple-200 max-w-sm mx-auto">
            💡 Petunjuk: Huruf awal kata adalah <strong>{targetWord[0]}</strong> dan berjumlah <strong>{targetWord.length} huruf</strong>.
          </div>
        )}
      </div>

      {/* Answer Slots */}
      <div className="flex justify-center gap-2 sm:gap-3">
        {userLetters.map((char, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleRemoveLetter(idx)}
            className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl font-black text-2xl flex items-center justify-center border-2 transition-all cursor-pointer ${
              feedback === 'correct'
                ? 'bg-emerald-100 border-emerald-500 text-emerald-800 animate-bounce'
                : feedback === 'wrong'
                ? 'bg-rose-100 border-rose-500 text-rose-800 animate-shake'
                : char
                ? 'bg-[#8B5BC7] text-white border-purple-600 shadow-sm'
                : 'bg-slate-50 border-slate-300 text-slate-700'
            }`}
          >
            {char}
          </button>
        ))}
      </div>

      {/* Feedback text */}
      {feedback === 'correct' && (
        <div className="flex items-center justify-center gap-2 text-emerald-600 font-extrabold text-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span>Hebat! Jawabanmu Benar! +100 Poin</span>
        </div>
      )}

      {/* Available Letters Bank */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-500 text-center uppercase tracking-wider">
          Pilih huruf di bawah ini:
        </p>
        <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
          {shuffledBank.map((letter, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectLetter(letter, idx)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl font-black text-lg bg-white border-2 border-purple-200 hover:border-[#8B5BC7] hover:bg-purple-50 text-slate-800 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-100">
        <button
          onClick={() => setShowHint(true)}
          className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1.5 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Butuh Bantuan?</span>
        </button>

        <button
          onClick={onBack}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          Keluar Game
        </button>
      </div>

    </div>
  );
};
