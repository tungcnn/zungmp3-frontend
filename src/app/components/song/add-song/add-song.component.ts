import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SongServiceService} from '../../../service/song/song-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Song} from '../../../interface/song';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  public url;
  private downloadURL: Observable<string>;
  public songs: Song[];

  constructor(private songService: SongServiceService,
              private storage: AngularFireStorage) {
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

  public onFileSelected(event) {
    const file = event.target.files[0];
    const fileName = file.name.split('.')[0].replace(/[^\w\s]/gi, '');
    const filePath = `music/${fileName}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).snapshotChanges().pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.url = url;
          const song: Song = {
            name: fileName,
            filename: this.url
          }
          this.songService.addSong(song).subscribe(
            (response: Song) => {
              this.getAllSong();
            });
          alert('Upload successful!')
        })
      })
    ).subscribe();
  }
}
