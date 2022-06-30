import { HttpClient, HttpErrorResponse, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { WeatherData } from './store/models/weatherData.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  private WEATHER_ENDPOINT: string = "https://api.weatherapi.com/v1/current.json";
  private key: string = '27af695fec6242b6aa4174654222706'
  private _errorMessage= new BehaviorSubject<string>("")
  private _weatherData = new BehaviorSubject<WeatherData[]>([]);
  private weatherData: WeatherData[] = []
  private reverse:boolean = false


  constructor(private http: HttpClient, private router:Router) { }



  getWeather(location:string): Observable<any>{
    const weatherURL = `${this.WEATHER_ENDPOINT}?key=${this.key}&q=${location}, United States&aqi=no`
    
    console.log(weatherURL);
    
    return this.http.get<any>(weatherURL).pipe(
      catchError(this.handleError)
    )
  }  

  newSearch(location:string){
    this.broadcastError('')
    let hasBeenSearched = false
    //figure out a more robust has been searched metric
    for (let weather of this.weatherData){
      if (weather.location.city == location || weather.location.zip == Number(location)){
        hasBeenSearched = true
        this.broadcastError("Location has already been searched")
      } 
    }
    if (!hasBeenSearched){
      
    

      this.getWeather(location).subscribe(weather =>{
          console.log(weather);
          
          let nZip = 0;
          if (!isNaN(Number(location))){
            nZip = Number(location)
          }
          let newWeatherData = {
              location :{ 
                city: weather.location.name,
                state: weather.location.region,
                zip: nZip
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

          for (let weather of this.weatherData){
            if(weather.location.city == newWeatherData.location.city && weather.location.state == newWeatherData.location.state){
              this.broadcastError("Location has already been searched")
              return
            }
          }


          if(!this.reverse)
          {
            this.weatherData.unshift(newWeatherData)
          } else {
            this.weatherData.push(newWeatherData)
          }
          console.log(this.weatherData);
          
          this.broadcastListChange()
          
        });
      }

  }

  getLocationWeather(city:string, state:string):WeatherData{
    const location = this.weatherData.find((obj) => {
      return obj.location.city === city && obj.location.state === state
    })

    return location!

  }

  reverseList(){
    let reversedWeather = this.weatherData.slice().reverse()
    this.weatherData = reversedWeather;
    this.broadcastListChange()
    this.reverse = !this.reverse

  }

  deleteItem(index:number){
    console.log(index)
    console.log(...this.weatherData);
    
    let newArray = this.weatherData
    newArray.splice(index, 1)
    console.log(newArray);
    

    this.weatherData = newArray

    console.log(this.weatherData);
    
    this.broadcastListChange()
  }


  broadcastListChange(){
    this._weatherData.next(this.weatherData)
  }
  broadcastError(error:string){
    this._errorMessage.next(error)
  }

  observeWeather(): Observable<WeatherData[]>{
    return this._weatherData;
  }
  observeErrors(): Observable<string>{
    return this._errorMessage;
  }


  handleError(error:HttpErrorResponse) {
    console.log(error);
    
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => this.broadcastError('Something bad happened; please try again later.'));
  }
}
