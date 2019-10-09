import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm = this.formBuilder.group({
    email: [''],
    password: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    /*
    if (this.cookieService.check('authToken')) {
      console.log('You have been logged in successfully');
    } else {
      console.log('You have to log in to use this app...');
    }
    */
  }

  onSubmit(): void {
    this.authService.signIn(this.signInForm).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}
