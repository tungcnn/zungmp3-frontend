import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SongServiceService} from "../../service/song/song-service.service";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Song} from "../../interface/song";
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenServiceService } from 'src/app/service/token/token-service.service';
import { UserServiceService } from 'src/app/service/user/user-service.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  songs : Song[] = []
  song: Song = {};
  reg: User = {};
  lg: User = {};
  formRegistration: any = {};
  user:User={};

  isSuccessful =false;
  isRegistrationFailed = false;
  errorMessageRegistration = '';

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessageLogin = '';
  loggedOut = false;
  status: string="Please login";

  isUpdateFailed= false;
  errorMessageUpdate='';

  updateUserForm: FormGroup = new FormGroup({
    id: new FormControl(),
    fullName: new FormControl,
    username: new FormControl,
    password: new FormControl,
    email: new FormControl
  });
  id=-1;
  constructor(
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private tokenStorage: TokenServiceService,
              private userService: UserServiceService) {
        this.activatedRoute.paramMap.subscribe(
          paramMap=>{
          this.id=+paramMap.get('id');
          this.getUserById(this.id);
        })
       }
  getUserById(id: number) {
    this.userService.getUserById(id).subscribe(user=>{
      this.updateUserForm=new FormGroup({
        id:new FormControl(user.id),
        fullName:new FormControl(user.fullName),
        username:new FormControl(user.username),
        password:new FormControl(user.password),
        email:new FormControl(user.email)
      })
    });
  }

  ngOnInit() {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
      this.updateUserForm.setValue(this.user);

      // this.roles = this.tokenStorage.getUser().roles;
    }
    this.checkUser();
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

  login(loginform : NgForm){
    this.authService.login(loginform.value).subscribe(
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

  checkUser(){
    let checkUser=this.tokenStorage.getUser();
    this.user.id=checkUser.id;
    this.user.fullName=checkUser.fullName;
    this.user.username=checkUser.username;
    this.user.password=checkUser.password;
    this.user.email=checkUser.email;
  }

  logout(user:User){
    this.userService.logout(user);
    this.router.navigate(['login']);
  }

  showProfile(){
    let showProfile=this.tokenStorage.getUser();
  }
  // updateUser(updateForm: NgForm) {
  //   this.authService.updateUser(updateForm.value).subscribe(
  //     data =>{
  //       console.log(data);
  //       this.isSuccessful=true;
  //       this.isUpdateFailed=false;
  //     },
  //     err=>{
  //       this.errorMessageUpdate=err.console.error.message;
  //       this.isUpdateFailed=true;
  //     }
  //   )
  // }

  updateUser(id: number) {
    let updateUser=this.updateUserForm.value;
    this.userService.updateUser(id,updateUser).subscribe(
      data =>{
        console.log(data);
        this.isSuccessful=true;
        this.isUpdateFailed=false;
      },
      err=>{
        this.errorMessageUpdate=err.console.error.message;
        this.isUpdateFailed=true;
      }
    )
  }

  reloadPage() {
    window.location.reload();
  }
}
