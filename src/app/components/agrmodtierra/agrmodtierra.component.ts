import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TierrasService } from '../../services/tierras/tierras.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { Tierra } from '../../models/tierras.model';
import { Global } from '../../services/global';
import { Router } from "@angular/router";
import { UserService } from '../../shared/user.service';
import { UploadimagenService } from '../../services/uploadimagen.service';
import { GoogleMap } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-agrmodtierra',
  templateUrl: './agrmodtierra.component.html',
  styleUrls: ['./agrmodtierra.component.css']
})
export class AgrmodtierraComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  tierra: Tierra = new Tierra();
  miTierra: Tierra[] = [];
  showSucessMessage: boolean;
  serverErrorMessages: string;
  perfilTierra: any;
  url: String;
  modificado: Boolean = false;
  fileName: String;
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
    private _uploadimagen: UploadimagenService
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
          console.log(res);
          //Subir imagen
          console.log(res.tierra._id);
          this._uploadimagen.makeFileRequest(this.url+"updatefotoTierra/"+res.tierra._id,[],this.perfilTierra,'imagen')
          .then((result:any) => {
            console.log(result);
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

  getlatlng(e){
    console.log(e);
  }

  setTipoCultivo(e){
    this.tierra.tipocultivo = e.target.text;
  }

  setVisibilidad(e){
    this.tierra.visibilidad = e.target.text;

  }

  fileChangeEvent(file){

    this.perfilTierra = <Array<File>>file.target.files;
    console.log(this.perfilTierra);
    this.fileName = file.target.files[0].name;
  }

  getMisTierras(){
    this._tierrasService.getTierrasOwner(localStorage.getItem('idus')).subscribe(
      response => {
        if (response.resultado)
          this.miTierra = response.resultado;
        else
          this.miTierra = null;
        
        console.log(this.miTierra);
      },
      error => {
        console.log(error);
      }
    );
  }

  editarT(tierra: Tierra){
    this.modificado = true;
    this.tierra = tierra;
    console.log(tierra);
  }
  initMap(){
    
  }
}
