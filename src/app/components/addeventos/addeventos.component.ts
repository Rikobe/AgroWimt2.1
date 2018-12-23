import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms"; 
import { RecursosService } from '../../services/recursos.service';
import { Recurso } from '../../models/recursos.model';
import { UserService } from '../../shared/user.service';
import { EventoService } from '../../services/evento.service';
import { DetalleEvento } from '../../models/detalleEvento.model';
import { Evento } from '../../models/evento.model';
import { DataTransferService } from '../../services/data-transfer.service';
import { TierrasService } from '../../services/tierras/tierras.service';
import { Tierra } from '../../models/tierras.model';
import { Global } from '../../services/global';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addeventos',
  templateUrl: './addeventos.component.html',
  styleUrls: ['./addeventos.component.css']
})
export class AddeventosComponent implements OnInit {

  idEvento: String;
  tierraEvento: Tierra = new Tierra();
  evento: Evento = new Evento();
  evento2: Evento = new Evento();
  detallesEvento: DetalleEvento[] = [];
  detalleEvento: DetalleEvento = new DetalleEvento();
  selectedRecurso: String;
  selectedRecursoCosto: number;
  recursos: Recurso[] = [];
  showSucessMessage: boolean;
  serverErrorMessages: string;
  url: String = Global.url;
  constructor(
    private userService: UserService,
    private _recursoService: RecursosService,
    private router : Router,
    private eventoService: EventoService,
    private dataTransfer: DataTransferService,
    private tierraService: TierrasService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {

    if(this.userService.isLoggedIn()){
      this.router.navigateByUrl('/addeventos');
      this.dataTransfer.currentSomeDataChanges.subscribe(
        response => {
          this.evento = response;
        }
      );
      this.evento2 = JSON.parse(localStorage.getItem('evento'));
      this.detalleEvento.idEvento = this.evento2._id;
      this.getInsumos();
      this.getRecursos();
      this.getTierra();
    }
    else
      this.router.navigateByUrl('/login');


  }

  onSubmit(form: NgForm){
    var fecha = new Date();
    var year = fecha.getFullYear();
    var month = fecha.getMonth()+1;
    var day = fecha.getDate();
    var formatedFecha = year + "-" + month + "-" + day;
    this.detalleEvento.total = this.detalleEvento.cantidad * this.detalleEvento.preciounit;
    this.detalleEvento.fecha = formatedFecha;
    console.log(this.detalleEvento.fecha);
    this.eventoService.postdetalleEvento(this.detalleEvento).subscribe(
      response => {
        this.showSucessMessage = true;
        this.getInsumos();
        setTimeout(() => this.showSucessMessage = false, 3000);
      },
      error => {
        console.log(error);
        this.serverErrorMessages = 'Hubo un problema para agregar el insumo.';
        setTimeout(() => this.serverErrorMessages = "", 3000);
      }
    );
  }

  resetForm(form){
    form.resetForm();
    this.detalleEvento.total = 0;
    this.detalleEvento.fecha = "";
    this.detalleEvento.preciounit = 0;
    this.detalleEvento.recurso = "";
    this.detalleEvento.idEvento = "";
  }

  setRecurso(content){
    this.modalService.open(content);
  }
  
  setSelectedRecurso(recurso:Recurso){
    this.detalleEvento.recurso = recurso.recurso;
    this.detalleEvento.preciounit = recurso.costo;
  }

  getRecursos(){
    this._recursoService.getRecursos().subscribe(
      response => {
        if (response.resultado){
          this.recursos = response.resultado;
        }
        else{
          this.recursos = null;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getTierra(){
    this.tierraService.getInfotierra(this.evento2.idtierra).subscribe(
      response => {
        this.tierraEvento = response.resultado;
      },
      error => {
        console.log(error);
      }
    );
  }

  getInsumos(){
    this.eventoService.getInsumos(this.evento2._id).subscribe(
      response => {
        this.detallesEvento = response.resultado;
      }
    );
  }

}
