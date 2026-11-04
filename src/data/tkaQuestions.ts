export interface TkaQuestion {
  id: string;
  grade: number;
  subjectType: 'Numerasi' | 'Literasi' | 'Sains' | 'Logika';
  question: string;
  image?: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  points: number;
}

export const TKA_SAMPLE_QUESTIONS: TkaQuestion[] = [
  // Kelas 5 & 6 Numerasi
  {
    id: 'tka-q1',
    grade: 5,
    subjectType: 'Numerasi',
    question: 'Di perpustakaan SD Negeri Mendongan, ada 4 rak buku. Setiap rak memuat 35 buku cerita dan 25 buku sains. Berapa jumlah seluruh buku di keempat rak tersebut?',
    options: ['200 buku', '240 buku', '220 buku', '180 buku'],
    correctAnswer: 1, // 240 buku: (35+25)*4 = 60 * 4 = 240
    explanation: 'Total buku per rak = 35 + 25 = 60 buku. Ada 4 rak, sehingga total seluruhnya = 60 x 4 = 240 buku.',
    points: 20,
  },
  {
    id: 'tka-q2',
    grade: 5,
    subjectType: 'Numerasi',
    question: 'Sebuah taman bunga berbentuk persegi panjang dengan panjang 12 meter dan lebar 8 meter. Berapakah keliling taman bunga tersebut?',
    options: ['40 meter', '96 meter', '20 meter', '48 meter'],
    correctAnswer: 0, // 2 * (12 + 8) = 40 meter
    explanation: 'Keliling persegi panjang = 2 x (panjang + lebar) = 2 x (12 + 8) = 2 x 20 = 40 meter.',
    points: 20,
  },
  {
    id: 'tka-q3',
    grade: 5,
    subjectType: 'Literasi',
    question: 'Bacalah teks berikut:\n"Desa Mendongan terkenal dengan udaranya yang sejuk karena berada di lereng pegunungan. Warga desa gemar menanam aneka sayuran segar dan menjaga kebersihan mata air."\n\nApa gagasan pokok dari kutipan teks di atas?',
    options: [
      'Warga desa gemar berdagang sayuran',
      'Kondisi alam yang sejuk dan kebiasaan baik warga Desa Mendongan',
      'Cara menanam sayuran di pegunungan',
      'Mata air yang ada di pegunungan'
    ],
    correctAnswer: 1,
    explanation: 'Gagasan pokok mencakup inti seluruh paragraf, yaitu keadaan alam Desa Mendongan yang sejuk serta kebiasaan positif warganya yang menjaga lingkungan dan bercocok tanam.',
    points: 20,
  },
  {
    id: 'tka-q4',
    grade: 5,
    subjectType: 'Sains',
    question: 'Proses perubahan wujud uap air di udara menjadi titik-titik air pembentuk awan pada siklus hidrologi disebut...',
    options: ['Evaporasi', 'Kondensasi', 'Presipitasi', 'Infiltrasi'],
    correctAnswer: 1,
    explanation: 'Kondensasi (pengembunan) adalah perubahan wujud uap air menjadi titik-titik air karena penurunan suhu di atmosfer, yang kemudian membentuk awan.',
    points: 20,
  },
  {
    id: 'tka-q5',
    grade: 5,
    subjectType: 'Logika',
    question: 'Perhatikan pola bilangan berikut: 3, 7, 11, 15, ..., 23. Bilangan yang tepat untuk melengkapi pola titik-titik tersebut adalah...',
    options: ['17', '18', '19', '20'],
    correctAnswer: 2, // Pola bertambah 4: 15 + 4 = 19
    explanation: 'Setiap bilangan berikutnya ditambah 4 (+4). Maka setelah 15 adalah 15 + 4 = 19.',
    points: 20,
  },

  // Kelas 4
  {
    id: 'tka-q6',
    grade: 4,
    subjectType: 'Numerasi',
    question: 'Hasil dari 450 + 275 - 125 adalah...',
    options: ['600', '650', '580', '625'],
    correctAnswer: 0,
    explanation: '450 + 275 = 725. Kemudian 725 - 125 = 600.',
    points: 20,
  },
  {
    id: 'tka-q7',
    grade: 4,
    subjectType: 'Literasi',
    question: 'Kata "Inovasi" pada nama SIPID (Sistem Inovasi Pembelajaran Interaktif Digital) memiliki arti yang paling dekat dengan...',
    options: ['Pembaharuan atau penemuan hal baru yang lebih baik', 'Peniruan karya orang lain', 'Penulisan catatan lama', 'Perjalanan jarak jauh'],
    correctAnswer: 0,
    explanation: 'Inovasi berarti pemasukan atau pengenalan hal-hal yang baru, penemuan baru yang berbeda dari yang sudah ada untuk peningkatan kualitas.',
    points: 20,
  },
  {
    id: 'tka-q8',
    grade: 4,
    subjectType: 'Sains',
    question: 'Bagian tumbuhan yang berfungsi menyerap air dan unsur hara dari dalam tanah adalah...',
    options: ['Daun', 'Batang', 'Akar', 'Bunga'],
    correctAnswer: 2,
    explanation: 'Akar bertugas menancap ke tanah, menyerap air dan mineral yang diperlukan untuk proses fotosintesis.',
    points: 20,
  },

  // Kelas 6
  {
    id: 'tka-q9',
    grade: 6,
    subjectType: 'Numerasi',
    question: 'Sebuah lingkaran memiliki diameter 14 cm. Berapakah luas lingkaran tersebut? (Gunakan π = 22/7)',
    options: ['154 cm²', '308 cm²', '44 cm²', '88 cm²'],
    correctAnswer: 0, // r = 7 cm -> Luas = 22/7 * 7 * 7 = 154 cm²
    explanation: 'Jari-jari (r) = diameter / 2 = 14 / 2 = 7 cm. Luas = π x r² = (22/7) x 7 x 7 = 154 cm².',
    points: 20,
  },
  {
    id: 'tka-q10',
    grade: 6,
    subjectType: 'Logika',
    question: 'Semua siswa SD Negeri Mendongan rajin belajar. Budi adalah siswa SD Negeri Mendongan. Kesimpulan yang tepat adalah...',
    options: [
      'Budi tidak suka belajar',
      'Budi adalah anak yang rajin belajar',
      'Hanya Budi yang rajin belajar di sekolah',
      'Budi tidak bersekolah'
    ],
    correctAnswer: 1,
    explanation: 'Berdasarkan premis umum "Semua siswa SD Negeri Mendongan rajin belajar", dan Budi adalah salah satu siswanya, maka kesimpulan logisnya adalah Budi adalah anak yang rajin belajar.',
    points: 20,
  },
];
