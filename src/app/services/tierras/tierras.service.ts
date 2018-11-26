import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Tierra } from '../../models/tierras.model';
import { Global } from '../global';
import { UserService } from '../../shared/user.service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TierrasService {
  public url: string;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(
    private _http: HttpClient,
    private _userService: UserService
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

  getTierraTop(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getTierraTop', {headers:headers});
  }

  getFiltroUbicacionP(ubicaciones: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getFiltroUbicacionP/'+ubicaciones, {headers:headers});
  }

  getFiltroUbicacionT(ubicaciones: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getFiltroUbicacionT/'+ubicaciones, {headers:headers});
  }

  getBusqueda(busqueda:String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getBusqueda/'+busqueda, {headers:headers});
  }

  postTierra(tierra: Tierra): Observable<any> {
    tierra.fecharegistro = new Date().toLocaleString();
    return this._http.post(this.url+'regTierra',tierra, this.noAuthHeader)
  }

  getTierrasOwner(idowner: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(this.url+'getTierras/'+idowner);
    return this._http.get(this.url+'getTierras/'+idowner, {headers: headers});
  }

  updateTierra(tierra): Observable<any> {
    let params = JSON.stringify(tierra);
    console.log(params);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+'updateTierra/'+tierra._id, params, {headers:headers});
  }

  //Help Methods

  getToken(){
    return localStorage.getItem('id_token');
  }

  getid(){
    return localStorage.getItem('idus');
  }
}
