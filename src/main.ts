import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { BasicComponent } from './app/basic/basic.component';
import { CardListsComponent } from './app/card-lists/card-lists.component';
import { ImagesComponent } from './app/images/images.component';


bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(BrowserModule),
      provideRouter([
        {path: '', pathMatch: 'full', redirectTo: '/images'},
        {path: 'images', component: ImagesComponent},
        {path: 'card-lists', component: CardListsComponent},
        {path: 'basic', component: BasicComponent},
      ])
    ]
})
  .catch(err => console.error(err));
