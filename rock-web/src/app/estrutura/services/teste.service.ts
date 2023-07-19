import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TesteService {

  constructor(protected httpClient: HttpClient) { }

  testeAPI(): Observable<any> {
    const url = `${environment.api}/hello`;
    return this.httpClient.get<any>(url);
  }
}

