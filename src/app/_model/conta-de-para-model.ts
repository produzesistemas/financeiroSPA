export class ContaDePara {
    id: number;
    de: string;
    para: string;
    criadoPor: string;
    alteradoPor: string;
    createDate: Date;
    updateDate: Date;
    public constructor(init?: Partial<ContaDePara>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): ContaDePara {
        return Object.assign(new ContaDePara(), jsonData);
    }
}
