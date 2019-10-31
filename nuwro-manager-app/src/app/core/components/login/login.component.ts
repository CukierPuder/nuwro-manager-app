import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder} from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthToken } from 'src/app/shared/models/auth-token.model';
import { UserSignIn, UserSignUp } from 'src/app/shared/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  messageHidden = true;
  signInForm = this.formBuilder.group({
    email: [''],
    password: ['']
  });
  signUpForm = this.formBuilder.group({
    email: [''],
    password: [''],
    username: ['']
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.signOut();
  }

  onSignInButtonClicked(): void {
    this.clearMessage();
    const userInstance = new UserSignIn(
      this.signInForm.get('email').value,
      this.signInForm.get('password').value
    );

    this.authService.postUserCredentials(userInstance).subscribe(
      (res) => {
        const tokenInstance = new AuthToken(res.token);
        this.authService.signIn(tokenInstance.token);
        this.router.navigate(['/charts-manager']);
      },
      (err) => {
        if (err.status === 400) {
          this.displayMessage('Invalid email or password');
        } else {
          this.displayMessage(err.status + '\n' + err.statusText);
        }
      }
    );
  }

  onSignUpButtonClicked(): void {
    this.clearMessage();
    const userInstance = new UserSignUp(
      this.signUpForm.get('email').value,
      this.signUpForm.get('password').value,
      this.signUpForm.get('username').value
    );

    this.authService.registerUser(userInstance).subscribe(
      (res) => {
        // TODO: redirect to login tab and provide the given email address
      },
      (err) => {
        this.displayMessage(err.status + '\n' + err.statusText);
      }
    );
  }

  private clearMessage(): void {
    this.errorMessage = '';
    this.messageHidden = true;
  }

  private displayMessage(message: string): void {
    this.errorMessage = message;
    this.messageHidden = false;
  }

}
