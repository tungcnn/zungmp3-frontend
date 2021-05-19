import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicplayerComponent } from './musicplayer/musicplayer.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AddSongComponent } from './song/add-song/add-song.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicplayerComponent,
    SidemenuComponent,
    AddSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
