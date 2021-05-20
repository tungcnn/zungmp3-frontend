import {Component, OnChanges, OnInit} from '@angular/core';
import {Song} from "../../interface/song";
import {PlaymusicService} from "../../service/playmusic.service";


@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.css']
})
export class MusicplayerComponent implements OnInit {
  constructor(private playmusicService: PlaymusicService) { }

  ngOnInit() {
  }
  // loops() {
  //   this.playmusicService.loopsong();
  // }
  // shuffle() {
  //   this.playmusicService.shuffles();
  // }
}
