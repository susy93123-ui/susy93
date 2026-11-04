import { GameQuestion } from '../types/index.ts';

// 1. TEBAK GAMBAR DATA
export interface TebakGambarItem {
  id: string;
  image: string;
  iconName: string;
  targetWord: string; // e.g. "MATA"
  clue: string;
  category: string;
  explanation: string;
}

export const TEBAK_GAMBAR_QUESTIONS: TebakGambarItem[] = [
  {
    id: 'tg-1',
    image: '/assets/extracted/thumb-pencernaan.png',
    iconName: 'Eye',
    targetWord: 'MATA',
    clue: 'Indra Penglihatan untuk melihat warna-warni pelangi dan membaca buku cerita.',
    category: 'Pancaindra',
    explanation: 'Mata adalah indra penglihatan. Bagian mata seperti pupil dan kornea menerima cahaya agar kita bisa melihat dunia dengan jelas!',
  },
  {
    id: 'tg-2',
    image: '/assets/extracted/thumb-tebakgambar.png',
    iconName: 'Ear',
    targetWord: 'TELINGA',
    clue: 'Indra Pendengaran untuk mendengar nyanyian burung, suara bel, dan nasihat guru.',
    category: 'Pancaindra',
    explanation: 'Telinga adalah indra pendengaran. Daun telinga menangkap gelombang suara lalu diteruskan ke gendang telinga.',
  },
  {
    id: 'tg-3',
    image: '/assets/extracted/thumb-tebakgambar.png',
    iconName: 'Smile',
    targetWord: 'HIDUNG',
    clue: 'Indra Pembau untuk mencium aroma harum bunga melati dan wangi kue bolu.',
    category: 'Pancaindra',
    explanation: 'Hidung memiliki saraf olfaktori di dalamnya untuk mendeteksi berbagai jenis bau dan aroma di sekitar kita.',
  },
  {
    id: 'tg-4',
    image: '/assets/extracted/thumb-pencernaan.png',
    iconName: 'Cookie',
    targetWord: 'LIDAH',
    clue: 'Indra Pengecap untuk merasakan manisnya madu, gurihnya sup, dan asamnya buah jeruk.',
    category: 'Pancaindra',
    explanation: 'Lidah memiliki bintil-bintil papila dengan kuncup pengecap rasa manis, asin, asam, pahit, dan umami.',
  },
  {
    id: 'tg-5',
    image: '/assets/extracted/thumb-tebakgambar.png',
    iconName: 'Hand',
    targetWord: 'KULIT',
    clue: 'Indra Peraba yang menutupi seluruh tubuh kita untuk merasakan hangat, dingin, dan lembut.',
    category: 'Pancaindra',
    explanation: 'Kulit adalah organ tubuh terluas manusia yang melindungi tubuh dari kuman serta merasakan sentuhan dan suhu.',
  },
];

// 2. KUIS PILIHAN GANDA (CERDAS CERMAT)
export const KUIS_CERDAS_CERMAT_QUESTIONS: GameQuestion[] = [
  {
    id: 'kcc-1',
    question: 'Di manakah tempat pertama kali makanan mengalami pencernaan mekanik dan kimiawi?',
    options: ['Lambung', 'Mulut', 'Kerongkongan', 'Usus Halus'],
    correctAnswer: 1, // 'Mulut'
    explanation: 'Di mulut, makanan dikunyah oleh gigi (mekanik) dan bercampur air liur yang mengandung enzim ptialin (kimiawi).',
  },
  {
    id: 'kcc-2',
    question: 'Sebuah persegi memiliki panjang sisi 8 cm. Berapakah keliling persegi tersebut?',
    options: ['16 cm', '24 cm', '32 cm', '64 cm'],
    correctAnswer: 2, // '32 cm' (4 x 8)
    explanation: 'Keliling persegi dihitung dengan rumus: 4 x sisi = 4 x 8 cm = 32 cm.',
  },
  {
    id: 'kcc-3',
    question: 'Proses penguapan air laut dan sungai akibat panas matahari disebut apa?',
    options: ['Kondensasi', 'Evaporasi', 'Presipitasi', 'Infiltrasi'],
    correctAnswer: 1, // 'Evaporasi'
    explanation: 'Evaporasi adalah perubahan air menjadi uap air akibat panas energi cahaya matahari.',
  },
  {
    id: 'kcc-4',
    question: 'Gas apa yang dilepaskan tumbuhan hijau ke udara saat proses fotosintesis?',
    options: ['Karbon Dioksida', 'Nitrogen', 'Oksigen', 'Hidrogen'],
    correctAnswer: 2, // 'Oksigen'
    explanation: 'Fotosintesis menyerap karbon dioksida dan air, lalu menghasilkan glukosa serta melepaskan gas oksigen (O2) yang segar.',
  },
  {
    id: 'kcc-5',
    question: 'Planet apakah yang paling dekat dengan matahari dalam tata surya kita?',
    options: ['Bumi', 'Venus', 'Mars', 'Merkurius'],
    correctAnswer: 3, // 'Merkurius'
    explanation: 'Merkurius adalah planet pertama dan paling dekat dengan matahari, berjarak sekitar 57,9 juta km.',
  },
];

// 3. BENAR ATAU SALAH
export interface TrueFalseQuestion {
  id: string;
  statement: string;
  isCorrect: boolean; // true = BENAR, false = SALAH
  explanation: string;
}

export const BENAR_SALAH_QUESTIONS: TrueFalseQuestion[] = [
  {
    id: 'bs-1',
    statement: 'Lambung manusia memproduksi asam lambung (HCl) untuk membunuh kuman pada makanan.',
    isCorrect: true,
    explanation: 'Benar! Asam lambung (asam klorida) sangat asam dan berguna membunuh bakteri serta mengaktifkan enzim pepsin.',
  },
  {
    id: 'bs-2',
    statement: 'Kupu-kupu mengalami metamorfosis tidak sempurna karena tidak melalui tahap kepompong.',
    isCorrect: false,
    explanation: 'Salah! Kupu-kupu mengalami metamorfosis SEMPURNA: Telur -> Ulat (Larva) -> Kepompong (Pupa) -> Kupu-kupu dewasa (Imago).',
  },
  {
    id: 'bs-3',
    statement: 'Matahari adalah sebuah bintang raksasa yang menjadi pusat tata surya kita.',
    isCorrect: true,
    explanation: 'Benar! Matahari adalah bintang tipe katai kuning yang memancarkan energi panas dan cahayanya sendiri.',
  },
  {
    id: 'bs-4',
    statement: 'Semua bangun datar segitiga selalu memiliki 4 sudut.',
    isCorrect: false,
    explanation: 'Salah! Segitiga selalu memiliki TIGA sisi dan TIGA sudut (total sudut dalamnya selalu 180 derajat).',
  },
  {
    id: 'bs-5',
    statement: 'Awan putih di langit terbentuk dari titik-titik air kecil hasil kondensasi uap air.',
    isCorrect: true,
    explanation: 'Benar! Ketika uap air naik ke lapisan atmosfer yang dingin, uap tersebut mengembun menjadi butiran air kecil yang membentuk awan.',
  },
];
