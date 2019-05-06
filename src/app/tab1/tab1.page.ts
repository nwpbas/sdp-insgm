import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  posts: any[] = [];
  isLoading = false;
  comment_to_post = new FormControl('');

  constructor(
    private userService: UserService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private storage: Storage,
  ) {
    // this.presentToast("TAB1")
  }

  ngOnInit() {
    this.getAllPost();
  }

  async getAllPost() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.userService.getAllPost()
      .subscribe(res => {
        this.storage.get('user_id').then(val => {
          console.log(res['posts'])
          
          for (let i in res['posts']) {
            console.log(res['posts'][i])
            if (res['posts'][i]['user'] === val) {
              this.posts.push(res['posts'][i]) 
            }
          }
        })
        console.log(this.posts);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  // async present() {
  //   this.isLoading = true;
  //   return await this.loadingController.create({
  //     duration: 5000,
  //   }).then(a => {
  //     a.present().then(() => {
  //       console.log('presented');
  //       if (!this.isLoading) {
  //         a.dismiss().then(() => console.log('abort presenting'));
  //       }
  //     });
  //   });
  // }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      translucent: true,
      duration: 2000
    });
    toast.present();
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