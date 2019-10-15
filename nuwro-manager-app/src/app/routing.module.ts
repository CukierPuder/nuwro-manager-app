import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { SharedModelManagerComponent } from './core/components/shared-model-manager/shared-model-manager.component';
import { AuthenticationGuardService } from './shared/services/authentication-guard.service';


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
