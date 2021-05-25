import { Component, OnInit } from '@angular/core';
import {ShowPlayListService} from "../../service/show-play-list.service";
import {Playlist} from "../../interface/playlist";
import {PlayListService} from "../../service/playlist/play-list.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-play-list',
  templateUrl: './show-play-list.component.html',
  styleUrls: ['./show-play-list.component.css']
})
export class ShowPlayListComponent implements OnInit {
  playList:Playlist = null;
  constructor(private showPlayList:ShowPlayListService , private playListService:PlayListService ,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.show(this.showPlayList.id)
    this.activatedRoute.queryParams.subscribe(params => {
      let searchValue = params.q;
      if(searchValue!=null){
        this.show(params['q']);
      }
    });
  }

  show(id:number){
    this.playListService.getPlayListById(id).subscribe(data =>{
      this.playList = data;
    })
  }
}
