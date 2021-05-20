import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {SongServiceService} from '../../../service/song/song-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Song} from '../../../interface/song';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Singer} from '../../../interface/singer';
import {Album} from '../../../interface/album';
import {Genre} from '../../../interface/genre';
import {Theme} from '../../../interface/theme';
import {Country} from '../../../interface/country';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  public firebase;
  private downloadURL: Observable<string>;
  public songs: Song[];
  public testSong: Song[] = [
    {
      name: 'sdgfsdgfsdgfd',
      releaseDate: '12/123/123',
      lyrics: 'lyrics',
      filename: 'filename',
    },
    {
      name: 'sdgfsdgfsdgfd',
      releaseDate: '12/123/123',
      lyrics: 'lyrics',
      filename: 'filename',
    },
    {
      name: 'sdgfsdgfsdgfd',
      releaseDate: '12/123/123',
      lyrics: 'lyrics',
      filename: 'filename',
    },
    {
      name: 'sdgfsdgfsdgfd',
      releaseDate: '12/123/123',
      lyrics: 'lyrics',
      filename: 'filename',
    },
    {
      name: 'sdgfsdgfsdgfd',
      releaseDate: '12/123/123',
      lyrics: 'lyrics',
      filename: 'filename',
    },
    {
      name: 'sdgfsdgfsdgfd',
      releaseDate: '12/123/123',
      lyrics: 'lyrics',
      filename: 'filename',
    },
    {
      name: 'sdgfsdgfsdgfd',
      releaseDate: '12/123/123',
      lyrics: 'lyrics',
      filename: 'filename',
    },
    {
      name: 'sdgfsdgfsdgfd',
      releaseDate: '12/123/123',
      lyrics: 'lyrics',
      filename: 'filename',
    },
    {
      name: 'sdgfsdgfsdgfd',
      releaseDate: '12/123/123',
      lyrics: 'lyrics',
      filename: 'filename',
    }
  ];

  constructor(private songService: SongServiceService, private storage: AngularFireStorage) {
  }

  ngOnInit() {
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

  public add(addForm: NgForm): void {
    this.songService.addSong(addForm.value).subscribe(
      (response: Song) => {
        console.log(response);
        this.getAllSong();
        addForm.reset();
      });
  }

  public onFileSelected(event) {
    const name = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsMuisc/${name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.firebase = url;
          }
          console.log(this.firebase);
        });
      })
    ).subscribe();
  }
}
