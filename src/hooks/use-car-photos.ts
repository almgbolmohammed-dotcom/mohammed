import { useState, useEffect } from "react";

const storageKey = (carId: number) => `@car_photos_${carId}`;
const PHOTOS_EVENT = "car-photos-updated";
const MIGRATED_KEY = (carId: number) => `@car_photos_migrated_v1_${carId}`;

export function loadWebCarPhotos(carId: number): string[] {
  try {
    const raw = localStorage.getItem(storageKey(carId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return (parsed as string[]).filter(
      (u) => typeof u === "string" && u.startsWith("data:image/")
    );
  } catch {
    return [];
  }
}

async function fetchApiPhotos(carId: number): Promise<string[]> {
  try {
    const res = await fetch(`/api/car-photos/${carId}`);
    if (!res.ok) return [];
    const data = await res.json() as { photos: string[] };
    return Array.isArray(data.photos) ? data.photos : [];
  } catch {
    return [];
  }
}

async function saveApiPhotos(carId: number, photos: string[]): Promise<void> {
  try {
    await fetch(`/api/car-photos/${carId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photos }),
    });
  } catch { /* ignore */ }
}

export function saveWebCarPhotos(carId: number, photos: string[]): void {
  try {
    localStorage.setItem(storageKey(carId), JSON.stringify(photos));
  } catch { /* quota exceeded */ }
  // Save to API in background
  saveApiPhotos(carId, photos);
  window.dispatchEvent(
    new CustomEvent<{ carId: number }>(PHOTOS_EVENT, { detail: { carId } })
  );
}

/** Try to compress dataUrl to maxSide×maxSide JPEG. Returns null if canvas fails. */
async function tryCanvasCompress(
  dataUrl: string,
  maxSide: number,
  quality: number
): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const { naturalWidth: w, naturalHeight: h } = img;
        if (!w || !h) { resolve(null); return; }
        const ratio = Math.min(maxSide / w, maxSide / h, 1);
        const cw = Math.max(1, Math.round(w * ratio));
        const ch = Math.max(1, Math.round(h * ratio));
        const canvas = document.createElement("canvas");
        canvas.width = cw;
        canvas.height = ch;
        const ctx = canvas.getContext("2d");
        if (!ctx) { resolve(null); return; }
        ctx.drawImage(img, 0, 0, cw, ch);
        const out = canvas.toDataURL("image/jpeg", quality);
        resolve(out.startsWith("data:image/") && out.length > 200 ? out : null);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

/**
 * Compress a File to a JPEG data-URL, trying progressively smaller sizes.
 * Falls back to the original data-URL if canvas is unavailable.
 */
export async function compressAndConvert(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target!.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const attempts: [number, number][] = [
    [1400, 0.85],
    [1000, 0.78],
    [700,  0.70],
    [400,  0.65],
  ];

  for (const [maxSide, quality] of attempts) {
    try {
      const result = await tryCanvasCompress(dataUrl, maxSide, quality);
      if (result) return result;
    } catch { /* try next */ }
  }

  return dataUrl;
}

export function useWebCarPhotos(carId: number | undefined) {
  const [photos, setPhotos] = useState<string[]>(() =>
    carId ? loadWebCarPhotos(carId) : []
  );

  useEffect(() => {
    if (!carId) { setPhotos([]); return; }

    // Load from localStorage immediately
    const local = loadWebCarPhotos(carId);
    if (local.length) setPhotos(local);

    // Then fetch from API and merge (API is source of truth)
    fetchApiPhotos(carId).then(apiPhotos => {
      if (apiPhotos.length) {
        setPhotos(apiPhotos);
        // Keep localStorage in sync
        try { localStorage.setItem(storageKey(carId), JSON.stringify(apiPhotos)); } catch { /* ignore */ }
      } else if (local.length) {
        // One-time migration: push localStorage photos to API
        const migratedKey = MIGRATED_KEY(carId);
        if (!localStorage.getItem(migratedKey)) {
          saveApiPhotos(carId, local).then(() => {
            localStorage.setItem(migratedKey, "1");
          });
        }
      }
    });

    const handler = (e: Event) => {
      const { detail } = e as CustomEvent<{ carId: number }>;
      if (detail.carId === carId) setPhotos(loadWebCarPhotos(carId));
    };
    window.addEventListener(PHOTOS_EVENT, handler);
    return () => window.removeEventListener(PHOTOS_EVENT, handler);
  }, [carId]);

  return photos;
}
