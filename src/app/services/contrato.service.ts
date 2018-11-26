import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { Contrato } from '../models/contrato.model';

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

}

