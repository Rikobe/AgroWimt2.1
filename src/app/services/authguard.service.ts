import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  constructor(public _authService:AuthService) { }
  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    if (!this._authService.isAuthenticated()) {
      this._authService.login();
    }
    return this._authService.isAuthenticated();
  }
}
