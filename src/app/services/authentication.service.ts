import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user = null;
  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient, 
    private storage: Storage,
    private plt: Platform,
     private alertController: AlertController
  ) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    console.log('checkToKen')
    this.storage.get('token').then(token => {
      console.log('token',token);
      if (token && token !== '') {
        this.authenticationState.next(true);
        console.log('authenticationState :',this.authenticationState.value)
      }
      else {
        this.storage.remove('token');
      }
    }, err => {
      this.showAlert(err)
      console.log(err)
    });
  }
 
  login(credentials) {
    console.log('login')
    return this.http.post(`http://localhost:8000/api/token-auth/`, credentials)
      .pipe(
        tap(res => {
          this.storage.set('token', res['token']);
          this.storage.set('user_id', res['user_id']);
          this.authenticationState.next(true);
          console.log('authenticationState :',this.authenticationState.value)
        }),
        catchError(e => {
          console.log(e);
          this.showAlert(e.error);
          throw new Error(e);
        })
      );
  }
 
  logout() {
    console.log('logout')
    this.storage.remove('token').then(() => {
      this.authenticationState.next(false);
      console.log('authenticationState :',this.authenticationState.value)
    });
  }
 
  // getSpecialData() {
  //   return this.http.get(`${this.url}/api/special`).pipe(
  //     catchError(e => {
  //       let status = e.status;
  //       if (status === 401) {
  //         this.showAlert('You are not authorized for this!');
  //         this.logout();
  //       }
  //       throw new Error(e);
  //     })
  //   )
  // }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  registerNewUser(credentials): Observable<any> {
    return this.http.post('http://localhost:8000/api/users/', credentials)
  }
}
