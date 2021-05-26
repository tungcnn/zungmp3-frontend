import {Component, OnInit} from '@angular/core';
import {Singer} from '../../../interface/singer';

import {SingerService} from '../../../service/singer/singer.service';
import {SongService} from '../../../service/song/song.service';
import {PlaymusicService} from '../../../service/playmusic.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {CommentService} from '../../../service/comment/comment.service';
import {Songcomment} from '../../../interface/songcomment';
import {TokenServiceService} from '../../../service/token/token-service.service';
import {Song} from '../../../interface/song';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {

  public songid = 1;
  public singer: Singer;
  public songcomment: Songcomment[];
  public comment: Songcomment = {};
  public currentUser: any = null;
  public songs: Song[] = [];


  constructor(private singerService: SingerService,
              private songService: SongService,
              private playService: PlaymusicService,
              private commentService: CommentService,
              private token: TokenServiceService) {
  }

  ngOnInit() {
    this.getByIdSinger(this.songid);
    this.getComment();
    this.getAllSong(this.songid);
    this.currentUser = this.token.getUser();
  }

  public getByIdSinger(id): void {
    this.singerService.findById(id).subscribe(
      (response: Singer) => {
        this.singer = response;
        console.log(this.singer);
        this.getComment();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllSong(id: number): void {
    this.songService.getAllSongByUserId(id).subscribe(
      (response: Song[]) => {
        this.songs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public playSong(id: number) {
    this.songService.findById(id).subscribe(data => {
      this.playService.playsong(data);
    });
  }


  public getComment(): void {
    this.commentService.getAllSongId().subscribe(
      (response: Songcomment[]) => {
        this.songcomment = response;
        console.log(this.songcomment);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public createComment(comment: NgForm) {
    comment.value.user = {
      id: this.currentUser.id
    };
    comment.value.song = {
      id: this.songid
    };
    this.commentService.addComment(comment.value).subscribe(
      (response: Songcomment) => {
        console.log(response);
        this.getComment();
        comment.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        comment.reset();
      }
    );
  }
}
