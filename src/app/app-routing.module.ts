import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddPlayListComponent} from './components/play_list/add-play-list/add-play-list.component';
import {DiscoverComponent} from './components/discover/discover.component';
import {AddSongComponent} from './components/song/add-song/add-song.component';
import {SearchMusicComponent} from "./components/search-music/search-music.component";
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import {GenresComponent} from './components/genres/genres.component';
import {AlbumComponent} from './components/album/album.component';
import {SingerComponent} from './components/singer/singer.component';
import {ShowPlayListComponent} from "./components/show-play-list/show-play-list.component";
import {SongListComponent} from "./components/song/song-list/song-list.component";

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
    path: 'song-list',
    component: SongListComponent
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
  // {
  //   path:'updateUser',
  //   component: UserUpdateComponent
  // },
  {
    path:'deleteUser',
    component: UserDeleteComponent
  },
  {
    path: 'genres',
    component: GenresComponent
  },
  {
    path: 'playListSinger',
    component: GenresComponent
  },
  {
    path: 'singer',
    component: SingerComponent
  },
  {
    path: 'singerAlbum',
    component: AlbumComponent
  },
  {
    path:'showPlayList',
    component: ShowPlayListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
