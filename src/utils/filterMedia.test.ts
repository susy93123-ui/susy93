import test from 'node:test';
import assert from 'node:assert/strict';
import { filterMediaItems, getCategoryCounts, getClassCounts } from './filterMedia.ts';
import type { MediaItem } from '../types/index.ts';

const mockItems: MediaItem[] = [
  {
    id: '1',
    slug: 'pencernaan-manusia',
    title: 'Sistem Pencernaan Manusia',
    category: 'materi',
    grade: 5,
    subject: 'IPAS',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Materi organ pencernaan',
    learningObjectives: ['Memahami lambung'],
    coverImage: '/assets/extracted/thumb-pencernaan.png',
    isDemo: true,
    fileType: 'PDF',
    author: 'Guru IPAS',
    createdAt: '2026-01-10',
    downloadsCount: 120,
    viewsCount: 350,
    tags: ['organ', 'tubuh'],
  },
  {
    id: '2',
    slug: 'bangun-datar',
    title: 'LKPD Bangun Datar',
    category: 'lkpd',
    grade: 4,
    subject: 'Matematika',
    semester: 2,
    curriculum: 'Kurikulum Merdeka',
    description: 'Lembar kerja keliling dan luas',
    learningObjectives: ['Menghitung keliling'],
    coverImage: '/assets/extracted/thumb-bangundatar.png',
    isDemo: true,
    fileType: 'PDF',
    author: 'Guru Matematika',
    createdAt: '2026-02-15',
    downloadsCount: 85,
    viewsCount: 200,
    tags: ['geometri'],
  },
  {
    id: '3',
    slug: 'tebak-gambar',
    title: 'Tebak Gambar Pancaindra',
    category: 'game',
    grade: 3,
    subject: 'Bahasa Indonesia',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Game edukasi kosakata',
    learningObjectives: ['Mengenal indra'],
    coverImage: '/assets/extracted/thumb-tebakgambar.png',
    isDemo: true,
    fileType: 'Game Web',
    author: 'Tim SIPID',
    createdAt: '2026-03-01',
    downloadsCount: 300,
    viewsCount: 950,
    tags: ['game', 'indra'],
  },
];

test('filterMediaItems filters by search keyword', () => {
  const result = filterMediaItems(mockItems, { query: 'pencernaan' });
  assert.equal(result.length, 1);
  assert.equal(result[0].slug, 'pencernaan-manusia');
});

test('filterMediaItems filters by grade and category', () => {
  const byGrade = filterMediaItems(mockItems, { grade: 4 });
  assert.equal(byGrade.length, 1);
  assert.equal(byGrade[0].slug, 'bangun-datar');

  const byCat = filterMediaItems(mockItems, { category: 'game' });
  assert.equal(byCat.length, 1);
  assert.equal(byCat[0].slug, 'tebak-gambar');
});

test('getCategoryCounts counts correctly for each category', () => {
  const counts = getCategoryCounts(mockItems);
  assert.equal(counts.materi, 1);
  assert.equal(counts.lkpd, 1);
  assert.equal(counts.game, 1);
  assert.equal(counts['media-interaktif'], 0);
  assert.equal(counts['perangkat-ajar'], 0);
  assert.equal(counts.tka, 0);
});

test('getClassCounts aggregates counts per class', () => {
  const classCounts = getClassCounts(mockItems);
  assert.equal(classCounts[3], 1);
  assert.equal(classCounts[4], 1);
  assert.equal(classCounts[5], 1);
  assert.equal(classCounts[1], 0);
});
