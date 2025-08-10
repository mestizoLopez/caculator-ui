import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RecordService {
  constructor(private http: HttpClient) {}

  getRecords(page = 0, size = 10) {
    return this.http.get<any>(`https://calculator-mestizoftware-b8895119c8c6.herokuapp.com/api/v1/records?page=${page}&size=${size}`);
  }

  deleteRecord(id: number) {
    return this.http.delete(`https://calculator-mestizoftware-b8895119c8c6.herokuapp.com/api/v1/records/${id}`);
  }
}
