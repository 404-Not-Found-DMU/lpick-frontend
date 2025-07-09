export interface MusicTrack {
  id: number;
  title: string;
  artist: string;
  mp3: string;
  cover: string;
}

export const tempPlaylist: MusicTrack[] = [
  {
    id: 1,
    title: 'Pink Floyd - The Dark Side of the Moon',
    artist: 'Pink Floyd',
    mp3: '/lplayer/temp/mp3/sample1.mp3',
    cover: '/lplayer/temp/images/album1.png',
  },
  {
    id: 2,
    title: 'Miles Davis - Kind of Blue',
    artist: 'Miles Davis',
    mp3: '/lplayer/temp/mp3/sample2.mp3',
    cover: '/lplayer/temp/images/album2.png',
  },
  {
    id: 3,
    title: 'Fleetwood Mac - Rumours',
    artist: 'Fleetwood Mac',
    mp3: 'lplayer/temp/mp3/sample3.mp3',
    cover: '/lplayer/temp/images/album3.png',
  },
  {
    id: 4,
    title: 'The Beatles - Abbey Road',
    artist: 'The Beatles',
    mp3: '/lplayer/temp/mp3/sample4.mp3',
    cover: '/lplayer/temp/images/album4.png',
  },
  {
    id: 5,
    title: 'Radiohead - OK Computer',
    artist: 'Radiohead',
    mp3: '/lplayer/temp/mp3/sample5.mp3',
    cover: '/lplayer/temp/images/album5.png',
  },
];
