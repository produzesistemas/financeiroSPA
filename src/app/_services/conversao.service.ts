import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from './genericHttpService';

@Injectable({ providedIn: 'root' })

export class ConversaoService extends GenericHttpService<any> {
    constructor(private http: HttpClient) {
        super(http);
    }

    conversao(conversao) {
        return this.http.post(`${this.getUrlApi()}conversao/converter`, conversao, {
            responseType: 'arraybuffer'
        });
      }

      analise(formData: FormData) {
        return this.postAll('conversao/analise', formData);
      }

}
