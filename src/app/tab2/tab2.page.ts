import { Component } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  myForm = this.formBuilder.group({
    username: '',
    email: '',
    password: '',
  });

  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
  ) {
    this.presentToast("TAB2")
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      translucent: true,
      duration: 2000
    });
    toast.present();
  }

  async registerUser() {
    const loader = await this.loadingCtrl.create({
      message: "Uploading..."
    });
    loader.present();
    await loader.present();
    this.authService.registerNewUser(this.myForm.value)
      .subscribe(res => {
        console.log(res)
        loader.dismiss();
      }, err => {
        loader.dismiss();
        let msg: string = '';
        Object.keys(err.error).forEach(key => {
          msg += `"${key}" : ${err.error[key]} \n`
        });
        this.presentToast(msg)
        console.log(msg);
      })
  }
}
