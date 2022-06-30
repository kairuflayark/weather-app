import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPageComponent } from './details-page/details-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchPageComponent } from './search-page/search-page.component';


const routes: Routes = [
  { path: 'search', component: SearchPageComponent },
  { path: 'details', component: DetailsPageComponent},
  { path: '', redirectTo: '/search', pathMatch: 'full'},
  { path: '**', component:PageNotFoundComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
