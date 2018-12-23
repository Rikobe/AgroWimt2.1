import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../../services/data-transfer.service';
import { Router } from "@angular/router";
import { ContratacionService } from '../../services/contratacion.service';
import { Contratacion } from 'src/app/models/contratacion.model';
import { UserService } from '../../shared/user.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-missolicitudes',
  templateUrl: './missolicitudes.component.html',
  styleUrls: ['./missolicitudes.component.css']
})
export class MissolicitudesComponent implements OnInit {

  contratacion: Contratacion = new Contratacion();
  delContratacion: Contratacion = new Contratacion();
  solContratacion: Contratacion = new Contratacion();
  contratacionesP: Contratacion[] = [];
  contratacionesA: Contratacion[] = [];
  contratacionesR: Contratacion[] = [];
  user: User = new User();
  nosolicitudP: Boolean;
  nosolicitudA: Boolean;
  nosolicitudR: Boolean;
  usoTitle: String;
  usoDesc: String;
  preciopagar: number;
  tipoCancel: String;
  constructor(
    private _dataTransferService: DataTransferService,
    private router: Router,
    private contratacionService: ContratacionService,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    this.nosolicitudP = false;
    this.nosolicitudA = false;
    this.nosolicitudR = false;
   }

  ngOnInit() {
    if(this.userService.isLoggedIn()){
      this.router.navigateByUrl('/misolicitudes');
      this.getUserSolicitudes("P");
      this.getUserSolicitudes("A");
      this.getUserSolicitudes("R");
    }
      
    else
      this.router.navigateByUrl('/login');
  }

  getUserSolicitudes(status:String){
    this.contratacionService.getUserSolicitudes(localStorage.getItem('idus'),status).subscribe(

      res => {
        if (res.resultado.length == 0 && status == "P"){
          this.contratacionesP = res.resultado;
          this.nosolicitudP = true;
        }
        else if (res.resultado.length == 0 && status == "A"){
          this.contratacionesA = res.resultado;
          this.nosolicitudA = true;
        }
        else if (res.resultado.length == 0 && status == "R"){
          this.contratacionesR = res.resultado;
          this.nosolicitudR = true;
        }
        if (res.resultado.length > 0 && status == "P"){
          this.contratacionesP = res.resultado;
          //console.log(this.contratacionesP);
        }
        else if (res.resultado.length > 0 && status == "A"){
          this.contratacionesA = res.resultado;
         // console.log(this.contratacionesA);
        }
        else if (res.resultado.length > 0 && status == "R"){
          this.contratacionesR = res.resultado;
         // console.log(this.contratacionesR);
        }
        else{
          if (status == "P")
            this.nosolicitudP = true;
          else if (status == "A")
            this.nosolicitudA = true;
          else
            this.nosolicitudR = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  eliminarSolicitud(uso){
    this.contratacionService.deleteContratacion(this.delContratacion._id).subscribe(
      response => {
        this.usoTitle = "Solicitud eliminada.";
        this.usoDesc = "La solicitud ha sido elimina correctamente.";
        this.modalService.open(uso);
        if (this.tipoCancel == "P")
          this.getUserSolicitudes("P");
        else if (this.tipoCancel == "A")
          this.getUserSolicitudes("A");
        else if (this.tipoCancel == "R")
          this.getUserSolicitudes("R");
      },
      error => {
        console.log(error);
        this.usoTitle = "Problemas al eliminar la solicitud";
        this.usoDesc = "Ha ocurrido un problema al eliminar la solicitud.";
      }
    );
  }

  solicitarSolicitud(uso){
    this.contratacionService.updateContratacion(this.solContratacion).subscribe(
      response => {
        this.usoTitle = "Tierra solicitada nuevamente"
        this.usoDesc = "La tierra ha sido solicitada nuevamente. Espere la revisión del dueño.";
        this.getUserSolicitudes("P");
        this.getUserSolicitudes("R");
        this.modalService.open(uso);
      }
    );
  }

  openCancelModal(content, solicitud, tipo){
    this.delContratacion = solicitud;
    this.tipoCancel = tipo
    this.modalService.open(content);
  }

  openSolicitarModal(contentS, solicitud){
    this.solContratacion._id = solicitud._id;
    this.solContratacion.status = "P";
    this.modalService.open(contentS);
  }

  openPagaModal(pagar, solicitud: Contratacion){
    var fecha = new Date();
    var year = fecha.getFullYear();
    var month = fecha.getMonth()+1;
    var day = fecha.getDate();
    var formatedFecha = year + "-" + month + "-" + day;
    this.contratacion.pago = solicitud.precio;
    this.contratacion.fechapago = formatedFecha;
    this.contratacion.status = "Rta";
    this.contratacion._id = solicitud._id;
    this.modalService.open(pagar);
  }

  finalizarPago(uso){
    this.getUserBalance(uso);
  }

  getUserBalance(uso){
    this.userService.getInfoUser(localStorage.getItem('idus')).subscribe(
      response => {
        this.user = response.resultado;
        if (this.user.balance < this.contratacion.pago){
          this.usoTitle = "Saldo insuficiente";
          this.usoDesc = "Su cuenta no cuenta con el saldo suficiente para realizar la renta";
          this.modalService.open(uso);
          this.getUserSolicitudes("A");
        }
        else {
          this.contratacionService.updateContratacion(this.contratacion).subscribe(
            response => {
              this.usoTitle = "¡Renta realizada!";
              this.usoDesc = "La renta se ha realizado correctamente. Podrá utilizar esta tierra para gestionas cultivos";
              this.getUserSolicitudes("R");
              this.modalService.open(uso);
            }
          );
        }
      },
      error => {
        console.log();
      }
    );
  }
}
