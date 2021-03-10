export class ContaCorrente {
    id: number;
    agencia: string;
    banco: string;
    conta: string;
    bancoNumero: number;
    saldoInicial: number;
    criadoPor: string;
    alteradoPor: string;
    createDate: Date;
    updateDate: Date;

    public constructor(init?: Partial<ContaCorrente>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): ContaCorrente {
        return Object.assign(new ContaCorrente(), jsonData);
    }
}
