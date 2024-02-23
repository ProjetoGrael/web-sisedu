export interface Endereco {
    logradouro: string,
    numero: number,
    complemento?: string,
    bairro: string,
    subBairro?: string,
    cidade: string,
    estado: string,
    cep: string
}