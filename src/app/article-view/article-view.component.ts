import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { Article } from '../app.types';
import { MatRadioButton } from '@angular/material/radio';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    NgIf,
    MatCardContent,
    MatRadioButton,
    MatButton,
  ],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleViewComponent {
  article = signal<Article>({
    title: 'Article Title',
    description: 'Article Description',
    url: 'https://example.com/article',
    imageUrl: 'https://example.com/article.jpg',
    summary: 'This is an example article.',
    publishedAt: '2023-08-15T10:00:00Z',
    updatedAt: '2023-08-15T10:00:00Z',
    featured: true,
  });
}
