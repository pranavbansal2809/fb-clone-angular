import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user-model';
import { first } from 'rxjs';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css'],
})
export class HomeNavbarComponent implements OnInit{

  currentUserId: number;
  userData: UserModel;
  isUserListVisible: boolean;
  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.currentUserId = 0;
    this.userData = {} as UserModel;
    this.isUserListVisible = false;
  }

  ngOnInit(): void {
    this.currentUserId =
      JSON.parse(localStorage.getItem('currentUserId')!) || '{}';

      this.userService.getUserById(this.currentUserId.toString())
      .pipe(first())
      .subscribe({
        next:(data:any)=> this.userData = data[0],
        complete:()=> {
          if(this.userData.isAdmin){
            this.isUserListVisible = true;
            console.log("setting true");
          }
        }
      });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
