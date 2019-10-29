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
import { SharedModelDialogComponent } from './core/dialogs/shared-model-dialog/shared-model-dialog.component';
import { DatafileManagerComponent } from './core/components/datafile-manager/datafile-manager.component';
import { DatafileDialogComponent } from './core/dialogs/datafile-dialog/datafile-dialog.component';
import { ResultfileManagerComponent } from './core/components/resultfile-manager/resultfile-manager.component';
import { ResultfileDialogComponent } from './core/dialogs/resultfile-dialog/resultfile-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SharedModelManagerComponent,
    SharedModelDialogComponent,
    DatafileManagerComponent,
    DatafileDialogComponent,
    ResultfileManagerComponent,
    ResultfileDialogComponent
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
  bootstrap: [AppComponent],
  entryComponents: [
    SharedModelDialogComponent,
    DatafileDialogComponent,
    ResultfileDialogComponent
  ]
})
export class AppModule { }
