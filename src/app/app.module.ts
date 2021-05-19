import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicplayerComponent } from './components/musicplayer/musicplayer.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { AddPlayListComponent } from './components/play_list/add-play-list/add-play-list.component';
import { AddSongComponent } from './components/song/add-song/add-song.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";

@NgModule({
  declarations: [
    AppComponent,
    MusicplayerComponent,
    SidemenuComponent,
    AddPlayListComponent,
    AddSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
