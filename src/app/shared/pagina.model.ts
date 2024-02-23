export interface Pagina<T> {
    conteudo: T[];
    pagina: number;
    tamanho: number;
    total: number;
}
