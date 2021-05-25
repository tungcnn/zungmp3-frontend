import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {SingerService} from '../../service/singer/singer.service';
import {Singer} from '../../interface/singer';
import {SongService} from '../../service/song/song.service';
import {PlaymusicService} from '../../service/playmusic.service';
import {Song} from '../../interface/song';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.css']
})
export class SingerComponent implements OnInit {
  public singerid = 3;
  public lisSong = 3;

  public singers: Singer[] = [];
  public songList: any [] = [];
  public viewSinger: Singer;
  public songs: Song[] = [];

  constructor(private singerService: SingerService,
              private songService: SongService,
              private playService: PlaymusicService) {
  }

  ngOnInit() {
    this.getByIdSinger(this.singerid);
    this.getListSongId(this.lisSong);
  }

  public getByIdSinger(id): void {
    this.singerService.findById(id).subscribe(
      (response: Singer) => {
        this.viewSinger = response;
        console.log(this.singers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getListSongId(id): void {
    this.songService.getListSongId(id).subscribe(
      (response: any) => {
        this.songList = response;
        console.log(this.songList);
        for (let i = 0; i < this.songList.length; i++) {
          this.songs[i] = {
            name: this.songList[i][0],
            url: this.songList[i][4],
            singers: []
          };
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public playSong(id) {
    this.songService.findById(id).subscribe(data => {
      this.playService.playsong(data);
    });
  }

  playAllSong() {
    console.log(this.songs);
    this.playService.playPlayList(this.songs);
  }
}
