import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { TipoConta } from 'src/app/_model/tipo-conta-model';

@Injectable({ providedIn: 'root' })

export class TipoContaService extends GenericHttpService<any> {
    constructor(private http: HttpClient) {
        super(http);
    }

    getAll() {
        return this.http.get<any>(`${this.getUrlApi()}tipoconta`);
      }


}
