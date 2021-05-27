import {Component, Directive, OnInit} from '@angular/core';
import {PlayListService} from "../../../service/playlist/play-list.service";
import {Playlist} from "../../../interface/playlist";
import {NgForm} from "@angular/forms";
import {Song} from "../../../interface/song";
import {TokenServiceService} from "../../../service/token/token-service.service";
import {PlaymusicService} from "../../../service/playmusic.service";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {SongService} from "../../../service/song/song.service";

@Component({
  selector: 'app-add-play-list',
  templateUrl: './add-play-list.component.html',
  styleUrls: ['./add-play-list.component.css']
})
export class AddPlayListComponent implements OnInit {
  playListProfile : Playlist = {}
  playList : Playlist = {};
  PlayLists: Playlist[] = [];
  songs: Song[] = [];
  song: Song = {};
  currentUser = this.token.getId()

  constructor(private playListService: PlayListService, private songService: SongService,
              private token: TokenServiceService, private playMusic: PlaymusicService) {
  }

  ngOnInit() {
    if (this.currentUser == null) {

    } else {
      this.getAllPlayList();
    }

  }


  createPlayList(CreateForm: NgForm) {
    this.playListService.createPlayList(this.currentUser,CreateForm.value).subscribe(()=>{
      this.getAllPlayList()
    },() =>{
      Swal.fire("Invalid characters!", "Please only use letters and/or numbers", "warning");
    })
  }


  getAllPlayList() {
    let id: number = this.token.getId();
    this.playListService.getAllPlayListByUserId(id).subscribe(data => {
      this.PlayLists = data;
    });
  }

  editPlayList(form, editForm: NgForm) {
    this.playListService.editPlayList(form.playListProfile.id, editForm.value).subscribe(playList => {
      this.getAllPlayList();
    }, () => {
      alert('Tên không hợp lệ');
    });
  }

  updateFrofilePlayList(id) {
    this.playListService.getPlayListById(id).subscribe(playlist => {
      this.playListProfile = playlist;
    });
  }

  DeletePlayList(form) {
    this.playListService.deletePlayList(form.playListProfile.id).subscribe(() => {
      this.getAllPlayList();
    });
  }

  PlayPlayList(id: number) {
    this.playListService.getPlayListById(id).subscribe(data => {
      this.playMusic.playPlayList(data.songs);
    });
  }
}
