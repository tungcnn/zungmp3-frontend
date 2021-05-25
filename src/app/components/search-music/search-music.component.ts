import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Song} from "../../interface/song";
import {SongServiceService} from "../../service/song/song-service.service";
import {PlayListService} from "../../service/playlist/play-list.service";
import {Playlist} from "../../interface/playlist";
import {TokenServiceService} from "../../service/token/token-service.service";
import {PlaymusicService} from "../../service/playmusic.service";
import {Singer} from "../../interface/singer";
import {ShowPlayListService} from "../../service/show-play-list.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit, OnChanges {

  songs: Song[] = [];
  singers : Singer[] = [];
  playlists : Playlist[] = [];
  song: Song = {};
  playLists: Playlist[] = [];
  idSong: number = -1;

  constructor(private songServiceService: SongServiceService,
              private playListService: PlayListService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private token: TokenServiceService
    , private playMusic: PlaymusicService
    , private showPlayList : ShowPlayListService) {
  }

  ngOnInit() {
    if (this.token.getUser()!=null){this.getAllPlayList()}
    this.activatedRoute.queryParams.subscribe(params => {
      let searchValue = params.q;
      if(searchValue!=null){
        this.getSongByName(params['q']);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  getAllPlayList() {
    this.playListService.getAllPlayListByUserId(this.token.getUser().id).subscribe(response => {
      this.playLists = response;
    })
  }


  addProfileSong(id: number) {
    this.idSong = id;
  }

  addSongToPlayList(id: number) {
    this.playListService.addSongToPlayList(id, this.idSong).subscribe(() => {
    })
  }

  getSongByName(value) {
    this.song.name = value
    this.router.navigate(['/search'], {queryParams: {q: value}});
    this.songServiceService.findByName(this.song).subscribe((response:any) => {
      this.songs = response[0];
      this.playlists = response[1];
      this.singers = response[2];
    })
  }

  PlaySong(id: number) {
    this.songServiceService.findById(id).subscribe(data => {
        this.playMusic.playsong(data);
    })
  }

  nextSearch(id) {
    this.showPlayList.checkPlayList(id);
  }
}
