import { Injectable } from '@angular/core';
import {Playlist} from "../interface/playlist";
import {PlayListService} from "./playlist/play-list.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ShowPlayListService {
  id : number;
  constructor(private playListService:PlayListService , private router: Router) { }

  checkPlayList(id:number){
    this.id = id;
    this.router.navigate(['/showPlayList'], {queryParams: {q: id}});
  }

  showPlayListInfo(){
    return this.id;
  }
}
