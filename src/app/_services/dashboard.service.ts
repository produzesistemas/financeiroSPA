import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { ContasAPagar } from 'src/app/_model/contas-a-pagar-model';

@Injectable({ providedIn: 'root' })

export class DashboardService extends GenericHttpService<any> {
  constructor(private http: HttpClient) {
    super(http);
  }

  getDashboard() {
    return this.http.get<any>(`${this.getUrlApi()}dashboard/getDashboard`);
  }

}
