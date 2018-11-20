import { Component, OnInit } from '@angular/core';
import { TierrasService } from '../../services/tierras/tierras.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { Tierra } from '../../models/tierras.model';
import { Global } from '../../services/global';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
  public tierra : Tierra = new Tierra();
  public tierras : Tierra[];
  public preciodesc : Number;
  public url : String = Global.url;
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
  estaciones = [
    {nombre: 'Primavera'},
    {nombre: 'Verano'},
    {nombre: 'Otoño'},
    {nombre: 'Invierno'},
  ];
  elementos = [
    {
      imagen: '/',
      titulo: 'Primer elemento',
      precio: 500,
      preciodesc: 400,
      ubicacion: 'Sinaloa',
      descripcion: 'Esto es un ejemplo de una descripción y es algo larga por lo que va a ser necesario un parrafo.',
      URL: '/'
    },
    {
      imagen: '/',
      titulo: 'Segundo elemento',
      precio: 1000,
      preciodesc: 900,
      ubicacion: 'Sonora',
      descripcion: 'Esto es un ejemplo de una descripción y es algo larga por lo que va a ser necesario un parrafo.',
      URL: '/'
    },
    {
      imagen: '/',
      titulo: 'Tercer elemento',
      precio: 2000,
      preciodesc: 1999,
      ubicacion: 'Durango',
      descripcion: 'Esto es un ejemplo de una descripción y es algo larga por lo que va a ser necesario un parrafo.',
      URL: '/'
    },
  ];
  constructor(
    private _tierraService: TierrasService, 
    private _dataTransfer: DataTransferService, 
    private _authService:AuthService
  ) { }

  ngOnInit() {
    this.getTierraPromocion();
  }

  getTierraPromocion(){
    
    this._tierraService.getTierraPromocion().subscribe(
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
