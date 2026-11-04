import test from 'node:test';
import assert from 'node:assert/strict';
import { detectLinkPlatform, normalizeUrl, getYouTubeEmbedUrl, getDirectMediaLink } from './linkHelpers.ts';
import type { MediaItem } from '../types/index.ts';

test('detectLinkPlatform correctly detects Google Drive', () => {
  const info = detectLinkPlatform('https://drive.google.com/file/d/12345/view?usp=sharing');
  assert.equal(info.id, 'drive');
  assert.match(info.name, /Google Drive/);
});

test('detectLinkPlatform correctly detects YouTube URLs', () => {
  const info1 = detectLinkPlatform('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  assert.equal(info1.id, 'youtube');

  const info2 = detectLinkPlatform('https://youtu.be/dQw4w9WgXcQ');
  assert.equal(info2.id, 'youtube');
});

test('detectLinkPlatform correctly detects Canva and Wordwall', () => {
  const canva = detectLinkPlatform('https://www.canva.com/design/DAF123/view');
  assert.equal(canva.id, 'canva');

  const wordwall = detectLinkPlatform('https://wordwall.net/resource/123456/matematika');
  assert.equal(wordwall.id, 'wordwall');
});

test('detectLinkPlatform correctly detects Quizizz and PDF', () => {
  const quizizz = detectLinkPlatform('https://quizizz.com/join?gc=123456');
  assert.equal(quizizz.id, 'quizizz');

  const pdf = detectLinkPlatform('https://sdnmendongan.sch.id/files/modul-pencernaan.pdf');
  assert.equal(pdf.id, 'pdf');
});

test('normalizeUrl prepends https:// if missing', () => {
  assert.equal(normalizeUrl('drive.google.com/file/d/123'), 'https://drive.google.com/file/d/123');
  assert.equal(normalizeUrl('https://example.com'), 'https://example.com');
  assert.equal(normalizeUrl(''), '');
});

test('getYouTubeEmbedUrl extracts valid embed link', () => {
  const embed1 = getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  assert.equal(embed1, 'https://www.youtube.com/embed/dQw4w9WgXcQ');

  const embed2 = getYouTubeEmbedUrl('https://youtu.be/dQw4w9WgXcQ');
  assert.equal(embed2, 'https://www.youtube.com/embed/dQw4w9WgXcQ');
});

test('getDirectMediaLink returns direct external link when externalUrl is present', () => {
  const mockItem = {
    id: 'materi-1',
    slug: 'materi-1',
    title: 'Materi Test',
    category: 'materi',
    grade: 5,
    subject: 'IPAS',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Desc',
    learningObjectives: [],
    coverImage: '',
    isDemo: false,
    fileType: 'PDF',
    author: 'Guru',
    createdAt: '',
    downloadsCount: 0,
    viewsCount: 0,
    tags: [],
    externalUrl: 'https://drive.google.com/file/d/123',
  } as MediaItem;

  const result = getDirectMediaLink(mockItem);
  assert.equal(result.isExternal, true);
  assert.equal(result.url, 'https://drive.google.com/file/d/123');
  assert.equal(result.platform.id, 'drive');
});

test('getDirectMediaLink resolves in-app simulation route for interactive media without externalUrl', () => {
  const simItem = {
    id: 'sim-1',
    slug: 'simulasi-interaktif-siklus-air',
    title: 'Simulasi Air',
    category: 'media-interaktif',
    grade: 4,
    subject: 'IPAS',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Desc',
    learningObjectives: [],
    coverImage: '',
    isDemo: false,
    fileType: 'HTML5',
    author: 'Guru',
    createdAt: '',
    downloadsCount: 0,
    viewsCount: 0,
    tags: [],
  } as MediaItem;

  const result = getDirectMediaLink(simItem);
  assert.equal(result.isExternal, false);
  assert.equal(result.url, '/media-interaktif/simulasi-interaktif-siklus-air');
});
