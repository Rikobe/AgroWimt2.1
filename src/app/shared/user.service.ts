import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Global } from '../services/global';
import { User } from '../models/user.model';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    nombre: '',
    apellido: '',
    visibilidad: '',
    balance: 0,
    email: '',
    password: '',
    fecharegistro: '',
    fotoperfil:'',
    rfc: '',
    calle: '',
    colonia: '',
    num: '',
    tel1: '',
    tel2: '',
    pais: '',
    estado: '',
    ciudad: '',
    contratos: 0,
    tierras: 0,
    rentas: 0,
    eventos: 0,
  };
  url: String = Global.url;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: User){
    user.fecharegistro = new Date().toLocaleString();
    //console.log(user);
    return this.http.post(this.url+'registrarse',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(this.url + 'autenticar', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(this.url + 'perfil');
  }

  getInfoUser(id: String): Observable<any> {
    return this.http.get(this.url + 'getInfoUser/' + id);
  } 

  updateUser(user): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.url+ 'updateUser/'+localStorage.getItem('idus'), params, {headers:headers});
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getId() {
    var token = this.getToken();
    if (token) {
      var id = atob(token.split('.')[1]);
      return JSON.parse(id);
    }
    else
      return null;
  }

  setId() {
    var id = this.getId();
    if (id)
      localStorage.setItem('idus', id._id);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
