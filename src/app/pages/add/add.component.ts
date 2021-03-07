import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FbService } from 'src/app/services/fb/fb.service';
import { WeatherService } from 'src/app/services/weather/weather.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy{

  temp!: number;
  city = 'Rome';
  state!: string;
  capitals: any[];
  selectedCity!: string;
  cardCity: any;
  showNote = false;
  followedCM = false;
  sub1!: Subscription;
  constructor(public http: HttpClient, public weather: WeatherService, public fb: FbService) {
    this.capitals = new Array<any>();
   }




  ngOnInit(): void {
    this.weather.getWeather(this.city).subscribe((payload: any) => {


      this.state = payload.weather[0].main;
      this.temp = Math.ceil(Number(payload.main.temp));

    });

    this.http.get('https://rescountries.eu/rest/v2/all').pipe((first())).subscribe((countries: Array<any>) => {
      countries.forEach((country: any) => {
        if (country.capital.length) {
          this.capitals.push(country.capital);
        }
      });
      this.capitals.sort();
    });
    this.sub1 = this.fb.getCities().subscribe((cities) => {
        Object.values(cities).forEach((city: any) => {
          if (city.name === 'Rome') {
            this.followedCM = true;
          }
        });
    });
  }

  selectCity(city: any): void {
    if (this.capitals.includes(city)) {
      this.cardCity = city;
      this.showNote = false;

    } else if (city.leading > 0) {
      this.showNote = true;
    }
  }

  addCityOfTheMonth(): void {
    this.fb.addCity('Rome').subscribe(() => {
      this.followedCM = true;
    });
  }

  ngOnDestroy(): void {

    this.sub1.unsubscribe();
  }

}
