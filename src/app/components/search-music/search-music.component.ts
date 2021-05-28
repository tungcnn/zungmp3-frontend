import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Song} from "../../interface/song";
import {PlayListService} from "../../service/playlist/play-list.service";
import {Playlist} from "../../interface/playlist";
import {TokenServiceService} from "../../service/token/token-service.service";
import {PlaymusicService} from "../../service/playmusic.service";
import {Singer} from "../../interface/singer";
import {ShowPlayListService} from "../../service/show-play-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SongService} from "../../service/song/song.service";
import {LikePlayListService} from "../../service/like/like-play-list.service";
import {LikeSongService} from "../../service/like/like-song.service";
import {LikeService} from "../../service/like.service";

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit, OnChanges {

  songs: Song[] = [];
  singers: Singer[] = [];
  playlists: Playlist[] = [];
  song: Song = {};
  playLists: Playlist[] = [];
  idSong: number = -1;
  currentUserId;

  constructor(private songServiceService: SongService,
              private playListService: PlayListService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public token: TokenServiceService,
              private playMusic: PlaymusicService,
              private showPlayList: ShowPlayListService,
              private likeSong: LikeSongService ,
              private likeService :LikeService) {
    this.currentUserId = this.token.getId();
  }

  ngOnInit() {
    if (this.token.getUser() != null) {
      this.getAllPlayList()
    }
    this.activatedRoute.queryParams.subscribe(params => {
      let searchValue = params.q;
      if (searchValue != null) {
        this.getSongByName(params['q']);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  getAllPlayList() {
    this.playListService.getAllPlayListByUserId(this.currentUserId).subscribe(response => {
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
    this.song.name = value
    this.router.navigate(['/search'], {queryParams: {q: value}});
    this.songServiceService.findByName(this.song).subscribe((response: any) => {
      this.songs = response[0];
      this.playlists = response[1];
      this.singers = response[2];
      this.songs = this.likeService.checkLikeSong(this.currentUserId , this.songs)
      this.playlists = this.likeService.checkLikePlayList(this.currentUserId , this.playlists)
    })
  }

  PlaySong(id: number) {
    this.songServiceService.findById(id).subscribe(data => {
      this.playMusic.playsong(data);
    });
  }

  nextSearch(id) {
    this.showPlayList.checkPlayList(id);
  }

  like(id: number) {
    this.likeService.likePlayList(id , this.currentUserId);
    this.activatedRoute.queryParams.subscribe(params => {
      let searchValue = params.q;
      if (searchValue != null) {
        this.getSongByName(params['q']);
      }
    });
  }

  unLike(id: number) {
    this.likeService.unLikePlayList(id , this.currentUserId);
    this.activatedRoute.queryParams.subscribe(params => {
      let searchValue = params.q;
      if (searchValue != null) {
        this.getSongByName(params['q']);
      }
    });
  }


  addLikeSong(id: number) {
    this.likeService.likeSongs(this.currentUserId , id)
    this.activatedRoute.queryParams.subscribe(params => {
      let searchValue = params.q;
      if (searchValue != null) {
        this.getSongByName(params['q']);
      }
    });
  }

  unLikeSong(id: number) {
    this.likeService.unLikeSongs(id , this.currentUserId);
    this.activatedRoute.queryParams.subscribe(params => {
      let searchValue = params.q;
      if (searchValue != null) {
        this.getSongByName(params['q']);
      }
    });
  }
}
