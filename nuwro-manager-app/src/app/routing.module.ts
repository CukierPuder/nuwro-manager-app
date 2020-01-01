import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { SharedModelManagerComponent } from './core/components/shared-model-manager/shared-model-manager.component';
import { AuthenticationGuardService } from './shared/services/authentication-guard.service';
import { ResultfileManagerComponent } from './core/components/resultfile-manager/resultfile-manager.component';
import { ChartsManagerComponent } from './core/components/charts-manager/charts-manager.component';
import { ArtifactManagerComponent } from './core/components/artifact-manager/artifact-manager.component';


export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'logout',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'charts-manager',
    component: ChartsManagerComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'resultfile-manager',
    component: ResultfileManagerComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'artifact-manager',
    component: ArtifactManagerComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'experiment-manager',
    component: SharedModelManagerComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'measurement-manager',
    component: SharedModelManagerComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'nuwroversion-manager',
    component: SharedModelManagerComponent,
    canActivate: [AuthenticationGuardService]
  },
];
