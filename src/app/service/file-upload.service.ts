import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../environments/environment';
import { PhotoModel } from '../model/photo-model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {}


  public uploadImage(photoModel: PhotoModel){

    return this.http.post(Environment.apiUrl+'/files/uploadFile', photoModel);
  }


}
