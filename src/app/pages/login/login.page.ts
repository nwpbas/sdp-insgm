import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

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

}
