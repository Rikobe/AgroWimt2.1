import { Component, OnInit } from '@angular/core';
import { TierrasService } from '../../services/tierras/tierras.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { Tierra } from '../../models/tierras.model';
import { Global } from '../../services/global';
import { AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  indice;
  public tierra : Tierra = new Tierra();
  public tierras : Tierra[];
  public url : String = Global.url;
  public busqueda: String;
  public sortPrecMinMax: any; 
  public sortPrecMaxMin: any;
  public sortArMaxMin: any;
  public sortArMinMax: any;
  public ubicaciones: any = [
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
  estaciones = [
    {
      nombre: 'Primavera'
    },
    {
      nombre: 'Verano'
    },
    {
      nombre: 'Otoño'
    },
    {
      nombre: 'Invierno'
    },
  ];
  elementos = [
    {
      imagen: '/',
      titulo: 'Primer elemento',
      precio: 500,
      ubicacion: 'Sinaloa',
      descripcion: 'Esto es un ejemplo de una descripción y es algo larga por lo que va a ser necesario un parrafo.',
      URL: '/'
    },
    {
      imagen: '/',
      titulo: 'Segundo elemento',
      precio: 1000,
      ubicacion: 'Sonora',
      descripcion: 'Esto es un ejemplo de una descripción y es algo larga por lo que va a ser necesario un parrafo.',
      URL: '/'
    },
    {
      imagen: '/',
      titulo: 'Tercer elemento',
      precio: 2000,
      ubicacion: 'Durango',
      descripcion: 'Esto es un ejemplo de una descripción y es algo larga por lo que va a ser necesario un parrafo.',
      URL: '/'
    },
  ];
  constructor(
    private _tierraService: TierrasService, 
    private _dataTransfer: DataTransferService, 
    private _authService: AuthService,
    private router: Router
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
    this.getBusqueda();
  }

  buscar(busqueda:any){
    this._dataTransfer.someDataChanges(busqueda.value);
    this.getBusqueda();
  }

  public getBusqueda(){
    this._dataTransfer.currentSomeDataChanges.subscribe(
      response => {
        this.busqueda = response
      },
      error => {
        console.log(error);
      }
    );

    this._tierraService.getBusqueda(this.busqueda,this.indice).subscribe(
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
  }

  gototierra(_id:any){
    this._dataTransfer.someDataChanges(_id);
    this.router.navigateByUrl('/perfiltierra');
  }
}
