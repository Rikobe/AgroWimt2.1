import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-agrmodrecursos',
  templateUrl: './agrmodrecursos.component.html',
  styleUrls: ['./agrmodrecursos.component.css']
})
export class AgrmodrecursosComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router : Router
  ) { }

  ngOnInit() {
    // if(this.userService.isLoggedIn())
    //   this.router.navigateByUrl('/agregartierra');
    // else
    //   this.router.navigateByUrl('/login');
  }

}
