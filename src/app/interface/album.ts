import {Singer} from "./singer";
import {Genre} from "./genre";
import {Country} from "./country";
import {Theme} from "./theme";

export interface Album {
  id?: number;
  name?: string;
  releaseDate?: string;
  coverUrl?: string;
  singers?: Singer[];
  genre?: Genre;
  country?: Country;
  theme?: Theme;
}
