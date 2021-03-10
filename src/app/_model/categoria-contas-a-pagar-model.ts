import { CategoriaContasAPagarPlanoContas } from './categoria-contas-a-pagar-plano-contas-model';

export class CategoriaContasAPagar {
    [x: string]: any;
    id: number;
    nome: string;
    criadoPor: string;
    alteradoPor: string;
    createDate: Date;
    updateDate: Date;

    contas: CategoriaContasAPagarPlanoContas[] = [];


    public constructor(init?: Partial<CategoriaContasAPagar>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): CategoriaContasAPagar {
        return Object.assign(new CategoriaContasAPagar(), jsonData);
    }
}
