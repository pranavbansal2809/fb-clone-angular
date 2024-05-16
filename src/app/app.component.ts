import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeNavbarService } from './service/change-navbar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final-project';
  isHomeNavbar : boolean;

  constructor(private changeNavbarService: ChangeNavbarService){
    this.isHomeNavbar = false;
    changeNavbarService.homeNavbarReq()
    .subscribe({
      next:(data)=> this.isHomeNavbar = data,
    });
  }




}
