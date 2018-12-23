import { Component, OnInit } from '@angular/core';
import { TierrasService } from '../../services/tierras/tierras.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { Tierra } from '../../models/tierras.model';
import { Global } from '../../services/global';
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { Evento } from 'src/app/models/evento.model';
import { EventoService } from 'src/app/services/evento.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admineventos',
  templateUrl: './admineventos.component.html',
  styleUrls: ['./admineventos.component.css']
})
export class AdmineventosComponent implements OnInit {

  miTierra: Tierra = new Tierra();
  tierras: Tierra[] = [];
  idEventoDel: String;
  user: User = new User();
  url: String = Global.url;
  evento: Evento = new Evento();
  miEvento: Evento = new Evento();
  eventos: Evento[] = [];
  usoTitle: String;
  usoDesc: String;

  constructor(
    private tierraService: TierrasService,
    private router: Router,
    private userService: UserService,
    private eventoService: EventoService,
    private modalService: NgbModal,
    private dataTransfer: DataTransferService
  ) { }

  ngOnInit() {

    if(this.userService.isLoggedIn()){
      this.router.navigateByUrl('/adminevento');
      this.getUserEventos();
    }
    else
      this.router.navigateByUrl('/login');


  }

  openCancelModal(content, evento:Evento){
    this.idEventoDel = evento._id;
    this.modalService.open(content);
  }

  eliminarE(uso){
    var fechaActual = new Date();

    this.eventoService.getEvento(this.idEventoDel).subscribe(
      response => {
        this.miEvento = response.resultado;
        var fechaFin = new Date(this.miEvento.fin.toString());
        if (fechaFin > fechaActual){
          this.usoTitle = "Evento no borrado";
          this.usoDesc = "El evento no pudo ser borrado porque no ha terminado su plazo.";
          this.modalService.open(uso);
        }
        else{
          this.eventoService.deleteEvento(this.idEventoDel).subscribe(
            response => {
              this.updateContEvento("resta");
              this.usoTitle = "Evento borrado";
              this.usoDesc = "El evento ha sido borrado correctamente.";
              this.modalService.open(uso);
            },
            error => {
              console.log(error);
            }
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getUserEventos(){
    this.eventoService.getUserEventos(localStorage.getItem('idus')).subscribe(
      response => {
        this.eventos = response.resultado;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateContEvento(opc){
    this.userService.getInfoUser(localStorage.getItem('idus')).subscribe(
        response => {
          this.user = response.resultado;
          if (opc === "suma")
            this.user.tierras++;
          else if (opc === "resta")
            this.user.tierras--;
          this.userService.updateUser(this.user).subscribe(
            response => {

            },
            error => {
              console.log(error);
            }
          );
        }      
    );
  }

  gotoEvento(evento){
    this.dataTransfer.someDataChanges(evento);
    localStorage.setItem('evento',JSON.stringify(evento));
    this.router.navigateByUrl('/addeventos');
  }

}
