import {Song} from "./song";

export interface Genre {
  id?: number;
  name?: string;
  songs: Song[];
}
