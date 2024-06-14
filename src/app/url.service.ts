import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UrlService {
  apiPort = environment['API_REST_PORT'];
  apiUrl = environment['API_REST_URL'];
  public counter = 1;

  constructor(
    private http: HttpClient
  ) { 
    this.serverMessageSubject= new BehaviorSubject<any>(null);
  }
  
  serverMessageSubject: BehaviorSubject<any>;

  async geturl(urlPerm: string) {
    const headers = { 'Authorization': 'Bearer my-token'};
    const body = { url: urlPerm };

    return await this.http.post<any>(`${this.apiUrl}:${this.apiPort}/api/url`, body, { headers })
    .pipe(
      tap((result) => {
        this.serverMessageSubject.next(result);
      })
    )
    .subscribe((data) => {
      this.counter++;
    });

  }

}
