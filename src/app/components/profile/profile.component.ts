import { TokenServiceService } from 'src/app/service/token/token-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  constructor(private token: TokenServiceService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
  }
}
