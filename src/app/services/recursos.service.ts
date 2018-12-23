import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from '../services/global';
import { Recurso } from '../models/recursos.model';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {
  url: String = Global.url;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  recurso : Recurso = new Recurso();
  constructor(
    private http: HttpClient
  ) { }

  postRecurso(recurso:Recurso){
    console.log(recurso);
    return this.http.post(this.url+'saveRecurso',recurso,this.noAuthHeader);
  }

  updateRecurso(recurso): Observable<any> {
    let params = JSON.stringify(recurso);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.url+ 'updateRecurso/'+recurso._id, params, {headers:headers});
  }

  deleteRecurso(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.url+ 'deleteRecurso/'+id, {headers:headers});
  }

  getRecursos(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url+'getRecursos/'+localStorage.getItem('idus'),{headers:headers});
  }

  getRecurso(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url+'getRecurso/'+id,{headers:headers});
  }
}
