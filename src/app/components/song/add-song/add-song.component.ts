import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../service/song/song.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Song} from '../../../interface/song';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {PlaymusicService} from '../../../service/playmusic.service';
import {TokenServiceService} from '../../../service/token/token-service.service';
import {ThemeService} from '../../../service/theme.service';
import {GenreService} from '../../../service/genre.service';
import {CountryService} from '../../../service/country.service';
import {Genre} from '../../../interface/genre';
import {Theme} from '../../../interface/theme';
import {Country} from '../../../interface/country';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  file: File;

  cover: File;

  public url: string;

  public coverUrl: string;

  song: Song = {};

  public songs: Song[];

  private currentUser: any = null;

  public genres: Genre[];

  public themes: Theme[];

  public countries: Country[];

  constructor(private songService: SongService,
              private storage: AngularFireStorage,
              private token: TokenServiceService,
              private themeService: ThemeService,
              private genreService: GenreService,
              private countryService: CountryService) {
  }

  ngOnInit() {
    this.themeService.getAllTheme().subscribe(themes => {
      this.themes = themes;
    });
    this.genreService.getAllGenre().subscribe(genres => {
      this.genres = genres;
    });
    this.countryService.getAllCountry().subscribe(countries => {
      this.countries = countries;
    });
    this.currentUser = this.token.getUser();
  }

  public onFileSelected(event) {
    this.file = event.target.files[0];
  }

  public onCoverSelected(event) {
    this.cover = event.target.files[0];
  }

  public async createSong(song: NgForm) {
    this.url = await this.uploadSong();
    this.coverUrl = await this.uploadImage();
    this.addSong(song);
  }

  public async uploadSong() {
    return new Promise<any>((resolve, reject) => {
      const fileName = this.file.name.split('-')[0].replace(/[^\w\s]/gi, '');
      const filePath = `music/${fileName}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);

      const task = this.storage.upload(filePath, this.file);
      task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(
          res => resolve(res),
          err => reject(err))
        )
      ).subscribe();
    });
  }

  public async uploadImage() {
    return new Promise<any>((resolve, reject) => {
      const coverName = this.cover.name.split('-')[0].replace(/[^\w\s]/gi, '');
      const coverPath = `image/${coverName}_${new Date().getTime()}`;
      const coverRef = this.storage.ref(coverPath);

      const task = this.storage.upload(coverPath, this.file);
      task.snapshotChanges().pipe(
        finalize(() => coverRef.getDownloadURL().subscribe(
          res => resolve(res),
          err => reject(err))
        )
      ).subscribe();
    });
  }

  public addSong(song: NgForm) {
    song.value.url = this.url;
    song.value.user = {
      id: this.currentUser.id
    };
    song.value.coverUrl = this.coverUrl;
    this.songService.addSong(song.value).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Your music has been saved',
        showConfirmButton: false,
        timer: 1500
      });
      song.reset();
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Your music has not been saved',
        showConfirmButton: false,
        timer: 1500
      });
      song.reset();
    });
  }
}
