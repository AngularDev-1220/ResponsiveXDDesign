import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { FbService } from 'src/app/services/fb/fb.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { WeatherService } from 'src/app/services/weather/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  @Input() set city(city: string){
    this.cityName = city;
    this.weather.getWeather(city)
                .pipe(first())
                .subscribe((payload: any) => {
                  this.state = payload.weather[0].main;
                  this.temp = Math.ceil(payload.main.temp);
                }, (err) => {
                  this.errorMessage = err.error.message;
                  setTimeout(() => {
                    this.errorMessage = '';
                  }, 3000);
                });

    this.weather.getForecast(city)
                .pipe(first())
                .subscribe((payload: any) => {
                    this.maxTemp = Math.round(payload[0].main.temp);
                    this.minTemp = Math.round(payload[0].main.temp);
                    for (const res of payload) {
                      if (new Date().toLocaleDateString('en-GB') === new Date(res.dt_txt).toLocaleDateString('en-GB')){
                        this.maxTemp = res.main.temp > this.maxTemp ? Math.round(res.main.temp) : this.maxTemp;
                        this.minTemp = res.main.temp < this.minTemp ? Math.round(res.main.temp) : this.minTemp;
                      }
                    }
                }, (err) => {
                  this.errorMessage = err.error.message;
                  setTimeout(() => {
                    this.errorMessage = '';
                  }, 3000);
                });
  }
  @Input() addMode: string;
  @Output() cityStored = new EventEmitter();
  citesWeather!: object;
  darkMode = false;
  sub1!: Subscription;
  state!: string;
  temp!: number;
  maxTemp!: number;
  minTemp!: number;
  errorMessage!: string;
  cityName!: string;
  cityAdded!: boolean;


  constructor(public weather: WeatherService,
              public router: Router,
              public ui: UiService,
              public fb: FbService) {
                this.addMode = '';
              }

  ngOnInit(): void {

    this.sub1 = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });
  }
  ngOnDestory(): void {
    this.sub1.unsubscribe();
  }

  openDetails(): void {
    if (!this.addMode) {
      this.router.navigateByUrl('/details/' + this.cityName);
    }
  }

  addCity(): void {
    this.fb.addCity(this.cityName).subscribe(() => {
      this.cityName = '';
      this.maxTemp = 0;
      this.minTemp = 0;
      this.state = '';
      this.temp = 0;
      this.cityAdded = true;
      this.cityStored.emit();
      setTimeout(() => this.cityAdded = false, 2000);
    });
  }

}
