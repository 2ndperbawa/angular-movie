import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../class/movie';

import data from './API-key.json';

@Injectable({
  providedIn: 'root'
})
export class OMDBService {
  
  private URL:string = `http://www.omdbapi.com/?apikey=${data.key}`
  
  constructor(private http:HttpClient) { }

  public getByTitle(title:string):Observable<Movie> {
    return this.http.get<Movie>(`${this.URL}&t=${title}`);
  }

  public getByKeyword(keyword:string, page : number = 1):Observable<Movie> {
    return this.http.get<Movie>(`${this.URL}&s=${keyword}&page=${page}`);
  }

  public getById(id:string):Observable<Movie> {
    return this.http.get<Movie>(`${this.URL}&i=${id}`);
  }

}
