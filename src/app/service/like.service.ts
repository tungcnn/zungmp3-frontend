import { Injectable } from '@angular/core';
import {Playlist} from "../interface/playlist";
import {LikePlayListService} from "./like/like-play-list.service";
import {LikeSongService} from "./like/like-song.service";
import {Song} from "../interface/song";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private likeService: LikePlayListService,
              private likeSong: LikeSongService) { }

  checkLikePlayList(idUser , playLists:Playlist[]){
    this.likeService.checkLike(idUser).subscribe((data: any) => {
      for (let i = 0; i < playLists.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[j].playlist.id == playLists[i].id) {
            playLists[i].checkLike = true;
          }
        }
      }
    })
    return playLists;
  }

  unLikePlayList(id , idUser){
      this.likeService.unLike(id, idUser).subscribe(() => {
      })
  }

  likePlayList(idPlayList , idUser){
    this.likeService.addLike(idUser, idPlayList).subscribe(data => {
    })
  }

  checkLikeSong(idUser , songs : Song[]){
    this.likeSong.checkLike(idUser).subscribe((data: any) => {
      for (let i = 0; i < songs.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[j].song.id == songs[i].id) {
            songs[i].checkLike = true;
          }
        }
      }
    })
    return songs;
  }

  likeSongs(idUser , idSong){
    this.likeSong.addLike(idUser, idSong).subscribe(data => {
    })
  }

  unLikeSongs(idSong , idUser){
    this.likeSong.unLike(idSong, idUser).subscribe(() => {
    })
  }
}
