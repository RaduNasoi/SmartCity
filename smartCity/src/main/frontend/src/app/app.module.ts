import { DirectionsMapDirective } from './park/googlemaps.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {ParkService} from "./park/park.service";
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import {UserService} from "./user.service";
import {FormsModule} from "@angular/forms";
import { AuthGuard } from './auth-guard.service';
import {AuthService} from "./auth.service";
import {LocalStorageService, LocalStorage} from 'ng2-webstorage';
import {AdminGuard} from "./admin-guard.service";
import { LogoutComponent } from './logout/logout.component';
import {MarkerdataService} from "./park/markerdata.service";

@NgModule({
  declarations: [
    AppComponent,
    DirectionsMapDirective,
    routingComponents,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDhPxz7eqvwOlUvWG3p18_3Y0dkvJm53bE'
    })
  ],
  providers: [ParkService, UserService,  AuthService, LocalStorageService,AuthGuard,AdminGuard, MarkerdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

