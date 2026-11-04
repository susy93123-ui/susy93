import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';
import { useMedia } from '../context/MediaContext.tsx';

export const ContactPage: React.FC = () => {
  const { settings } = useMedia();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Siswa / Orang Tua',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      setSubmitted(true);
      const messageId = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      try {
        await setDoc(doc(db, 'feedback_messages', messageId), {
          name: formData.name.trim(),
          contact: formData.email.trim() || 'Tidak disertakan',
          role: formData.role,
          message: formData.message.trim(),
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `feedback_messages/${messageId}`);
      }
      setTimeout(() => {
        setFormData({ name: '', email: '', role: 'Siswa / Orang Tua', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1264C0] text-xs font-black uppercase tracking-wider">
          Hubungi Kami
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Informasi & Layanan Sekolah
        </h1>
        <p className="text-slate-600 text-sm">
          Punya pertanyaan seputar media pembelajaran, modul ajar, atau masukan untuk portal SIPID? Tim kami siap membantu Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info (Left 5 cols) */}
        <div className="lg:col-span-5 bg-[#084B91] rounded-3xl p-8 sm:p-10 text-white shadow-lg space-y-8">
          <div>
            <h3 className="text-2xl font-black">{settings.schoolName || 'SD Negeri Mendongan'}</h3>
            <p className="text-xs text-blue-200 mt-1">{settings.slogan}</p>
          </div>

          <div className="space-y-5 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#FFC83D]" />
              </div>
              <div>
                <span className="font-bold text-white block">Alamat Sekolah:</span>
                <span className="text-blue-100">{settings.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#F05A78]" />
              </div>
              <div>
                <span className="font-bold text-white block">Pos-el (Email):</span>
                <span className="text-blue-100">{settings.email || 'mendongansdn@gmail.com'}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="font-bold text-white block">Jam Layanan:</span>
                <span className="text-blue-100 block space-y-0.5 mt-0.5">
                  <span className="block">Senin - Kamis: 07.00 - 14.00</span>
                  <span className="block">Jumat: 07.00 - 11.00</span>
                  <span className="block">Sabtu: 07.00 - 12.30</span>
                </span>
              </div>
            </div>
          </div>

          {/* Media Sosial Resmi */}
          <div className="pt-6 border-t border-white/20 space-y-3">
            <span className="font-bold text-xs uppercase tracking-wider text-[#FFC83D] block">
              Media Sosial Resmi Sekolah:
            </span>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <a
                href={settings.youtubeUrl || "https://www.youtube.com/@sdnegerimendongan9981"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 hover:bg-red-600 transition-colors text-white"
              >
                <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-bold">▶</span>
                </div>
                <span className="truncate">YouTube: @sdnegerimendongan9981</span>
              </a>

              <a
                href={settings.instagramUrl || "https://www.instagram.com/sdnmendongan/"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 hover:bg-pink-600 transition-colors text-white"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-bold">📷</span>
                </div>
                <span className="truncate">Instagram: @sdnmendongan</span>
              </a>

              <a
                href={settings.tiktokUrl || "https://www.tiktok.com/@sdnmendongan"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 hover:bg-black transition-colors text-white"
              >
                <div className="w-6 h-6 rounded-lg bg-black flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-bold">🎵</span>
                </div>
                <span className="truncate">TikTok: @sdnmendongan</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form (Right 7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <h3 className="text-xl font-black text-slate-900">Kirim Pesan / Masukan</h3>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 animate-fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-black text-emerald-900 text-base">Pesan Anda Berhasil Terkirim!</h4>
              <p className="text-xs text-emerald-700">
                Terima kasih atas partisipasi Anda dalam memajukan portal pembelajaran SIPID SD Negeri Mendongan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Ahmad Hidayat"
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1264C0] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email atau No. WhatsApp</label>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com / 08..."
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1264C0] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Status Pengguna</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1264C0] focus:outline-hidden"
                >
                  <option value="Siswa / Orang Tua">Siswa / Orang Tua Murid</option>
                  <option value="Guru SD Negeri Mendongan">Guru SD Negeri Mendongan</option>
                  <option value="Guru Sekolah Lain">Guru Sekolah Mitra / Tamu</option>
                  <option value="Masyarakat Umum">Masyarakat Umum / Peneliti</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Isi Pesan / Saran Pembelajaran *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan pesan, permohonan materi tambahan, atau laporan di sini..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1264C0] focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1264C0] hover:bg-[#084B91] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan Sekarang</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
