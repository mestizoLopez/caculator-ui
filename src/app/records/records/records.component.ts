import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordService } from '../record.service';
import {AuthService} from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-records',
  imports: [CommonModule],
  template: `
    <h2>Records</h2>
    <table *ngIf="records.length">
      <tr><th>Operation</th><th>Amount</th><th>Response</th><th>Balance</th><th></th></tr>
      <tr *ngFor="let r of records">
        <td>{{ r.operation }}</td>
        <td>{{ r.amount }}</td>
        <td>{{ r.operationResponse }}</td>
        <td>{{ r.userBalance }}</td>
        <td><button (click)="delete(r.id)" *ngIf=" !auth.isAuthenticated()">Delete</button></td>
      </tr>
    </table>
  `
})
export class RecordsComponent implements OnInit {
  records: any[] = [];
  constructor(private svc: RecordService, public auth: AuthService) {}
  ngOnInit() { this.load(); }
  load() { this.svc.getRecords().subscribe((p: { content: never[]; }) => this.records = p.content || []); }
  delete(id: number) { this.svc.deleteRecord(id).subscribe(() => this.load()); }
}
