import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../service/song/song.service';
import {Song} from '../../../interface/song';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators'
import {TokenServiceService} from "../../../service/token/token-service.service";
import {ThemeService} from "../../../service/theme.service";
import {GenreService} from "../../../service/genre.service";
import {CountryService} from "../../../service/country.service";
import {Genre} from "../../../interface/genre";
import {Theme} from "../../../interface/theme";
import {Country} from "../../../interface/country";
import {NgForm} from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Singer} from "../../../interface/singer";
import {SingerService} from "../../../service/singer/singer.service";

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

  public singers: Singer[];

  private newSinger: Singer = {};

  constructor(private songService: SongService,
              private storage: AngularFireStorage,
              private token: TokenServiceService,
              private themeService: ThemeService,
              private genreService: GenreService,
              private countryService: CountryService,
              private singerService: SingerService) {
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
    })
    this.singerService.getAllSinger().subscribe(singers => {
      this.singers = singers;
    })
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

      const task = this.storage.upload(coverPath, this.cover);
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

  public async showAddSingerForm() {
      Swal.fire({
        title: `Create new singer`,
        showCancelButton: true,
        confirmButtonText: 'Yes, add this singer!',
        cancelButtonText: 'No, I changed my mind',
        html:
          `<table>
            <tr>
              <td><label>Name</label></td>
              <td><input class="swal2-input" id="name" style="float: left"></td>
            </tr>
            <tr>
              <td><label>Birthday</label></td>
              <td>
                <input type="date"class="swal2-input" id="date" style="float: left">
              </td>
            </tr>
            <tr>
              <td>Description/Biography </td>
              <td>
                <textarea class="swal2-textarea" id="description" style="float:left"></textarea>
              </td>
            </tr>
<!--            <tr>-->
<!--              <td><label>Avatar</label></td>-->
<!--              <td>-->
<!--                <input type="file" class="swal2-file" onchange="onCoverSelected(event)">-->
<!--              </td>-->
<!--            </tr>-->
            </table>`,
        preConfirm: () => {
          return [
            // @ts-ignore
            document.getElementById("name").value,
            // @ts-ignore
            document.getElementById("date").value,
            // @ts-ignore
            document.getElementById("description").value,
          ]
        }
      }).then(async (result) => {
        if (result.value) {
          this.newSinger.name = result.value[0];
          this.newSinger.date = result.value[1];
          this.newSinger.description = result.value[2];
          this.singerService.addSinger(this.newSinger).subscribe(() => {
            Swal.fire(
              'Added new singer!',
              'This singer has been added to our system',
              'success'
            )
            this.singerService.getAllSinger().subscribe(singers => {
              this.singers = singers;
            })
          }, error => {
            Swal.fire(
              'Couldnt add new singer!',
              'This singer has not been added to our system',
              'error'
            )
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Maybe next time',
            'error'
          )
        }
      })
  }
}
