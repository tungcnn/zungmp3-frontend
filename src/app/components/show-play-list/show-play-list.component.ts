import {Component, OnInit} from '@angular/core';
import {ShowPlayListService} from '../../service/show-play-list.service';
import {Playlist} from '../../interface/playlist';
import {PlayListService} from '../../service/playlist/play-list.service';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {PlaymusicService} from '../../service/playmusic.service';
import {SongService} from '../../service/song/song.service';
import {Playcomment} from '../../interface/playListcomment';
import {PlaylistcommentService} from '../../service/comment/playlistcomment.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Songcomment} from '../../interface/songcomment';
import {TokenServiceService} from '../../service/token/token-service.service';

@Component({
  selector: 'app-show-play-list',
  templateUrl: './show-play-list.component.html',
  styleUrls: ['./show-play-list.component.css']
})
export class ShowPlayListComponent implements OnInit {
  public playList: Playlist = null;
  public playlistcomment: Playcomment[];
  public currentUser;
  public comments: Playcomment = {playlist: undefined, user: undefined};

  constructor(private showPlayList: ShowPlayListService,
              private playListService: PlayListService,
              private activatedRoute: ActivatedRoute,
              private songService: SongService,
              private playMusic: PlaymusicService,
              private seviceCommentPlaylist: PlaylistcommentService,
              private token: TokenServiceService) {
  }

  ngOnInit() {
    this.show(this.showPlayList.id);
    this.activatedRoute.queryParams.subscribe(params => {
      let searchValue = params.q;
      if (searchValue != null) {
        this.show(params['q']);
      }
    });
    this.getCommentPlaylist();
    this.currentUser = this.token.getId();
  }

  show(id: number) {
    this.playListService.getPlayListById(id).subscribe(data => {
      this.playList = data;
    });
  }

  DeteleMusic(id: number, playList_id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t remove this song!',
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
          );
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
        });
      }
    });
  }

  PlaySong(id: number) {
    this.songService.findById(id).subscribe(data => {
      this.playMusic.playsong(data);
    });
  }

  public getCommentPlaylist(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let searchValue = params.q;
      if (searchValue != null) {
        let id = params['q'];
        this.seviceCommentPlaylist.getAllCommentPlaylist(id).subscribe(
          (response: Playcomment[]) => {
            this.playlistcomment = response;
            console.log(this.playlistcomment);
          },
          (error: HttpErrorResponse) => {
            alert(error);
          }
        );
      }
    });
  }

  public createCommentPlaylist(comment: NgForm) {
    comment.value.user = {
      id: this.currentUser,
    };
    comment.value.playlist = {
      id: this.playList.id
    }
    this.seviceCommentPlaylist.addCommentPlaylist(comment.value).subscribe(
      (response: Songcomment) => {
        console.log(response);
        this.getCommentPlaylist();
        comment.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        comment.reset();
      }
    );
  }

  playAllplayList() {
    this.playMusic.playPlayList(this.playList.songs)
  }
}
