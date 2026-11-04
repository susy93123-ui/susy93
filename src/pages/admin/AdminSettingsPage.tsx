import React, { useState } from 'react';
import { Settings, Save, RotateCcw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout.tsx';
import { useMedia } from '../../context/MediaContext.tsx';

interface AdminSettingsPageProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ currentPath, onNavigate }) => {
  const { settings, updateSettings, resetToDefault } = useMedia();

  const [form, setForm] = useState({
    schoolName: settings.schoolName,
    portalName: settings.portalName,
    slogan: settings.slogan,
    address: settings.address,
    phone: settings.phone,
    email: settings.email,
    academicYear: settings.academicYear,
    aboutText: settings.aboutText,
    youtubeUrl: settings.youtubeUrl || '',
    instagramUrl: settings.instagramUrl || '',
    tiktokUrl: settings.tiktokUrl || '',
  });

  const [saved, setSaved] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    resetToDefault();
    setResetConfirm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminLayout
      currentPath={currentPath}
      onNavigate={onNavigate}
      title="Pengaturan Portal Sekolah"
      subtitle="Konfigurasi identitas SD Negeri Mendongan, kontak, dan teks portal."
    >
      <div className="max-w-3xl mx-auto space-y-8">
        
        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs font-bold text-emerald-800 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Pengaturan berhasil diperbarui dan diterapkan ke seluruh halaman publik!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-base font-black text-slate-900 border-b pb-3">Identitas Sekolah & Portal</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Nama Sekolah</label>
              <input
                type="text"
                required
                value={form.schoolName}
                onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Nama Portal</label>
              <input
                type="text"
                required
                value={form.portalName}
                onChange={(e) => setForm({ ...form, portalName: e.target.value })}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Slogan Utama Portal</label>
            <input
              type="text"
              required
              value={form.slogan}
              onChange={(e) => setForm({ ...form, slogan: e.target.value })}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tahun Pelajaran</label>
              <input
                type="text"
                value={form.academicYear}
                onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Pos-el (Email) Resmi</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="mendongansdn@gmail.com"
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Alamat Lengkap</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Deskripsi Singkat Portal (Tentang Kami)</label>
            <textarea
              rows={3}
              value={form.aboutText}
              onChange={(e) => setForm({ ...form, aboutText: e.target.value })}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
            />
          </div>

          <h3 className="text-base font-black text-slate-900 border-b pb-3 pt-4">Tautan Media Sosial Resmi</h3>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tautan Kanal YouTube</label>
              <input
                type="url"
                value={form.youtubeUrl}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                placeholder="https://www.youtube.com/@..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tautan Akun Instagram</label>
              <input
                type="url"
                value={form.instagramUrl}
                onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                placeholder="https://www.instagram.com/..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Tautan Akun TikTok</label>
              <input
                type="url"
                value={form.tiktokUrl}
                onChange={(e) => setForm({ ...form, tiktokUrl: e.target.value })}
                placeholder="https://www.tiktok.com/@..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1264C0] hover:bg-[#084B91] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan</span>
            </button>
          </div>
        </form>

        {/* Integrasi GitHub & Deployment Netlify */}
        <div className="bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/80 p-6 sm:p-8 rounded-3xl border border-indigo-100 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-indigo-100/80 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-md shadow-indigo-200">
              ⚡
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Sinkronisasi GitHub & Deploy ke Netlify</h3>
              <p className="text-xs text-slate-500">Tersinkron untuk akun: <span className="font-bold text-indigo-700">susy93123-ui</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Opsi 1: Netlify Deploy Instan */}
            <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  🚀 Paling Mudah (1 Menit)
                </div>
                <h4 className="text-sm font-black text-slate-900">Deploy Langsung ke Netlify</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unduh paket kompilasi produksi yang sudah dilengkapi <code>netlify.toml</code> dan routing SPA. Buka <b>app.netlify.com/drop</b> lalu tarik (drag-and-drop) file zip ini untuk langsung online!
                </p>
              </div>
              <a
                href="/dist-netlify.zip"
                download="dist-netlify-sipid.zip"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-100 cursor-pointer"
              >
                <span>📦 Unduh File Siap Deploy Netlify (.zip)</span>
              </a>
            </div>

            {/* Opsi 2: Source Code untuk GitHub */}
            <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold">
                  📂 Kode Sumber Lengkap
                </div>
                <h4 className="text-sm font-black text-slate-900">Unggah ke Repositori GitHub</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Unduh seluruh kode sumber React + TypeScript bersih untuk diunggah ke repositori akun <b>github.com/susy93123-ui</b>.
                </p>
              </div>
              <a
                href="/sipid-source-code.zip"
                download="sipid-source-code.zip"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all shadow-md shadow-slate-200 cursor-pointer"
              >
                <span>💾 Unduh Kode Sumber GitHub (.zip)</span>
              </a>
            </div>
          </div>

          <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-2xl text-xs text-slate-700 space-y-2 leading-relaxed">
            <p className="font-bold text-sky-900">💡 Cara Deploy ke Netlify via Drop (Tanpa Token):</p>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
              <li>Klik tombol <b>"Unduh File Siap Deploy Netlify (.zip)"</b> di atas.</li>
              <li>Ekstrak file zip tersebut di komputer Anda (atau upload langsung).</li>
              <li>Buka <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold underline">app.netlify.com/drop</a> lalu tarik folder hasil ekstrak ke halaman tersebut.</li>
              <li>Website SIPID SD Negeri Mendongan langsung aktif dengan URL publik gratis!</li>
            </ol>
          </div>
        </div>

        {/* Database Reset Section */}
        <div className="bg-rose-50 p-6 rounded-3xl border border-rose-200 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>Pulihkan Data Awal Portal (Reset Database)</span>
          </div>
          <p className="text-xs text-rose-700 leading-relaxed">
            Jika Anda ingin mengembalikan seluruh koleksi materi dan statistik ke data awal demonstrasi gambar referensi asli, gunakan tombol di bawah ini.
          </p>

          {!resetConfirm ? (
            <button
              type="button"
              onClick={() => setResetConfirm(true)}
              className="px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 hover:bg-rose-100 text-xs font-bold cursor-pointer"
            >
              Pulihkan Data Bawaan
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
              >
                Konfirmasi Reset Semua
              </button>
              <button
                type="button"
                onClick={() => setResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Batal
              </button>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};
