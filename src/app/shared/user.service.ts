import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    console.log(user);
    return this.http.post(this.url+'registrarse',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(this.url + 'autenticar', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(this.url + 'perfil');
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
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
