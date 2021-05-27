import { Component, OnInit } from '@angular/core';
import {PlayListService} from "../../service/playlist/play-list.service";
import {Playlist} from "../../interface/playlist";

@Component({
  selector: 'app-show-top-play-list',
  templateUrl: './show-top-play-list.component.html',
  styleUrls: ['./show-top-play-list.component.css']
})
export class ShowTopPlayListComponent implements OnInit {
  top15views : Playlist[];
  top15Likes : Playlist[];
  constructor(private playList:PlayListService) { }

  ngOnInit() {
    this.playList.getTop15likes().subscribe(data =>{
      this.top15Likes = data;
      console.log(data)
    })
    this.playList.getTop15views().subscribe(data =>{
      this.top15views = data
      console.log(data)
    })
  }

}
