import Image from 'next/image';
import { User, Image as ImageIcon } from 'lucide-react';
import { useRef } from 'react';

interface ProfileImageInputProps {
  value: string | null;
  onChange: (img: string | null, file: File | null) => void;
}

const ProfileImageInput: React.FC<ProfileImageInputProps> = ({ value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => onChange(ev.target?.result as string, file);
      reader.readAsDataURL(file);
    }
  };

  const handleImgClick = () => fileInputRef.current?.click();

  return (
    <div className="mb-6 flex flex-col items-center">
      <div
        className="relative mb-2 h-20 w-20 cursor-pointer rounded-full border-2 border-violet-300 bg-gray-100 transition-all hover:ring-2 hover:ring-violet-400 dark:border-violet-700 dark:bg-gray-800"
        onClick={handleImgClick}
        tabIndex={0}
        role="button"
      >
        {value ? (
          <Image src={value} alt="프로필 사진" fill className="object-cover" />
        ) : (
          <User className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-violet-300 dark:text-violet-700" />
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImgChange}
        />
        <span
          className="absolute bottom-1 right-1 z-20 translate-x-1/4 translate-y-1/4 rounded-full bg-violet-400 p-1.5 text-white shadow-md dark:bg-violet-700"
          style={{ pointerEvents: 'none' }}
        >
          <ImageIcon className="h-4 w-4" />
        </span>
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-500">프로필 사진을 선택하세요</span>
    </div>
  );
};

export default ProfileImageInput;
