import { UserService } from 'src/app/service/user.service';
import { UserModel } from './../../model/user-model';
import { ChangeNavbarService } from 'src/app/service/change-navbar.service';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { PhotoModel } from 'src/app/model/photo-model';
import { PostsService } from 'src/app/service/posts.service';
import { PostModel } from 'src/app/model/post-model';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  postModel: PostModel;
  userModel: UserModel;
  userPosts: PostModel[];
  currentUserId: string;
  isAdmin:boolean;

  constructor(private changeNavbarService: ChangeNavbarService,
    private postsService: PostsService,
    private userService:UserService) {
      this.postModel = {} as PostModel;
      this.userModel = {} as UserModel;
      this.userPosts = [];
      this.currentUserId = '';
      this.isAdmin = false;
  }

  ngOnInit(): void {
    this.changeNavbarService.setHomeNavbar(true);
    this.currentUserId = JSON.parse(localStorage.getItem('currentUserId')!) || '{}';
    this.checkUserAdmin();
  }
  checkUserAdmin() {
    this.userService.getUserById(this.currentUserId)
    .pipe()
    .subscribe({
      next:(data:any)=>{this.isAdmin = data[0].isAdmin},
      complete:()=>{this.loadPosts()}
    })
  }
  loadPosts() {
    this.postsService.getAllPost()
    .pipe(first())
    .subscribe({
      next:(data)=> {this.userPosts = data},
      complete:()=>{
        if(!this.isAdmin){
          this.userPosts = this.userPosts.filter((post)=> post.isActive==false)
        }
      }
    })
  }

  updatePostStatus(index:number){
    this.postModel = this.userPosts[index];
    this.postModel.isActive = !this.postModel.isActive;
    this.postsService.updatePost(this.postModel)
    .pipe()
    .subscribe({
      next:(data)=>{window.location.reload();
      }
    })
  }

  generateNewPost(textInput: any, picInput: any) {
    console.log(textInput);
    console.log(picInput);
    this.postModel.postText = textInput;
    this.postModel.postImage = picInput;
    this.postModel.isActive = true;
    this.postModel.isAdmin = false;

    this.postModel.userId = this.currentUserId;

    this.postsService.newPost(this.postModel)
    .pipe(first())
    .subscribe({
      next:(data)=> console.log(data),
      complete:() => window.location.reload()
    })
  }
}
