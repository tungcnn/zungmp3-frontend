import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Theme} from "../../../interface/theme";
import {Genre} from "../../../interface/genre";
import {Country} from "../../../interface/country";
import {Song} from "../../../interface/song";
import {SongService} from "../../../service/song/song.service";
import {PlaymusicService} from "../../../service/playmusic.service";
import {ThemeService} from "../../../service/theme.service";
import {GenreService} from "../../../service/genre.service";
import {CountryService} from "../../../service/country.service";
import {TokenServiceService} from "../../../service/token/token-service.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ActivatedRoute} from "@angular/router";
import {Singer} from "../../../interface/singer";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {SingerService} from "../../../service/singer/singer.service";
import {Tag} from "../../../interface/tag";
import {TagService} from "../../../service/tag.service";

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css']
})
export class UpdateSongComponent implements OnInit {
  file: File;

  cover: File = null;

  public url: string;

  public coverUrl: string = '';

  public song: Song = {};

  public songs: Song[];

  private currentUserId: string;

  public genres: Genre[];

  public themes: Theme[];

  public countries: Country[];

  public singers: Singer[];

  private newSinger: Singer = {};

  private tags: Tag[];

  private newTag: Tag = {};

  @ViewChild('coverInput', {static: false})
  myCoverInput: ElementRef;

  constructor(private songService: SongService,
              private playService: PlaymusicService,
              private themeService: ThemeService,
              private genreService: GenreService,
              private countryService: CountryService,
              private token: TokenServiceService,
              private activeRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private singerService: SingerService,
              private tagService: TagService) {
    this.activeRoute.paramMap.subscribe(paramMap=>{
      const id = +paramMap.get("id");
      this.songService.findById(id).subscribe(song => {
        this.song = song;
      })
    })
  }

  ngOnInit() {
    this.themeService.getAllTheme().subscribe(themes => {
      this.themes = themes;
    })
    this.genreService.getAllGenre().subscribe(genres => {
      this.genres = genres;
    })
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

  public async uploadImage() {
    return new Promise<any>((resolve, reject) => {
      const coverName = this.cover.name.split('.')[0].replace(/[^\w\s]/gi, '');
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

  public updateConfirm(song: Song): void {
    Swal.fire({
      title: `Are you sure want to update ${song.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.value) {
        if (this.cover != null) {
          song.coverUrl = await this.uploadImage();
        }
        this.songService.editSong(song).subscribe(() => {
            Swal.fire(
              'Updated!',
              'Your music file has been updated.',
              'success'
            )
          },
          (error: HttpErrorResponse) => {
            Swal.fire(
              'Error!',
              'An error occured.',
              'error'
            )
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your music file is safe :)',
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
