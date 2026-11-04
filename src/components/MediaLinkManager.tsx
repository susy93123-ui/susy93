import React from 'react';
import { 
  Plus, 
  Trash2, 
  ExternalLink, 
  Video, 
  FileText, 
  FolderOpen, 
  Gamepad2, 
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { MediaLink } from '../types/index.ts';
import { detectLinkPlatform, normalizeUrl } from '../utils/linkHelpers.ts';

interface MediaLinkManagerProps {
  links: MediaLink[];
  onChange: (links: MediaLink[]) => void;
}

export const MediaLinkManager: React.FC<MediaLinkManagerProps> = ({ links, onChange }) => {
  const addLink = (platformPreset?: 'drive' | 'youtube' | 'canva' | 'wordwall' | 'quizizz' | 'pdf') => {
    let defaultTitle = 'Tautan Pembelajaran';
    let defaultPlaceholder = '';

    if (platformPreset === 'drive') {
      defaultTitle = 'Berkas Google Drive (PDF/Slide)';
      defaultPlaceholder = 'https://drive.google.com/...';
    } else if (platformPreset === 'youtube') {
      defaultTitle = 'Video Pembelajaran YouTube';
      defaultPlaceholder = 'https://www.youtube.com/watch?v=...';
    } else if (platformPreset === 'canva') {
      defaultTitle = 'Presentasi / Modul Canva';
      defaultPlaceholder = 'https://www.canva.com/design/...';
    } else if (platformPreset === 'wordwall') {
      defaultTitle = 'Game Interaktif Wordwall';
      defaultPlaceholder = 'https://wordwall.net/resource/...';
    } else if (platformPreset === 'quizizz') {
      defaultTitle = 'Kuis Interaktif Quizizz';
      defaultPlaceholder = 'https://quizizz.com/join?...';
    } else if (platformPreset === 'pdf') {
      defaultTitle = 'Unduh Berkas PDF';
      defaultPlaceholder = 'https://.../dokumen.pdf';
    }

    const newLink: MediaLink = {
      id: `link-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: defaultTitle,
      url: defaultPlaceholder,
      platform: platformPreset || 'website',
    };

    onChange([...links, newLink]);
  };

  const updateLink = (id: string, field: 'title' | 'url', value: string) => {
    const updated = links.map((link) => {
      if (link.id === id) {
        const next = { ...link, [field]: value };
        if (field === 'url') {
          const detected = detectLinkPlatform(value);
          next.platform = detected.id;
        }
        return next;
      }
      return link;
    });
    onChange(updated);
  };

  const removeLink = (id: string) => {
    onChange(links.filter((link) => link.id !== id));
  };

  return (
    <div className="space-y-3.5 p-4 bg-slate-50/80 rounded-2xl border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
            <LinkIcon className="w-4 h-4 text-[#1264C0]" />
            <span>Tautan & Akses Berbagai Macam Link Pembelajaran</span>
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Tambahkan berbagai tautan sumber belajar seperti Google Drive, Canva, YouTube, Wordwall, Quizizz, atau PDF.
          </p>
        </div>

        {/* Quick Add Presets */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => addLink('drive')}
            className="px-2 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <FolderOpen className="w-3 h-3" />
            <span>+ Drive</span>
          </button>
          <button
            type="button"
            onClick={() => addLink('youtube')}
            className="px-2 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <Video className="w-3 h-3" />
            <span>+ YouTube</span>
          </button>
          <button
            type="button"
            onClick={() => addLink('canva')}
            className="px-2 py-1 rounded-lg bg-cyan-100 hover:bg-cyan-200 text-cyan-800 text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>+ Canva</span>
          </button>
          <button
            type="button"
            onClick={() => addLink('wordwall')}
            className="px-2 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <Gamepad2 className="w-3 h-3" />
            <span>+ Game</span>
          </button>
          <button
            type="button"
            onClick={() => addLink()}
            className="px-2 py-1 rounded-lg bg-[#1264C0] hover:bg-[#084B91] text-white text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>+ Tautan Bebas</span>
          </button>
        </div>
      </div>

      {/* Links List */}
      {links.length === 0 ? (
        <div className="text-center py-4 px-2 border border-dashed border-slate-300 rounded-xl bg-white text-slate-400 text-xs">
          Belum ada tautan tambahan. Klik tombol di atas untuk menambahkan link Google Drive, YouTube, Canva, atau tautan lainnya.
        </div>
      ) : (
        <div className="space-y-2.5">
          {links.map((link, idx) => {
            const platformInfo = detectLinkPlatform(link.url);
            return (
              <div 
                key={link.id} 
                className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2 relative group"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${platformInfo.badgeBg} ${platformInfo.badgeColor} ${platformInfo.badgeBorder}`}>
                      {platformInfo.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeLink(link.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Hapus tautan ini"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                      placeholder="Judul Tautan (misal: Modul PDF Google Drive)"
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-[#1264C0] font-medium text-slate-800"
                    />
                  </div>

                  <div className="sm:col-span-8 flex items-center gap-1.5">
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                      placeholder="https://..."
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-[#1264C0] font-mono text-slate-800"
                    />
                    {link.url && (
                      <a
                        href={normalizeUrl(link.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 shrink-0 cursor-pointer"
                        title="Uji coba buka link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
