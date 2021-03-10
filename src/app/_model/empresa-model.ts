import { ApplicationUser} from './application-user';
export class Empresa {
    id: number;
    nome: string;
    email: string;
    ativo: boolean;
    applicationUserId: string;
    applicationUser: ApplicationUser = new ApplicationUser();
    cnpj: string;
    nomeUsuarioDominio: string;
    nomeImagem: string;
    codigoFilial: number;
    modulos: any[] = [];
    contaTransitoria: string;

    public constructor(init?: Partial<Empresa>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): Empresa {
        return Object.assign(new Empresa(), jsonData);
    }
}
