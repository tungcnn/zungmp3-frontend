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
  constructor(private playService: PlaymusicService,
              private songService: SongServiceService) {
  }

  ngOnInit() {
    this.getListSong();
  }

  selectSong(id: number) {
    this.songService.findById(id).subscribe(song => {
      this.selectedSong = song;
      this.currentPlayingSongs[0] = this.selectedSong;
      this.playmusic();
    });
  }
  getListSong() {
    this.songService.getAllSong().subscribe(songs => {
      this.songs = songs;
    })
  }
  playmusic() {
    this.playService.playmusic(this.currentPlayingSongs);
  }
}
