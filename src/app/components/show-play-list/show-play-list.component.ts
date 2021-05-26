import {Component, OnInit} from '@angular/core';
import {ShowPlayListService} from "../../service/show-play-list.service";
import {Playlist} from "../../interface/playlist";
import {PlayListService} from "../../service/playlist/play-list.service";
import {ActivatedRoute} from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {SongServiceService} from "../../service/song/song-service.service";
import {PlaymusicService} from "../../service/playmusic.service";

@Component({
  selector: 'app-show-play-list',
  templateUrl: './show-play-list.component.html',
  styleUrls: ['./show-play-list.component.css']
})
export class ShowPlayListComponent implements OnInit {
  playList: Playlist = null;

  constructor(private showPlayList: ShowPlayListService, private playListService: PlayListService,
              private activatedRoute: ActivatedRoute,private songService : SongServiceService , private playMusic:PlaymusicService) {
  }

  ngOnInit() {
    this.show(this.showPlayList.id)
    this.activatedRoute.queryParams.subscribe(params => {
      let searchValue = params.q;
      if (searchValue != null) {
        this.show(params['q']);
      }
    });
  }

  show(id: number) {
    this.playListService.getPlayListById(id).subscribe(data => {
      this.playList = data;
    })
  }

  DeteleMusic(id: number, playList_id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't remove this song!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.playListService.deleteSong(id, playList_id).subscribe(() => {
          this.show(playList_id);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        },error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        })
      }
    })
  }

  PlaySong(id: number) {
    this.songService.findById(id).subscribe(data => {
      this.playMusic.playsong(data);
    })
  }
}
