import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddPlayListComponent} from "./components/play_list/add-play-list/add-play-list.component";
import {DiscoverComponent} from "./components/discover/discover.component";
import {AddSongComponent} from './components/song/add-song/add-song.component';
import {SearchMusicComponent} from "./components/search-music/search-music.component";


const routes: Routes = [
  {
    path: '',
    component: DiscoverComponent
  },
  {
    path: 'playList',
    component: AddPlayListComponent
  },
  {
    path: 'uploadSong',
    component: AddSongComponent
  },
  {
    path: 'search',
    component: SearchMusicComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
