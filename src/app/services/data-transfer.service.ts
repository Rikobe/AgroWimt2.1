import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  private someDataSource = new BehaviorSubject(null);

  currentSomeDataChanges = this.someDataSource.asObservable();

  someDataChanges(data) {
    this.someDataSource.next(data);
  }
}
