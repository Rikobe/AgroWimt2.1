import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../../services/data-transfer.service';
import { Router } from "@angular/router";
import { ContratacionService } from '../../services/contratacion.service';
import { Contratacion } from 'src/app/models/contratacion.model';
import { UserService } from '../../shared/user.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  contratacion: Contratacion = new Contratacion();
  delContratacion: Contratacion = new Contratacion();
  accContratacion: Contratacion = new Contratacion();
  rejContratacion: Contratacion = new Contratacion();
  contratacionesP: Contratacion[] = [];
  contratacionesA: Contratacion[] = [];
  contratacionesR: Contratacion[] = [];
  nosolicitudP: Boolean;
  nosolicitudA: Boolean;
  nosolicitudR: Boolean;
  tipoCancel: String;
  usoTitle: String;
  usoDesc: String;
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
    this.getContrataciones("P");
    this.getContrataciones("A");
    this.getContrataciones("R");
  }


  getContrataciones(status:String){
    this.contratacionService.getContrataciones(localStorage.getItem('idus'),status).subscribe(
      res => {
        if (res.resultado.length == 0 && status == "P"){
          this.contratacionesP = res.resultado;
        }
        else if (res.resultado.length == 0 && status == "A"){
          this.contratacionesA = res.resultado;
        }
        else if (res.resultado.length == 0 && status == "R"){
          this.contratacionesR = res.resultado;
        }
        if (res.resultado.length > 0 && status == "P"){
          this.contratacionesP = res.resultado;
        }
        else if (res.resultado.length > 0 && status == "A"){
          this.contratacionesA = res.resultado;
        }
        else if (res.resultado.length > 0 && status == "R"){
          this.contratacionesR = res.resultado;
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

  aceptarSolicitud(uso){
    var accContrato: Contratacion = new Contratacion;
    accContrato.status = "A";
    accContrato._id = this.accContratacion._id;
    this.contratacionService.updateContratacion(accContrato).subscribe(
      response => {
        console.log(response);
        this.usoTitle = "Solicitud aceptada";
        this.usoDesc = "La solicitud ha sido aceptada. Espere el pago del cliente para efectuar la renta";
        this.getContrataciones("P");
        this.getContrataciones("A");
        this.modalService.open(uso);
      },
      error => {
        console.log(error);
      }
    );
  }

  rechazarSolicitud(uso){
    var rejContrato: Contratacion = new Contratacion;
    rejContrato.status = "R";
    rejContrato._id = this.rejContratacion._id;
    this.contratacionService.updateContratacion(rejContrato).subscribe(
      response => {
        console.log(response);
        this.usoTitle = "Solicitud rechazada";
        this.usoDesc = "La solicitud ha sido rechazada";
        this.getContrataciones("P");
        this.getContrataciones("R");
        this.modalService.open(uso);
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
          this.getContrataciones("P");
        else if (this.tipoCancel == "A")
          this.getContrataciones("A");
        else if (this.tipoCancel == "R")
          this.getContrataciones("R");
      },
      error => {
        console.log(error);
        this.usoTitle = "Problemas al eliminar la solicitud";
        this.usoDesc = "Ha ocurrido un problema al eliminar la solicitud.";
      }
    );
  }

  openCancelModal(content, solicitud, tipo){
    this.delContratacion = solicitud;
    this.tipoCancel = tipo;
    this.modalService.open(content);
  }

  openAcceptModal(contentA, solicitud, tipo){
    this.accContratacion = solicitud;
    this.tipoCancel = tipo
    this.modalService.open(contentA);
  }

  openRejectModal(contentA, solicitud, tipo){
    this.rejContratacion = solicitud;
    this.tipoCancel = tipo
    this.modalService.open(contentA);
  }






}
