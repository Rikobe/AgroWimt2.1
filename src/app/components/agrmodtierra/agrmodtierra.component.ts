import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material'
import { TierrasService } from '../../services/tierras/tierras.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { Tierra } from '../../models/tierras.model';
import { Global } from '../../services/global';
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service';
import { UploadimagenService } from '../../services/uploadimagen.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { GoogleMap } from '@agm/core/services/google-maps-types';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-agrmodtierra',
  templateUrl: './agrmodtierra.component.html',
  styleUrls: ['./agrmodtierra.component.css']
})
export class AgrmodtierraComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  user: User = new User();
  contTierra: number;
  tierra: Tierra = new Tierra();
  delTierra: Tierra = new Tierra();
  miTierra: Tierra[] = [];
  idTierraDel: String;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  perfilTierra: any;
  url: String;
  modificado: Boolean = false;
  fileName: String;
  usoTitle: String;
  usoDesc: String;
  estados: any = [
    { Lugar: 'Aguascalientes' },
    { Lugar: 'Baja California' },
    { Lugar: 'Baja California Sur' },
    { Lugar: 'Campeche' },
    { Lugar: 'Coahuila' },
    { Lugar: 'Colima' },
    { Lugar: 'Chiapas' },
    { Lugar: 'Chihuahua' },
    { Lugar: 'CDMX' },
    { Lugar: 'Durango' },
    { Lugar: 'Guanajuato' },
    { Lugar: 'Guerrero' },
    { Lugar: 'Hidalgo' },
    { Lugar: 'Jalisco' },
    { Lugar: 'México' },
    { Lugar: 'Michoacán' },
    { Lugar: 'Morelos' },
    { Lugar: 'Nayarit' },
    { Lugar: 'Nuevo León' },
    { Lugar: 'Oaxaca' },
    { Lugar: 'Puebla' },
    { Lugar: 'Querétaro' },
    { Lugar: 'Quintana Roo' },
    { Lugar: 'San luis potosí' },
    { Lugar: 'Sinaloa' },
    { Lugar: 'Sonora' },
    { Lugar: 'Tabasco' },
    { Lugar: 'Tamaulipas' },
    { Lugar: 'Tlaxcala' },
    { Lugar: 'Veracruz' },
    { Lugar: 'Yucatán' },
    { Lugar: 'Zacatecas' },
  ];
  public tipocultivo: any = [
    {tipo: "Maíz"},
    {tipo: "Tomate"},
    {tipo: "Aguacate"},
    {tipo: "Arroz"},
    {tipo: "Papa"},
    {tipo: "ajonjoli"}
  ];
  public visibilidad: any = [
    {tipo: "Público"},
    {tipo: "Privado"}
  ]

  constructor(
    private _tierrasService: TierrasService,
    private userService: UserService,
    private router : Router,
    private _uploadimagen: UploadimagenService,
    private modalService: NgbModal,
    // private ngbModalOptions: NgbModalOptions
    // private dialog: MatDialog
  ) { 
    this.url = Global.url;
  }

  ngOnInit() {
    if(this.userService.isLoggedIn()){
      this.router.navigateByUrl('/agregartierra');
      this.getMisTierras();
    }
      
    else
      this.router.navigateByUrl('/login');
  }

  onSubmit(form: NgForm){
    if (this.tierra._id == null){
      this.tierra.idowner = this.userService.getId();
      this.tierra.status = "Activo";
      this.tierra.rentas = 0;
      this.tierra.statusrenta = "S";
      this._tierrasService.postTierra(this.tierra).subscribe(
        res => {
          //console.log(res);
          //Subir imagen
          //console.log(res.tierra._id);
          this._uploadimagen.makeFileRequest(this.url+"updatefotoTierra/"+res.tierra._id,[],this.perfilTierra,'imagen')
          .then((result:any) => {
            this.updateContTierra("suma");
            this.showSucessMessage = true;
            setTimeout(() => this.showSucessMessage = false, 4000);
          });
          this.resetForm(form);
        },
        error => {
          console.log(error);
          this.serverErrorMessages = 'Algo salió mal. Contacta al administrador.';
        }
      );
    }
    else {
      this._tierrasService.updateTierra(this.tierra).subscribe(
        response => {
          this.showSucessMessage = true;
            setTimeout(() => this.showSucessMessage = false, 4000);
        },
        error => {
          console.log(error);
        }
      );
    }


  }

  resetForm(form){
    form.resetForm();
    this.getMisTierras();
  }

  cancelmodify(){
    this.modificado = false;
  }

  setTipoCultivo(e){
    this.tierra.tipocultivo = e.target.text;
  }

  setVisibilidad(e){
    this.tierra.visibilidad = e.target.text;

  }

  fileChangeEvent(file){

    this.perfilTierra = <Array<File>>file.target.files;
    //console.log(this.perfilTierra);
    this.fileName = file.target.files[0].name;
  }

  getMisTierras(){
    this._tierrasService.getTierrasOwner(localStorage.getItem('idus')).subscribe(
      response => {
        if (response.resultado){
          this.miTierra = response.resultado;
          //console.log(this.miTierra);
        }

        else
          this.miTierra = null;
        
        //console.log(this.miTierra);
      },
      error => {
        //console.log(error);
      }
    );
  }

  editarT(tierra: Tierra){
    this.modificado = true;
    this.tierra = tierra;
    //console.log(tierra);
  }

  eliminarT(uso){
    this._tierrasService.getInfotierra(this.idTierraDel).subscribe(
      response => {
        this.delTierra = response.resultado;
        console.log(this.delTierra);
        if (this.delTierra.statusrenta == "S" || this.delTierra.status == "Renta" || this.delTierra.status == "Evento"){
          this.usoTitle = "Tierra en uso";
          this.usoDesc = "La tierra que desea eliminar no puede ser borrada porque está siendo usada.";
          this.modalService.open(uso);
        }
        else {
          this._tierrasService.deleteTierra(this.idTierraDel).subscribe(
            response => {
              this.updateContTierra("resta");
              this.usoTitle = "Tierra eliminada";
              this.usoDesc = "La tierra ha sido eliminada de sus tierras.";
              this.modalService.open(uso);
              this.getMisTierras();
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

  openCancelModal(content, tierra:Tierra){
    this.idTierraDel = tierra._id;
    this.modalService.open(content);
  }

  updateContTierra(opc){
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
}
