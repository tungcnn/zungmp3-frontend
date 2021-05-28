import { UserServiceService } from 'src/app/service/user/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  content = '';

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
