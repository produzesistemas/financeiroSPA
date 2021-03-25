import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';
import { ContasAPagar } from 'src/app/_model/contas-a-pagar-model';

@Injectable({ providedIn: 'root' })

export class ContasAPagarService extends GenericHttpService<ContasAPagar> {
  constructor(private http: HttpClient) {
    super(http);
  }

  getByFilter(filter: any) {
    return this.postAll('contasaPagar/filter', filter);
  }

  getPagasByFilter(filter: any) {
    return this.postAll('contasaPagar/pagas', filter);
  }

  baixa(entity) {
    return this.post('contasaPagar/baixa', entity);
  }

  lancamentoManual(entity) {
    return this.post('contasaPagar/lancamentoManual', entity);
  }

  deleteById(id) {
    return this.delete(`contasaPagar/${id}`);
  }

  getById(id: any) {
    return this.http.get<ContasAPagar>(`${this.getUrlApi()}contasaPagar/${id}`);
  }

  save(entity) {
    return this.post('contasaPagar/save', entity);
  }

  relFornecedor(filter) {
    return this.http.post(`${this.getUrlApi()}contasaPagar/relFornecedor`, filter,
      {
        responseType: 'arraybuffer'
      });
  }

  relProvisao(filter) {
    return this.http.post(`${this.getUrlApi()}contasaPagar/relProvisao`, filter,
      {
        responseType: 'arraybuffer'
      });
  }

  exportDominio(filter) {
    return this.http.post(`${this.getUrlApi()}contasaPagar/exportDominio`, filter,
      {
        responseType: 'arraybuffer'
      });
  }

  lancamentoNF(formData: FormData) {
    return this.postAll('contasaPagar/lancamentonf', formData);
  }
}
