import {User} from './user';
import {Song} from './song';

export interface Songcomment {
  id?: number;
  comment?: string;
  user?: User;
  song?: Song;
}
