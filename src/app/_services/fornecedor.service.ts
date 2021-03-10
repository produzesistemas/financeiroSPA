import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { Fornecedor } from 'src/app/_model/fornecedor-model';

@Injectable({ providedIn: 'root' })

export class FornecedorService extends GenericHttpService<Fornecedor> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('fornecedor/filter', filter);
      }

      save(entity) {
        return this.post('fornecedor/save', entity);
     }

    deleteById(id) {
            return this.delete(`fornecedor/${id}`);
      }

      get(id: any) {
        return this.http.get<Fornecedor>(`${this.getUrlApi()}fornecedor/${id}`);
    }
}
