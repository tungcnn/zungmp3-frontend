import {Singer} from './singer';
import {Album} from './album';
import {Genre} from './genre';
import {Theme} from './theme';
import {Country} from './country';
import {User} from "./user";

export interface Song {
  id?: number;
  name?: string;
  releaseDate?: string;
  lyrics?: string;
  url?: string;
  coverUrl?: string;
  views?: number;
  singers?: Singer[];
  album?: Album;
  genre?: Genre;
  theme?: Theme;
  country?: Country;
  user?: User;
}
