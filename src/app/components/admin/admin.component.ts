import { UserServiceService } from 'src/app/service/user/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  content='';

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.userService.getAdmin().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.console.error).message;
      }
    );
  }
}
