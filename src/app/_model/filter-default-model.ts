export class FilterDefaultModel {
    name: string;
    id: number;
    empresaId: number;
    fornecedorId: number;
    planoContasId: number;
    centroCustoId: number;
    contaCorrenteId: number;
    categoriaContasAPagarId: number;
    dataInicial: Date;
    dataFinal: Date;
    public constructor(init?: Partial<FilterDefaultModel>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): FilterDefaultModel {
        return Object.assign(new FilterDefaultModel(), jsonData);
    }
}
