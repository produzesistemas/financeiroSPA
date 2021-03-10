export class ArquivoEntrada {
    id: number;
    descricao: string;
    empresaId: number;
    layoutId: number;
    colunaData: number;
    colunaHistorico: number;
    colunaValorDebito: number;
    colunaContaDebito: number;
    colunaValorCredito: number;
    colunaContaCredito: number;
    colunaNLancamento: number;
    contaTransitoria: string;
    isDebito: boolean;
    isCredito: boolean;
    hasMapeamento: boolean;
    criadoPor: string;
    alteradoPor: string;
    createDate: Date;
    updateDate: Date;

    public constructor(init?: Partial<ArquivoEntrada>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): ArquivoEntrada {
        return Object.assign(new ArquivoEntrada(), jsonData);
    }
}
