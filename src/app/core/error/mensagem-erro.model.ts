export interface MensagemErro {
  dataHora: Date;
  campo: string;
  mensagem: string;
  codigo: number;
  status: string;
}
