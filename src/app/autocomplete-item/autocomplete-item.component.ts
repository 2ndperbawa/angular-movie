import { Component, Input } from '@angular/core';
import { Movie } from '../class/movie';

@Component({
  selector: 'app-autocomplete-item',
  templateUrl: './autocomplete-item.component.html',
  styleUrls: ['./autocomplete-item.component.css']
})
export class AutocompleteItemComponent {
  @Input() movie:Movie = new Movie();
}
