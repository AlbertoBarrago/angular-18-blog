import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe, JsonPipe, NgClass, NgIf } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from './core/services/auth.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

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
    MatTooltip,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sMuRt-Blog';
  loginService = inject(AuthService);

  currentDate: Date = new Date();
  currentDateString: string = this.currentDate.toDateString();
}
