import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from '../services/global';
import { Contratacion } from '../models/contratacion.model';

@Injectable({
  providedIn: 'root'
})
export class ContratacionService {
  url: String;

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(
    private _http: HttpClient
  ) { 
    this.url = Global.url;
  }


  saveContratacion(contratacion: Contratacion): Observable<any> {
    contratacion.status = "P";
    return this._http.post(this.url+'saveContratacion', contratacion, this.noAuthHeader);
  }

  updateContratacion(contratacion): Observable<any> {
    console.log(contratacion);
    let params = JSON.stringify(contratacion);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+'updateContratacion/'+contratacion._id, params, {headers:headers});
  }

  getSolicitudVerify(idowner: String, idtierra: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getSolicitudVerify'+'/'+idowner+'/'+idtierra, {headers:headers});
  }

  getContrataciones(idowner: String, status: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getContrataciones/'+idowner+"/"+status, {headers:headers});
  }

  getUserSolicitudes(idcliente: String, status: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getUserSolicitudes/'+idcliente+"/"+status, {headers:headers});
  }

  deleteContratacion(idcontratacion): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url+'deleteContratacion/'+idcontratacion, {headers:headers});
  }
}
