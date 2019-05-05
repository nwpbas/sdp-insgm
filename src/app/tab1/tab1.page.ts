import { Component } from '@angular/core';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  photoArr: any[] = [];
  myphoto: any;

  constructor(private photoLibrary: PhotoLibrary,
    private camera: Camera,
    private transfer: FileTransfer,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
    // this.presentToast("TAB1")
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
    }, (err) => {
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
    }, (err) => {
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

  // onClick() {
  //   this.photoLibrary.requestAuthorization().then(() => {
  //     this.photoLibrary.getLibrary().subscribe({
  //       next: library => {
  //           this.photoArr.push(library);
  //         },
  //         // library.forEach(function(libraryItem) {
  //         //   console.log(libraryItem.id);          // ID of the photo
  //         //   console.log(libraryItem.photoURL);    // Cross-platform access to photo
  //         //   console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
  //         //   console.log(libraryItem.fileName);
  //         //   console.log(libraryItem.width);
  //         //   console.log(libraryItem.height);
  //         //   console.log(libraryItem.creationDate);
  //         //   console.log(libraryItem.latitude);
  //         //   console.log(libraryItem.longitude);
  //         //   console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
  //         // });
  //       error: err => { console.log('could not get photos'); },
  //       complete: () => { console.log('done getting photos'); }
  //     });
  //   })
  //   .catch(err => console.log('permissions weren\'t granted'));
  // }

}