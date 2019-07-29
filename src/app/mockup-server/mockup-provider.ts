import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpInterceptor, HttpEvent, HTTP_INTERCEPTORS, HttpHandler} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import data from './api/sample_data.json';


@Injectable()
export class MockupBackendInterceptor implements HttpInterceptor {
    constructor() {}

    // private _data = require('./api/sample_data.json');
    private _data = data;
    private _result = require('./api/submit.json');
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return of (null).pipe(() => {
            if (request.url.endsWith('/sample_data') && request.method === 'GET') {
                return of (new HttpResponse({ status: 200, body: this._data }));
            }
            if (request.url.endsWith('/api/submit') && request.method === 'POST') {
                return of (new HttpResponse({ status: 200, body: this._result }));
            }
            return next.handle(request);
        }, delay (500));
    }
}

export let MockBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: MockupBackendInterceptor,
    multi: true
};
