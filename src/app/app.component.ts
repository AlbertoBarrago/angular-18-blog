import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe, JsonPipe, NgClass, NgIf } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    JsonPipe,
    MatToolbar,
    MatIcon,
    NgClass,
    NgIf,
    DatePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-18-blog';
  isDarkMode!: boolean;

  constructor() {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    this.isDarkMode = darkModeMediaQuery.matches;

    darkModeMediaQuery.addEventListener(
      'change',
      e => (this.isDarkMode = e.matches)
    );
  }

  changeTheme() {
    const body = document.querySelector('body');
    if (body) {
      if (this.isDarkMode) {
        body.classList.remove('dark');
      } else {
        body.classList.add('dark');
      }
    }
    console.log(body);
  }

  currentDate: Date = new Date();
  currentDateString: string = this.currentDate.toDateString();
}
