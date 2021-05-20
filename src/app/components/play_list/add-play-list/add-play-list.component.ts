import {Component, Directive, OnInit} from '@angular/core';
import {PlayListService} from "../../../service/playlist/play-list.service";
import {Playlist} from "../../../interface/playlist";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-add-play-list',
  templateUrl: './add-play-list.component.html',
  styleUrls: ['./add-play-list.component.css']
})
export class AddPlayListComponent implements OnInit {
  playListProfile : Playlist = {}
  playList : Playlist = {};
  PlayLists: Playlist[] = [];
  constructor(private playListService: PlayListService) { }

  ngOnInit() {
    this.getAllPlayList();

  }


  createPlayList(CreateForm: NgForm) {
    this.playListService.createPlayList(CreateForm.value).subscribe(()=>{
    })
  }

  getAllPlayList(){
    this.playListService.getAllPlayList().subscribe(playlists => {
      // this.PlayLists = playlists.content;
      console.log(playlists)
    })
  }


  editPlayList(a , editForm: NgForm) {
      this.playListService.editPlayList(a.playListProfile.id , editForm.value).subscribe(playList =>{
        this.playList = playList;
      })
  }

  updateFrofilePlayList(id) {
    this.playListProfile.id = id;
  }
}
