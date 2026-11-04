export interface GameState {
  score: number;
  currentQuestionIndex: number;
  correctAnswersCount: number;
  streak: number;
  maxStreak: number;
  isGameOver: boolean;
}

export function validateAnswer(
  userAnswer: number | string,
  correctAnswer: number | string
): boolean {
  if (typeof userAnswer === 'string' && typeof correctAnswer === 'string') {
    return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  }
  return userAnswer === correctAnswer;
}

export function calculateQuestionScore(
  basePoints: number,
  streak: number,
  timeRemainingRatio: number = 1
): number {
  // Bonus for streak: +10% per consecutive right answer, capped at 2x
  const streakBonusMultiplier = 1 + Math.min(streak * 0.1, 1.0);
  // Time bonus up to +20%
  const timeBonus = 1 + Math.max(0, timeRemainingRatio) * 0.2;
  return Math.round(basePoints * streakBonusMultiplier * timeBonus);
}

export function calculateStarRating(score: number, maxPossibleScore: number): 1 | 2 | 3 {
  if (maxPossibleScore <= 0) return 1;
  const ratio = score / maxPossibleScore;
  if (ratio >= 0.8) return 3;
  if (ratio >= 0.5) return 2;
  return 1;
}

export function getFeedbackMessage(stars: number, ratio: number): { title: string; subtitle: string } {
  if (stars === 3) {
    return {
      title: 'Luar Biasa! Juara Hebat!',
      subtitle: 'Kamu menjawab hampir semua soal dengan benar. Pertahankan prestasimu!',
    };
  }
  if (stars === 2) {
    return {
      title: 'Bagus Sekali! Terus Semangat!',
      subtitle: 'Hasil belajarmu sudah baik, yuk coba lagi untuk dapat nilai sempurna!',
    };
  }
  return {
    title: 'Tetap Semangat! Jangan Menyerah!',
    subtitle: 'Belajar itu proses seru, ulangi lagi dan raih bintang tertinggimu!',
  };
}
