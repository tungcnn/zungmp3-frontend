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
  constructor( private search : SearchService , private songServiceService : SongServiceService , private playListService : PlayListService) {
  }

  ngOnInit() {
    this.searchResult()
    this.getAllPlayList()
    this.playLists = []
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  searchResult(){
    this.song.name = this.search.search();
    this.songServiceService.findByName(this.song).subscribe(response => {
      this.songs = response;
    })
  }

  getAllPlayList(){
    this.playListService.getAllPlayList().subscribe(response =>{
      this.playLists = response;
      console.log(response)
    })
  }
}
