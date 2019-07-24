import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Data } from '../data-structure/data';

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

  postData(params): Observable<any> {
    return this.http.post('/api/submit', JSON.stringify(params))
                    .pipe(
                      catchError(this.handleError)
                    );
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occured', error);
    return Promise.reject(error);
  }
}
