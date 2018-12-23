import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-modificarperil',
  templateUrl: './modificarperil.component.html',
  styleUrls: ['./modificarperil.component.css']
})
export class ModificarperilComponent implements OnInit {
  
  user: User = new User();
  modifiedMessage: String;
  errorMessage: String;
  
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form);
    console.log("Hola");
    this._userService.updateUser(this.user).subscribe(
      response => {
        this.modifiedMessage = "Tu perfil se ha actualizado.";
      },
      err => {
        this.errorMessage = "Hubo un problema con tus datos.";
      }
    );
  }

}
