import { MediaItem } from '../types/index.ts';

export const INITIAL_MEDIA: MediaItem[] = [
  // 1. DEMO ITEMS FROM REFERENCE IMAGE
  {
    id: 'materi-pencernaan-manusia',
    slug: 'sistem-pencernaan-manusia',
    title: 'Sistem Pencernaan Manusia',
    category: 'materi',
    grade: 5,
    subject: 'IPAS',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Pelajari alur dan fungsi organ pencernaan manusia mulai dari mulut, kerongkongan, lambung, usus halus, usus besar hingga anus disertai ilustrasi interaktif dan animasi penyerapan nutrisi.',
    learningObjectives: [
      'Mengidentifikasi organ-organ penyusun sistem pencernaan manusia.',
      'Menjelaskan proses pencernaan mekanik dan kimiawi dalam tubuh.',
      'Membiasakan pola makan bergizi seimbang untuk menjaga kesehatan organ pencernaan.'
    ],
    coverImage: '/assets/extracted/thumb-pencernaan.png',
    isDemo: true,
    fileType: 'PDF & Interaktif',
    fileSize: '4.8 MB',
    author: 'Tim Guru IPAS SD Negeri Mendongan',
    createdAt: '2026-03-15T08:00:00.000Z',
    downloadsCount: 342,
    viewsCount: 1250,
    tags: ['IPAS', 'Tubuh Manusia', 'Organ Pencernaan', 'Nutrisi', 'Kesehatan'],
    contentBody: `### Pengantar Sistem Pencernaan Manusia
Makanan yang kita makan setiap hari tidak bisa langsung diserap oleh tubuh dalam bentuk utuh. Tubuh kita membutuhkan **sistem pencernaan** untuk mengolah makanan menjadi partikel-partikel kecil kaya zat gizi yang siap diserap ke dalam aliran darah.

#### Alur Perjalanan Makanan di Tubuh Kita:
1. **Mulut**: Gigi memotong dan mengunyah makanan (pencernaan mekanik), sementara enzim ptialin pada air liur mencerna karbohidrat (pencernaan kimiawi).
2. **Kerongkongan (Esofagus)**: Saluran berotot yang mendorong makanan menuju lambung melalui gerakan peristaltik (gerakan meremas berirama).
3. **Lambung**: Kantong berotot tebal yang melumat makanan dengan bantuan asam lambung (HCl) dan enzim pepsin serta renin.
4. **Usus Halus**: Terdiri atas duodenum, jejenum, dan ileum. Di sinilah tempat sebagian besar nutrisi makanan diserap tubuh dengan bantuan getah empedu dan pankreas.
5. **Usus Besar**: Menyerap air dan garam mineral dari sisa-sisa makanan yang tidak tercerna, lalu membentuk feses.
6. **Anus**: Saluran pembuangan akhir sisa makanan keluar dari tubuh.

#### Tips Menjaga Pencernaan Sehat:
- Minum air putih minimal 8 gelas per hari.
- Mengonsumsi makanan berserat seperti sayur dan buah.
- Mengunyah makanan dengan perlahan sampai lumat.
- Membiasakan cuci tangan dengan sabun sebelum makan.`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'lkpd-bangun-datar',
    slug: 'lkpd-bangun-datar',
    title: 'LKPD Bangun Datar',
    category: 'lkpd',
    grade: 4,
    subject: 'Matematika',
    semester: 2,
    curriculum: 'Kurikulum Merdeka',
    description: 'Lembar kerja peserta didik untuk memahami sifat-sifat keliling dan luas bangun datar segitiga, persegi, dan persegi panjang lengkap dengan soal eksplorasi kontekstual.',
    learningObjectives: [
      'Menemukan rumus keliling dan luas bangun datar melalui aktivitas berpetak.',
      'Menyelesaikan permasalahan sehari-hari yang berkaitan dengan keliling bangun datar.',
      'Melatih ketelitian dan kolaborasi dalam kelompok belajar.'
    ],
    coverImage: '/assets/extracted/thumb-bangundatar.png',
    isDemo: true,
    fileType: 'PDF Cetak & Digital',
    fileSize: '2.4 MB',
    author: 'Ibu Ratna Dewi, S.Pd.',
    createdAt: '2026-03-20T09:30:00.000Z',
    downloadsCount: 289,
    viewsCount: 890,
    tags: ['Matematika', 'Geometri', 'Bangun Datar', 'Luas & Keliling', 'Fase B'],
    contentBody: `### Lembar Kerja Peserta Didik (LKPD) Matematika
**Materi Pokok**: Karakteristik dan Keliling Bangun Datar  
**Fase/Kelas**: B / Kelas 4 SD Negeri Mendongan  
**Alokasi Waktu**: 2 x 35 Menit  

#### Petunjuk Pengerjaan:
1. Bacalah basmalah atau doa sebelum memulai lembar kerja.
2. Tuliskan nama anggota kelompok pada kolom yang tersedia.
3. Siapkan penggaris, pensil warna, dan kertas berpetak.
4. Jawablah pertanyaan dengan teliti dan diskusikan bersama teman sekelompokmu.

#### Aktivitas Eksplorasi 1: Ubin Kelas Kita
- Hitunglah berapa banyak ubin persegi yang membentang di sisi panjang mejamu!
- Jika setiap sisi ubin berukuran 30 cm, berapakah keliling meja belajarmu?
- Tuliskan kesimpulan rumus keliling: **Keliling = 2 x (Panjang + Lebar)**.`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'media-interaktif-siklus-air',
    slug: 'simulasi-interaktif-siklus-air',
    title: 'Simulasi Interaktif Siklus Air',
    category: 'media-interaktif',
    grade: 4,
    subject: 'IPAS',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Media simulasi interaktif laboratorium alam digital tentang siklus hidrologi bumi. Atur intensitas matahari, amati uap air naik (evaporasi), pembentukan awan (kondensasi), hingga turun hujan (presipitasi).',
    learningObjectives: [
      'Menjelaskan tahapan utama dalam siklus air di bumi.',
      'Menganalisis pengaruh sinar matahari dan suhu udara terhadap pembentukan hujan.',
      'Mengembangkan kesadaran pentingnya menjaga kelestarian air bersih.'
    ],
    coverImage: '/assets/extracted/thumb-siklusair.png',
    isDemo: true,
    fileType: 'Simulasi Web HTML5',
    fileSize: 'Online',
    author: 'Laboratorium SIPID SD Negeri Mendongan',
    createdAt: '2026-03-18T11:15:00.000Z',
    downloadsCount: 512,
    viewsCount: 2100,
    tags: ['Simulasi Interaktif', 'IPAS', 'Siklus Air', 'Hidrologi', 'Fase B'],
    interactiveType: 'water-cycle-sim',
    contentBody: `Simulasi interaktif ini dapat dijalankan langsung di layar komputer, laptop, maupun tablet interaktif di kelas. Siswa dapat menekan tombol pengatur suhu dan kelembaban untuk melihat bagaimana air bergerak dari laut ke awan dan kembali ke darat.`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'game-tebak-gambar-pancaindra',
    slug: 'tebak-gambar-pancaindra',
    title: 'Tebak Gambar Pancaindra',
    category: 'game',
    grade: 3,
    subject: 'Bahasa Indonesia',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Game edukasi seru untuk melatih kemampuan mengenali fungsi dan nama pancaindra serta benda di sekitar kita melalui tebak visual, petunjuk gambar ceria, dan poin reward.',
    learningObjectives: [
      'Mengenal nama dan fungsi lima indra manusia dengan tepat.',
      'Meningkatkan perbendaharaan kosakata Bahasa Indonesia siswa.',
      'Menumbuhkan rasa antusiasme belajar mandiri melalui gamifikasi edukatif.'
    ],
    coverImage: '/assets/extracted/thumb-tebakgambar.png',
    isDemo: true,
    fileType: 'Game Interaktif Web',
    fileSize: 'Play in Browser',
    author: 'Tim Pengembang Game SIPID',
    createdAt: '2026-03-22T14:00:00.000Z',
    downloadsCount: 780,
    viewsCount: 3200,
    tags: ['Game Edukasi', 'Pancaindra', 'Bahasa Indonesia', 'Kelas 3', 'Interaktif'],
    contentBody: `Permainan tebak gambar ini dirancang khusus untuk peserta didik fase B. Terdapat visual menarik bertema tanah liat ceria (3D claymation), efek suara ceria, serta tantangan bertingkat.`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },

  // 2. ADDITIONAL MATERI PEMBELAJARAN
  {
    id: 'materi-pancasila-kelas-1',
    slug: 'mengenal-simbol-pancasila',
    title: 'Mengenal Simbol-Simbol Pancasila',
    category: 'materi',
    grade: 1,
    subject: 'Pendidikan Pancasila',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Materi mengenal lima simbol dalam Garuda Pancasila dengan cerita bergambar, lagu anak, dan contoh penerapan sederhana dalam kehidupan keluarga dan sekolah.',
    learningObjectives: [
      'Menyebutkan lambang lima sila Pancasila dengan urutan yang benar.',
      'Memberikan contoh sikap saling menghormati di rumah dan di kelas.'
    ],
    coverImage: '/assets/extracted/hero-chibi.png',
    isDemo: false,
    fileType: 'PDF & Presentasi',
    fileSize: '3.1 MB',
    author: 'Bapak Ahmad Fauzi, S.Pd.SD',
    createdAt: '2026-02-10T08:00:00.000Z',
    downloadsCount: 195,
    viewsCount: 640,
    tags: ['Pancasila', 'Kelas 1', 'Karakter', 'Kewarganegaraan'],
    contentBody: `Pancasila adalah dasar negara kita Indonesia. Burung Garuda memiliki perisai di dadanya yang memuat 5 simbol suci: Bintang Emas, Rantai Emas, Pohon Beringin, Kepala Banteng, serta Padi dan Kapas.`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'materi-fotosintesis-kelas-4',
    slug: 'keajaiban-fotosintesis-pada-tumbuhan',
    title: 'Keajaiban Fotosintesis pada Tumbuhan',
    category: 'materi',
    grade: 4,
    subject: 'IPAS',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Materi menyelami bagaimana daun hijau memasak makanannya sendiri menggunakan bantuan cahaya matahari, air dari tanah, dan karbon dioksida di udara.',
    learningObjectives: [
      'Menjelaskan kebutuhan tumbuhan untuk melakukan fotosintesis.',
      'Menjelaskan hasil proses fotosintesis bagi makhluk hidup lain di bumi.'
    ],
    coverImage: '/assets/extracted/cta-banner.png',
    isDemo: false,
    fileType: 'PDF & Modul Interaktif',
    fileSize: '4.2 MB',
    author: 'Ibu Siti Nurhaliza, M.Pd.',
    createdAt: '2026-01-28T10:00:00.000Z',
    downloadsCount: 310,
    viewsCount: 1140,
    tags: ['IPAS', 'Fotosintesis', 'Tumbuhan', 'Sains SD'],
    contentBody: `Tumbuhan adalah produsen utama di bumi. Melalui zat hijau daun (klorofil), tumbuhan menangkap sinar matahari lalu mengubah air dan karbon dioksida menjadi glukosa (makanan) serta oksigen bersih untuk kita hirup!`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'materi-pecahan-kelas-3',
    slug: 'mengenal-pecahan-sederhana-dengan-pizza',
    title: 'Mengenal Pecahan Sederhana Bersama Kue Pizza',
    category: 'materi',
    grade: 3,
    subject: 'Matematika',
    semester: 2,
    curriculum: 'Kurikulum Merdeka',
    description: 'Belajar konsep pecahan 1/2, 1/3, 1/4 secara visual dan kontekstual menggunakan ilustrasi potongan makanan lezat yang dekat dengan keseharian anak.',
    learningObjectives: [
      'Mengenal pembilang dan penyebut pada bilangan pecahan sederhana.',
      'Menyajikan nilai pecahan menggunakan benda konkret dan gambar berpetak.'
    ],
    coverImage: '/assets/extracted/hero-chibi.png',
    isDemo: false,
    fileType: 'PDF & Animasi',
    fileSize: '3.6 MB',
    author: 'Bapak Hendra Pratama, S.Pd.',
    createdAt: '2026-02-14T07:30:00.000Z',
    downloadsCount: 220,
    viewsCount: 780,
    tags: ['Matematika', 'Pecahan', 'Kelas 3', 'Konseptual'],
    contentBody: `Jika 1 loyang pizza dipotong menjadi 4 bagian yang sama besar, maka tiap 1 potong memiliki nilai 1/4 (satu per empat). Angka 1 di atas disebut pembilang, angka 4 di bawah disebut penyebut!`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'materi-siklus-hidup-hewan-kelas-2',
    slug: 'metamorfosis-dan-siklus-hidup-kupu-kupu',
    title: 'Siklus Hidup Kupu-kupu dan Katak',
    category: 'materi',
    grade: 2,
    subject: 'IPAS',
    semester: 2,
    curriculum: 'Kurikulum Merdeka',
    description: 'Cerita bergambar siklus hidup hewan dari telur, ulat, kepompong, hingga menjadi kupu-kupu yang cantik dan terbang bebas.',
    learningObjectives: [
      'Mengurutkan tahapan metamorfosis sempurna pada kupu-kupu.',
      'Membandingkan siklus hidup kupu-kupu dengan hewan tanpa metamorfosis.'
    ],
    coverImage: '/assets/extracted/cta-banner.png',
    isDemo: false,
    fileType: 'PDF',
    fileSize: '2.9 MB',
    author: 'Ibu Dewi Sartika, S.Pd.',
    createdAt: '2026-03-05T09:00:00.000Z',
    downloadsCount: 165,
    viewsCount: 520,
    tags: ['IPAS', 'Siklus Hidup', 'Kupu-kupu', 'Fase A'],
    contentBody: `Dari telur kecil di atas daun, keluarlah ulat yang suka makan dedaunan segar. Setelah kenyang, ulat membungkus dirinya menjadi kepompong yang diam tenang, lalu bermetamorfosis menjadi kupu-kupu menawan!`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'materi-keberagaman-budaya-kelas-6',
    slug: 'indonesia-kaya-keberagaman-budaya-nusantara',
    title: 'Indonesia Kaya: Keberagaman Budaya Nusantara',
    category: 'materi',
    grade: 6,
    subject: 'IPAS',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Eksplorasi rumah adat, pakaian tradisional, tarian daerah, dan alat musik khas dari 38 provinsi di Indonesia yang menakjubkan.',
    learningObjectives: [
      'Menghargai keragaman suku bangsa, bahasa daerah, dan tradisi lokal.',
      'Mengembangkan rasa bangga sebagai bagian dari bangsa Indonesia.'
    ],
    coverImage: '/assets/extracted/hero-banner.png',
    isDemo: false,
    fileType: 'PDF & Video',
    fileSize: '6.5 MB',
    author: 'Tim Budaya SD Negeri Mendongan',
    createdAt: '2026-01-18T10:15:00.000Z',
    downloadsCount: 420,
    viewsCount: 1390,
    tags: ['Budaya Nusantara', 'Kelas 6', 'IPAS', 'Kebinekaan'],
    contentBody: `Bhinneka Tunggal Ika: Berbeda-beda tetapi tetap satu jua. Keragaman budaya adalah kekayaan terbesar bangsa Indonesia yang wajib kita lestarikan bersama penuh kehangatan dan toleransi.`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },

  // 3. ADDITIONAL LKPD ITEMS
  {
    id: 'lkpd-wujud-benda-kelas-2',
    slug: 'lkpd-percobaan-wujud-benda-padat-cair-gas',
    title: 'LKPD Percobaan Wujud Zat di Sekitar Kita',
    category: 'lkpd',
    grade: 2,
    subject: 'IPAS',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Lembar kerja observasi sederhana untuk mengamati perubahan wujud es batu yang mencair dan air yang menguap dengan bimbingan guru dan orang tua.',
    learningObjectives: [
      'Mengelompokkan benda berdasarkan sifat fisik wujud padat, cair, dan gas.',
      'Melakukan percobaan sederhana dengan aman dan mencatat hasilnya di tabel.'
    ],
    coverImage: '/assets/extracted/thumb-bangundatar.png',
    isDemo: false,
    fileType: 'PDF Cetak',
    fileSize: '1.8 MB',
    author: 'Bapak Budi Santoso, S.Pd.',
    createdAt: '2026-02-22T08:45:00.000Z',
    downloadsCount: 145,
    viewsCount: 430,
    tags: ['LKPD', 'Sains', 'Wujud Zat', 'Kelas 2'],
    contentBody: `Ambillah es batu lalu letakkan di atas piring di bawah terik matahari. Amati apa yang terjadi setelah 15 menit dan tuliskan hasil pengamatanmu pada tabel LKPD ini!`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'lkpd-operasi-hitung-kelas-5',
    slug: 'lkpd-operasi-hitung-bilangan-bulat-desimal',
    title: 'LKPD Operasi Penjumlahan dan Pengurangan Desimal',
    category: 'lkpd',
    grade: 5,
    subject: 'Matematika',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Latihan soal berstruktur berbasis kasus belanja di kantin sekolah sehat SD Negeri Mendongan untuk mengasah ketelitian menghitung uang kembalian.',
    learningObjectives: [
      'Menjumlahkan dan mengurangkan pecahan desimal hingga dua angka di belakang koma.',
      'Memecahkan masalah kontekstual keuangan sehari-hari.'
    ],
    coverImage: '/assets/extracted/thumb-bangundatar.png',
    isDemo: false,
    fileType: 'PDF',
    fileSize: '2.1 MB',
    author: 'Ibu Sri Wahyuni, M.Pd.',
    createdAt: '2026-03-02T13:20:00.000Z',
    downloadsCount: 230,
    viewsCount: 710,
    tags: ['Matematika', 'Desimal', 'Kelas 5', 'Latihan Soal'],
    contentBody: `Ayo bantu kasir kantin sehat SD Negeri Mendongan menghitung total pembelian buah pisang seharga Rp 2.500 dan susu kotak Rp 4.750. Berapa uang yang harus dibayar?`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'lkpd-tata-surya-kelas-6',
    slug: 'lkpd-eksplorasi-planet-dalam-tata-surya',
    title: 'LKPD Menjelajah Planet-Planet di Tata Surya',
    category: 'lkpd',
    grade: 6,
    subject: 'IPAS',
    semester: 2,
    curriculum: 'Kurikulum Merdeka',
    description: 'Lembar kerja menganalisis urutan planet dari matahari, karakteristik planet dalam dan luar, serta orbit revolusi planet.',
    learningObjectives: [
      'Menyusun urutan 8 planet dari yang terdekat hingga terjauh dari matahari.',
      'Membandingkan ciri-ciri planet bumi dengan planet lainnya di tata surya.'
    ],
    coverImage: '/assets/extracted/thumb-bangundatar.png',
    isDemo: false,
    fileType: 'PDF Digital',
    fileSize: '2.7 MB',
    author: 'Bapak Tri Wibowo, S.Pd.',
    createdAt: '2026-02-18T10:00:00.000Z',
    downloadsCount: 310,
    viewsCount: 920,
    tags: ['Tata Surya', 'Antariksa', 'IPAS', 'Kelas 6'],
    contentBody: `Lengkapilah tabel identitas planet berikut dengan nama, diameter perkiraan, satelit alami, dan keunikan warna permukaannya!`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },

  // 4. ADDITIONAL MEDIA INTERAKTIF
  {
    id: 'media-interaktif-tata-surya',
    slug: 'laboratorium-virtual-tata-surya',
    title: 'Laboratorium Virtual Tata Surya',
    category: 'media-interaktif',
    grade: 6,
    subject: 'IPAS',
    semester: 2,
    curriculum: 'Kurikulum Merdeka',
    description: 'Eksplorasi interaktif 8 planet mengelilingi matahari. Klik tiap planet untuk melihat diameter, suhu rata-rata, jarak orbit, serta perbandingan ukuran.',
    learningObjectives: [
      'Memahami sistem gerak rotasi dan revolusi planet di tata surya.',
      'Mengetahui urutan planet: Merkurius, Venus, Bumi, Mars, Yupiter, Saturnus, Uranus, Neptunus.'
    ],
    coverImage: '/assets/extracted/thumb-siklusair.png',
    isDemo: false,
    fileType: 'Simulasi Web Canvas',
    fileSize: 'Online',
    author: 'Tim Media Digital SIPID',
    createdAt: '2026-03-12T15:00:00.000Z',
    downloadsCount: 440,
    viewsCount: 1650,
    tags: ['Simulasi Interaktif', 'Tata Surya', 'Kelas 6', 'Fisika & Antariksa'],
    interactiveType: 'solar-system-sim',
    contentBody: `Media interaktif ini menampilkan animasi orbital real-time. Siswa dapat mengatur kecepatan putaran revolusi dan mengklik planet untuk membuka kartu fakta sains.`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'media-interaktif-timbangan-ajaib',
    slug: 'neraca-timbangan-matematika-ajaib',
    title: 'Neraca Timbangan Matematika Ajaib',
    category: 'media-interaktif',
    grade: 1,
    subject: 'Matematika',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Media simulasi neraca seimbang interaktif untuk membantu siswa kelas 1 dan 2 memahami konsep kesetaraan bilangan (penjumlahan dan pengurangan) secara visual.',
    learningObjectives: [
      'Mengenal konsep lebih berat, lebih ringan, dan sama berat.',
      'Menyeimbangkan dua sisi timbangan dengan memadukan angka.'
    ],
    coverImage: '/assets/extracted/thumb-siklusair.png',
    isDemo: false,
    fileType: 'Simulasi Interaktif Web',
    fileSize: 'Online',
    author: 'Ibu Lilis Suryani, S.Pd.',
    createdAt: '2026-03-08T11:00:00.000Z',
    downloadsCount: 380,
    viewsCount: 1420,
    tags: ['Matematika', 'Timbangan', 'Interaktif', 'Kelas 1'],
    interactiveType: 'balance-scale-sim',
    contentBody: `Tarik dan letakkan beban buah apel dan jeruk ke atas piring timbangan. Perhatikan jarum timbangan yang bergoyang hingga seimbang!`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },

  // 5. ADDITIONAL GAMES (REAL PLAYABLE!)
  {
    id: 'game-kuis-cerdas-cermat',
    slug: 'kuis-cerdas-cermat-sains-matematika',
    title: 'Kuis Cerdas Cermat Juara Kelas',
    category: 'game',
    grade: 5,
    subject: 'IPAS & Matematika',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Game kuis pilihan ganda berwaktu dengan scoring instan, efek suara ceria, animasi confetti, dan peringkat bintang untuk menguji ketangkasan berpikir.',
    learningObjectives: [
      'Mengasah daya ingat terhadap materi IPAS dan logika matematika.',
      'Melatih kecepatan dan ketepatan pengambilan keputusan anak.'
    ],
    coverImage: '/assets/extracted/thumb-tebakgambar.png',
    isDemo: false,
    fileType: 'Game Kuis Web',
    fileSize: 'Play in Browser',
    author: 'Tim SIPID Game Lab',
    createdAt: '2026-03-10T13:30:00.000Z',
    downloadsCount: 650,
    viewsCount: 2800,
    tags: ['Game Kuis', 'Cerdas Cermat', 'Kelas 5', 'Skor & Bintang'],
    contentBody: `Jawab 5 soal pilihan ganda sebelum waktu habis. Kumpulkan poin setinggi-tingginya dan dapatkan 3 bintang emas juara!`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'game-benar-atau-salah',
    slug: 'tantangan-benar-atau-salah-alam',
    title: 'Tantangan Benar atau Salah: Misteri Alam Semesta',
    category: 'game',
    grade: 4,
    subject: 'IPAS',
    semester: 2,
    curriculum: 'Kurikulum Merdeka',
    description: 'Game aksi cepat memutuskan fakta: apakah pernyataan tentang hewan, tumbuhan, dan bumi itu BENAR atau SALAH. Raih streak combo dan suara sorak!',
    learningObjectives: [
      'Membedakan mitos dan fakta ilmiah dalam ilmu pengetahuan alam.',
      'Melatih konsentrasi dan respon kognitif siswa.'
    ],
    coverImage: '/assets/extracted/thumb-tebakgambar.png',
    isDemo: false,
    fileType: 'Game Aksi Cepat',
    fileSize: 'Play in Browser',
    author: 'Tim SIPID Game Lab',
    createdAt: '2026-03-14T16:00:00.000Z',
    downloadsCount: 520,
    viewsCount: 2150,
    tags: ['Benar atau Salah', 'Game Cepat', 'IPAS', 'Sains Seru'],
    contentBody: `Tekan tombol HIJAU (Benar) atau tombol MERAH (Salah) sebelum waktu habis. Jaga combo streak agar skor bertambah berlipat ganda!`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },

  // 6. PERANGKAT AJAR GURU
  {
    id: 'perangkat-modul-ajar-ipas-k5',
    slug: 'modul-ajar-ipas-kelas-5-fase-c-lengkap',
    title: 'Modul Ajar IPAS Kelas 5 Fase C: Bagaimana Bernapas & Mencerna',
    category: 'perangkat-ajar',
    grade: 5,
    subject: 'IPAS',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Perangkat modul ajar lengkap siap pakai berisi identitas, capaian pembelajaran (CP), alur tujuan pembelajaran (ATP), langkah pembelajaran berdiferensiasi, lembar asesmen formatif-sumatif, dan lampiran materi.',
    learningObjectives: [
      'Menyediakan panduan terstruktur bagi pendidik dalam memfasilitasi pembelajaran bermakna.',
      'Memenuhi standar Kurikulum Merdeka Kemendikbudristek.'
    ],
    coverImage: '/assets/extracted/hero-banner.png',
    isDemo: false,
    fileType: 'DOCX & PDF',
    fileSize: '1.2 MB',
    author: 'Tim Kurikulum SD Negeri Mendongan',
    createdAt: '2026-01-05T08:00:00.000Z',
    downloadsCount: 620,
    viewsCount: 1980,
    tags: ['Modul Ajar', 'Fase C', 'IPAS', 'Perangkat Guru', 'Kurikulum Merdeka'],
    perangkatType: 'Modul Ajar',
    contentBody: `### Dokumen Perangkat Ajar Guru: Modul Ajar IPAS Fase C
**Sekolah**: SD Negeri Mendongan  
**Tahun Pelajaran**: 2025/2026  
**Fase / Kelas**: Fase C / Kelas 5  
**Mata Pelajaran**: Ilmu Pengetahuan Alam dan Sosial (IPAS)  
**Alokasi Waktu**: 6 Pertemuan (18 Jam Pelajaran)  

#### Komponen Utama Modul Ajar:
1. **Identitas Modul**: Informasi umum penyusun, institusi, target peserta didik, model pembelajaran (PBL - Problem Based Learning).
2. **Kompetensi Awal**: Siswa telah mengenal nama-nama organ tubuh bagian luar.
3. **Profil Pelajar Pancasila**: Beriman dan bertakwa, bernalar kritis, mandiri, dan bergotong royong.
4. **Sarana & Prasarana**: LCD Proyektor, Video Pembelajaran SIPID, torso manusia, LKPD cetak.
5. **Rencana Asesmen**: Asesmen diagnostik non-kognitif, asesmen formatif unjuk kerja, dan asesmen sumatif akhir bab.`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'perangkat-atp-matematika-k4',
    slug: 'alur-tujuan-pembelajaran-atp-matematika-kelas-4',
    title: 'Alur Tujuan Pembelajaran (ATP) Matematika Kelas 4 Fase B',
    category: 'perangkat-ajar',
    grade: 4,
    subject: 'Matematika',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Pemetaan capaian pembelajaran menjadi alur tujuan berjenjang dari domain bilangan, aljabar, pengukuran, geometri, hingga analisis data selama dua semester.',
    learningObjectives: [
      'Memetakan urutan logis pengajaran matematika fase B per semester.',
      'Memudahkan guru dalam menyusun asesmen diagnostik dan penilaian sumatif.'
    ],
    coverImage: '/assets/extracted/hero-banner.png',
    isDemo: false,
    fileType: 'DOCX & XLSX',
    fileSize: '850 KB',
    author: 'Kelompok Kerja Guru (KKG) Matematika',
    createdAt: '2026-01-08T09:15:00.000Z',
    downloadsCount: 490,
    viewsCount: 1350,
    tags: ['ATP', 'Matematika', 'Kelas 4', 'Administrasi Guru'],
    perangkatType: 'ATP',
    contentBody: `ATP Matematika Fase B SD Negeri Mendongan dirancang secara sistematis dengan pendekatan scaffolding dan pembelajaran bermakna (meaningful learning).`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'perangkat-prota-promes-k1-k6',
    slug: 'program-tahunan-prota-program-semester-promes-lengkap',
    title: 'Program Tahunan (Prota) & Program Semester (Promes) SD Negeri Mendongan',
    category: 'perangkat-ajar',
    grade: 1,
    subject: 'Semua Mata Pelajaran',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Kalender pendidikan akademik, alokasi jam efektif mengajar, jadwal asesmen tengah semester (STS), dan asesmen akhir semester (SAS) SD Negeri Mendongan.',
    learningObjectives: [
      'Menjadi pedoman pembagian waktu pembelajaran kurikuler dan P5 selama satu tahun ajaran.'
    ],
    coverImage: '/assets/extracted/hero-banner.png',
    isDemo: false,
    fileType: 'DOCX & XLSX',
    fileSize: '1.5 MB',
    author: 'Wakasek Bidang Kurikulum',
    createdAt: '2026-01-02T07:45:00.000Z',
    downloadsCount: 710,
    viewsCount: 2240,
    tags: ['Prota', 'Promes', 'Kalender Pendidikan', 'Administrasi Kelas'],
    perangkatType: 'Program Tahunan',
    contentBody: `Format program tahunan dan semester telah disesuaikan dengan kalender pendidikan Dinas Pendidikan setempat serta jadwal kegiatan ekstrakurikuler sekolah.`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'perangkat-rubrik-penilaian-sikap',
    slug: 'rubrik-penilaian-asesmen-sikap-profil-pelajar-pancasila',
    title: 'Instrumen & Rubrik Penilaian Sikap Pelajar Pancasila',
    category: 'perangkat-ajar',
    grade: 3,
    subject: 'Pendidikan Karakter',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Lembar observasi jurnal harian guru, kriteria ketercapaian tujuan pembelajaran (KKTP), dan panduan pelaporan rapor perkembangan dimensi profil pelajar pancasila.',
    learningObjectives: [
      'Membimbing guru dalam mengamati dan mencatat perkembangan karakter budi pekerti siswa secara objektif.'
    ],
    coverImage: '/assets/extracted/hero-banner.png',
    isDemo: false,
    fileType: 'PDF & DOCX',
    fileSize: '950 KB',
    author: 'Tim Bimbingan & Konseling Sekolah',
    createdAt: '2026-01-12T11:00:00.000Z',
    downloadsCount: 380,
    viewsCount: 1120,
    tags: ['Rubrik Penilaian', 'P5', 'Karakter', 'Asesmen'],
    perangkatType: 'Rubrik Penilaian',
    contentBody: `Instrumen penilaian mencakup 6 dimensi utama: Beriman & Bertakwa, Berkebinekaan Global, Bergotong Royong, Mandiri, Bernalar Kritis, dan Kreatif.`,
    externalUrl: 'https://drive.google.com',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: 'tka-numerasi-logika-kelas-5',
    slug: 'tka-numerasi-logika-matematika-kelas-5',
    title: 'Paket Tryout TKA Numerasi & Logika Berhitung Kelas 5',
    category: 'tka',
    grade: 5,
    subject: 'Matematika & Numerasi',
    semester: 2,
    curriculum: 'Kurikulum Merdeka',
    description: 'Paket latihan dan simulasi Tes Kemampuan Akademik (TKA) fokus bidang numerasi, pecahan, perbandingan, dan penalaran logika kontekstual siswa kelas 5 SD Negeri Mendongan.',
    learningObjectives: [
      'Mengukur kemampuan penalaran matematis dalam menyelesaikan masalah sehari-hari.',
      'Melatih kecepatan dan ketepatan berhitung berbasis soal cerita.',
      'Membiasakan siswa dengan tipe soal standar asesmen kompetensi nasional.'
    ],
    coverImage: '/assets/extracted/thumb-bangundatar.png',
    isDemo: false,
    fileType: 'Simulasi & PDF',
    fileSize: '3.2 MB',
    author: 'Tim Asesmen SD Negeri Mendongan',
    createdAt: '2026-03-20T08:00:00.000Z',
    downloadsCount: 412,
    viewsCount: 1650,
    tags: ['TKA', 'Numerasi', 'Matematika', 'Asesmen', 'Kelas 5', 'Tryout'],
    contentBody: `Paket soal TKA Numerasi Kelas 5 ini disusun untuk menguji kecakapan berpikir matematis tingkat tinggi (HOTS). Dilengkapi kunci jawaban dan pembahasan rinci untuk setiap butir soal.`,
    externalUrl: 'https://drive.google.com',
    links: [
      {
        id: 'tka-link-1',
        title: 'Bank Soal Tryout TKA Numerasi (Google Drive)',
        url: 'https://drive.google.com',
        platform: 'drive'
      },
      {
        id: 'tka-link-2',
        title: 'Video Panduan Pembahasan Soal Numerasi (YouTube)',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        platform: 'youtube'
      }
    ]
  },
  {
    id: 'tka-literasi-bahasa-kelas-4',
    slug: 'tka-literasi-membaca-pemahaman-teks-kelas-4',
    title: 'Paket Uji TKA Literasi Membaca & Pemahaman Teks Kelas 4',
    category: 'tka',
    grade: 4,
    subject: 'Bahasa Indonesia & Literasi',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Instrumen tes kemampuan literasi membaca, menemukan informasi tersurat dan tersirat, serta interpretasi teks cerita rakyat dan teks eksplanasi ilmiah.',
    learningObjectives: [
      'Menilai kemampuan membaca intensif dan memahami gagasan utama paragraf.',
      'Mengembangkan daya kritis siswa dalam menanggapi isi bacaan sastra dan informasional.'
    ],
    coverImage: '/assets/extracted/thumb-pencernaan.png',
    isDemo: false,
    fileType: 'Simulasi & PDF',
    fileSize: '2.8 MB',
    author: 'Guru Bahasa Indonesia SDN Mendongan',
    createdAt: '2026-03-22T09:00:00.000Z',
    downloadsCount: 389,
    viewsCount: 1420,
    tags: ['TKA', 'Literasi', 'Membaca', 'Bahasa Indonesia', 'Kelas 4'],
    contentBody: `Instrumen asesmen literasi membaca dirancang menggunakan teks bacaan ramah anak yang menumbuhkan minat membaca dan kecintaan pada budaya lokal Sumowono.`,
    externalUrl: 'https://drive.google.com',
    links: [
      {
        id: 'tka-lit-1',
        title: 'Modul PDF Soal Literasi Membaca',
        url: 'https://drive.google.com',
        platform: 'drive'
      }
    ]
  },
  {
    id: 'tka-sains-penalaran-ipas-kelas-6',
    slug: 'tka-sains-penalaran-ipas-persiapan-kelulusan-kelas-6',
    title: 'TKA Sains & Penalaran IPAS Persiapan Asesmen Akhir Kelas 6',
    category: 'tka',
    grade: 6,
    subject: 'IPAS & Sains Terpadu',
    semester: 2,
    curriculum: 'Kurikulum Merdeka',
    description: 'Tryout komprehensif sains untuk siswa kelas 6 SD Negeri Mendongan mencakup materi ekosistem, energi terbarukan, magnet, dan tata surya.',
    learningObjectives: [
      'Menyiapkan kesiapan mental dan akademis siswa menghadapi asesmen standarisasi kelulusan.',
      'Menguji penalaran ilmiah berbasis eksperimen sederhana.'
    ],
    coverImage: '/assets/extracted/thumb-siklusair.png',
    isDemo: true,
    fileType: 'Simulasi & Dokumen',
    fileSize: '4.5 MB',
    author: 'Tim Guru Kelas 6 SDN Mendongan',
    createdAt: '2026-03-25T10:00:00.000Z',
    downloadsCount: 520,
    viewsCount: 1980,
    tags: ['TKA', 'IPAS', 'Sains', 'Kelas 6', 'Tryout Kelulusan'],
    contentBody: `Bank soal tryout memadukan soal pilihan ganda kompleks, menjodohkan, dan uraian singkat berbasis pemecahan masalah lingkungan hidup.`,
    externalUrl: 'https://drive.google.com'
  },
  {
    id: 'tka-diagnostik-dasar-kelas-2',
    slug: 'tka-asesmen-diagnostik-kemampuan-dasar-kelas-2',
    title: 'TKA Asesmen Diagnostik Kemampuan Dasar Kelas 2',
    category: 'tka',
    grade: 2,
    subject: 'Tematik & Calistung',
    semester: 1,
    curriculum: 'Kurikulum Merdeka',
    description: 'Alat ukur diagnostik awal untuk memetakan capaian membaca lancar, menulis kalimat sederhana, dan konsep penjumlahan-pengurangan dasar.',
    learningObjectives: [
      'Memetakan kesiapan belajar peserta didik fase A kelas 2 SD.',
      'Memberikan rekomendasi intervensi bimbingan belajar remedial bagi siswa yang membutuhkan.'
    ],
    coverImage: '/assets/extracted/thumb-tebakgambar.png',
    isDemo: false,
    fileType: 'Lembar Asesmen',
    fileSize: '1.9 MB',
    author: 'Guru Kelas 2 SD Negeri Mendongan',
    createdAt: '2026-03-28T11:00:00.000Z',
    downloadsCount: 260,
    viewsCount: 890,
    tags: ['TKA', 'Diagnostik', 'Fase A', 'Kelas 2', 'Calistung'],
    contentBody: `Instrumen ini digunakan guru pada awal semester untuk mengetahui tingkat penguasaan kompetensi dasar setiap murid secara personal.`,
    externalUrl: 'https://drive.google.com'
  }
];

export const INITIAL_SETTINGS = {
  schoolName: 'SD Negeri Mendongan',
  portalName: 'SIPID',
  slogan: 'Berinovasi, Berinteraksi, Menginspirasi.',
  address: 'Desa Mendongan, Kecamatan Sumowono, Kab. Semarang',
  phone: '',
  email: 'mendongansdn@gmail.com',
  academicYear: '2025/2026',
  aboutText: 'Sistem Inovasi Pembelajaran Interaktif Digital (SIPID) SD Negeri Mendongan merupakan portal belajar terpadu yang memadukan teknologi pembelajaran interaktif, gamifikasi dan perangkat kurikulum merdeka.',
  youtubeUrl: 'https://www.youtube.com/@sdnegerimendongan9981',
  instagramUrl: 'https://www.instagram.com/sdnmendongan/',
  tiktokUrl: 'https://www.tiktok.com/@sdnmendongan',
};
