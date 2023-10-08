import { Component, OnInit } from '@angular/core';
import { OMDBService } from '../service/omdb.service';
import { HandleErrorService } from '../service/handle-error.service';
import { Movie } from '../class/movie';

import data from './data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedFilter = "all";
  movies : Array<Movie> = [];
  errorMessage = "";


  constructor(private omdbService : OMDBService) { }

  ngOnInit(): void {
    this.fetchMoviesFromJSON();
  }

  fetchMoviesFromJSON():void{
    // fetch data from the API using the ids
    this.movies = []
    data.id.forEach( (id: any) => {
        this.omdbService.getById(id).subscribe(
          (data: Movie) => {this.movies.push(data)},
          (error: any) => {this.errorMessage = HandleErrorService.handleError(error);}
        );
    });


  }

  displayMovie(movie:any):void{
    this.errorMessage = "";
    if (movie.Error){
      this.errorMessage = movie.Error;
      return;
    }
    this.movies = [];
    this.movies.push(movie);
    this.selectedFilter = "search";
    
  }

  filterChanged(filter:string):void{
    switch(filter){
      case "all" :  this.fetchMoviesFromJSON(); break;
      case "sDate" : this.sortByDate(); break;
    } 
    this.selectedFilter = filter;
  }
  sortByDate():void{
    this.movies.sort((m1:Movie, m2:Movie) => {
      return new Date(m2.Released).getTime() - new Date(m1.Released).getTime()
    });
  }

}
