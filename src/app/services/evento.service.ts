import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { Evento } from '../models/evento.model';
import { DetalleEvento } from '../models/detalleEvento.model';


@Injectable({
  providedIn: 'root'
})
export class EventoService {
  url: String = Global.url;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(
    private _http: HttpClient,
  ) { }

  postEvento(evento:Evento): Observable<any> {
    return this._http.post(this.url+'setEvento',evento,this.noAuthHeader);
  }

  postdetalleEvento(detalleEvento:DetalleEvento): Observable<any> {
    console.log(detalleEvento);
    return this._http.post(this.url+'setDetalleEvento',detalleEvento,this.noAuthHeader);
  }

  getUserEventos(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getEventos/'+id, {headers:headers});
  }

  getEvento(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getEvento/'+id, {headers:headers});
  }

  deleteEvento(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url+'deleteEvento/'+id, {headers:headers});
  }

  updateEvento(evento): Observable<any> {
    let params = JSON.stringify(evento);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+'updateTierra/'+evento.idtierra, params, {headers:headers});
  }

  getInsumos(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(this.url+'getInsumos/'+id,{headers:headers});
  }



}
