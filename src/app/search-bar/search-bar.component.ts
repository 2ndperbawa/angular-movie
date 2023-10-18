import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../class/movie';
import { HandleErrorService } from '../service/handle-error.service';
import { OMDBService } from '../service/omdb.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchFilter:string = "all";
  errorMessage = ""; 
  isSearchFocus : boolean = false;
  private inputSubject = new Subject<string>();
  @Input() movieArray : Array<Movie> = [];
  @Output() movies : EventEmitter<Movie> = new EventEmitter<Movie>();
  @Output() keyword : EventEmitter<string> = new EventEmitter<string>();


  constructor(private omdbService : OMDBService) { 
    this.inputSubject
    .pipe(debounceTime(200)) // Set the debounce time (milliseconds)
    .subscribe(value => {
      // Execute your function after typing is finished
      this.autoCompleteFunction(value);
    });
  }
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

  autoCompleteFunction(value: string) {
        console.log(value);
        this.movieArray = [];
        this.omdbService.getByKeyword(value).subscribe(
          (data:any) => { 
            let movies = data.Search;
              if(movies){
                movies.forEach((movie: any) => {
                  this.omdbService.getById(movie.imdbID).subscribe(
                    (data: Movie) => {this.movieArray.push(data)},
                    (error: any) => {this.errorMessage = HandleErrorService.handleError(error);}
                  );
                });
              }
            },
          (error: any) => {
            this.errorMessage = HandleErrorService.handleError(error);
          }
        );

        console.log(this.movieArray);
  }



  keyupClearTime (event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.inputSubject.next(inputValue);
  }

  onSearchFocus() {
    this.isSearchFocus = true;
  }

  onSearchBlur() {
    setTimeout(() => {
      this.isSearchFocus = false;
    }, 200);
    
  }

}
