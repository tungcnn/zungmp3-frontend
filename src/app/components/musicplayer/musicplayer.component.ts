import {Component, OnChanges, OnInit} from '@angular/core';
import {PlaymusicService} from '../../service/playmusic.service';


@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.css']
})
export class MusicplayerComponent implements OnInit {
  constructor(private playService: PlaymusicService) {
  }

  ngOnInit() {
  }
}
