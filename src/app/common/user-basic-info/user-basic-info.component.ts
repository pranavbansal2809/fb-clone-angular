import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { PostModel } from 'src/app/model/post-model';
import { FriendsService } from 'src/app/service/friends.service';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-user-basic-info',
  templateUrl: './user-basic-info.component.html',
  styleUrls: ['./user-basic-info.component.css']
})
export class UserBasicInfoComponent implements OnInit {

  postCount: number;
  currentUserId: number;
  connectionNum:number;
  userPhoto:string;

  constructor(private postsService: PostsService,
    private friendsService:FriendsService,
    private userService: UserService) {
      this.postCount = 0;
      this.currentUserId = 0;
      this.connectionNum = 0;
      this.userPhoto = '';
  }

  ngOnInit(): void {
    this.currentUserId =
    JSON.parse(localStorage.getItem('currentUserId')!) || '{}';
    this.loadPosts();
    this.updateConnections();
    this.loadProfilePicture();
  }
  loadProfilePicture() {
    this.userService.getUserById(this.currentUserId.toString())
    .pipe()
    .subscribe({
      next:(data:any)=>{this.userPhoto = data[0].photo}
    })
  }

  updateConnections() {
    this.friendsService
      .getAddedFriendsForUser(this.currentUserId)
      .pipe()
      .subscribe({
        next: (FriendList) => (this.connectionNum += FriendList.length),
      });

      this.friendsService
      .getAddedFriendsForFriend(this.currentUserId)
      .pipe()
      .subscribe({
        next: (FriendList) => (this.connectionNum += FriendList.length),
      });
  }

  loadPosts() {
    this.postsService.getPostById(this.currentUserId)
    .pipe(first())
    .subscribe({
      next:(data)=> {
        this.postCount = data.length},
    })
  }
}
