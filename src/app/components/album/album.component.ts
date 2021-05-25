import {Component, OnInit} from '@angular/core';
import {Singer} from '../../interface/singer';
import {HttpErrorResponse} from '@angular/common/http';
import {SingerService} from '../../service/singer/singer.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  public singers: Singer [] = [];
  public viewSinger: Singer;

  constructor(private singerService: SingerService) {
  }

  ngOnInit() {
    this.getAllSinger();
  }

  public getAllSinger(): void {
    this.singerService.getAllSinger().subscribe(
      (response: Singer[]) => {
        this.singers = response;
        console.log(this.singers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public openview(singer: Singer) {
    this.viewSinger = singer;
  }
}
