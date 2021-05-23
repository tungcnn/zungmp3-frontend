import {Component, Directive, OnInit} from '@angular/core';
import {PlayListService} from "../../../service/playlist/play-list.service";
import {Playlist} from "../../../interface/playlist";
import {NgForm} from "@angular/forms";
import {Song} from "../../../interface/song";
import {SongServiceService} from "../../../service/song/song-service.service";
import {TokenServiceService} from "../../../service/token/token-service.service";
import {PlaymusicService} from "../../../service/playmusic.service";


@Component({
  selector: 'app-add-play-list',
  templateUrl: './add-play-list.component.html',
  styleUrls: ['./add-play-list.component.css']
})
export class AddPlayListComponent implements OnInit {
  playListProfile : Playlist = {}
  playList : Playlist = {};
  PlayLists: Playlist[] = [];
  songs : Song[] = []
  song : Song = {}

  constructor(private playListService: PlayListService , private songService : SongServiceService ,
              private  token : TokenServiceService , private playMusic : PlaymusicService) { }

  ngOnInit() {
    if (this.token.getUser().id==null){

    }else {this.getAllPlayList();
    }

  }


  createPlayList(CreateForm: NgForm) {

    this.playListService.createPlayList(this.token.getUser().id,CreateForm.value).subscribe(()=>{
      this.getAllPlayList()
    },() =>{
     alert("Tên không hợp lệ")
    })
  }

  // getAllPlayList(){
  //   console.log(this.token.getUser())
  //   this.playListService.getAllPlayList().subscribe(playlists => {
  //     this.PlayLists = playlists;
  //   })
  // }

  getAllPlayList(){
    let id : number = this.token.getUser().id
    this.playListService.getAllPlayListByUserId(id).subscribe(data=>{
      this.PlayLists = data;
    })
  }

  editPlayList(form , editForm: NgForm) {
      this.playListService.editPlayList(form.playListProfile.id , editForm.value).subscribe(playList =>{
       this.getAllPlayList()
      }, ()=>{
        alert("Tên không hợp lệ")
      })
  }

  updateFrofilePlayList(id) {
   this.playListService.getPlayListById(id).subscribe(playlist =>{
     this.playListProfile = playlist
   })
  }

  DeletePlayList(form) {
    this.playListService.deletePlayList(form.playListProfile.id).subscribe(()=>{
      this.getAllPlayList();
    })
  }

  PlayPlayList(id: number) {
    this.playListService.getPlayListById(id).subscribe(data =>{
        this.playMusic.playPlayList(data.songs);
    })
  }
}
