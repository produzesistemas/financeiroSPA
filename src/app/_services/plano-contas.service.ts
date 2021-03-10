import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { PlanoContas } from 'src/app/_model/plano-contas-model';
import { TipoConta } from 'src/app/_model/tipo-conta-model';

@Injectable({ providedIn: 'root' })

export class PlanoContasService extends GenericHttpService<PlanoContas> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('planocontas/filter', filter);
      }

      getTiposConta() {
        return this.http.get<any>(`${this.getUrlApi()}tipoconta`);
      }

      save(entity) {
        return this.post('planocontas/save', entity);
     }

    deleteById(id) {
            return this.delete(`planocontas/${id}`);
      }

      getById(id: any) {
        return this.http.get<PlanoContas>(`${this.getUrlApi()}planocontas/${id}`);
    }

    importarDominio(formData: FormData) {
      return this.postAll('planocontas/importarDominio', formData);
    }
}
