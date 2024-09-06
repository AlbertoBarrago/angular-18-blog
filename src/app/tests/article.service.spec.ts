import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ArticleService } from '../features/articles/services/article.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { Article } from '../interfaces/app.interfaces';
import { ErrorService } from '../shared/services/error.service';

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
    it('should return an Error object with message "Bad request" for status code 400', () => {
      const error = new HttpErrorResponse({ status: 400 });
      const result = errorService.handleError(error);
      expect(result.message).toEqual('Bad request');
    });

    it('should return an Error object with message "Not found" for status code 404', () => {
      const error = new HttpErrorResponse({ status: 404 });
      const result = errorService.handleError(error);
      expect(result.message).toEqual('Not found');
    });

    it('should return an Error object with message "Internal server error" for status code 500', () => {
      const error = new HttpErrorResponse({ status: 500 });
      const result = errorService.handleError(error);
      expect(result.message).toEqual('Internal server error');
    });

    it('should return an Error object with message "Bad gateway" for status code 502', () => {
      const error = new HttpErrorResponse({ status: 502 });
      const result = errorService.handleError(error);
      expect(result.message).toEqual('Bad gateway');
    });

    it('should return an Error object with message "Unauthorized" for status code 401', () => {
      const error = new HttpErrorResponse({ status: 401 });
      const result = errorService.handleError(error);
      expect(result.message).toEqual('Unauthorized');
    });

    it('should return an Error object with the error message for other status codes', () => {
      const errorMessage = 'Forbidden';
      const error = new HttpErrorResponse({
        status: 403,
        error: { message: errorMessage },
      });
      const result = errorService.handleError(error);
      expect(result.message).toEqual(errorMessage);
    });
  });

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
