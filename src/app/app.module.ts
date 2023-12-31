import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MoviesContainerComponent } from './movies-container/movies-container.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AutocompleteItemComponent } from './autocomplete-item/autocomplete-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieItemComponent,
    MoviesContainerComponent,
    FilterComponent,
    SearchBarComponent,
    HomeComponent,
    MovieDetailsComponent,
    ModalComponent,
    AutocompleteItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
