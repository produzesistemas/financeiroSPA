import { Fornecedor } from './fornecedor-model';
import { SituacaoConta } from './situacao-conta-model';

export class ContasAPagar {
    id: number;
    situacaoContaId: number;
    fornecedorId: number;
    centroCustoId: number;
    planoContasId: number;
    contaCorrenteId: number;
    categoriaContasAPagarId: number;
    referente: string;
    valorOriginal: number;
    valorPago: number;
    multa: number;
    juros: number;
    dataPagamento: Date;
    dataVencimento: Date;
    criadoPor: string;
    alteradoPor: string;
    createDate: Date;
    updateDate: Date;
    fornecedor: Fornecedor = new Fornecedor();
    situacaoConta: SituacaoConta = new SituacaoConta();

    public constructor(init?: Partial<ContasAPagar>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): ContasAPagar {
        return Object.assign(new ContasAPagar(), jsonData);
    }
}
