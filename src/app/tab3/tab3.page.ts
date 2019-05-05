import { Component } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  DJANGO_SERVER: string = "http://192.168.137.1:8000";
  form: FormGroup;
  response;
  imageURL;
  userID: number;

  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private storage: Storage,
  ) {
    // this.presentToast("TAB3")
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      user: [''],
      caption: [''],
      image: [''],
    });
  }

  getUserID() {
    this.storage.get('user_id').then(val => {
      this.userID = val;
    });
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

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file.name)
      this.form.get('image').setValue(file);
    }
  }

  async onSubmit() {
    const formData = new FormData();
    await this.storage.get('user_id').then(val => {
      this.form.get('user').setValue(val);
    });
    formData.append('user', this.form.get('user').value);
    formData.append('caption', this.form.get('caption').value);
    formData.append('image', this.form.get('image').value);

    console.log(this.form.value);
    this.userService.upload(formData).subscribe(
      (res) => {
        this.response = res;
        // this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        // console.log(this.imageURL);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  data() {
    const formData = new FormData();
    formData.append('image', this.form.get('image').value);
    formData.append('user', this.form.get('user').value);
    formData.append('caption', this.form.get('caption').value);
    console.log(formData);
    console.log(this.form);
  }
}

