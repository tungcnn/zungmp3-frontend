import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MusicplayerComponent} from './components/musicplayer/musicplayer.component';
import {SidemenuComponent} from './components/sidemenu/sidemenu.component';
import {AddPlayListComponent} from './components/play_list/add-play-list/add-play-list.component';
import {AddSongComponent} from './components/song/add-song/add-song.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DiscoverComponent} from './components/discover/discover.component';
import {SearchbarComponent} from './components/searchbar/searchbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {CommonModule} from '@angular/common';
import {SearchMusicComponent} from './components/search-music/search-music.component';
import {UserComponent} from './components/user/user.component';
import {AdminComponent} from './components/admin/admin.component';
import {ProfileComponent} from './components/profile/profile.component';
import {GenresComponent} from './components/genres/genres.component';
import { SingerComponent } from './components/singer/singer.component';
import { AlbumComponent } from './components/album/album.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicplayerComponent,
    SidemenuComponent,
    AddPlayListComponent,
    AddSongComponent,
    DiscoverComponent,
    SearchbarComponent,
    FooterComponent,
    HeaderComponent,
    SearchMusicComponent,
    UserComponent,
    AdminComponent,
    ProfileComponent,
    GenresComponent,
    SingerComponent,
    AlbumComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
