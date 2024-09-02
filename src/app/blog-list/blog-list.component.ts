import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { AppService } from '../app.component.service';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [JsonPipe, MatCard, MatCardHeader, MatCardActions, MatButton],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogListComponent {
  homeService = inject(AppService);
  articles = this.homeService.articles;
}
