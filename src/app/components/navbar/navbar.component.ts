import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { TierrasService } from '../../services/tierras/tierras.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { Tierra } from '../../models/tierras.model';
import { Global } from '../../services/global';
import { UserService } from 'src/app/shared/user.service';
import { NavBarServiceService } from '../../services/nav-bar-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggeado:boolean = false;
  
  constructor(private _authService:AuthService,
    private _tierraService: TierrasService, 
    private _dataTransfer: DataTransferService,
    private _userService: UserService,
    private _navBarService: NavBarServiceService
    ) { 
    this._navBarService.navState$.subscribe((state)=>this.loggeado = state);
    // _authService.handleAuthentication();   
    if(this._userService.getToken()){
      this.loggeado = true;
    }
  }

  ngOnInit() {
    this.loggeado = this._userService.isLoggedIn();
  }
  // login(){
  //   this._authService.login();
  // } 
  logout(){
    this._userService.deleteToken();
    window.location.href = '/';
  }

  buscar(busqueda:any){
    this._dataTransfer.someDataChanges(busqueda.value);
  }

  

}
