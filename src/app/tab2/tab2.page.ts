import { Component, ElementRef, ViewChild} from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service'
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  DJANGO_SERVER: string = "http://192.168.137.1:8000";
  pic_caption = new FormControl('');
  response;
  imageURL;
  photoArr: any[] = [];
  myphoto: any;
  // @ViewChild('fabBT') myfabBT: ElementRef;
  fabBtHidden : Boolean;
  newPostHidden: Boolean;
  fabBtActive : Boolean;

  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private camera: Camera,
    private transfer: FileTransfer,
    private userService: UserService,
    private storage: Storage,
  ) {
    this.fabBtActive = true;
    this.fabBtHidden = false;
    this.newPostHidden = true;
    // this.presentToast("TAB2")
  }

  ionViewWillEnter (){
    this.fabBtActive = true;
    this.fabBtHidden = false;
    this.newPostHidden = true;
  }

  ionViewDidLeave() {
    this.fabBtActive = false;
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

  hideFabButton(){
    this.fabBtHidden = !this.fabBtHidden;
    this.newPostHidden = !this.newPostHidden;
  }

  async addPost() {
    const formData = new FormData();
    await this.storage.get('user_id').then(val => {
      formData.append('user', val);
      // this.myphoto.name = val.toString(10);
    });

    formData.append('caption', this.pic_caption.value);
    formData.append('image', this.myphoto);
    await this.userService.upload(formData).subscribe(
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

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
      this.hideFabButton()
    }, (err) => {
      this.hideFabButton()
      // Handle error
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
      this.hideFabButton()
    }, (err) => {
      this.hideFabButton()
      // Handle error
    });
  }

  cropImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  async uploadImage() {
    //Show loading
    let loader = await this.loadingCtrl.create({
      message: "Uploading..."
    });
    await loader.present();

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    var random = Math.floor(Math.random() * 100);

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: "myImage_" + random + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    //file transfer action
    fileTransfer.upload(this.myphoto, 'http://192.168.137.1:8000/instagram/upload-pic/', options)
      .then((data) => {
        let msg_alr: string = `<p>FileUploadResult</p>
        <ul>
          <li>bytesSent: ${data.bytesSent}</li>
          <li>responseCode: ${data.responseCode}</li>
          <li>response: ${data.response}</li>
          <li>headers: ${data.headers}</li>
        </ul>`;
        this.presentAlert('Upload Succes', msg_alr);
        console.log(msg_alr);
        loader.dismiss();
      }, (err) => {
        let msg_alr: string = `${err}`
        this.presentAlert('Upload Fail', msg_alr);
        console.log(msg_alr);
        loader.dismiss();
      });
  }

  async presentAlert(header_msg: string = 'Alert', msg: string = '', subHeader_msg: string = '') {
    const alert = await this.alertController.create({
      header: header_msg,
      subHeader: subHeader_msg,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

}
