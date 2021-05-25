import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Song} from '../../interface/song';
import {SongService} from '../../service/song/song.service';
import {PlayListService} from '../../service/playlist/play-list.service';
import {Playlist} from '../../interface/playlist';
import {TokenServiceService} from '../../service/token/token-service.service';
import {PlaymusicService} from '../../service/playmusic.service';

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit, OnChanges {

  songs: Song[] = [];
  song: Song = {};
  playLists: Playlist[] = [];
  idSong: number = -1;

  constructor(private songServiceService: SongService,
              private playListService: PlayListService
    , private token: TokenServiceService
    , private playMusic: PlaymusicService) {
  }

  ngOnInit() {

    this.getAllPlayList();
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  getAllPlayList() {
    this.playListService.getAllPlayListByUserId(this.token.getUser().id).subscribe(response => {
      this.playLists = response;
    });
  }


  addProfileSong(id: number) {
    this.idSong = id;
  }

  addSongToPlayList(id: number) {
    this.playListService.addSongToPlayList(id, this.idSong).subscribe(() => {
    });
  }

  getSongByName(value) {
    this.song.name = value;
    this.songServiceService.findByName(this.song).subscribe(response => {
      this.songs = response;
    });
  }

  PlaySong(id: number) {
    this.songServiceService.findById(id).subscribe(data => {
      this.playMusic.playsong(data);
    });
  }
}
