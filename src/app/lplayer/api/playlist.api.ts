import { tempPlaylist, TempTrack } from '../temp/playlist.temp';

export const fetchPlaylist = async (): Promise<TempTrack[]> => {
  return tempPlaylist;
};
