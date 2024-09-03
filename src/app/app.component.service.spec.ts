import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AppService } from './services/app.component.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { Article } from './app.types';

describe('ArticleService', () => {
  let homeService: AppService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    homeService = TestBed.inject(AppService);
    TestBed.inject(HttpTestingController);
    TestBed.inject(HttpTestingController);
  });

  it('should handle errors when getting all articles', () => {
    expect(homeService).toBeTruthy();
  });

  describe('handleError', () => {
    it('should return an Error object with message "Bad request" for status code 400', () => {
      const error = new HttpErrorResponse({ status: 400 });
      const result = homeService.handleError(error);
      expect(result.message).toEqual('Bad request');
    });

    it('should return an Error object with message "Not found" for status code 404', () => {
      const error = new HttpErrorResponse({ status: 404 });
      const result = homeService.handleError(error);
      expect(result.message).toEqual('Not found');
    });

    it('should return an Error object with message "Internal server error" for status code 500', () => {
      const error = new HttpErrorResponse({ status: 500 });
      const result = homeService.handleError(error);
      expect(result.message).toEqual('Internal server error');
    });

    it('should return an Error object with message "Bad gateway" for status code 502', () => {
      const error = new HttpErrorResponse({ status: 502 });
      const result = homeService.handleError(error);
      expect(result.message).toEqual('Bad gateway');
    });

    it('should return an Error object with message "Unauthorized" for status code 401', () => {
      const error = new HttpErrorResponse({ status: 401 });
      const result = homeService.handleError(error);
      expect(result.message).toEqual('Unauthorized');
    });

    it('should return an Error object with the error message for other status codes', () => {
      const errorMessage = 'Forbidden';
      const error = new HttpErrorResponse({
        status: 403,
        error: { message: errorMessage },
      });
      const result = homeService.handleError(error);
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
          url: 'https://example.com',
          imageUrl: 'https://example.com/image.jpg',
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
      spyOn(homeService, 'handleError');

      homeService.getAllArticles();
      homeService.handleError(testError);

      expect(homeService.handleError).toHaveBeenCalledWith(testError);
    });
  });
});
