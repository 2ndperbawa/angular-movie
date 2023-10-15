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
  @Output() keyword : EventEmitter<string> = new EventEmitter<string>();
  constructor(private omdbService : OMDBService) { }
  ngOnInit(): void {
  }
    search(keyword : HTMLInputElement):void{
      if (keyword.value.trim() == "") return;
      this.omdbService.getByKeyword(keyword.value).subscribe(
        (data:any) => { 
          let movies = data.Search; 
          this.movies.emit(movies);
          this.keyword.emit(keyword.value);
          },
        (error: any) => { 
          this.errorMessage = HandleErrorService.handleError(error);
        }
      );

    this.searchFilter = "search";
  }
}
