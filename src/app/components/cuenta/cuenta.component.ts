import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../shared/user.service';
import { User } from '../../models/user.model';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  profile: any;
  nombre: any;
  user: User = new User();
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
  constructor(
    public _authService: AuthService,
    private _userService: UserService
    ) {

   }

  ngOnInit() {
    // if (this._authService.userProfile) {
    //   this.profile = this._authService.userProfile;
    // } else {
    //   this._authService.getProfile((err, profile) => {
    //     this.profile = profile;
    //   });
    // }
    // console.log(this.profile);
    this._userService.getUserProfile().subscribe(
      res => {
        console.log(res);
        this.user = res['Usuario'];
        this.nombre = this.user.nombre;
        localStorage.setItem('user', this.nombre);
        if (this.user.fotoperfil == null){
          this.user.fotoperfil = "usericon.png"
        }

        // this.user.apellido = res['apellido'];
        // this.user.email = res['email'];
        // this.user.visibilidad = res['visibilidad'];
        // this.user.rfc = res['rfc'];
        // this.user.calle = res['calle'];
        // this.user.colonia = res['colonia'];
        // this.user.num = res['num'];
        // this.user.tel1 = res['tel1'];
        // this.user.tel2 = res['tel2'];
        // this.user.pais = res['pais'];
        // this.user.estado = res['estado'];
        // this.user.ciudad = res['ciudad'];
        // this.user.fotoperfil = res['fotoperfil'];
        // this.user.contratos = res['contratos'];
        // this.user.tierras = res['tierras'];
        // this.user.rentas = res['rentas'];
        // this.user.eventos = res['eventos'];   
        //console.log(res);  
        //console.log(this.user);
      },
      error => {
        console.log(error);
      }
    );
  }
}
