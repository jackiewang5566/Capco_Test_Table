import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Data } from '../data-structure/data';
import { SubmitParams } from 'src/app/data-structure/submit-params';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _dataSource = new BehaviorSubject<Data[]>([]);

  constructor(private http: HttpClient) { }

  getData(): Observable<Data[]> {
    this.http.get('/api/sample_data')
            .toPromise()
            .then((res: Data[]) => this._dataSource.next(res))
            .catch(this.handleError);
    return this._dataSource.asObservable();
  }

  postData(params: SubmitParams): Observable<any> {
    return this.http.post('/api/submit', JSON.stringify(params))
                    .pipe(
                      catchError(this.handleError)
                    );
  }

  private handleError(error: any): Observable<any> {
    console.log('An error occured', error);
    return throwError(error.message || error);
  }
}
