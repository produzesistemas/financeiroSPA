import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { ContaCorrente } from 'src/app/_model/conta-corrente-model';

@Injectable({ providedIn: 'root' })

export class ContaCorrenteService extends GenericHttpService<ContaCorrente> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('contaCorrente/filter', filter);
      }

      save(entity) {
        return this.post('contaCorrente/save', entity);
     }

    deleteById(id) {
            return this.delete(`contaCorrente/${id}`);
      }

      get(id: any) {
        return this.http.get<ContaCorrente>(`${this.getUrlApi()}contaCorrente/${id}`);
    }
}
