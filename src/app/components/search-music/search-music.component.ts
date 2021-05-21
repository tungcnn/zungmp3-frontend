import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Song} from "../../interface/song";
import {SearchService} from "../../service/search.service";
import {SongServiceService} from "../../service/song/song-service.service";
import {PlayListService} from "../../service/playlist/play-list.service";
import {Playlist} from "../../interface/playlist";

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit,OnChanges {

  songs : Song[] = [];
  song : Song = {};
  playLists : Playlist[] = [];
  idSong : number = -1;
  constructor( private search : SearchService , private songServiceService : SongServiceService , private playListService : PlayListService) {
  }

  ngOnInit() {
    this.searchResult()
    this.getAllPlayList()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.searchResult()
  }

  searchResult(){
    this.song.name = this.search.search();
    this.songServiceService.findByName(this.song).subscribe(response => {
      this.songs = response;
    },() => {
      this.songs = []
    })
  }

  getAllPlayList(){
    this.playListService.getAllPlayList().subscribe(response =>{
      this.playLists = response;
    })
  }


  addProfileSong(id: number) {
    this.idSong = id;
  }

  addSongToPlayList(id: number) {
    this.playListService.addSongToPlayList(id,this.idSong).subscribe(()=>{
    })
  }
}
