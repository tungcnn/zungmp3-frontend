import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
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
import {Tag} from "../../../interface/tag";
import {TagService} from "../../../service/tag.service";

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  file: File = null;

  cover: File = null;

  public url: string;

  public coverUrl: string;

  song: Song = {};

  public songs: Song[];

  public currentUserId: string;

  public genres: Genre[];

  public themes: Theme[];

  public countries: Country[];

  public singers: Singer[];

  public newSinger: Singer = {};

  public tags: Tag[];

  public newTag: Tag = {};

  @ViewChild('coverInput', {static: false})
  myCoverInput: ElementRef;

  @ViewChild('fileInput', {static: false})
  myFileInput: ElementRef;

  constructor(private songService: SongService,
              private storage: AngularFireStorage,
              private token: TokenServiceService,
              private themeService: ThemeService,
              private genreService: GenreService,
              private countryService: CountryService,
              private singerService: SingerService,
              private tagService: TagService) {
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
    this.tagService.getAll().subscribe(tags => {
      this.tags = tags;
    })
    this.currentUserId = this.token.getId();
  }

  public onFileSelected(event) {
    const file = event.target.files[0];
    console.log(file.type);
    if (file.type !== "audio/mpeg") {
      Swal.fire({
        icon: 'error',
        title: 'Invalid format',
        text: 'You did not upload a valid audio file',
        showConfirmButton: false,
        timer: 2000
      });
      this.myFileInput.nativeElement.value = '';
    } else {
      this.file = event.target.files[0];
    }
  }

  public onCoverSelected(event) {
    const file = event.target.files[0];
    console.log(file.type);
    if (file.type !== "image/jpeg" ) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid format',
        text: 'You did not upload a valid image file',
        showConfirmButton: false,
        timer: 2000
      });
      this.myCoverInput.nativeElement.value = '';
    } else {
      this.cover = event.target.files[0];
    }
  }

  public async createSong(song: NgForm) {
    if (!this.file) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You havent chosen an audio file',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (song.value.name == undefined || song.value.name == ''){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You havent given your song a name',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      Swal.fire({
        title: `Are you sure want to add this song?`,
        text: 'You will be able to update its info later!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, upload it!',
        cancelButtonText: 'No, I changed my mind',
      }).then(async (result) => {
        if (result.value) {
          let timerInterval;
          Swal.fire({
            title: 'Uploading!',
            html: 'Please wait for about 10 seconds',
            timer: 10000,
            toast: true,
            position: 'top-right',
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    // @ts-ignore
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
          this.url = await this.uploadSong();
          if (this.cover) {
            this.coverUrl = await this.uploadImage();
          }
          this.addSong(song);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Come back soon :)',
            'error'
          );
        }
      });
    }
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
      id: this.currentUserId
    };
    song.value.coverUrl = this.coverUrl;
    this.songService.addSong(song.value).subscribe(() => {
      this.myCoverInput.nativeElement.value = '';
      this.myFileInput.nativeElement.value = '';
      song.reset();
      Swal.fire({
        icon: 'success',
        title: 'Your music has been saved',
        showConfirmButton: false,
        timer: 1500
      });
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Your music has not been saved',
        showConfirmButton: false,
        timer: 1500
      });
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

  public async showAddTagForm() {
    Swal.fire({
      title: `Create new tag`,
      showCancelButton: true,
      confirmButtonText: 'Yes, add this tag!',
      cancelButtonText: 'No, I changed my mind',
      html:
        `<table>
            <tr>
              <td><label>Name</label></td>
              <td><input class="swal2-input" id="name" style="float: left"></td>
            </tr>
            </table>`,
      preConfirm: () => {
        return [
          // @ts-ignore
          document.getElementById("name").value,
        ]
      }
    }).then(async (result) => {
      if (result.value) {
        this.newTag.name = result.value[0];
        this.tagService.addTag(this.newTag).subscribe(() => {
          Swal.fire(
            'Added new tag!',
            'This tag has been added to our system',
            'success'
          )
          this.tagService.getAll().subscribe(tags => {
            this.tags = tags;
          })
        }, error => {
          Swal.fire(
            'Couldnt add new tag!',
            'This tag has not been added to our system',
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
