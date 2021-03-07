import { NgModule, OnDestroy, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AddComponent } from './pages/add/add.component';
import { DetailsComponent } from './pages/details/details.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AddCardComponent } from './ui/add-card/add-card.component';
import { ErrorComponent } from './ui/error/error.component';
import { WeatherCardComponent } from './ui/weather-card/weather-card.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireLite } from 'angularfire-lite';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddComponent,
    DetailsComponent,
    LoginComponent,
    SignupComponent,
    AddCardComponent,
    ErrorComponent,
    WeatherCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireLite.forRoot(environment.config)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule  {

}
