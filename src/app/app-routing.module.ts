import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddPlayListComponent} from './components/play_list/add-play-list/add-play-list.component';
import {DiscoverComponent} from './components/discover/discover.component';
import {AddSongComponent} from './components/song/add-song/add-song.component';
import {SearchMusicComponent} from './components/search-music/search-music.component';
import {HeaderComponent} from './components/header/header.component';
import {UserComponent} from './components/user/user.component';
import {AdminComponent} from './components/admin/admin.component';
import {GenresComponent} from './components/genres/genres.component';


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
  },
  {
    path: 'registration',
    component: HeaderComponent
  },
  {
    path: 'login',
    component: HeaderComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'genres',
    component: GenresComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
