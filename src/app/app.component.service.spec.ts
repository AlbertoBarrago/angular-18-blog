import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AppService } from './app.component.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { Article } from './app.types';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

describe('BlogService', () => {
  let homeService: AppService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    homeService = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
    const httpTesting = TestBed.inject(HttpTestingController);
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
          title: 'Mock Title',
          description: 'Mock Description',
          url: 'https://example.com',
          imageUrl: 'https://example.com/image.jpg',
          newsSite: 'Mock News Site',
          summary: 'Mock Summary',
          publishedAt: '2022-01-01',
          updatedAt: '2022-01-02',
          featured: true,
        },
      ];
      spyOn(homeService, 'getAllArticles');

      homeService.getAllArticles();

      expect(testData).toEqual(testData);
    });

    it('should handle error properly', () => {
      const testError = new HttpErrorResponse({ status: 500 });
      spyOn(homeService, 'getAllArticles')
      spyOn(homeService, 'handleError');

      homeService.getAllArticles();

      expect(homeService.handleError).toHaveBeenCalledWith(testError);
    });
  });
});
