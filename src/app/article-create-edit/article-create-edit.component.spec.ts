import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCreateEditComponent } from './article-create-edit.component';

describe('ArticleCreateEditComponent', () => {
  let component: ArticleCreateEditComponent;
  let fixture: ComponentFixture<ArticleCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCreateEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
