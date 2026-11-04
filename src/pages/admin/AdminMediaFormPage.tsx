import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Sparkles, CheckCircle2, Link as LinkIcon, Image as ImageIcon, Upload } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout.tsx';
import { useMedia } from '../../context/MediaContext.tsx';
import { MediaCategory, GradeLevel, PerangkatSubcategory, MediaItem, MediaLink, SUBJECT_OPTIONS, FILE_TYPE_OPTIONS } from '../../types/index.ts';

interface AdminMediaFormPageProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  editId?: string;
}

export const AdminMediaFormPage: React.FC<AdminMediaFormPageProps> = ({
  currentPath,
  onNavigate,
  editId,
}) => {
  const { items, addMediaItem, updateMediaItem, getItemById } = useMedia();

  const isEditing = !!editId;
  const existingItem = editId ? getItemById(editId) : undefined;

  const [formData, setFormData] = useState({
    title: existingItem?.title || '',
    category: (existingItem?.category || 'materi') as MediaCategory,
    grade: (existingItem?.grade || 4) as GradeLevel,
    subject: existingItem?.subject || 'Matematika',
    semester: (existingItem?.semester || 1) as 1 | 2,
    curriculum: (existingItem?.curriculum || 'Kurikulum Merdeka') as 'Kurikulum Merdeka' | 'Kurikulum 2013',
    description: existingItem?.description || '',
    learningObjectivesStr: existingItem?.learningObjectives?.join('\n') || '',
    author: existingItem?.author || 'Guru SD Negeri Mendongan',
    fileType: existingItem?.fileType || 'PDF',
    fileSize: existingItem?.fileSize || '2.5 MB',
    isDemo: existingItem ? existingItem.isDemo : false,
    perangkatType: (existingItem?.perangkatType || 'Modul Ajar') as PerangkatSubcategory,
    externalUrl: existingItem?.externalUrl || '',
    links: (existingItem?.links || []) as MediaLink[],
    coverImage: existingItem?.coverImage || '/assets/extracted/thumb-pencernaan.png',
  });

  const [isCustomSubject, setIsCustomSubject] = useState(
    existingItem?.subject ? !(SUBJECT_OPTIONS as readonly string[]).includes(existingItem.subject) : false
  );

  const [isCustomFileType, setIsCustomFileType] = useState(
    existingItem?.fileType ? !(FILE_TYPE_OPTIONS as readonly string[]).includes(existingItem.fileType) : false
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (existingItem) {
      setIsCustomSubject(!(SUBJECT_OPTIONS as readonly string[]).includes(existingItem.subject));
      setIsCustomFileType(!(FILE_TYPE_OPTIONS as readonly string[]).includes(existingItem.fileType));
      setFormData({
        title: existingItem.title,
        category: existingItem.category,
        grade: existingItem.grade,
        subject: existingItem.subject,
        semester: existingItem.semester,
        curriculum: existingItem.curriculum,
        description: existingItem.description,
        learningObjectivesStr: existingItem.learningObjectives.join('\n'),
        author: existingItem.author,
        fileType: existingItem.fileType,
        fileSize: existingItem.fileSize || '2.5 MB',
        isDemo: existingItem.isDemo,
        perangkatType: existingItem.perangkatType || 'Modul Ajar',
        externalUrl: existingItem.externalUrl || '',
        links: existingItem.links || [],
        coverImage: existingItem.coverImage || '/assets/extracted/thumb-pencernaan.png',
      });
    }
  }, [existingItem]);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({ ...prev, coverImage: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const objectives = formData.learningObjectivesStr
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const itemPayload = {
      title: formData.title,
      slug: slug || `media-${Date.now()}`,
      category: formData.category,
      grade: Number(formData.grade) as GradeLevel,
      subject: formData.subject,
      semester: Number(formData.semester) as 1 | 2,
      curriculum: formData.curriculum,
      description: formData.description,
      learningObjectives: objectives,
      author: formData.author,
      fileType: formData.fileType,
      fileSize: formData.fileSize,
      isDemo: formData.isDemo,
      perangkatType: formData.category === 'perangkat-ajar' ? formData.perangkatType : undefined,
      externalUrl: formData.externalUrl.trim() || undefined,
      links: formData.links,
      coverImage: formData.coverImage.trim() || '/assets/extracted/thumb-pencernaan.png',
      tags: [formData.subject, `Kelas ${formData.grade}`, formData.curriculum],
    };

    if (isEditing && editId) {
      updateMediaItem(editId, itemPayload);
    } else {
      addMediaItem(itemPayload);
    }

    setSavedSuccess(true);
    setTimeout(() => {
      onNavigate('/admin/media');
    }, 1200);
  };

  return (
    <AdminLayout
      currentPath={currentPath}
      onNavigate={onNavigate}
      title={isEditing ? 'Edit Konten Media' : 'Tambah Konten Baru'}
      subtitle="Isi formulir data materi, LKPD, media interaktif, game, atau perangkat ajar."
    >
      <div className="max-w-4xl mx-auto space-y-6">
        
        <button
          onClick={() => onNavigate('/admin/media')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#1264C0] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Media</span>
        </button>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs font-bold text-emerald-800 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Berhasil menyimpan data media pembelajaran! Mengalihkan ke daftar media...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          
          {/* Main Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700">Judul Media Pembelajaran *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Contoh: Mengenal Bagian Tubuh Tumbuhan"
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1264C0] focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Kategori Utama *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1264C0] focus:outline-hidden"
              >
                <option value="materi">Materi Pembelajaran</option>
                <option value="lkpd">LKPD</option>
                <option value="media-interaktif">Media Interaktif</option>
                <option value="game">Game Edukasi</option>
                <option value="perangkat-ajar">Perangkat Ajar</option>
                <option value="tka">TKA (Tes Kemampuan Akademik)</option>
              </select>
            </div>
          </div>

          {/* Subcategory for Perangkat Ajar if active */}
          {formData.category === 'perangkat-ajar' && (
            <div className="space-y-1 p-3 bg-rose-50 rounded-2xl border border-rose-100">
              <label className="text-xs font-bold text-rose-900">Jenis Perangkat Ajar *</label>
              <select
                value={formData.perangkatType}
                onChange={(e) => setFormData({ ...formData, perangkatType: e.target.value as any })}
                className="w-full p-2 text-xs bg-white border border-rose-200 rounded-xl text-slate-800"
              >
                <option value="Modul Ajar">Modul Ajar</option>
                <option value="RPP">RPP / Rencana Pembelajaran</option>
                <option value="ATP">ATP (Alur Tujuan Pembelajaran)</option>
                <option value="CP">CP (Capaian Pembelajaran)</option>
                <option value="Program Tahunan">Program Tahunan (Prota)</option>
                <option value="Program Semester">Program Semester (Promes)</option>
                <option value="Bahan Asesmen">Bahan Asesmen</option>
                <option value="Kisi-kisi & Soal">Kisi-kisi & Soal</option>
                <option value="Rubrik Penilaian">Rubrik Penilaian</option>
                <option value="Remedial & Pengayaan">Remedial & Pengayaan</option>
                <option value="Administrasi Kelas">Administrasi Kelas</option>
              </select>
            </div>
          )}

          {/* Grade, Subject, Semester, Curriculum */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tingkatan Kelas</label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: Number(e.target.value) as GradeLevel })}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              >
                {[1, 2, 3, 4, 5, 6].map((g) => (
                  <option key={g} value={g}>Kelas {g}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Mata Pelajaran *</label>
              <select
                value={isCustomSubject ? '__custom__' : formData.subject}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '__custom__') {
                    setIsCustomSubject(true);
                  } else {
                    setIsCustomSubject(false);
                    setFormData({ ...formData, subject: val });
                  }
                }}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1264C0] focus:outline-hidden text-slate-800 font-medium"
              >
                {SUBJECT_OPTIONS.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
                {formData.subject &&
                  !isCustomSubject &&
                  !(SUBJECT_OPTIONS as readonly string[]).includes(formData.subject) && (
                    <option value={formData.subject}>{formData.subject}</option>
                  )}
                <option value="__custom__">+ Mata Pelajaran Lainnya (Ketik Manual)</option>
              </select>
              {isCustomSubject && (
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Ketik nama mata pelajaran..."
                  className="w-full mt-1.5 p-2 text-xs bg-white border border-[#1264C0] rounded-xl focus:outline-hidden"
                  autoFocus
                />
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) as 1 | 2 })}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value={1}>Semester 1 (Ganjil)</option>
                <option value={2}>Semester 2 (Genap)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Kurikulum</label>
              <select
                value={formData.curriculum}
                onChange={(e) => setFormData({ ...formData, curriculum: e.target.value as any })}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="Kurikulum Merdeka">Kurikulum Merdeka</option>
                <option value="Kurikulum 2013">Kurikulum 2013</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Deskripsi Singkat *</label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan ringkasan materi secara menarik..."
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
            />
          </div>

          {/* Learning Objectives */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Tujuan Pembelajaran (1 baris per poin)</label>
            <textarea
              rows={3}
              value={formData.learningObjectivesStr}
              onChange={(e) => setFormData({ ...formData, learningObjectivesStr: e.target.value })}
              placeholder="Contoh:&#10;1. Siswa dapat mengidentifikasi daun&#10;2. Siswa memahami klorofil"
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden font-mono"
            />
          </div>

          {/* Link dan Gambar (Menggantikan textarea teks bahan ajar sesuai instruksi) */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            {/* Input Link / Tautan Berkas */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-[#1264C0]" />
                <span>Tautan Berkas / Link Materi Pembelajaran</span>
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <input
                  type="url"
                  value={formData.externalUrl}
                  onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                  placeholder="https://drive.google.com/... atau https://youtube.com/..."
                  className="w-full p-2.5 pl-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1264C0] focus:outline-hidden transition-all text-slate-800 font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Mendukung link Google Drive, modul Canva, video YouTube, Quizizz, Wordwall, atau berkas PDF daring.
              </p>
            </div>

            {/* Input Gambar / Sampul Media */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Gambar Sampul / Thumbnail Media</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Input URL Gambar */}
                <div className="sm:col-span-8 space-y-1">
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="/assets/extracted/... atau https://images.unsplash.com/..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1264C0] focus:outline-hidden font-mono"
                  />
                  <div className="flex items-center gap-2 pt-1">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1264C0] text-xs font-bold cursor-pointer transition-colors border border-blue-200">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Pilih Gambar Komputer</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[10px] text-slate-400">PNG, JPG, WebP</span>
                  </div>
                </div>

                {/* Pratinjau Gambar Langsung */}
                <div className="sm:col-span-4 flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {formData.coverImage ? (
                      <img
                        src={formData.coverImage}
                        alt="Pratinjau Sampul"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/assets/extracted/thumb-pencernaan.png';
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight truncate">
                    <span className="font-bold text-slate-700 block">Pratinjau Sampul</span>
                    <span>Tampil di kartu media</span>
                  </div>
                </div>
              </div>

              {/* Pilihan Cepat Sampul Tersedia */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                <span className="text-slate-400 text-[10px] mr-1">Preset Cepat:</span>
                {[
                  { label: 'Sistem Pencernaan', url: '/assets/extracted/thumb-pencernaan.png' },
                  { label: 'Bangun Datar', url: '/assets/extracted/thumb-bangundatar.png' },
                  { label: 'Siklus Air', url: '/assets/extracted/thumb-siklusair.png' },
                  { label: 'Tebak Gambar', url: '/assets/extracted/thumb-tebakgambar.png' },
                ].map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setFormData({ ...formData, coverImage: preset.url })}
                    className={`px-2 py-1 rounded-md text-[10px] font-medium border transition-colors cursor-pointer ${
                      formData.coverImage === preset.url
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Author, File Type, File Size & Demo Status */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Nama Penyusun / Guru</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tipe Berkas *</label>
              <select
                value={isCustomFileType ? '__custom__' : formData.fileType}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '__custom__') {
                    setIsCustomFileType(true);
                  } else {
                    setIsCustomFileType(false);
                    setFormData({ ...formData, fileType: val });
                  }
                }}
                className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1264C0] focus:outline-hidden text-slate-800 font-medium"
              >
                {FILE_TYPE_OPTIONS.map((ft) => (
                  <option key={ft} value={ft}>{ft}</option>
                ))}
                {formData.fileType &&
                  !isCustomFileType &&
                  !(FILE_TYPE_OPTIONS as readonly string[]).includes(formData.fileType) && (
                    <option value={formData.fileType}>{formData.fileType}</option>
                  )}
                <option value="__custom__">+ Tipe Berkas Lainnya (Ketik Manual)</option>
              </select>
              {isCustomFileType && (
                <input
                  type="text"
                  required
                  value={formData.fileType}
                  onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                  placeholder="Ketik jenis berkas (cth: Audio MP3, ZIP, dll)..."
                  className="w-full mt-1.5 p-2 text-xs bg-white border border-[#1264C0] rounded-xl focus:outline-hidden"
                  autoFocus
                />
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Ukuran File</label>
              <input
                type="text"
                value={formData.fileSize}
                onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                placeholder="2.4 MB"
                className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1 flex flex-col justify-center">
              <label className="text-xs font-bold text-slate-700">Label Status</label>
              <label className="flex items-center gap-2 cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={formData.isDemo}
                  onChange={(e) => setFormData({ ...formData, isDemo: e.target.checked })}
                  className="rounded-sm text-amber-500 focus:ring-amber-400"
                />
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                  Tandai sebagai DEMO
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/admin/media')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1264C0] hover:bg-[#084B91] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Simpan Perubahan' : 'Terbitkan Konten'}</span>
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
};
