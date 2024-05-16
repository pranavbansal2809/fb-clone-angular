import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeNavbarService {

  private isHomeNavar: BehaviorSubject<boolean> = new BehaviorSubject(false);
  homeNavbarReq = () => this.isHomeNavar.asObservable();
  constructor() { }

  setHomeNavbar(isRequired: boolean): void{
    this.isHomeNavar.next(isRequired);
  }
}
