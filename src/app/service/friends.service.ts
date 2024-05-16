import { FriendsListComponent } from './../components/friends-list/friends-list.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environments/environment';
import { FriendsListModel } from '../model/friends-list-model';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(public httpClient: HttpClient) { }

  public getAllFriends(){
    return this.httpClient.get<FriendsListModel[]>(Environment.apiUrl+'friends');
  }

  public getFriendsForUser(id:number){
    return this.httpClient.get<FriendsListModel[]>(Environment.apiUrl+'friends?userId='+id);
  }

  public getRequestForUser(id:number){
    return this.httpClient.get<FriendsListModel[]>(Environment.apiUrl+'friends?friendId='+id);
  }

  public addFriend(friendList: FriendsListModel){
    return this.httpClient.post(Environment.apiUrl+'friends', friendList);
  }

  public updateFriend(friendsListModel:FriendsListModel){
    return this.httpClient.put(Environment.apiUrl+'friends/'+friendsListModel.userId, friendsListModel);
  }

  public getAddedFriendsForUser(id:number){
    return this.httpClient.get<FriendsListModel[]>(Environment.apiUrl+'friends?userId='+id+'&status=Friends');
  }

  public getAddedFriendsForFriend(id:number){
    return this.httpClient.get<FriendsListModel[]>(Environment.apiUrl+'friends?friendId='+id+'&status=Friends');
  }
}
