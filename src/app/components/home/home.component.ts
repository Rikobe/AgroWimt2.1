import { Component, OnInit } from '@angular/core';
import { TierrasService } from '../../services/tierras/tierras.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { Tierra } from '../../models/tierras.model';
import { Global } from '../../services/global';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public tierra: Tierra = new Tierra();
  public tierraRenta: Tierra = new Tierra();
  public tierras: Tierra[];
  public rentas: Tierra[];
  public homeTierras: Tierra[];
  public url: String = Global.url;
  loggeado : boolean = false;
  cardLimit: Number;
  constructor(private _tierraService: TierrasService, private _dataTransfer: DataTransferService, 
    private _authService:AuthService){
      _authService.handleAuthentication();
      this.loggeado = this._authService.isAuthenticated();
      if (this.loggeado)
        this.cardLimit = 8
      else
        this.cardLimit = 16;
    }

  ngOnInit() {
    this.tierra.estado = "Sinaloa";
    this.tierra.ciudad = "Los Mochis"
    this.getCercadeti(this.tierra);
    this.getRentas(this.tierraRenta);
    this.tierra = new Tierra();
    this.getTierras(this.tierra);
  }

  getCercadeti(tierra: Tierra){
    this._tierraService.getCercadeti(tierra).subscribe(
      response => {
        if (response.resultado){
          this.tierras = response.resultado;
          //console.log(this._tierraService.getToken());
        }
      },
      error => {
        console.log(<any>error);
      });
  }

  getRentas(tierra: Tierra){
    if (this.loggeado){
      tierra.idowner = this._authService.getId();
      this._tierraService.getRentas(tierra).subscribe(
        response => {
          if (response.resultado)
            this.rentas = response.resultado;
        },
        error => {
          console.log(<any>error)
        }
      );
    }
  }

  getTierras(tierra: Tierra){
    if (this.loggeado){
      tierra.idowner = this._authService.getId();
      console.log(tierra.idowner);
      this._tierraService.getHomeTierras(tierra).subscribe(
        response => {
          if (response.resultado)
            this.homeTierras = response.resultado;
            console.log(this.homeTierras);
        },
        error => {
          console.log(<any>error)
        }
      );
    }
  }

  gototierra(_id: any){
    console.log(_id);
    this._dataTransfer.someDataChanges(_id);
  }

}
