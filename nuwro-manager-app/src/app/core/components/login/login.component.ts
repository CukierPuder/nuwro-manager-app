import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder} from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthToken } from 'src/app/shared/models/auth-token.model';
import { UserSignIn } from 'src/app/shared/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  messageHidden: boolean = true;

  signInForm = this.formBuilder.group({
    email: [''],
    password: ['']
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.signOut();
  }

  onSubmit(): void {
    const userInstance = new UserSignIn(
      this.signInForm.get('email').value,
      this.signInForm.get('password').value
    );

    this.authService.postUserCredentials(userInstance).subscribe(
      (res) => {
        const tokenInstance = new AuthToken(res.token);
        this.authService.signIn(tokenInstance.token);
        this.router.navigate(['/experiment-manager']);
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

  displayMessage(message: string) {
    this.errorMessage = message;
    this.messageHidden = false;
  }

}
