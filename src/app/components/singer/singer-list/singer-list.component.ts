import {Component, OnInit} from '@angular/core';
import {SingerService} from '../../../service/singer/singer.service';
import {Singer} from '../../../interface/singer';
import {SongService} from '../../../service/song/song.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Song} from '../../../interface/song';
import {ActivatedRoute} from '@angular/router';
import {PlaymusicService} from '../../../service/playmusic.service';

@Component({
  selector: 'app-singer-list',
  templateUrl: './singer-list.component.html',
  styleUrls: ['./singer-list.component.css']
})
export class SingerListComponent implements OnInit {
  public singerid;
  public songid;
  public singers: Singer[] = [];
  public listSongs: Song[] = [];
  public songList: any [] = [];

  constructor(private serviceSinger: SingerService,
              private service: SongService,
              private activeRoute: ActivatedRoute,
              private playService: PlaymusicService) {
    this.activeRoute.paramMap.subscribe(paramMap => {
      this.singerid = +paramMap.get('id');
      this.songid = +paramMap.get('id');
    });
  }

  ngOnInit() {
    this.getAllSinger();
  }

  public getAllSinger(): void {
    this.serviceSinger.getAllSinger().subscribe(
      (response: Singer[]) => {
        this.singers = response;
        console.log(this.singers);
      }
    );
  }

  public getAll(id): void {
    this.service.getListSongId(id).subscribe(
      (response: any) => {
        this.songList = response;
        console.log(this.songList);
        for (let i = 0; i < this.songList.length; i++) {
          this.listSongs[i] = {
            name: this.songList[i][0],
            url: this.songList[i][4],
            singers: []
          };
        }
        this.playService.playPlayList(this.listSongs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public playAllSiger(id: number) {
    this.getAll(id);

  }
}
