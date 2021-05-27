import {User} from './user';
import {Playlist} from './playlist';

export interface Playcomment {
  id?: number;
  comment?: string;
  user: User;
  playlist: Playlist;
}
