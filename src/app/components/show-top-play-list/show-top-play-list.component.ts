import {Component, OnInit} from '@angular/core';
import {PlayListService} from "../../service/playlist/play-list.service";
import {Playlist} from "../../interface/playlist";
import {ShowPlayListService} from "../../service/show-play-list.service";
import {PlaymusicService} from "../../service/playmusic.service";

@Component({
  selector: 'app-show-top-play-list',
  templateUrl: './show-top-play-list.component.html',
  styleUrls: ['./show-top-play-list.component.css']
})
export class ShowTopPlayListComponent implements OnInit {
  top15views: Playlist[];
  top15Likes: Playlist[];
  playList: Playlist;

  constructor(private playListService: PlayListService,
              private showPlayList: ShowPlayListService,
              private playMusic: PlaymusicService) {
  }

  ngOnInit() {
    this.playListService.getTop15likes().subscribe(data => {
      this.top15Likes = data;
      console.log(data[0].likeTotalPlayList)
    })
    this.playListService.getTop15views().subscribe(data => {
      this.top15views = data
      console.log(data)
    })
  }

  nextSearch(id) {
    this.showPlayList.checkPlayList(id);
  }

  playAllplayList(id: number) {
    this.playListService.getPlayListById(id).subscribe(data => {
      this.playList = data;
      this.playMusic.playPlayList(this.playList.songs);
    });
  }
}
