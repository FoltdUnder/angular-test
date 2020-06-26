import {Injectable}                          from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {retry, timeout}                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) {
  }

  getData(formMethod: string, formData: string) {
    return this.http.get(`https://scloud.ru/user_panel/test_angular.php?
      method=${formMethod}&data=${formData}`, {observe: 'response'}).pipe(timeout(20000), retry(2));
  }

  postData(formMethod: string, formData: string) {
    let body = new HttpParams();
    body = body.append('method', formMethod);
    body = body.append('data', formData);
    return this.http.post(`https://scloud.ru/user_panel/test_angular.php`,
      body, {reportProgress: true, observe: 'response'}).pipe(timeout(20000), retry(2));
  }

  doRequest(method: 'GET' | 'POST', action: string, params: any) {
    let url = 'https://scloud.ru/user_panel/test_angular.php?method=' + action;
    let headers = new HttpHeaders();
    let body = new HttpParams();
    if (method === 'POST') {
      for (const key in params) {
        body = body.append(key, params[key]);
      }
      return this.http.post(url, body, {headers: headers, observe: 'response'}).pipe(timeout(20000), retry(2));
    }
    if (method === 'GET') {
      for (const key in params) {
        url = url + '&' + key + '=' + params[key];
      }
      return this.http.get(url, {observe: 'response'}).pipe(timeout(20000), retry(2));
    }
  }
}
