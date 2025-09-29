interface NicknameInputProps {
  value: string;
  onChange: (v: string) => void;
}

export default function NicknameInput({ value, onChange }: NicknameInputProps) {
  return (
    <div className="relative mb-4">
      <input
        id="nickname"
        type="text"
        required
        minLength={2}
        maxLength={16}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`peer w-full rounded-xl border border-gray-200 bg-white px-4 pb-2 pt-5 text-base text-gray-900 shadow-sm outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-lavender-600 dark:focus:ring-lavender-900/30`}
        placeholder=" "
        autoComplete="off"
      />
      <label
        htmlFor="nickname"
        className="pointer-events-none absolute left-4 top-2 z-10 origin-[0] -translate-y-1 scale-90 transform text-sm text-gray-400 duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:scale-90 peer-focus:text-indigo-400 dark:text-gray-500 dark:peer-focus:text-lavender-400"
      >
        닉네임
      </label>
    </div>
  );
}
