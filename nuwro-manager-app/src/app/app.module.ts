import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { MaterialModule } from './material.module';
import { appRoutes } from './routing.module';
import { LoginComponent } from './core/components/login/login.component';
import { SharedModelManagerComponent } from './core/components/shared-model-manager/shared-model-manager.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SharedModelManagerComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
