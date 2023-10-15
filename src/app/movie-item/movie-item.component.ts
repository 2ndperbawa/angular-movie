import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../class/movie';

@Component({
  selector: 'movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie:Movie = new Movie();
  constructor() { }

  ngOnInit(): void {
  }

  openModal(el: any) {
    const modalTitle = document.querySelector('.modal-movie-title') as HTMLInputElement | null;
    const modalPoster = document.querySelector('.modal-poster-img') as HTMLInputElement | null;
    const movieLink = document.querySelector('.movie-link') as HTMLAnchorElement | null;
    const genreList = document.querySelector('.genre-list') as HTMLDivElement | null;
    let   innerGenreList : string = ``;

    if(modalTitle) modalTitle.innerHTML  = this.movie.Title;
    if(modalPoster) modalPoster.src  = this.movie.Poster;
    if(movieLink)   movieLink.href = "/movie/" + this.movie.imdbID;

    this.movie.Genre.split(',', 3).forEach((genre) => {
      innerGenreList += ` <span class="genre text-center"> ${genre} </span>`;
    });
    
    if(genreList)   genreList.innerHTML = innerGenreList;
  }

}
