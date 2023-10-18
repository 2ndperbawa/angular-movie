import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteItemComponent } from './autocomplete-item.component';

describe('AutocompleteItemComponent', () => {
  let component: AutocompleteItemComponent;
  let fixture: ComponentFixture<AutocompleteItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteItemComponent]
    });
    fixture = TestBed.createComponent(AutocompleteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
