import { useState } from 'react';
import PhotoPreview from './PhotoPreview';

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener('load', (evt: ProgressEvent<FileReader>) => {
      const target = evt.currentTarget as FileReader;
      resolve(target.result as string);
    });

    fileReader.addEventListener('error', (evt: ProgressEvent<FileReader>) => {
      const target = evt.currentTarget as FileReader;
      reject(new Error(target.error?.message || 'File reading error'));
    });

    fileReader.readAsDataURL(file);
  });

export default function PhotoManager() {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
    const urls = await Promise.all(files.map(fileToDataUrl));
    setPhotos(prev => [...prev, ...urls]);
    e.target.value = ''; 
  };

  const handleRemove = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="photo-manager">
      <label className="upload-area">
        <span className="upload-text">Click to select</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="file-input"
          onChange={handleSelect}
        />
      </label>

      {photos.length > 0 && (
        <div className="preview-grid">
          {photos.map((src, i) => (
            <PhotoPreview key={src + i} src={src} onRemove={() => handleRemove(i)} />
          ))}
        </div>
      )}
    </div>
  );
}