import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { Contrato } from '../models/contrato.model';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  public url: String;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(
    private _http: HttpClient
  ) { 
    this.url = Global.url;
  }


  saveContrato(contrato: Contrato): Observable<any> {
    return this._http.post(this.url+'regContrato',contrato, this.noAuthHeader)
  }

  getUserContratos(idowner: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //console.log(this.url+'getUserContrato/'+idowner);
    return this._http.get(this.url+'getUserContrato/'+idowner, {headers: headers});
  }

  downloadContrato(idcontrato: String): Observable<any> {
    console.log("Servicio");
    var body = {fileName:idcontrato};
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'downloadContrato', body,{
      responseType: 'blob', headers:headers});
  }

  updateContrato(contrato): Observable<any> {
    let params = JSON.stringify(contrato);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+'updateContrato/'+contrato._id,params, {headers:headers});
  }

  getContrato(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'getContrato/'+id, {headers:headers});
  }

  deleteContrato(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url+'deleteContrato/'+id, {headers:headers});
  }

}

