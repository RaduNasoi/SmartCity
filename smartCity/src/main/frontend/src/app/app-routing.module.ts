import {NgModule} from "@angular/core";
import{RouterModule,Routes} from "@angular/router";
import{LoginComponent} from "./login/login.component";
import{ParkComponent} from "./park/park.component";
import{RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {ParkformComponent} from "./parkform/parkform.component";
import { AuthGuard } from './auth-guard.service';
import {AdminGuard} from "./admin-guard.service";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes=[

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'enrollpark',
    component: ParkformComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'park',
    component: ParkComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
    imports:[
      RouterModule.forRoot(routes)
    ],
    exports:[
      RouterModule
    ]
  })
export class AppRoutingModule{}
export const routingComponents =[LoginComponent,RegisterComponent, ParkComponent,ParkformComponent, HomeComponent]
