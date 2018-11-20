import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Tierra } from '../../models/tierras.model';
import { Global } from '../global';

@Injectable({
  providedIn: 'root'
})
export class TierrasService {
  public url: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = Global.url;
  }

  getCercadeti(tierra: Tierra): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'getCercadeti', {estado: tierra.estado, ciudad: tierra.ciudad} ,{headers: headers});
  }

  getRentas(tierra: Tierra): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getRentas/'+tierra.idowner, {headers:headers});
  }

  getHomeTierras(tierra: Tierra): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getTierras/'+tierra.idowner, {headers:headers});
  }

  getTierraPromocion(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getTierraPromocion', {headers:headers});
  }


  //Help Methods

  getToken(){
    return localStorage.getItem('id_token');
  }

  getid(){
    return localStorage.getItem('idowner');
  }
}
