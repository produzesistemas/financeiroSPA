import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { CategoriaContasAPagar } from 'src/app/_model/categoria-contas-a-pagar-model';

@Injectable({ providedIn: 'root' })

export class CategoriaContasAPagarService extends GenericHttpService<CategoriaContasAPagar> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('categoriaContasAPagar/filter', filter);
      }

      save(entity) {
        return this.post('categoriaContasAPagar/save', entity);
     }

    deleteById(id) {
            return this.delete(`categoriaContasAPagar/${id}`);
      }

      get(id: any) {
        return this.http.get<CategoriaContasAPagar>(`${this.getUrlApi()}categoriaContasAPagar/${id}`);
    }
}
