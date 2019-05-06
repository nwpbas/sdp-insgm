import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }

  register() {
    this.authService.registerNewUser(this.credentialsForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      this.authService.login(this.credentialsForm.value).subscribe();
    });
  }

  logout(){
    this.authService.logout();
  }



  // async registerUser() {
  //   const loader = await this.loadingCtrl.create({
  //     message: "Uploading..."
  //   });
  //   loader.present();
  //   await loader.present();
  //   this.authService.registerNewUser(this.myForm.value)
  //     .subscribe(res => {
  //       console.log(res)
  //       loader.dismiss();
  //     }, err => {
  //       loader.dismiss();
  //       let msg: string = '';
  //       Object.keys(err.error).forEach(key => {
  //         msg += `"${key}" : ${err.error[key]} \n`
  //       });
  //       this.presentToast(msg)
  //       console.log(msg);
  //     })
  // }

}
