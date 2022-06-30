import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { WeatherData } from '../store/models/weatherData.model';
import { WeatherApiService } from '../weather-api.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  weather:WeatherData = {
    location :{ 
      city: '',
      state: '',
      zip: 0
    },
    condition :{
        text: '',
        icon: ''
    },
    last_updated: new Date(),
    temp_c: 0,
    temp_f: 0,
    feelslike_c: 0,
    feelslike_f: 0,
    wind_kph: 0,
    wind_mph: 0,
    wind_dir: '',
    gust_kph: 0,
    gust_mph: 0,
    pressure_mb: 0,
    pressure_in: 0,
    precip_mm: 0,
    precip_in: 0,
    humidity: 0,
    cloud: 0,
    vis_km: 0,
    vis_miles: 0,

  
  }
  error:string = ''

  constructor(private weatherService:WeatherApiService,
    private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    const city = this.route.snapshot.paramMap.get('city')
    const state = this.route.snapshot.paramMap.get('state')
    console.log(city, state);
    
    if(city == null || state == null){
     this.router.navigate(['/**'])
    } else {
      this.weather = this.weatherService.getLocationWeather(city, state)
      if(this.weather === undefined){
        this.router.navigate(['/**'])
      }
      
    }
    console.log(this.weather);
    
  }
  redirect(){
    this.router.navigate(['/search'])
  }



}
