export function getLqipUrl(imageSrc: string): string | null {
  try {
    const filename = imageSrc.split('/').pop();
    if (!filename) return null;
    
    const baseFilename = filename
      .replace(/\.[a-f0-9]+\.(webp|png|jpg|jpeg)$/i, '')
      .replace(/\.(webp|png|jpg|jpeg)$/i, '');
    
    if (!baseFilename) return null;
    
    return `/lqip/${baseFilename}-lqip.jpg`;
  } catch {
    return null;
  }
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });
}
