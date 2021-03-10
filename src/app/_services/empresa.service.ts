import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { Empresa } from 'src/app/_model/empresa-model';

@Injectable({ providedIn: 'root' })

export class EmpresaService extends GenericHttpService<Empresa> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
      return this.postAll('empresa/filter', filter);
    }

      save(entity) {
        return this.post('empresa/save', entity);
     }

    deleteById(id) {
            return this.delete(`empresa/${id}`);
      }

      getById(id: any) {
        return this.http.get<Empresa>(`${this.getUrlApi()}empresa/${id}`);
    }

    active(entity) {
      return this.post('empresa/active', entity);
   }

}
