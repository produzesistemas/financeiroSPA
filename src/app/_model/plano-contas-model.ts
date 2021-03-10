import { TipoConta } from 'src/app/_model/tipo-conta-model';
export class PlanoContas {
    id: number;
    descricao: string;
    classificacao: string;
    ativo: boolean;
    tipoContaId: number;
    criadoPor: string;
    alteradoPor: string;
    createDate: Date;
    updateDate: Date;

    tipoConta: TipoConta = new TipoConta();

    public constructor(init?: Partial<PlanoContas>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): PlanoContas {
        return Object.assign(new PlanoContas(), jsonData);
    }
}
