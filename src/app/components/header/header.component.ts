import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SongServiceService} from "../../service/song/song-service.service";
import {NgForm} from "@angular/forms";
import {Song} from "../../interface/song";
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { TokenServiceService } from 'src/app/service/token/token-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    formRegistration: any = {};
  user:User={};
  isSuccessful =false;
  isRegistrationFailed = false;
  errorMessageRegistration = '';

  formLogin: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessageLogin = '';

  constructor(
    private authService: AuthService,
      private router: Router,
      private tokenStorage: TokenServiceService) { }

  ngOnInit() {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles;
    }
  }

  registration(value : NgForm){
    this.authService.registration(value.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isRegistrationFailed = false;
      },
      err => {
        this.errorMessageRegistration = err.error.message;
        this.isRegistrationFailed = true;
      }
    )
  }

  login(abc : NgForm){
    this.authService.login(abc.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessageLogin = err.error.message;
        this.isLoginFailed = true;
      }
    )
  }
  reloadPage() {
    window.location.reload();
  }
}
