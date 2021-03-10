import { Fornecedor } from './fornecedor-model';
import { PlanoContas } from './plano-contas-model';
import { CentroCusto } from './centro-custo-model';
import { ContaCorrente } from './conta-corrente-model';
import { CategoriaContasAPagar } from './categoria-contas-a-pagar-model';
export class ContasAPagarLancamentoManual {
    fornecedor: Fornecedor = new Fornecedor();
    planoContas: PlanoContas = new PlanoContas();
    categoriaContasAPagar: CategoriaContasAPagar = new CategoriaContasAPagar();
    centroCusto: CentroCusto = new CentroCusto();
    contaCorrente: ContaCorrente = new ContaCorrente();
    referente: string;
    valorOriginal: number;
    dataVencimento: Date;
    quantidade: number;

    public constructor(init?: Partial<ContasAPagarLancamentoManual>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): ContasAPagarLancamentoManual {
        return Object.assign(new ContasAPagarLancamentoManual(), jsonData);
    }
}
