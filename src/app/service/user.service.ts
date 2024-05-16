import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environments/environment';
import { UserModel } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public httpClient: HttpClient) { }

  public regiterUser(user: UserModel){
    return this.httpClient.post(Environment.apiUrl+'users', user);
  }

  public getUserByEmail(email: string){
    return this.httpClient.get<UserModel>(Environment.apiUrl+`users?email=`+email);
  }

  public getUserById(id: string){
    return this.httpClient.get<UserModel>(Environment.apiUrl+`users?id=`+id);
  }

  public updateUser(userModel: UserModel){
    return this.httpClient.put(Environment.apiUrl+'users/'+userModel.id, userModel);
  }

  public getAllUser(){
    return this.httpClient.get<UserModel[]>(Environment.apiUrl+'users');
  }

  public deleteUserById(id: number){
    return this.httpClient.delete(Environment.apiUrl+'users?id='+id);
  }
}
