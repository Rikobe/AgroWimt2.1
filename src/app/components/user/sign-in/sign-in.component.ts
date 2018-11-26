import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NavBarServiceService } from '../../../services/nav-bar-service.service';

import { UserService } from '../../../shared/user.service';
import { DataTransferService } from '../../../services/data-transfer.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router : Router, 
    private _navBarService: NavBarServiceService,
    private _dataTransfer: DataTransferService) { }

  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    if(this.userService.isLoggedIn())
      this.router.navigateByUrl('/cuenta');
  }

  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.userService.setId();
        this._dataTransfer.someDataChanges(form.value.email);
        window.location.reload();
        this.router.navigateByUrl('/');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
