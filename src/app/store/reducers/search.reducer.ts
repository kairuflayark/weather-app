import { Action, createReducer, on } from "@ngrx/store";
import { WeatherApiService } from "src/app/weather-api.service";
import * as SearchActions from '../actions/search.actions'
import { WeatherData } from "../models/weatherData.model";

export interface State {
    weather: Array<WeatherData>
    
}

export const initialState: State = {
    weather: new Array<WeatherData>
}

// export function searchReducer = createReducer(
//     initialState,
//     on(SearchActions.add, (state, {weatherData})=> ({ ...state , weather: state.weather.unshift(weatherData)
  
//     }


// )