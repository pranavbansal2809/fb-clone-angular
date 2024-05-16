import { Component, OnInit } from '@angular/core';
import { FriendsListModel } from 'src/app/model/friends-list-model';
import { UserModel } from 'src/app/model/user-model';
import { ChangeNavbarService } from 'src/app/service/change-navbar.service';
import { FriendsService } from 'src/app/service/friends.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  userData: UserModel[];
  friendData: FriendsListModel[];
  friendData1: FriendsListModel[];
  currentUserId: number;
  constructor(
    changeNavbarService: ChangeNavbarService,
    private userService: UserService,
    private friendsService: FriendsService
  ) {
    this.userData = [];
    this.friendData = [];
    this.friendData1 = [];
    this.currentUserId = 0;

    changeNavbarService.setHomeNavbar(true);
  }

  ngOnInit(): void {
    this.currentUserId =
      JSON.parse(localStorage.getItem('currentUserId')!) || '{}';
    this.updateFriendStatusOfOther();
    this.updateFriendStatus();
  }
  updateFriendStatusOfOther() {
    this.friendsService
      .getAddedFriendsForUser(this.currentUserId)
      .pipe()
      .subscribe({
        next: (data) => {
          this.friendData = data
        },
        complete:()=> this.populateUserData()
      });
  }


  updateFriendStatus() {
    this.friendsService
      .getAddedFriendsForFriend(this.currentUserId)
      .pipe()
      .subscribe({
        next: (data) => {
          this.friendData1 = data
          },
        complete:()=> this.populateUserData1()
      });
  }
  populateUserData(): void {
    for(let friend of this.friendData){
      this.userService.getUserById(friend.friendId)
      .pipe()
      .subscribe({
        next:(data:any)=>{
              this.userData.push(data[0])
        }
      })
    }
  }
  populateUserData1(): void {
    for(let friend of this.friendData1){
      this.userService.getUserById(friend.userId)
      .pipe()
      .subscribe({
        next:(data:any)=>{
              this.userData.push(data[0])
        }
      })
    }
  }
}

