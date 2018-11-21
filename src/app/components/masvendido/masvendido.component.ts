import { Component, OnInit } from '@angular/core';
import { TierrasService } from '../../services/tierras/tierras.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { Tierra } from '../../models/tierras.model';
import { Global } from '../../services/global';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-masvendido',
  templateUrl: './masvendido.component.html',
  styleUrls: ['./masvendido.component.css']
})
export class MasvendidoComponent implements OnInit {
  sortPrecMinMax: any; 
  sortPrecMaxMin: any;
  sortArMaxMin: any;
  sortArMinMax: any;
  tierra: Tierra = new Tierra();
  tierras: Tierra[];
  ubicacion: String[] = [];
  public url = Global.url;
  ubicaciones: any = [
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
  cultivos = [
    {nombre: 'Maíz'},
    {nombre: 'Tomate'},
    {nombre: 'Aguacate'},
    {nombre: 'Arroz'},
    {nombre: 'Papa'},
  ];
  
  constructor(
    private _tierraService: TierrasService, 
    private _dataTransfer: DataTransferService, 
    private _authService:AuthService
  ) {
    this.sortPrecMinMax = (tierra: Tierra[]) =>
    tierra.sort((tierraA: Tierra, tierraB: Tierra) => {
      if (tierraA.precio > tierraB.precio) return 1;
      if (tierraA.precio < tierraB.precio) return 0;
      return 0;
    }); 

    this.sortPrecMaxMin = (tierra: Tierra[]) =>
    tierra.sort((tierraA: Tierra, tierraB: Tierra) => {
      if (tierraA.precio < tierraB.precio) return 1;
      if (tierraA.precio > tierraB.precio) return 0;
      return 0;
    }); 

    this.sortArMaxMin = (tierra: Tierra[]) =>
    tierra.sort((tierraA: Tierra, tierraB: Tierra) => {
      if (tierraA.precio < tierraB.area) return 1;
      if (tierraA.precio > tierraB.area) return 0;
      return 0;
    }); 

    this.sortArMinMax = (tierra: Tierra[]) =>
    tierra.sort((tierraA: Tierra, tierraB: Tierra) => {
      if (tierraA.area > tierraB.area) return 1;
      if (tierraA.area < tierraB.area) return 0;
      return 0;
    }); 
   }

  ngOnInit() {
    this.getTierraTop();
  }

  sortPMinMax(){
    this.sortPrecMinMax(this.tierras);
  }

  sortPMaxMin(){
    this.sortPrecMaxMin(this.tierras);
  }

  sortAMaxMin(){
    this.sortArMaxMin(this.tierras);
  }

  sortAMinMax(){
    this.sortArMinMax(this.tierras);
  }

  setUbicaciones(e){
    var ubicaciones: String;
    //console.log("hola");
    //console.log(e);
    
    if (e.target.checked){
      this.ubicacion.push(e.target.id);

      ubicaciones = this.ubicacion.toString();

      this._tierraService.getFiltroUbicacionT(ubicaciones).subscribe(
        response => {
          if (response.resultado)
            this.tierras = response.resultado;
            if (this.tierras.length == 0)
              this.tierras = null;
            console.log(this.tierras);
        },
        error => {
          console.log(<any>error);
        }
      );
      console.log(ubicaciones);
    }
      
    else {
      let index = this.ubicacion.findIndex(value=>value === e.target.id);
      this.ubicacion.splice(index,1);
      ubicaciones = this.ubicacion.toString();
      console.log(ubicaciones);    
      if (ubicaciones == "")
        this.getTierraTop();
      else{
        this._tierraService.getFiltroUbicacionT(ubicaciones).subscribe(
          response => {
            if (response.resultado)
              this.tierras = response.resultado;
              console.log(this.tierras);
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    }

  }


  getTierraTop() {
    this._tierraService.getTierraTop().subscribe(
      response => {
        if (response.resultado)
          this.tierras = response.resultado;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
