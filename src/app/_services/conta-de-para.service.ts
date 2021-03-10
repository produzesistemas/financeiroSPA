import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { ContaDePara } from 'src/app/_model/conta-de-para-model';

@Injectable({ providedIn: 'root' })

export class ContaDeParaService extends GenericHttpService<ContaDePara> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('contaDePara/filter', filter);
      }

      save(entity) {
        return this.post('contaDePara/save', entity);
     }

    deleteById(id) {
            return this.delete(`contaDePara/${id}`);
      }

      get(id: any) {
        return this.http.get<ContaDePara>(`${this.getUrlApi()}contaDePara/${id}`);
    }
}
