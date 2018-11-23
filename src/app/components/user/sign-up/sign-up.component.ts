import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataTransferService } from '../../../services/data-transfer.service';
import { Tierra } from '../../../models/tierras.model';
import { Global } from '../../../services/global';

import { UserService } from '../../../shared/user.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else {
          console.log(err);
          this.serverErrorMessages = 'Algo salió mal. Contacta al administrador.';
        }
          
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      nombre: '',
      apellido: '',
      visibilidad: '',
      email: '',
      password: '',
      fecharegistro: '',
      fotoperfil:'',
      rfc: '',
      calle: '',
      colonia: '',
      num: '',
      tel1: '',
      tel2: '',
      pais: '',
      estado: '',
      ciudad: '',
      contratos: 0,
      tierras: 0,
      rentas: 0,
      eventos: 0,
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
