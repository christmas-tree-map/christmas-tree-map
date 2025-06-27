import { useRef, useState } from 'react';

const IMAGE_CONFIG = {
  MAX_SIZE: 480,
  OUTPUT_FORMAT: 'image/webp',
} as const;

const useImageUploader = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      handleImageResize(reader, file);
    };

    reader.onerror = () => {
      console.error('파일 읽기에 실패했습니다.');
    };

    reader.readAsDataURL(file);
  };

  const handleImageResize = (reader: FileReader, file: File) => {
    if (typeof reader.result !== 'string') return;

    const img = new Image();
    img.src = reader.result;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      const originalWidth = img.width;
      const originalHeight = img.height;
      const scale = Math.min(IMAGE_CONFIG.MAX_SIZE / originalWidth, IMAGE_CONFIG.MAX_SIZE / originalHeight);
      const newWidth = scale < 1 ? Math.round(originalWidth * scale) : originalWidth;
      const newHeight = scale < 1 ? Math.round(originalHeight * scale) : originalHeight;

      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const resizedImageDataURL = canvas.toDataURL(IMAGE_CONFIG.OUTPUT_FORMAT);
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
      const webpFileName = `${fileNameWithoutExt}.webp`;
      const resizedFile = handleDataURLToFile(resizedImageDataURL, webpFileName);

      setImageFile(resizedFile);
      setImageUrl(resizedImageDataURL);
    };

    img.onerror = () => {
      console.error('이미지 로드에 실패했습니다.');
    };
  };

  const handleDataURLToFile = (dataURL: string, fileName: string): File => {
    const arr = dataURL.split(',');
    const mime = IMAGE_CONFIG.OUTPUT_FORMAT;
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  return {
    imageUrl,
    imageFile,
    fileInputRef,
    handleImageUploadClick,
    handleImageChange,
  };
};

export default useImageUploader;
