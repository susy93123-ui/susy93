import type { MediaLink, MediaItem } from '../types/index.ts';

export interface PlatformInfo {
  id: 'drive' | 'youtube' | 'canva' | 'wordwall' | 'quizizz' | 'pdf' | 'kemdikbud' | 'website';
  name: string;
  badgeColor: string;
  badgeBg: string;
  badgeBorder: string;
  iconType: string;
  actionLabel: string;
  sampleUrl: string;
}

export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function detectLinkPlatform(url: string): PlatformInfo {
  const lower = url.toLowerCase();

  if (lower.includes('drive.google.com') || lower.includes('docs.google.com')) {
    return {
      id: 'drive',
      name: 'Google Drive / Docs',
      badgeColor: 'text-blue-700',
      badgeBg: 'bg-blue-50',
      badgeBorder: 'border-blue-200',
      iconType: 'drive',
      actionLabel: 'Buka di Google Drive',
      sampleUrl: 'https://drive.google.com/file/d/...',
    };
  }

  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    return {
      id: 'youtube',
      name: 'YouTube Video',
      badgeColor: 'text-red-700',
      badgeBg: 'bg-red-50',
      badgeBorder: 'border-red-200',
      iconType: 'youtube',
      actionLabel: 'Tonton di YouTube',
      sampleUrl: 'https://www.youtube.com/watch?v=...',
    };
  }

  if (lower.includes('canva.com')) {
    return {
      id: 'canva',
      name: 'Canva Modul / Slide',
      badgeColor: 'text-cyan-800',
      badgeBg: 'bg-cyan-50',
      badgeBorder: 'border-cyan-200',
      iconType: 'canva',
      actionLabel: 'Buka Desain Canva',
      sampleUrl: 'https://www.canva.com/design/...',
    };
  }

  if (lower.includes('wordwall.net')) {
    return {
      id: 'wordwall',
      name: 'Wordwall Edukasi',
      badgeColor: 'text-blue-800',
      badgeBg: 'bg-indigo-50',
      badgeBorder: 'border-indigo-200',
      iconType: 'wordwall',
      actionLabel: 'Mainkan di Wordwall',
      sampleUrl: 'https://wordwall.net/resource/...',
    };
  }

  if (lower.includes('quizizz.com')) {
    return {
      id: 'quizizz',
      name: 'Quizizz Interaktif',
      badgeColor: 'text-purple-800',
      badgeBg: 'bg-purple-50',
      badgeBorder: 'border-purple-200',
      iconType: 'quizizz',
      actionLabel: 'Mulai Kuis di Quizizz',
      sampleUrl: 'https://quizizz.com/join?...',
    };
  }

  if (lower.includes('kemdikbud') || lower.includes('guru.kemdikbud.go.id')) {
    return {
      id: 'kemdikbud',
      name: 'Platform Merdeka Mengajar (PMM)',
      badgeColor: 'text-sky-800',
      badgeBg: 'bg-sky-50',
      badgeBorder: 'border-sky-200',
      iconType: 'kemdikbud',
      actionLabel: 'Buka di PMM Kemendikbud',
      sampleUrl: 'https://guru.kemdikbud.go.id/...',
    };
  }

  if (lower.endsWith('.pdf') || lower.includes('.pdf?') || lower.includes('/pdf/')) {
    return {
      id: 'pdf',
      name: 'Dokumen Berkas PDF',
      badgeColor: 'text-rose-700',
      badgeBg: 'bg-rose-50',
      badgeBorder: 'border-rose-200',
      iconType: 'pdf',
      actionLabel: 'Unduh Berkas PDF',
      sampleUrl: 'https://example.com/modul.pdf',
    };
  }

  return {
    id: 'website',
    name: 'Tautan Daring / Web',
    badgeColor: 'text-slate-700',
    badgeBg: 'bg-slate-100',
    badgeBorder: 'border-slate-200',
    iconType: 'website',
    actionLabel: 'Buka Tautan Pembelajaran',
    sampleUrl: 'https://...',
  };
}

export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const trimmed = url.trim();
    if (!trimmed) return null;

    // Handle youtu.be/<id>
    const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch && shortMatch[1]) {
      return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }

    // Handle youtube.com/watch?v=<id>
    const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch && watchMatch[1]) {
      return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }

    // Handle youtube.com/embed/<id>
    const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch && embedMatch[1]) {
      return `https://www.youtube.com/embed/${embedMatch[1]}`;
    }
  } catch {
    // ignore
  }
  return null;
}

export interface DirectLinkResult {
  url: string;
  isExternal: boolean;
  platform: PlatformInfo;
  label: string;
}

export function getDirectMediaLink(item: MediaItem): DirectLinkResult {
  // 1. Primary externalUrl
  if (item.externalUrl && item.externalUrl.trim() && item.externalUrl.trim() !== '#') {
    const norm = normalizeUrl(item.externalUrl.trim());
    const plat = detectLinkPlatform(norm);
    return {
      url: norm,
      isExternal: true,
      platform: plat,
      label: plat.actionLabel || 'Buka Tautan Langsung',
    };
  }

  // 2. Additional links array
  if (item.links && Array.isArray(item.links) && item.links.length > 0) {
    const firstValid = item.links.find((l) => l.url && l.url.trim() && l.url.trim() !== '#');
    if (firstValid) {
      const norm = normalizeUrl(firstValid.url.trim());
      const plat = detectLinkPlatform(norm);
      return {
        url: norm,
        isExternal: true,
        platform: plat,
        label: firstValid.title || plat.actionLabel || 'Buka Tautan Langsung',
      };
    }
  }

  // 3. downloadUrl if external HTTP
  if (item.downloadUrl && item.downloadUrl.trim().startsWith('http')) {
    const norm = normalizeUrl(item.downloadUrl.trim());
    const plat = detectLinkPlatform(norm);
    return {
      url: norm,
      isExternal: true,
      platform: plat,
      label: plat.actionLabel || 'Unduh Berkas',
    };
  }

  // 4. In-app interactive simulations
  if (item.category === 'media-interaktif') {
    return {
      url: `/media-interaktif/${item.slug}`,
      isExternal: false,
      platform: {
        id: 'website',
        name: 'Simulasi Interaktif',
        badgeColor: 'text-emerald-700',
        badgeBg: 'bg-emerald-50',
        badgeBorder: 'border-emerald-200',
        iconType: 'website',
        actionLabel: 'Mulai Simulasi',
        sampleUrl: '',
      },
      label: 'Mulai Simulasi Interaktif',
    };
  }

  // 5. In-app games
  if (item.category === 'game') {
    return {
      url: `/game`,
      isExternal: false,
      platform: {
        id: 'website',
        name: 'Game Edukasi',
        badgeColor: 'text-purple-700',
        badgeBg: 'bg-purple-50',
        badgeBorder: 'border-purple-200',
        iconType: 'website',
        actionLabel: 'Main Sekarang',
        sampleUrl: '',
      },
      label: 'Main Sekarang',
    };
  }

  // Default internal detail route
  return {
    url: `/${item.category}/${item.slug}`,
    isExternal: false,
    platform: {
      id: 'website',
      name: 'Portal Belajar',
      badgeColor: 'text-blue-700',
      badgeBg: 'bg-blue-50',
      badgeBorder: 'border-blue-200',
      iconType: 'website',
      actionLabel: 'Buka Media',
      sampleUrl: '',
    },
    label: 'Buka Media',
  };
}
