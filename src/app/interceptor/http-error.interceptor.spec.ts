import {HttpErrorInterceptor} from './http-error.interceptor';

import {throwError} from 'rxjs';

describe('ErrorInterceptor', () => {
  let errorInterceptor;

  beforeEach(() => {
    errorInterceptor = new HttpErrorInterceptor();
  });

  describe('Interceptor =>', () => {
    it('should create the http interceptor', () => {
      expect(errorInterceptor).toBeTruthy();
    });
  });

  describe('Actions =>', () => {
    let httpRequestSpy;
    let httpHandlerSpy;

    it('should return a server side error', () => {
      const error = {status: 404, message: 'test-error'};

      httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
      httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
      httpHandlerSpy.handle.and.returnValue(throwError(error));

      errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
        result => console.log('good', result),
        err => {
          expect(err).toEqual('Error Code: 404\nMessage: test-error');
        });
    });

    it('should return a client side error', () => {
      const error = {error: new ErrorEvent('ugh', { message: 'joe'})};

      httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
      httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
      httpHandlerSpy.handle.and.returnValue(throwError(error));

      errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
        result => console.log('good', result),
        err => {
          expect(err).toEqual('Error: joe');
        });
    });
  })
});
