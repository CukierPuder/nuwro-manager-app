import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxFileDropModule } from 'ngx-file-drop';

import { MaterialModule } from './material.module';
import { appRoutes } from './routing.module';
import { LoginComponent } from './core/components/login/login.component';
import { ChartsManagerComponent } from './core/components/charts-manager/charts-manager.component';
import { ResultfileManagerComponent } from './core/components/resultfile-manager/resultfile-manager.component';
import { ResultfileDialogComponent } from './core/dialogs/resultfile-dialog/resultfile-dialog.component';
import { FileDropComponent } from './core/components/file-drop/file-drop.component';
import { ArtifactManagerComponent } from './core/components/artifact-manager/artifact-manager.component';
import { ArtifactsDialogComponent } from './core/dialogs/artifacts-dialog/artifacts-dialog.component';
import { SharedModelManagerComponent } from './core/components/shared-model-manager/shared-model-manager.component';
import { SharedModelDialogComponent } from './core/dialogs/shared-model-dialog/shared-model-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChartsManagerComponent,
    ResultfileManagerComponent,
    ResultfileDialogComponent,
    FileDropComponent,
    ArtifactManagerComponent,
    ArtifactsDialogComponent,
    SharedModelManagerComponent,
    SharedModelDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [
    ResultfileDialogComponent,
    ArtifactsDialogComponent,
    SharedModelDialogComponent
  ]
})
export class AppModule { }
