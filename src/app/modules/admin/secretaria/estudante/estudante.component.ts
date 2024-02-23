import { finalize } from 'rxjs/operators';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";

import { Estudante } from "./model/estudante.model";
import { Responsavel } from "./model/responsavel.model";
import { Pagina } from "../../../../shared/pagina.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FuseAlertType } from "../../../../../@fuse/components/alert";
import { Router } from "@angular/router";
import { FuseLoadingService } from '@fuse/services/loading';
import { EstudanteService } from './estudante.service';
import { ResponsavelService } from './responsavel.service';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { ImagemPDFUtils } from 'app/core/utils/imagemPDF.utils';
import { TextoPDFUtils } from 'app/core/utils/textoPDF.utils';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "estudante",
  templateUrl: "./estudante.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class EstudanteComponent implements OnInit {
  displayedColumns: string[] = [
    "matricula",
    "nome",
    "cpf",
    "dataNascimento",
    "opcoes",
  ];
  paginacao: Pagina<Estudante>;
  dataSource: MatTableDataSource<Estudante>;
  resp: Responsavel;
  nomeSobrenome: String;
  cpfTermo: String;
  infsTermo: String;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };
  showAlert: boolean = false;
  isEmptyList: boolean = false;

  constructor(
    private _estudanteService: EstudanteService,
    private _router: Router,
    private _fuseLoadingService: FuseLoadingService,
    private _responsavelService : ResponsavelService
  ) {}

  ngOnInit(): void {
    this.carregarEstudantes();
  }

  carregarEstudantes() {
    this._fuseLoadingService.show();
    this._estudanteService.listarComPaginacao<Estudante>(1, 10)
                          .pipe(
                            finalize(() => this._fuseLoadingService.hide())
                            )
                          .subscribe(
                            (response) => {
                              this.paginacao = response;
                              this.isEmptyList = this.paginacao.total > 0 ? false : true;
                              this.dataSource = new MatTableDataSource<Estudante>(
                                this.paginacao.conteudo
                              );
                              this.dataSource.paginator = this.paginator;                             
                            },
                            (exception) => {
                              console.log(exception);                        
                            }
                          );
  }

  atualizarDataTable(estudante: Estudante) {
    
    this._fuseLoadingService.show();
    this._estudanteService.listarComPaginacao<Estudante>(this.paginator.pageIndex, this.paginator.pageSize)
      .pipe(
        finalize(() => this._fuseLoadingService.hide())
      )
      .subscribe(
        (response) => {
          this.dataSource.data = response.conteudo;
        },
        (exception) => {}
      );
  }

  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   
  editar(id: string) {
    return `/secretaria/estudante/formulario/${id}`;
  }

  visualizarParcial(id: string) {
    return `/secretaria/estudante/visualizacaoparcial/${id}`;
  }

  checklist(id: string) {
    return `/secretaria/estudante/checklistdocumentacao/${id}`;
  }

  conselho(id: string) {
    return `/secretaria/estudante/conselho-de-classe/${id}`;
  }

  situacao_escolar(id: string) {
    return `/secretaria/estudante/situacaoescolar/${id}`;
  }

  responsavel(id: string) {
    return `/secretaria/estudante/formulario-responsavel/${id}`;
  }

  deletar(estudante: Estudante) {
    this._fuseLoadingService.show();
    this._estudanteService.deletar(estudante.id)
    .pipe(
      finalize(() => this._fuseLoadingService.hide())
    )
    .subscribe(
      () => {
        this.alert = {
          type: "success",
          message: `O estudante ${estudante.nome} ${estudante.sobrenome} foi deletado com sucesso.`,
        };
        this.showAlert = true;
        this.atualizarDataTable(estudante);
      },
      (exception) => {
        console.log(exception);
      }
    );
  }

  situacaoProjeto(estudante: Estudante) {
    this._router.navigateByUrl(
      `/secretaria/estudante/situacao-projeto/${estudante.id}`,
      { state: { estudante: estudante } }
    );
  }

  situacaoFamiliar(id: string) {
    return `/secretaria/estudante/situacao-familiar/${id}`;
  }


  generatePDF(estudante: Estudante) {
    const date = new Date();
    const ano = date.getFullYear();
    const mes = date.getMonth();
    const dia = date.getDate();
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
      "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    this._responsavelService.buscarResponsavelPorUUIDEstudante(estudante.id)
      .subscribe(responsavelResponse => {
        this.resp = responsavelResponse
        this.nomeSobrenome = this.resp.nome + ' ' + this.resp.sobrenome;
        this.cpfTermo = this.resp.cpf
        this.infsTermo = 'Eu, ' + this.nomeSobrenome + ', CPF Nº ' + this.cpfTermo + ', ' + 'na qualidade de ' + this.resp.tipoResponsavel.descricao + ', ' + 
        '\nresponsável legal pela criança/adolescente ' + estudante.nome + ' ' + estudante.sobrenome + ',';
          
    }, error => {
      this.nomeSobrenome = estudante.nome + ' ' + estudante.sobrenome;
      this.cpfTermo = estudante.cpf;
      this.infsTermo = 'Eu, ' + this.nomeSobrenome + ', CPF Nº ' + this.cpfTermo + ',';
    });

    let docDefinition = {
      content: [
        {
          columns: [
            { image: ImagemPDFUtils.IRN_TRANSPARENTE, width: 130, height: 80, alignment: 'left', absolutePosition: { x: 50, y: 50 } },
            { image: ImagemPDFUtils.ICONE_GRAEL, width: 80, height: 80, alignment: 'right', absolutePosition: { x: 50, y: 50 } }
          ]
        },
        {
          alignment: 'justify',
          text: 'TERMO DE RESPONSABILIDADE E USO DE IMAGEM E VOZ',
          style: 'header',
          fontSize: 15,
          bold: true,
          margin: [0, 10],
          absolutePosition: { x: 80, y: 160 }
        },
        {
          absolutePosition: { x: 80, y: 200 },
          alignment: 'justify',
          text: this.infsTermo +
            TextoPDFUtils.TEXTO_TERMO +
            '\nNiterói, ' + dia + ' de ' + meses[mes] + ' de ' + ano +
            '\nEndereço: ' + estudante.endereco.logradouro + ', ' + estudante.endereco.numero +
            '\nCEP: ' + estudante.endereco.cep +
            '\nTelefone: ' + (this.resp.celular != null ? this.resp.celular : '') + ' ' + (this.resp.telefone != null ? this.resp.telefone : '')  +
            '\nComo ficou sabendo do Projeto Grael? ' +
            '\nFaz uso de medicamento? ' +
            '\nE-mail: ' + (this.resp.email != null ? this.resp.email : '') +
            TextoPDFUtils.ASSINATURA_TERMO,
          fontSize: 12,
        },
      ]
    };  
    pdfMake.createPdf(docDefinition).open();  
  } 
}
