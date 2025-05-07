import Link from 'next/link';

const containerClass = 'flex flex-col items-center justify-center h-screen space-y-8';
const sectionClass = 'text-center';
const titleClass = 'text-2xl font-bold';
const buttonClass = 'mt-2 px-4 py-2 text-white rounded transition-colors';

export default function Home() {
  return (
    <div className={containerClass}>
      <section className={sectionClass}>
        <h1 className={titleClass}>Wiki</h1>
        <Link href="/wiki">
          <button className={`${buttonClass} bg-blue-500 hover:bg-blue-600`}>위키</button>
        </Link>
      </section>

      <section className={sectionClass}>
        <h1 className={titleClass}>Player</h1>
        <Link href="/lplayer">
          <button className={`${buttonClass} bg-green-500 hover:bg-green-600`}>Lplayer</button>
        </Link>
      </section>
    </div>
  );
}
