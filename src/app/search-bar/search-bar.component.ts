import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Movie } from '../class/movie';
import { HandleErrorService } from '../service/handle-error.service';
import { OMDBService } from '../service/omdb.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchFilter:string = "all";
  errorMessage = "";
  @Output() movies : EventEmitter<Movie> = new EventEmitter<Movie>();
  constructor(private omdbService : OMDBService) { }
  ngOnInit(): void {
  }

  search(title : HTMLInputElement):void{
     if (title.value.trim() == "") return;
    this.omdbService.getByTitle(title.value).subscribe(
      (data:any) => { 
         let movie = data; 
         this.movies.emit(movie);
        },
      (error: any) => { 
        this.errorMessage = HandleErrorService.handleError(error);
      }
    );

    this.searchFilter = "search";
  }
}
