import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { CentroCusto } from 'src/app/_model/centro-custo-model';

@Injectable({ providedIn: 'root' })

export class CentroCustoService extends GenericHttpService<CentroCusto> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('centroCusto/filter', filter);
      }

      save(entity) {
        return this.post('centroCusto/save', entity);
     }

    deleteById(id) {
            return this.delete(`centroCusto/${id}`);
      }

      get(id: any) {
        return this.http.get<CentroCusto>(`${this.getUrlApi()}centroCusto/${id}`);
    }
}
