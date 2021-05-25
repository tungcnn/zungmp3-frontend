import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interface/user';
import { TokenServiceService } from 'src/app/service/token/token-service.service';
import { UserServiceService } from 'src/app/service/user/user-service.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  user: User={};
  constructor(private tokenService:TokenServiceService,
     private userService: UserServiceService) { }

  ngOnInit() {
  }
  deleteUser(user: NgForm) {
    this.userService.deleteUser(user.value).subscribe(()=>{
      console.log(user.value);
    })
  }
}
