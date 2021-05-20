import {Singer} from './singer';
import {Album} from './album';
import {Genre} from './genre';
import {Theme} from './theme';
import {Country} from './country';

export interface Song {
  id?: number;
  name?: string;
  releaseDate?: string;
  lyrics?: string;
  filename?: string;
  views?: number;
  singers?: Singer[];
  album?: Album;
  genres?: Genre[];
  theme?: Theme;
  country?: Country;
}
