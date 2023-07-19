import { OrigemPesquisa } from "./origem-pesquisa";

export interface RequisicaoPesquisa {
    url?: string;
    pagina?: number;
    valor?: string;
    filtrosPersonalizados?: any;
    origem?: OrigemPesquisa;
}
