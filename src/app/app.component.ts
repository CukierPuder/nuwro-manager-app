import { Component, OnInit, DoCheck } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './shared/services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'nuwro-manager-app';
  isAuthenticated = false;

  constructor(private authService: AuthenticationService, private cookieService: CookieService) {}

  ngOnInit(): void { }

  ngDoCheck(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
