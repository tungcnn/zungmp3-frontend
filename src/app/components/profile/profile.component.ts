import { TokenServiceService } from 'src/app/service/token/token-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  constructor(private token: TokenServiceService) { }

  ngOnInit() {
    this.user = this.token.getUser();
  }

  showProfile(){
    let showProfile=this.token.getUser();
  }
}
