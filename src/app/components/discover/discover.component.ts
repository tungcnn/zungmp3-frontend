import {Component, OnInit} from '@angular/core';
import {Song} from '../../interface/song';
import {PlaymusicService} from '../../service/playmusic.service';
import {SongService} from '../../service/song/song.service';

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

  constructor(private playService: PlaymusicService,
              private songService: SongService) {
  }

  ngOnInit() {
    this.getListSong();
    this.getTop15();
    this.getTop15Likes()
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
    this.songService.getTop15Likes().subscribe(data =>{
      this.top15Likes = data
    })
  }
}
