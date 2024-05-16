import { first } from 'rxjs';
import { FriendsListModel } from './../../model/friends-list-model';
import { Component, ElementRef, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user-model';
import { ChangeNavbarService } from 'src/app/service/change-navbar.service';
import { FriendsService } from 'src/app/service/friends.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css'],
})
export class NetworkComponent implements OnInit {
  userData: UserModel[];
  userDataDummy: UserModel[];
  friendData: FriendsListModel[];
  newFriend : FriendsListModel;
  currentUserId: number;
  connectionNum : number;
  constructor(
    changeNavbarService: ChangeNavbarService,
    private userService: UserService,
    private friendsService: FriendsService
  ) {
    this.userData = [];
    this.userDataDummy = [];
    this.friendData = [];
    this.newFriend = {} as FriendsListModel;
    this.currentUserId = 0;
    this.connectionNum = 0;
    changeNavbarService.setHomeNavbar(true);
  }

  ngOnInit(): void {
    this.currentUserId =
      JSON.parse(localStorage.getItem('currentUserId')!) || '{}';
    this.loadAllUser();
  }

  loadAllUser() {

    this.friendsService
      .getFriendsForUser(this.currentUserId)
      .pipe()
      .subscribe({
        next: (FriendList) => {this.friendData = FriendList},
        error:(err)=>this.updateFriendStatus(),
        complete:()=>this.updateFriendStatus()
      });
  }

  updateFriendStatus() {
    this.userService
      .getAllUser()
      .pipe()
      .subscribe({
        next: (data) => (this.userDataDummy = data),
        complete: () => {this.changeButtonText();
          this.checkReceivedFriendRequest();
          },
      });
  }
  checkReceivedFriendRequest() {
    this.friendsService.getRequestForUser(this.currentUserId)
    .pipe()
    .subscribe({
      next:(data)=> {
        this.changeTextOnReceived(data);
      }
    })
  }
  changeTextOnReceived(friendsModel: FriendsListModel[]) {
    for(let friend of friendsModel){
      for(let user of this.userData){
        if(friend.status == "Friends" && (friend.userId == user.id || user.id == friend.friendId )){
          let remove = this.userData.indexOf(user);
          this.userDataDummy.splice(remove, 1);
          continue;
        }
      }
    }
    for(let friend of friendsModel){
      for(let user of this.userData){
        if(user.id == friend.userId && friend.status =="Request Pending"){
          user.friendStatus = "Accept Request"
        }
      }
    }
  }

  changeButtonText() {
    for (let user of this.userDataDummy) {
      if(user.id == this.currentUserId.toString()){
        let remove = this.userDataDummy.indexOf(user);
        this.userDataDummy.splice(remove, 1);
        break;
      }
    }
    for (let user of this.userDataDummy) {
      user.friendStatus = 'Send Request';
      for (let friend of this.friendData) {
        if(friend.status == "Friends" && (friend.userId == user.id || user.id == friend.friendId )){
          let remove = this.userData.indexOf(user);
          this.userDataDummy.splice(remove, 1);
          continue;
        }
        if (user.id == friend.friendId ) {
          user.friendStatus = friend.status;
        }
      }
    }
    this.userData = this.userDataDummy;
  }
  changeFriendStatus(index:number) {
    switch(this.userData[index].friendStatus){
      case "Send Request":
          this.newFriend.userId = this.currentUserId.toString();
          this.newFriend.friendId = this.userData[index].id.toString();
          this.newFriend.status = "Request Pending";
          this.friendsService.addFriend(this.newFriend)
          .pipe()
          .subscribe({
            next:(data)=> console.log(data)
          })
        break;
      case "Request Pending":
        break;
      case "Accept Request":
        this.newFriend.userId = this.userData[index].id;
        this.newFriend.friendId = this.currentUserId.toString();
        this.newFriend.status = "Friends";
        this.friendsService.updateFriend(this.newFriend)
          .pipe()
          .subscribe({
            next:(data)=> console.log(data),
            complete:()=>{
              this.userData = this.userData.filter((user) => user.id != this.newFriend.userId)
            }
          })
        break;
    }

  }
}



