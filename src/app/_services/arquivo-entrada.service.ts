import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { ArquivoEntrada } from 'src/app/_model/arquivo-entrada-model';

@Injectable({ providedIn: 'root' })

export class ArquivoEntradaService extends GenericHttpService<ArquivoEntrada> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getByFilter(filter: any) {
        return this.postAll('arquivoEntrada/filter', filter);
      }

      save(entity) {
        return this.post('arquivoEntrada/save', entity);
     }

    deleteById(id) {
            return this.delete(`arquivoEntrada/${id}`);
      }

      get(id: any) {
        return this.http.get<ArquivoEntrada>(`${this.getUrlApi()}arquivoEntrada/${id}`);
    }

    active(entity) {
      return this.post('arquivoEntrada/active', entity);
   }
}
