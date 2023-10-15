import { HostBinding, Input, HostListener, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../class/movie';

@Component({
  selector: 'movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.css']
})
export class MoviesContainerComponent implements OnInit {

  @Input() movies : Array<Movie> = [];
  @Input() scrollStatus!: boolean ;
  @Input() page!: number;
  @Output() scrollBottom : EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('moviesContainer', { static: false }) moviesContainer!: ElementRef;
  constructor() { 

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const element = this.moviesContainer.nativeElement;
    console.log(window.innerHeight + window.scrollY);
    console.log(document.body.offsetHeight);
    
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log(this.page);
      if(this.scrollStatus){
        console.log('At the bottom!');
        this.scrollBottom.emit();
      }
        
    }
  }


  ngOnInit(): void {
  }

}
