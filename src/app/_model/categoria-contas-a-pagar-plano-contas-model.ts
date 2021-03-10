import { PlanoContas } from './plano-contas-model';

export class CategoriaContasAPagarPlanoContas {
    id: number;
    categoriaContasAPagarId: number;
    planoContasId: number;
    isSelected: boolean;
    planoContas: PlanoContas = new PlanoContas();
    public constructor(init?: Partial<CategoriaContasAPagarPlanoContas>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): CategoriaContasAPagarPlanoContas {
        return Object.assign(new CategoriaContasAPagarPlanoContas(), jsonData);
    }
}
