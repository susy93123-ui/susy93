import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Check, 
  AlertCircle,
  ExternalLink 
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout.tsx';
import { useMedia } from '../../context/MediaContext.tsx';
import { MediaCategory, GradeLevel } from '../../types/index.ts';

interface AdminMediaListPageProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AdminMediaListPage: React.FC<AdminMediaListPageProps> = ({ currentPath, onNavigate }) => {
  const { items, deleteMediaItem } = useMedia();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<string>('semua');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredItems = items.filter((item) => {
    if (filterCat !== 'semua' && item.category !== filterCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = (id: string) => {
    deleteMediaItem(id);
    setDeleteConfirmId(null);
  };

  return (
    <AdminLayout
      currentPath={currentPath}
      onNavigate={onNavigate}
      title="Manajemen Media & Perangkat Ajar"
      subtitle={`Kelola seluruh ${items.length} materi, lembar kerja, simulasi, game, dan perangkat ajar.`}
    >
      <div className="space-y-6">
        
        {/* Actions Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan judul atau guru..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="p-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
            >
              <option value="semua">Semua Kategori</option>
              <option value="materi">Materi</option>
              <option value="lkpd">LKPD</option>
              <option value="media-interaktif">Media Interaktif</option>
              <option value="game">Game Edukasi</option>
              <option value="perangkat-ajar">Perangkat Ajar</option>
              <option value="tka">TKA (Tes Akademik)</option>
            </select>

            <button
              onClick={() => onNavigate('/admin/media/tambah')}
              className="px-4 py-2 rounded-xl bg-[#1264C0] hover:bg-[#084B91] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Konten</span>
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Judul Media</th>
                  <th className="py-3.5 px-3">Kategori</th>
                  <th className="py-3.5 px-3">Kelas / Mapel</th>
                  <th className="py-3.5 px-3">Tipe File</th>
                  <th className="py-3.5 px-3">Statistik</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{item.title}</span>
                      <span className="text-[10px] text-slate-400">Penyusun: {item.author}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-blue-50 text-blue-700 border border-blue-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-semibold">
                      Kelas {item.grade} • {item.subject}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500">{item.fileType}</td>
                    <td className="py-3.5 px-3 text-[11px] text-slate-500">
                      <span>👁️ {item.viewsCount}</span> • <span>📥 {item.downloadsCount}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      {item.isDemo ? (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-100 text-amber-900">
                          DEMO
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          AKTIF
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {/* View detail on public page */}
                      <button
                        onClick={() => onNavigate(`/${item.category}/${item.slug}`)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 cursor-pointer inline-flex"
                        title="Lihat Pratinjau Publik"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => onNavigate(`/admin/media/${item.id}/edit`)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 cursor-pointer inline-flex"
                        title="Edit Konten"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer inline-flex"
                        title="Hapus Konten"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-slate-900">Hapus Konten Ini?</h3>
              <p className="text-xs text-slate-500">
                Media yang dihapus akan segera hilang dari katalog publik dan database. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};
