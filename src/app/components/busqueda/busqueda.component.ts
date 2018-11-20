import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  busqueda: String = '{{búsqueda}}';
  ubicaciones: any = [
    {
      Lugar: 'Sinaloa'
    },
    {
      Lugar: 'Sonora'
    },
    {
      Lugar: 'Durango'
    },
    {
      Lugar: 'Jalisco'
    },
    {
      Lugar: 'San luis potosí'
    },
  ];
  cultivos = [
    {
      nombre: 'Maíz'
    },
    {
      nombre: 'Tomate'
    },
    {
      nombre: 'Aguacate'
    },
    {
      nombre: 'Arroz'
    },
    {
      nombre: 'Papa'
    },
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
  constructor() { }

  ngOnInit() {
  }

}
