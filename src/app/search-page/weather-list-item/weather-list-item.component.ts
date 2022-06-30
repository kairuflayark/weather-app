import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherData } from 'src/app/store/models/weatherData.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-weather-list-item',
  templateUrl: './weather-list-item.component.html',
  styleUrls: ['./weather-list-item.component.scss']
})
export class WeatherListItemComponent implements OnInit {

  display:boolean = false

  displaySettings = {
    last_updated:{
      display:false,
      label: "Last Updated"
    },
    condition:{
      display:true,
      label: "Current Conditions"
    },
    temperature:{
      display:true,
      label: "Temperature"
    },
    feels:{
      display:false,
      label: "Feels Like"
    },
    wind_speed:{
      display:true,
      label: "Wind Speed"
    },
    wind_dir:{
      display:true,
      label: "Wind direction"
    },
    gusts:{
      display:false,
      label: "Gusts"
    },
    pressure:{
      display:false,
      label: "Pressure"
    },
    precip:{
      display:false,
      label: "Precipitation"
    },
    humidity:{
      display:true,
      label: "Humidity"
    },
    clouds:{
      display:true,
      label: "Cloud cover"
    },
    vis:{
      display:false,
      label: "Visability"
    }
  }


  @Input('weather') weather!: WeatherData

  @Output() deleteEvent:EventEmitter<Boolean> = new EventEmitter()
  @Output() redirectEvent:EventEmitter<Boolean> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  
  delete(){
    console.log("delete");
    
    this.deleteEvent.emit(true)
  }

  redirect(){
    this.redirectEvent.emit(true)
  }
  
  returnZero(){
    return 0
  }
  
}

