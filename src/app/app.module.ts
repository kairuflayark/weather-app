import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { SearchPageComponent } from './search-page/search-page.component';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './store/effects/search.effects';
import { WeatherListItemComponent } from './search-page/weather-list-item/weather-list-item.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


// import { searchReducer } from './store/reducers/weatherData.reducer';

@NgModule({
  declarations: [
    AppComponent, SearchPageComponent, WeatherListItemComponent, DetailsPageComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([WeatherEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
