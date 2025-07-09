import { tempPlaylist, MusicTrack } from '../temp/playlist.temp';

export const fetchPlaylist = async (): Promise<MusicTrack[]> => {
  return tempPlaylist;
};
