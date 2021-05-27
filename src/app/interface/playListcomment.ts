import {User} from './user';
import {Playlist} from './playlist';

export interface Playcomment {
  id?: number;
  comment?: string;
  date?: Date;
  user: User;
  playlist: Playlist;
}
