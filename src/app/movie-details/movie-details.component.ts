import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OMDBService } from '../service/omdb.service';


import { Movie } from '../class/movie';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
    public movie:Movie = new Movie();
    movieRating!: number;
    starCountArray = new Array(10);
    constructor(private route:ActivatedRoute, private omdbService:OMDBService) { 
    this.route.params.subscribe(
      param => {
        if (window.history.state.movie) this.movie=window.history.state.movie;
        else
        {
          param["id"] ? this.omdbService.getById(param["id"]).subscribe(data=> {this.movie=data; this.movieRating = parseInt(data.imdbRating)}) : ""; 
        }
      }
    );


    }

    ngOnInit(): void {
    }

    trim(str:string):string{
      return str.replace(/ /g,"");
    }
}
