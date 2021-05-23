import {Component, OnInit} from '@angular/core';
import {SongServiceService} from '../../../service/song/song-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Song} from '../../../interface/song';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {PlaymusicService} from "../../../service/playmusic.service";


@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  public url;
  public songs: Song[];
  public editSong: Song;
  public removeSong: Song;

  constructor(private songService: SongServiceService,
              private storage: AngularFireStorage,
              private playService: PlaymusicService) {
  }

  ngOnInit() {
    this.getAllSong();
  }

  public getAllSong(): void {
    this.songService.getAllSong().subscribe(
      (response: Song[]) => {
        this.songs = response;
        console.log(this.songs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  playmusic(id: number) {
    this.songService.findById(id).subscribe(song => {
      this.playService.playsong(song);
    });
  }

  public onFileSelected(event) {
    const file = event.target.files[0];
    console.log(file);
    const fileName = file.name.split('.')[0].replace(/[^\w\s]/gi, '');
    const filePath = `music/${fileName}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).snapshotChanges().pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.url = url;
          const song: Song = {
            name: fileName,
            url: this.url
          }
          this.songService.addSong(song).subscribe(
            (response: Song) => {
              console.log(response);
              this.getAllSong();
            });
          alert('Upload successful!');
        });
      })
    ).subscribe();
  }

  public onOpenModal(song: Song, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    // if (mode === 'add') {
    //   button.setAttribute('data-target', '#addBook');
    // }
    if (mode === 'edit') {
      this.editSong = song;
      button.setAttribute('data-target', '#edit');
    }
    if (mode === 'delete') {
      this.removeSong = song;
      button.setAttribute('data-target', '#deletesong');
    }
    // if (mode === 'view') {
    //   this.viewBook = book;
    //   button.setAttribute('data-target', '#viewBook');
    // }
    container.appendChild(button);
    button.click();
  }

  public deleteSongz(id: number): void {
    this.songService.deleteSong(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllSong();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public upDateSong(song: Song): void {
    this.songService.editSong(song).subscribe(
      (response: Song) => {
        console.log(response);
        this.getAllSong();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
