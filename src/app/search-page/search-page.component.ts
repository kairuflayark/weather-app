import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherData } from '../store/models/weatherData.model';
import { WeatherApiService } from '../weather-api.service';




@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  searchText:string = ''
  //weatherData$: Observable<WeatherData[]> = this.store.select(state => state.weatherData)
  weatherData: WeatherData[] = []
  warning: string = ''

  constructor(private weatherService: WeatherApiService,
    private route: ActivatedRoute,
    private router: Router
    // private store: Store<{ weatherData: WeatherData[]}>
    ) { }

  ngOnInit(): void {
    this.weatherService.observeWeather().subscribe(weatherList => this.weatherData = weatherList)
    this.weatherService.observeErrors().subscribe(error => this.warning = error)
  }


  search(){
    console.log("search:"+this.searchText );
    if(this.searchText != ''){
      this.weatherService.newSearch(this.searchText)
    }
  }  

  reverse(){
    this.weatherService.reverseList()
  }

  delete(index:number){
    this.weatherService.deleteItem(index)
  }

  redirect(index:number){
    this.router.navigate(['/details', 
    { city: this.weatherData[index].location.city,
      state: this.weatherData[index].location.state }])
  }
}
