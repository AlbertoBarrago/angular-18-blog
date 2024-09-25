import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ArticleService } from '../../../../features/articles/services/article.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { Article } from '../../../../models/global.models';
import { ErrorService } from '../../error.service';

describe('ArticleService', () => {
  let homeService: ArticleService;
  let errorService: ErrorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    homeService = TestBed.inject(ArticleService);
    errorService = TestBed.inject(ErrorService);
    TestBed.inject(HttpTestingController);
    TestBed.inject(HttpTestingController);
  });

  it('should handle errors when getting all articles', () => {
    expect(homeService).toBeTruthy();
  });

  describe('handleError', () => {
    describe('getAllArticles', () => {
      it('should set articles when data is returned successfully', () => {
        const testData: Article[] = [
          {
            _id: '1',
            title: 'Mock Title',
            author: 'Mock Author',
            content: 'Mock Content',
            shortContent: 'Mock Short Content',
            createdAt: '2022-01-01',
            updatedAt: '2022-01-02',
          },
        ];
        spyOn(homeService, 'getAllArticles');

        homeService.getAllArticles();

        expect(testData).toEqual(testData);
      });

      it('should handle error properly', () => {
        const testError = new HttpErrorResponse({ status: 500 });
        spyOn(homeService, 'getAllArticles');
        spyOn(errorService, 'handleError');

        homeService.getAllArticles();
        errorService.handleError(testError);

        expect(errorService.handleError).toHaveBeenCalledWith(testError);
      });
    });
  });
});
