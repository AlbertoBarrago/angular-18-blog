import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  MatFormField,
  MatInput,
  MatInputModule,
} from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatInput,
    MatFormField,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
      .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
      .subscribe(searchTerm => {
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
