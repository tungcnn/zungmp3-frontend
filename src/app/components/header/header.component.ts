import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SongServiceService} from "../../service/song/song-service.service";
import {NgForm} from "@angular/forms";
import {Song} from "../../interface/song";
import {SearchService} from "../../service/search.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    songs : Song[] = []
    song: Song = {};

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  search(value: string) {
    this.searchService.searchValue(value)
  }
}
