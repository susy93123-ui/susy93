import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAnswer, calculateQuestionScore, calculateStarRating, getFeedbackMessage } from './gameLogic.ts';

test('validateAnswer handles exact numeric matching', () => {
  assert.equal(validateAnswer(2, 2), true);
  assert.equal(validateAnswer(1, 2), false);
});

test('validateAnswer handles case-insensitive string matching and trimming', () => {
  assert.equal(validateAnswer('mata', 'MATA'), true);
  assert.equal(validateAnswer(' telinga ', 'telinga'), true);
  assert.equal(validateAnswer('hidung', 'lidah'), false);
});

test('calculateQuestionScore scales with streak and time ratio', () => {
  const base = calculateQuestionScore(100, 0, 0);
  assert.equal(base, 100);

  const withStreak = calculateQuestionScore(100, 3, 0);
  assert.equal(withStreak, 130);

  const withStreakAndTime = calculateQuestionScore(100, 2, 1.0);
  // 100 * 1.2 * 1.2 = 144
  assert.equal(withStreakAndTime, 144);
});

test('calculateStarRating assigns correct star tiers', () => {
  assert.equal(calculateStarRating(90, 100), 3);
  assert.equal(calculateStarRating(60, 100), 2);
  assert.equal(calculateStarRating(30, 100), 1);
});

test('getFeedbackMessage returns encouraging Indonesian feedback', () => {
  const threeStar = getFeedbackMessage(3, 0.9);
  assert.match(threeStar.title, /Luar Biasa/);

  const oneStar = getFeedbackMessage(1, 0.3);
  assert.match(oneStar.title, /Semangat/);
});
