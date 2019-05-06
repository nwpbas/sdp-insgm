import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  DJANGO_SERVER: string = "http://192.168.137.1:9000";
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });
  params = new HttpParams();
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController,
  ) { }

  upload(formData):Observable<any> {
    // let headers: HttpHeaders;
    // this.storage.get('token').then((value) => {
    //   headers = new HttpHeaders(
    //     {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //       'Authorization': `Token ${value}`
    //     })
    // }, err => {
    //   this.showAlert(err)
    //   console.log(err)
    // });
    return this.http.post<any>(`${this.DJANGO_SERVER}/api/posts/`, formData);
  }
  
  getAllPost(){
    // this.storage.get('token').then( val => {
    //   this.headers.append('Authorization', `Token ${val}`);
    // });
    // this.storage.get('user_id').then( val => {
    //   this.params.set("userIsgID", val);
    // });
    // console.log(this.params);
    // console.log(this.headers)

    //   header = new HttpHeaders({
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //       'Authorization': `Token ${val}`
    //     })
    // })
    // this.storage.get('user_id').then( val => {
    //   param = new HttpParams().set("userIsgID", val);
    // })
    return this.http.get<any>(`${this.DJANGO_SERVER}/api/posts/`);
  }

  // async createHeaderAndParam(){
  //   let headers = new HttpHeaders();
  //   let params = new HttpParams();
  //   this.storage.forEach((value, key, index) => {
  //     if (key === 'token') {
  //       headers.append('Content-Type', 'application/json');
  //       headers.append('Accept', 'application/json');
  //       headers.append('Authorization', `Token ${value}`);
  //       // headers = new HttpHeaders(
  //       //   {
  //       //     'Content-Type': 'application/json',
  //       //     'Accept': 'application/json',
  //       //     'Authorization': `Token ${value}`
  //       //   })
  //     }
  //     else if (key === 'user_id') {
  //       params.set("userIsgID", value);
  //     }
  //   }).then(()=>{
        
  //   });
  //   console.log(params);
  //   return [headers,params]
  // }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
