import {Component, OnInit} from '@angular/core';
import {Song} from '../../interface/song';
import {PlaymusicService} from '../../service/playmusic.service';
import {SongService} from '../../service/song/song.service';
import {Playlist} from "../../interface/playlist";
import {PlayListService} from "../../service/playlist/play-list.service";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  songs: Song[] = [];

  selectedSong: Song;

  currentPlayingSongs: Song[] = [];

  top5Songs: Song[] = [];

  top10Songs: Song[] = [];

  top15Songs: Song[] = [];

  top15Likes : Song[] ;

  top5SongsLike: Song[] = [];

  top10SongsLike: Song[] = [];

  top15SongsLike: Song[] = [];

  top15DatePlayList : Playlist[] = [];

  constructor(private playService: PlaymusicService,
              private songService: SongService ,
              private playList : PlayListService) {
  }

  ngOnInit() {
    this.getListSong();
    this.getTop15();
    this.getTop15Likes();
    this.getTop15Date();
  }

  selectSong(id: number) {
    this.songService.findById(id).subscribe(song => {
      this.selectedSong = song;
      this.currentPlayingSongs[0] = this.selectedSong;
      this.playmusic();
    });
  }

  getListSong() {
    if (this.songs.length == 0) {
      this.songService.getLatestSong().subscribe(songs => {
        this.songs = songs;
        console.log(this.songs);
      });
    }
  }

  playmusic() {
    this.playService.playsong(this.selectedSong);
  }

  getTop15() {
    this.songService.getTop15().subscribe(songs => {
      this.top5Songs = songs.slice(0, 5);
      this.top10Songs = songs.slice(5, 10);
      this.top15Songs = songs.slice(10, 15);
    });
  }

  getTop15Likes(){
    this.songService.getTop15Likes().subscribe(songs =>{
      this.top5SongsLike = songs.slice(0, 5);
      this.top10SongsLike = songs.slice(5, 10);
      this.top15SongsLike = songs.slice(10, 15);
    })
  }

  getTop15Date(){
    this.playList.getTop15Date().subscribe(playLists =>{
      this.top15DatePlayList = playLists;
      console.log(playLists)
    })
  }
}
