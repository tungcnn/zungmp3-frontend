import {Singer} from './singer';
import {Genre} from './genre';
import {Theme} from './theme';
import {Country} from './country';
import {User} from './user';
import {Tag} from './tag';

export interface Song {
  id?: number;
  name?: string;
  releaseDate?: string;
  lyrics?: string;
  url?: string;
  coverUrl?: string;
  views?: number;
  singers?: Singer[];
  genre?: Genre;
  theme?: Theme;
  country?: Country;
  user?: User;
  checkLike?: boolean;
  tags?: Tag[];
  LikeTotal?: number;
}
