import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masvendido',
  templateUrl: './masvendido.component.html',
  styleUrls: ['./masvendido.component.css']
})
export class MasvendidoComponent implements OnInit {
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
      veces: 500,
      ubicacion: 'Sinaloa',
      descripcion: 'Esto es un ejemplo de una descripción y es algo larga por lo que va a ser necesario un parrafo.',
      URL: '/'
    },
    {
      imagen: '/',
      titulo: 'Segundo elemento',
      precio: 1000,
      veces: 3,
      ubicacion: 'Sonora',
      descripcion: 'Esto es un ejemplo de una descripción y es algo larga por lo que va a ser necesario un parrafo.',
      URL: '/'
    },
    {
      imagen: '/',
      titulo: 'Tercer elemento',
      precio: 2000,
      veces: 0,
      ubicacion: 'Durango',
      descripcion: 'Esto es un ejemplo de una descripción y es algo larga por lo que va a ser necesario un parrafo.',
      URL: '/'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
