import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../environments/environment';
import { PostModel } from '../model/post-model';
import { UserModel } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(public httpClient: HttpClient) { }

  public newPost(posts: PostModel){
    return this.httpClient.post(Environment.apiUrl+'posts', posts);
  }

  public getAllPost(){
    return this.httpClient.get<PostModel[]>(Environment.apiUrl+'posts');
  }

  public getPostById(id:number){
    return this.httpClient.get<PostModel[]>(Environment.apiUrl+'posts?userId='+id+'&isActive=true');
  }

  public updatePost(post: PostModel){
    return this.httpClient.put(Environment.apiUrl+'posts/'+post.id, post);
  }
}
