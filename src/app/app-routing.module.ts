import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddPlayListComponent} from './components/play_list/add-play-list/add-play-list.component';
import {AddSongComponent} from './components/song/add-song/add-song.component';


const routes: Routes = [
  {
    path: 'playList',
    component: AddPlayListComponent
  },
  {
    path: 'uploadSong',
    component: AddSongComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
