import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { AppService } from './app.component.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, MatToolbar, MatIcon],
  templateUrl: '../app.component.html',
  styleUrl: '../app.component.scss',
})
export class AppComponent {
  title = 'angular-18-blog';
}
