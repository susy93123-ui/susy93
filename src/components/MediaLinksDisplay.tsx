import React, { useState } from 'react';
import { 
  ExternalLink, 
  Video, 
  FolderOpen, 
  FileText, 
  Gamepad2, 
  Sparkles, 
  Copy, 
  Check, 
  Globe,
  Play
} from 'lucide-react';
import { MediaItem, MediaLink } from '../types/index.ts';
import { detectLinkPlatform, normalizeUrl, getYouTubeEmbedUrl } from '../utils/linkHelpers.ts';

interface MediaLinksDisplayProps {
  item: MediaItem;
}

export const MediaLinksDisplay: React.FC<MediaLinksDisplayProps> = ({ item }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Aggregate primary externalUrl and any additional links
  const allLinks: MediaLink[] = [];

  if (item.externalUrl && item.externalUrl.trim()) {
    allLinks.push({
      id: 'primary-link',
      title: 'Tautan Utama Pembelajaran',
      url: item.externalUrl.trim(),
    });
  }

  if (item.links && Array.isArray(item.links)) {
    item.links.forEach((l) => {
      if (l.url && l.url.trim() && l.url.trim() !== item.externalUrl?.trim()) {
        allLinks.push(l);
      }
    });
  }

  if (allLinks.length === 0) {
    return null;
  }

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(normalizeUrl(url));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Find first YouTube link for inline embedded player if present
  const youtubeLink = allLinks.find((l) => getYouTubeEmbedUrl(l.url) !== null);
  const youtubeEmbedUrl = youtubeLink ? getYouTubeEmbedUrl(youtubeLink.url) : null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1264C0]" />
            <span>Tautan & Sumber Akses Belajar ({allLinks.length})</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Materi ini terhubung dengan berbagai platform pembelajaran interaktif resmi.
          </p>
        </div>
      </div>

      {/* Embedded YouTube Player if YouTube link is present */}
      {youtubeEmbedUrl && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-700">
            <Video className="w-4 h-4" />
            <span>Pemutar Video Pembelajaran Langsung:</span>
          </div>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-black">
            <iframe
              src={youtubeEmbedUrl}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {allLinks.map((link) => {
          const platform = detectLinkPlatform(link.url);
          const fullUrl = normalizeUrl(link.url);

          return (
            <div
              key={link.id}
              className={`p-4 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between gap-3 ${platform.badgeBg} ${platform.badgeBorder}`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 border ${platform.badgeBorder} ${platform.badgeColor}`}>
                    {platform.id === 'drive' && <FolderOpen className="w-3 h-3" />}
                    {platform.id === 'youtube' && <Video className="w-3 h-3" />}
                    {platform.id === 'canva' && <Sparkles className="w-3 h-3" />}
                    {platform.id === 'wordwall' && <Gamepad2 className="w-3 h-3" />}
                    {platform.id === 'quizizz' && <Sparkles className="w-3 h-3" />}
                    {platform.id === 'pdf' && <FileText className="w-3 h-3" />}
                    {platform.id === 'website' && <Globe className="w-3 h-3" />}
                    <span>{platform.name}</span>
                  </span>

                  <button
                    onClick={() => handleCopy(link.id, link.url)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-white/80 transition-colors cursor-pointer"
                    title="Salin Tautan"
                  >
                    {copiedId === link.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  {link.title}
                </h4>

                <p className="text-[11px] text-slate-500 font-mono truncate">
                  {link.url}
                </p>
              </div>

              <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-medium">
                  {platform.actionLabel}
                </span>

                <a
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <span>Buka</span>
                  <ExternalLink className="w-3 h-3 text-[#1264C0]" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
