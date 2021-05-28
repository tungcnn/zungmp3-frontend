import {Song} from './song';

export interface Playlist {
  id?: number;
  name?: string;
  songs?: Song[];
  views?:number;
  description?:string;
  checkLike?:boolean;
  likeTotalPlayList?: number;
  releaseDate ?: string;
}
