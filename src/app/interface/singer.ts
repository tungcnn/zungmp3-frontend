import {Song} from "./song";

export interface Singer {
  id?: number;
  name?: string;
  avatarUrl?: string;
  date?: string;
  description?: string;
  songs?: Song[];
}
