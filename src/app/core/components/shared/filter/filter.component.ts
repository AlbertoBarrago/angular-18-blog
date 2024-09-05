import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInput } from '@angular/material/input';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatInput],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input() placeholder = '';
  @Input() label = '';
  @Output() event = new EventEmitter<string>();

  public searchTerms = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {
    this.setupSearch();
  }

  /**
   * Setup search functionality.
   * Logic: debounce time, distinctUntilChanged, filter
   * @private
   * @memberof FilterComponent
   * @returns {void}
   */
  private setupSearch(): void {
    this.searchTerms
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged(),
        filter(term => term.length >= 3)
      )
      .subscribe(searchTerm => {
        console.log('Searching for:', searchTerm);
        this.event.emit(searchTerm);
      });
  }

  /**
   * Emit search term on input change.
   * @param event
   */
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerms.next(target.value);
  }
}
