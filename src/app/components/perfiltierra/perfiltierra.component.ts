import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { DataTransferService } from '../../services/data-transfer.service';
import { TierrasService } from '../../services/tierras/tierras.service';
import { Tierra } from '../../models/tierras.model';
import { User } from '../../models/user.model';
import { Global } from '../../services/global';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { ContratacionService } from '../../services/contratacion.service';
import { Contratacion } from 'src/app/models/contratacion.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-perfiltierra',
  templateUrl: './perfiltierra.component.html',
  styleUrls: ['./perfiltierra.component.css']
})
export class PerfiltierraComponent implements OnInit {
  tierra: Tierra = new Tierra();
  user: User = new User();
  idtierra: String;
  url = Global.url;
  solicitados: String;
  solicitadob: String;
  contratacion: Contratacion = new Contratacion();
  constructor(
    private _dataTransferService: DataTransferService,
    private tierraService: TierrasService,
    private userService: UserService,
    private router: Router,
    private contratacionService: ContratacionService,
    private modalService: NgbModal
  ) {
    this.solicitados = "";
    this.solicitadob = "";

   }

  ngOnInit() {
    this.getPerfilTierra();
  }

  fecha(e){
    console.log(e);
  }

  solicitarTierra(){
    if(localStorage.getItem('idus') == null) {
      this.solicitados = "";
      this.solicitadob = "Necesitas iniciar sesión para solicitar tierras";
    }
    else if (localStorage.getItem('idus') == this.tierra.idowner){
      this.solicitadob = "Eres propietario de esta tierra";
    } 
    else {
      this.contratacion.idowner = this.tierra.idowner;
      this.contratacion.idcliente = localStorage.getItem('idus');
      this.contratacion.idtierra = this.tierra._id;
      this.contratacion.owner = this.user.nombre;
      this.contratacion.tierra = this.tierra.titulo;
      this.contratacion.cliente = localStorage.getItem('user');
      this.contratacion.precio = this.tierra.precio;
      console.log(this.contratacion);

      this.contratacionService.getSolicitudVerify(this.contratacion.idowner, this.contratacion.idtierra).subscribe(
        res => {
          console.log(res.resultado);
          if (res.resultado == null || res.resultado == [] || res.resultado.length == 0){
            this.contratacionService.saveContratacion(this.contratacion).subscribe(
              res => {
                  this.solicitados = "Solicitud enviada correctamente.";
              },
              error => {
                console.log(error);
              }
            );
          }
          else{
            this.solicitados = "";
            this.solicitadob = "Ya has hecho una solicitud a esta tierra.";
          }
        }
      );

      
    }
  }

  getPerfilTierra(){
    this._dataTransferService.currentSomeDataChanges.subscribe(
      response => {
        this.idtierra = response;
        console.log(response);
        if (this.idtierra == null)
          this.router.navigateByUrl('/')
        else {
          this.tierraService.getInfotierra(this.idtierra).subscribe(
            response => {
              this.tierra = response.resultado;
              this.getInfoUser(this.tierra.idowner);
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    );
  }

  getInfoUser(id){
    console.log(id);
    this.userService.getInfoUser(id).subscribe(
      response => {
        this.user = response.resultado;
      },
      error => {
        console.log(error);
      }
    )
  }

  openSolicitar(content){
    this.modalService.open(content);
  }

}
