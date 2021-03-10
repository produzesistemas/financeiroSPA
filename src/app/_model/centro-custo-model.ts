export class CentroCusto {
    id: number;
    descricao: string;
    codigo: string;
    ativo: boolean;
    criadoPor: string;
    alteradoPor: string;
    createDate: Date;
    updateDate: Date;

    public constructor(init?: Partial<CentroCusto>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): CentroCusto {
        return Object.assign(new CentroCusto(), jsonData);
    }
}
