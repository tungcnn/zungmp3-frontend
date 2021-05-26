import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Song} from "../../interface/song";
import { User } from 'src/app/interface/user';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenServiceService } from 'src/app/service/token/token-service.service';
import { UserServiceService } from 'src/app/service/user/user-service.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const API_URL = `${environment.apiUrl}` + '/api/';
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
  fullName: string = '';

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
  errorMessageLogout: '';
  // id:number;

  userForm: FormGroup = new FormGroup({
    id: new FormControl(),
    fullName: new FormControl,
    username: new FormControl,
    password: new FormControl,
    email: new FormControl
  });
  id=-1;

  constructor(
              private http: HttpClient,
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
    this.userService.getUserById(this.tokenStorage.getId()).subscribe(user=>{
      this.user = user;
      this.userForm=new FormGroup({
        id:new FormControl(user.id),
        fullName:new FormControl(user.fullName),
        username:new FormControl(user.username),
        password:new FormControl(user.password),
        email:new FormControl(user.email)
      })
    });
    if(this.tokenStorage.getUser()){
      this.fullName = this.tokenStorage.getUser();
    }
  }
  ngOnInit() {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
      this.userForm.setValue(this.user);
     
    
      
      // this.roles = this.tokenStorage.getUser().roles;
    }
    this.checkUser();
    // this.id=this.tokenStorage.getId
  
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
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.fullName);
        this.tokenStorage.saveId(data.id);
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
  // logout() {
  //   this.http.post(`${API_URL}/api/logout`, this.tokenStorage,
  //     {responseType: 'text'})
  //     .subscribe(data => {
  //       console.log(data);
  //     }, error => {
  //       throwError(error);
  //     });
  //   window.sessionStorage.removeItem('auth-user');
  //   window.sessionStorage.removeItem('auth-token');
  //   window.sessionStorage.removeItem('auth-id');
  //   window.location.reload();
  // }

  logout(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logout success!',
          'Your file has been deleted.',
          'success'
        )
        this.http.post(`${API_URL}/api/logout`, this.tokenStorage,
      {responseType: 'text'})
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      });
    window.sessionStorage.removeItem('auth-user');
    window.sessionStorage.removeItem('auth-token');
    window.sessionStorage.removeItem('auth-id');
    window.location.reload();
      }
    })
  }

  updateUser(id: number) {
    let updateUser=this.userForm.value;
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
