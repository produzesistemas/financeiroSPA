import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { CategoriaContasAPagarPlanoContas } from 'src/app/_model/categoria-contas-a-pagar-plano-contas-model';

@Injectable({ providedIn: 'root' })

export class CategoriaContasAPagarPlanoContasService extends GenericHttpService<CategoriaContasAPagarPlanoContas> {
    constructor(private http: HttpClient) {
        super(http);
    }
    getPlanoContas(id: any) {
      return this.http.get<CategoriaContasAPagarPlanoContas[]>(`${this.getUrlApi()}categoriaContasAPagar/getPlanoContas/${id}`);
  }
}
