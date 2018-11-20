import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  profile: any;
  info: any = {
    Contratos: 0,
    Terrenos: 0,
    Rentas: 0,
    Eventos: 0
  };
  tierras: any = [
    {
      imagen: 'https://www.brandeps.com/icon-download/P/Plus-square-01.svg',
      titulo: 'tierra1'
    },
    {
      imagen: 'https://www.brandeps.com/icon-download/P/Plus-square-01.svg',
      titulo: 'tierra2'
    },
    {
      imagen: 'https://www.brandeps.com/icon-download/P/Plus-square-01.svg',
      titulo: 'tierra3'
    }
  ];
  usuario: any = {
    Nombre: 'Nombre_Persona_Empresa',
    RFC: 'RFC_Persona_Empresa',
    Calle: 'Calle_Persona_Empresa',
    Colonia: 'Colonia_Persona_Empresa',
    Numero: 'Número_Persona_Empresa',
    Telefonos: [
      'Telefono1',
      'Telefono2'
    ],
    Correo: 'Correo_Persona_Empresa',
  };
  constructor(public _authService: AuthService) {

   }

  ngOnInit() {
    if (this._authService.userProfile) {
      this.profile = this._authService.userProfile;
    } else {
      this._authService.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
    console.log(this.profile);
  }
}
