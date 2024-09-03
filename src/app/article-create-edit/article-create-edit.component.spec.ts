import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCreateEditComponent } from './article-create-edit.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ArticleCreateEditComponent', () => {
  let component: ArticleCreateEditComponent;
  let fixture: ComponentFixture<ArticleCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCreateEditComponent, BrowserAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
