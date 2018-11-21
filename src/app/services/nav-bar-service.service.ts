import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarServiceService {

  private navStateSource = new Subject<any>();
  navState$ = this.navStateSource.asObservable();

  constructor() { }

  setNavBarstate( state: any){
    this.navStateSource.next(state);
  }
}
