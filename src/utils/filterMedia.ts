import type { MediaItem, MediaCategory, GradeLevel } from '../types/index.ts';

export interface FilterOptions {
  query?: string;
  category?: MediaCategory | 'semua';
  grade?: GradeLevel | 'semua';
  subject?: string | 'semua';
  semester?: 1 | 2 | 'semua';
  curriculum?: string | 'semua';
  sortBy?: 'terbaru' | 'terpopuler' | 'abjad';
}

export function filterMediaItems(items: MediaItem[], options: FilterOptions): MediaItem[] {
  const query = (options.query || '').trim().toLowerCase();
  const category = options.category;
  const grade = options.grade;
  const subject = options.subject;
  const semester = options.semester;
  const curriculum = options.curriculum;

  let filtered = items.filter((item) => {
    // Search query
    if (query) {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchSubject = item.subject.toLowerCase().includes(query);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(query));
      if (!matchTitle && !matchDesc && !matchSubject && !matchTags) {
        return false;
      }
    }

    // Category
    if (category && category !== 'semua' && item.category !== category) {
      return false;
    }

    // Grade
    if (grade && grade !== 'semua' && item.grade !== Number(grade)) {
      return false;
    }

    // Subject
    if (subject && subject !== 'semua' && item.subject.toLowerCase() !== subject.toLowerCase()) {
      return false;
    }

    // Semester
    if (semester && semester !== 'semua' && item.semester !== Number(semester)) {
      return false;
    }

    // Curriculum
    if (curriculum && curriculum !== 'semua' && item.curriculum !== curriculum) {
      return false;
    }

    return true;
  });

  // Sorting
  if (options.sortBy === 'abjad') {
    filtered.sort((a, b) => a.title.localeCompare(b.title, 'id'));
  } else if (options.sortBy === 'terpopuler') {
    filtered.sort((a, b) => (b.viewsCount + b.downloadsCount) - (a.viewsCount + a.downloadsCount));
  } else {
    // 'terbaru' default
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return filtered;
}

export function getCategoryCounts(items: MediaItem[]): Record<MediaCategory, number> {
  const counts: Record<MediaCategory, number> = {
    'materi': 0,
    'lkpd': 0,
    'media-interaktif': 0,
    'game': 0,
    'perangkat-ajar': 0,
    'tka': 0,
  };

  for (const item of items) {
    if (counts[item.category] !== undefined) {
      counts[item.category]++;
    }
  }

  return counts;
}

export function getClassCounts(items: MediaItem[]): Record<GradeLevel, number> {
  const counts: Record<GradeLevel, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };

  for (const item of items) {
    if (item.grade >= 1 && item.grade <= 6) {
      counts[item.grade]++;
    }
  }

  return counts;
}
