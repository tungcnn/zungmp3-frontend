import {Component, OnInit} from '@angular/core';
import {Song} from "../../interface/song";
import {PlaymusicService} from "../../service/playmusic.service";
import {SongServiceService} from "../../service/song/song-service.service";

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


  constructor(private playService: PlaymusicService,
              private songService: SongServiceService) {
  }

  ngOnInit() {
    this.getListSong();
    this.getTop15();
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
      })
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
}
