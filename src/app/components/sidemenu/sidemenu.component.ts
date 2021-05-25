import { Component, OnInit } from '@angular/core';
import {User} from "../../interface/user";
import {TokenServiceService} from "../../service/token/token-service.service";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  user: User = null;
  constructor(private token : TokenServiceService) { }

  ngOnInit() {
    this.user = this.token.getUser()
  }

}
