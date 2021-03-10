import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { Empresa } from 'src/app/_model/empresa-model';

@Injectable({ providedIn: 'root' })

export class ConfiguracoesService extends GenericHttpService<Empresa> {
    constructor(private http: HttpClient) {
        super(http);
    }

      save(entity) {
        return this.post('empresa/update', entity);
     }

      getByUser() {
        return this.http.get<Empresa>(`${this.getUrlApi()}empresa/getByUser`);
    }

}
