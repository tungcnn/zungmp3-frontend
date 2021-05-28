import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../service/song/song.service';
import {PlaymusicService} from '../../../service/playmusic.service';
import {ThemeService} from '../../../service/theme.service';
import {GenreService} from '../../../service/genre.service';
import {CountryService} from '../../../service/country.service';
import {Theme} from '../../../interface/theme';
import {Genre} from '../../../interface/genre';
import {Country} from '../../../interface/country';
import {Song} from '../../../interface/song';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {TokenServiceService} from '../../../service/token/token-service.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  public themes: Theme[];
  public themeHtml: string;
  public genres: Genre[];
  public genreHtml: string;
  public countries: Country[];
  public countryHtml: string;
  public currentUserId: number;
  public songs: Song[] = [];
  song: Song = {};

  constructor(private songService: SongService,
              private playService: PlaymusicService,
              private themeService: ThemeService,
              private genreService: GenreService,
              private countryService: CountryService,
              private token: TokenServiceService) {
  }

  ngOnInit() {
    this.themeService.getAllTheme().subscribe(themes => {
      this.themes = themes;
      for (const theme of themes) {
        this.themeHtml += `<option value="${theme.id}">${theme.name}</option>`;
      }
    });
    this.genreService.getAllGenre().subscribe(genres => {
      this.genres = genres;
      for (const genre of genres) {
        this.genreHtml += `<option value="${genre.id}">${genre.name}</option>`;
      }
    });
    this.countryService.getAllCountry().subscribe(countries => {
      this.countries = countries;
      for (const country of countries) {
        this.countryHtml += `<option value="${country.id}">${country.name}</option>`;
      }
    });
    this.currentUserId = this.token.getId();
    if (this.currentUserId == null) {

    } else {
      this.getAllSong(this.currentUserId);
    }
  }

  playmusic(id: number) {
    this.songService.findById(id).subscribe(song => {
      this.playService.playsong(song);
    });
  }

  public getAllSong(id: number): void {
    this.songService.getAllSongByUserId(id).subscribe(
      (response: Song[]) => {
        this.songs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteSong(id: number): void {
    this.songService.deleteSong(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllSong(this.currentUserId);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteConfirm(song: Song): void {
    Swal.fire({
      title: `Are you sure want to remove ${song.name}?`,
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.deleteSong(song.id);
        Swal.fire(
          'Deleted!',
          'Your music file has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your music file is safe :)',
          'error'
        );
      }
    });
  }
}
