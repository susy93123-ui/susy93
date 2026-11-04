import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  increment,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';
import { MediaItem, SiteSettings, MediaCategory, GradeLevel } from '../types/index.ts';
import { INITIAL_MEDIA, INITIAL_SETTINGS } from '../data/initialMedia.ts';
import { getCategoryCounts as calcCategoryCounts, getClassCounts as calcClassCounts } from '../utils/filterMedia.ts';

interface MediaContextType {
  items: MediaItem[];
  settings: SiteSettings;
  addMediaItem: (item: Omit<MediaItem, 'id' | 'createdAt' | 'viewsCount' | 'downloadsCount'>) => Promise<void>;
  updateMediaItem: (id: string, item: Partial<MediaItem>) => Promise<void>;
  deleteMediaItem: (id: string) => Promise<void>;
  resetToDefault: () => Promise<void>;
  getItemBySlug: (slug: string) => MediaItem | undefined;
  getItemById: (id: string) => MediaItem | undefined;
  incrementViews: (id: string) => void;
  incrementDownloads: (id: string) => void;
  categoryCounts: Record<MediaCategory, number>;
  classCounts: Record<GradeLevel, number>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  isFirebaseSyncing: boolean;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

const STORAGE_KEY = 'sipid_media_items_v3';
const SETTINGS_KEY = 'sipid_settings_v5';

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<MediaItem[]>(() => {
    if (typeof window === 'undefined') return INITIAL_MEDIA;
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('sipid_media_items_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: MediaItem) => {
            const init = INITIAL_MEDIA.find((im) => im.id === p.id);
            if (init && !p.externalUrl && init.externalUrl) {
              return { ...p, externalUrl: init.externalUrl };
            }
            return p;
          });
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_MEDIA;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (typeof window === 'undefined') return INITIAL_SETTINGS;
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_SETTINGS,
          ...parsed,
          aboutText: INITIAL_SETTINGS.aboutText,
          address: INITIAL_SETTINGS.address,
          email: INITIAL_SETTINGS.email,
          phone: '',
          youtubeUrl: INITIAL_SETTINGS.youtubeUrl,
          instagramUrl: INITIAL_SETTINGS.instagramUrl,
          tiktokUrl: INITIAL_SETTINGS.tiktokUrl,
        };
      }
    } catch {
      // ignore
    }
    return INITIAL_SETTINGS;
  });

  const [isFirebaseSyncing, setIsFirebaseSyncing] = useState(true);

  // Sync with Firestore on mount
  useEffect(() => {
    let unsubscribeMedia: (() => void) | undefined;
    let unsubscribeSettings: (() => void) | undefined;

    const setupFirestore = async () => {
      try {
        const mediaCol = collection(db, 'media_items');
        
        // Seed if empty in Firestore
        const snapshot = await getDocs(mediaCol).catch((err) => {
          handleFirestoreError(err, OperationType.LIST, 'media_items');
          return null;
        });

        if (snapshot && snapshot.empty) {
          // Batch seed initial media items
          for (const item of INITIAL_MEDIA) {
            await setDoc(doc(db, 'media_items', item.id), item).catch((err) => {
              handleFirestoreError(err, OperationType.CREATE, `media_items/${item.id}`);
            });
          }
        }

        // Check settings in Firestore
        const settingsDocRef = doc(db, 'site_settings', 'general');
        const settingsSnap = await getDocs(collection(db, 'site_settings')).catch((err) => {
          handleFirestoreError(err, OperationType.LIST, 'site_settings');
          return null;
        });

        if (settingsSnap && settingsSnap.empty) {
          await setDoc(settingsDocRef, INITIAL_SETTINGS).catch((err) => {
            handleFirestoreError(err, OperationType.CREATE, 'site_settings/general');
          });
        }

        // Real-time listener for media items
        unsubscribeMedia = onSnapshot(
          mediaCol,
          (querySnapshot) => {
            if (!querySnapshot.empty) {
              const loadedItems: MediaItem[] = [];
              querySnapshot.forEach((docItem) => {
                loadedItems.push(docItem.data() as MediaItem);
              });
              setItems(loadedItems);
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedItems));
              } catch {
                // ignore
              }
            }
            setIsFirebaseSyncing(false);
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, 'media_items');
            setIsFirebaseSyncing(false);
          }
        );

        // Real-time listener for site settings
        unsubscribeSettings = onSnapshot(
          settingsDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const remoteSettings = docSnap.data() as SiteSettings;
              setSettings((prev) => ({
                ...prev,
                ...remoteSettings,
                email: remoteSettings.email || INITIAL_SETTINGS.email,
              }));
              try {
                localStorage.setItem(SETTINGS_KEY, JSON.stringify(remoteSettings));
              } catch {
                // ignore
              }
            }
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, 'site_settings/general');
          }
        );

      } catch (err) {
        console.warn('Firestore initial sync notice:', err);
        setIsFirebaseSyncing(false);
      }
    };

    setupFirestore();

    return () => {
      if (unsubscribeMedia) unsubscribeMedia();
      if (unsubscribeSettings) unsubscribeSettings();
    };
  }, []);

  const addMediaItem = async (newItemData: Omit<MediaItem, 'id' | 'createdAt' | 'viewsCount' | 'downloadsCount'>) => {
    const newItem: MediaItem = {
      ...newItemData,
      id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      viewsCount: 0,
      downloadsCount: 0,
    };
    
    // Optimistic update
    setItems((prev) => [newItem, ...prev]);

    try {
      await setDoc(doc(db, 'media_items', newItem.id), newItem);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `media_items/${newItem.id}`);
    }
  };

  const updateMediaItem = async (id: string, updatedFields: Partial<MediaItem>) => {
    // Optimistic update
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );

    try {
      await updateDoc(doc(db, 'media_items', id), updatedFields);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `media_items/${id}`);
    }
  };

  const deleteMediaItem = async (id: string) => {
    // Optimistic update
    setItems((prev) => prev.filter((item) => item.id !== id));

    try {
      await deleteDoc(doc(db, 'media_items', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `media_items/${id}`);
    }
  };

  const resetToDefault = async () => {
    setItems(INITIAL_MEDIA);
    setSettings(INITIAL_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SETTINGS_KEY);

    try {
      for (const item of INITIAL_MEDIA) {
        await setDoc(doc(db, 'media_items', item.id), item);
      }
      await setDoc(doc(db, 'site_settings', 'general'), INITIAL_SETTINGS);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'reset_database');
    }
  };

  const getItemBySlug = (slug: string) => {
    return items.find((item) => item.slug === slug);
  };

  const getItemById = (id: string) => {
    return items.find((item) => item.id === id);
  };

  const incrementViews = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, viewsCount: (item.viewsCount || 0) + 1 } : item
      )
    );

    updateDoc(doc(db, 'media_items', id), {
      viewsCount: increment(1),
    }).catch(() => {
      // Non-blocking for analytics
    });
  };

  const incrementDownloads = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, downloadsCount: (item.downloadsCount || 0) + 1 } : item
      )
    );

    updateDoc(doc(db, 'media_items', id), {
      downloadsCount: increment(1),
    }).catch(() => {
      // Non-blocking for analytics
    });
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
      await setDoc(doc(db, 'site_settings', 'general'), merged, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'site_settings/general');
    }
  };

  const categoryCounts = calcCategoryCounts(items);
  const classCounts = calcClassCounts(items);

  return (
    <MediaContext.Provider
      value={{
        items,
        settings,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        resetToDefault,
        getItemBySlug,
        getItemById,
        incrementViews,
        incrementDownloads,
        categoryCounts,
        classCounts,
        updateSettings,
        isFirebaseSyncing,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
