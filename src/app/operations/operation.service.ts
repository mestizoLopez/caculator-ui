import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OperationService {
  constructor(private http: HttpClient) {}

  perform(type: string, input: number): Observable<{ result: string }> {
    return this.http.post<{ result: string }>(`https://calculator-mestizoftware-b8895119c8c6.herokuapp.com/api/v1/operations/${type}`, { input });
  }

  create(type: string, cost: number) {
    return this.http.post(`https://calculator-mestizoftware-b8895119c8c6.herokuapp.com/api/v1/operations/create`, { type, cost });
  }
}
