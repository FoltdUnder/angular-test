import {Injectable, Input}      from '@angular/core';
import {HttpClient, HttpParams}     from '@angular/common/http';
import {catchError, retry, timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) { }
  getData(formMethod: string, formData: string) {
    return this.http.get(`https://scloud.ru/user_panel/test_angular.php?
      method=${formMethod}&data=${formData}`, { observe: 'response'});
  }
  postData(formMethod: string, formData: string) {
    let body = new HttpParams();
    body = body.append('method', formMethod);
    body = body.append( 'data', formData);
    // date = date.toString();
    return this.http.post(`https://scloud.ru/user_panel/test_angular.php`,
      body, {reportProgress: true, observe: 'response'});
  }
}
