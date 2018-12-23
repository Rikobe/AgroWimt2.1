import { Component, OnInit } from '@angular/core';
import { TierrasService } from '../../services/tierras/tierras.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { Tierra } from '../../models/tierras.model';
import { Global } from '../../services/global';
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { Evento } from 'src/app/models/evento.model';
import { User } from '../../models/user.model';
import { EventoService } from 'src/app/services/evento.service';


@Component({
  selector: 'app-administrar-tierra',
  templateUrl: './administrar-tierra.component.html',
  styleUrls: ['./administrar-tierra.component.css']
})
export class AdministrarTierraComponent implements OnInit {

  miTierra: Tierra = new Tierra();
  tierras: Tierra[] = [];
  user: User = new User();
  url: String = Global.url;
  evento: Evento = new Evento();
  tituloTierra: String;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  public tipcultivo: any = [
    {tipo: "Maíz"},
    {tipo: "Tomate"},
    {tipo: "Aguacate"},
    {tipo: "Arroz"},
    {tipo: "Papa"},
    {tipo: "ajonjoli"}
  ];
  public typeciclo: any = [
    {tipo: "Perenne"},
    {tipo: "Cíclico"},
    {tipo: "Bienal"},
    {tipo: "Temporal"},
  ];
  constructor(
    private tierraService: TierrasService,
    private router: Router,
    private userService: UserService,
    private eventoService: EventoService
  ) { }

  ngOnInit() {
    if(this.userService.isLoggedIn()){
      this.router.navigateByUrl('/addevento');
      this.getMisTierras();
    }
      
    else
      this.router.navigateByUrl('/login');
  }

  onSubmit(form : NgForm){
    this.evento.idowner = localStorage.getItem('idus');
    this.eventoService.postEvento(this.evento).subscribe(
      response => {
        this.updateEventoStatus();
        this.updateContEvento("suma");
        this.showSucessMessage = true;
        this.getMisTierras();
        this.resetForm(form);
        setTimeout(() => this.showSucessMessage = false, 3000);
      },
      error => {
        console.log(this.evento);
        console.log(error);
        this.serverErrorMessages = 'Algo salió mal con tu evento. Contacta al administrador.';
        setTimeout(() => this.serverErrorMessages = "", 3000);
      }
    );
  }

  resetForm(form: NgForm){
    form.resetForm();
    this.tituloTierra = "";
  }

  updateContEvento(opc){
    this.userService.getInfoUser(localStorage.getItem('idus')).subscribe(
        response => {
          this.user = response.resultado;
          if (opc === "suma")
            this.user.eventos++;
          else if (opc === "resta")
            this.user.eventos--;
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

  updateEventoStatus(){
    this.miTierra._id = this.evento.idtierra;
    this.miTierra.status = "Evento";
    this.tierraService.updateTierra(this.miTierra).subscribe(
      response => {

      },
      error => {
        console.log(error);
      }
    );
  }

  getMisTierras(){
    this.tierraService.getTierrasEvento(localStorage.getItem('idus')).subscribe(
      response => {
        if (response.resultado){
          this.tierras = response.resultado;
          //console.log(this.miTierra);
        }

        else
          this.tierras = null;
        
        //console.log(this.miTierra);
      },
      error => {
        //console.log(error);
      }
    );
  }

  setTituloValue(tierra:Tierra){
    this.evento.idtierra = tierra._id;
    this.tituloTierra = tierra.titulo;
  }

}
