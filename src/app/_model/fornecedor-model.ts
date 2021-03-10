export class Fornecedor {
    id: number;
    nome: string;
    email: string;
    ativo: boolean;
    cnpj: string;
    contato: string;
    telefone: string;
    criadoPor: string;
    alteradoPor: string;
    createDate: Date;
    updateDate: Date;

    public constructor(init?: Partial<Fornecedor>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): Fornecedor {
        return Object.assign(new Fornecedor(), jsonData);
    }
}
