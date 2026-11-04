export type MediaCategory = 
  | 'materi' 
  | 'lkpd' 
  | 'media-interaktif' 
  | 'game' 
  | 'perangkat-ajar'
  | 'tka';

export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const SUBJECT_OPTIONS = [
  'Matematika',
  'Bahasa Indonesia',
  'Bahasa Inggris',
  'IPAS',
  'Pendidikan Pancasila',
  'Pendidikan Agama Islam',
  'PJOK',
  'Bahasa Jawa',
  'Seni',
] as const;

export type SubjectOption = typeof SUBJECT_OPTIONS[number];

export const FILE_TYPE_OPTIONS = [
  'PDF',
  'DOCX / Word',
  'Web Interaktif (HTML5)',
  'Slide / Canva / PPT',
  'Video (MP4 / YouTube)',
  'Game Edukasi (Web / Quiz)',
  'Spreadsheet / Excel',
  'PDF & DOCX',
  'Gambar / Infografis',
] as const;

export type FileTypeOption = typeof FILE_TYPE_OPTIONS[number];

export type PerangkatSubcategory = 
  | 'Modul Ajar'
  | 'RPP'
  | 'ATP'
  | 'CP'
  | 'Program Tahunan'
  | 'Program Semester'
  | 'Bahan Asesmen'
  | 'Kisi-kisi & Soal'
  | 'Rubrik Penilaian'
  | 'Remedial & Pengayaan'
  | 'Administrasi Kelas';

export interface MediaLink {
  id: string;
  title: string;
  url: string;
  platform?: 'drive' | 'youtube' | 'canva' | 'wordwall' | 'quizizz' | 'pdf' | 'kemdikbud' | 'website';
}

export interface MediaItem {
  id: string;
  slug: string;
  title: string;
  category: MediaCategory;
  grade: GradeLevel;
  subject: string;
  semester: 1 | 2;
  curriculum: 'Kurikulum Merdeka' | 'Kurikulum 2013';
  description: string;
  learningObjectives: string[];
  coverImage: string;
  isDemo: boolean;
  fileType: string; // 'PDF', 'HTML5', 'Interaktif', 'DOCX', 'Game Web', 'Video'
  fileSize?: string;
  externalUrl?: string;
  links?: MediaLink[];
  author: string;
  createdAt: string;
  downloadsCount: number;
  viewsCount: number;
  tags: string[];
  perangkatType?: PerangkatSubcategory;
  contentBody?: string;
  downloadUrl?: string;
  interactiveType?: string;
}

export interface SiteSettings {
  schoolName: string;
  portalName: string;
  slogan: string;
  address: string;
  phone?: string;
  email: string;
  academicYear: string;
  aboutText: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

export interface GameQuestion {
  id: string;
  question: string;
  image?: string;
  options: string[];
  correctAnswer: number | string; // index or value
  explanation: string;
  clue?: string;
  difficulty?: 'mudah' | 'sedang' | 'sulit';
}
