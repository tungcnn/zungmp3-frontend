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
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {

  public songid;
  public song: Song;
  public songcomment: Songcomment[];
  public comment: Songcomment = {};
  public currentUserId;

  constructor(private singerService: SingerService,
              private songService: SongService,
              private playService: PlaymusicService,
              private commentService: CommentService,
              private token: TokenServiceService,
              private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe(paramMap=>{
      this.songid = +paramMap.get("id");
    })
  }

  ngOnInit() {
    this.getByIdSong(this.songid);
    this.getComment();
    this.currentUserId = this.token.getId();
  }

  public getByIdSong(id): void {
    this.songService.findById(id).subscribe(
      (response: Song) => {
        this.song = response;
        this.getComment();
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
    this.commentService.getAllCommentBySongId(this.songid).subscribe(
      (response: Songcomment[]) => {
        this.songcomment = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public createComment(comment: NgForm) {
    comment.value.user = {
      id: this.currentUserId
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
