
import { createAction, props } from "@ngrx/store";
import { WeatherData } from "../models/weatherData.model";

    export const newSearch = createAction('[WEATHER SEARCH] New Search', props<{location:string}>())
    export const add = createAction('[WEATHER SEARCH] Add WeatherData', props<{ weatherData:WeatherData}>() );
    export const remove = createAction('[WEATHER SEARCH] Remove WeatherData', props<{ location: string}>() );
    export const invert = createAction('[WEATHER SEARCH] Invert');
    export const SearchError = createAction('[WEATHER SEARCH] Search Error');

