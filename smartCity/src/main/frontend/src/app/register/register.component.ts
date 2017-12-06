import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userService:UserService;
  constructor() { }

  ngOnInit() {
  }

  // insertUser(username,email, password1,password2){
  //
  //     this.userService.insertUser()
  // }

}
