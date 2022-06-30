import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { newSearch, add, SearchError } from '../actions/search.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { WeatherApiService } from 'src/app/weather-api.service';

import {of} from 'rxjs';
import { WeatherData } from '../models/weatherData.model';
 
@Injectable()
export class WeatherEffects {
 
newSearch$ = 
//createEffect(() =>
  this.actions$.pipe(
    ofType(newSearch),
    switchMap((actions) => this.weatherService.getWeather(actions.location).pipe(
      map(weather =>{
        let weatherData = {
            location :{ 
              city: weather.location.name,
              state: weather.location.region,
            },
            condition :{
                text: weather.current.condition.text,
                icon: weather.current.condition.icon
            },
            last_updated: weather.current.last_updated,
            temp_c: weather.current.temp_c,
            temp_f: weather.current.temp_f,
            feelslike_c: weather.current.feelslike_c,
            feelslike_f: weather.current.feelslike_f,
            wind_kph: weather.current.wind_kph,
            wind_mph: weather.current.wind_mph,
            wind_dir: weather.current.wind_dir,
            gust_kph: weather.current.gust_kph,
            gust_mph: weather.current.gust_mph,
            pressure_mb: weather.current.pressure_mb,
            pressure_in: weather.current.pressure_in,
            precip_mm: weather.current.precip_mm,
            precip_in: weather.current.precip_in,
            humidity:weather.current.humidity,
            cloud: weather.current.cloud,
            vis_km: weather.current.vis_km,
            vis_miles: weather.current.vis_miles,
  
          
          }
       add(weather)}),
    ))
  )


  constructor(
    private actions$: Actions,
    private weatherService: WeatherApiService
  ) {}
}