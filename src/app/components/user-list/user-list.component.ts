import { Component, OnInit } from '@angular/core';
import { FriendsListModel } from 'src/app/model/friends-list-model';
import { UserModel } from 'src/app/model/user-model';
import { ChangeNavbarService } from 'src/app/service/change-navbar.service';
import { FriendsService } from 'src/app/service/friends.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userData: UserModel[];
  currentUserId: number;
  buttonText:string[];
  dummyUser: UserModel;

  constructor(
    changeNavbarService: ChangeNavbarService,
    private userService: UserService,
    private friendsService: FriendsService
  ) {
    this.userData = [];
    this.buttonText = [];
    this.currentUserId = 0;
    this.dummyUser = {} as UserModel;
    changeNavbarService.setHomeNavbar(true);
  }

  ngOnInit(): void {
    this.currentUserId =
      JSON.parse(localStorage.getItem('currentUserId')!) || '{}';
    this.loadAllUser();
  }

  loadAllUser() {
    this.userService
      .getAllUser()
      .pipe()
      .subscribe({
        next: (data) => (this.userData = data),
        complete: () => {
          this.userData = this.userData.filter((user)=> user.isAdmin != true);
          this.changeButtonText();
          },
      });
  }
  changeButtonText() {
    for(let user of this.userData){
      if(user.isActive){
        this.buttonText.push("Block");
      }else{
        this.buttonText.push("Activate");
      }
    }
  }

  changeUserStatus(index: number){
    this.dummyUser = this.userData[index];
    this.dummyUser.isActive = !this.dummyUser.isActive;
    this.userService.updateUser(this.dummyUser)
    .pipe()
    .subscribe({
      next:(data)=> console.log(data),
      complete: ()=> window.location.reload()
    })
  }

}



