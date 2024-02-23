import { Filiacao } from './../model/filiacao.model';
import { idade, isMaiorIdade } from 'app/core/utils/data.utils';
import { MensagemErro } from './../../../../../core/error/mensagem-erro.model';
import { TipoContato } from './../../../../../core/helper/model/tipo-contato.model';
import { TipoContatoHelperService } from './../../../../../core/helper/tipo-contato-helper.service';
import { FuseLoadingService } from './../../../../../../@fuse/services/loading/loading.service';
import { LocalNascimento } from './../../../../../core/helper/model/local-nascimento.model';
import { LocalNascimentoHelperService } from './../../../../../core/helper/local-nascimento-helper.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EmailValidator, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {
    anoMinimoValidator,
    dataMaiorOuIgualAtualValidator,
    dataPadraoValidator
} from "../../../../../core/validator/data.validator";
import {obrigatorioValidator} from "../../../../../core/validator/obrigatorio.validator";
import {emailValidator} from "../../../../../core/validator/email.validator";
import {tamanhoMaximoValidator, tamanhoMinimoValidator} from "../../../../../core/validator/tamanho.validator";
import {EstudanteService} from "../estudante.service";
import {DateFormatDateToStringPipe} from "../../../../../core/pipe/data-format-date-to-string.pipe";
import {Estudante} from "../model/estudante.model";
import {ActivatedRoute, Router} from "@angular/router";
import {valorMinimoValidator} from "../../../../../core/validator/valor.validator";
import {cpfValidator} from "../../../../../core/validator/cpfValidator.validator";
import {FuseConfirmationService} from '@fuse/services/confirmation';
import {Endereco} from "../model/endereco.model";
import {DateFormatStringToDatePipe} from "../../../../../core/pipe/data-format-string-to-date.pipe";
import {EnderecoBrasilApiService} from "../../../../../shared/endereco-brasil-api.service";
import { EnderecoHelperService } from 'app/core/helper/endereco-helper.service';
import { Estado } from 'app/core/helper/model/estado.model';
import { Cidade } from 'app/core/helper/model/cidade.model';
import { Observable } from 'rxjs';
import { map, startWith, finalize, delay } from 'rxjs/operators';
import { Bairro } from 'app/core/helper/model/bairro.model';
import { SubBairro } from 'app/core/helper/model/sub-bairro.model';


@Component({
  selector: "sisedu-formulario-estudante",
  templateUrl: "./formulario-estudante.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class FormularioEstudanteComponent implements OnInit {
  private _dateFormatDateToStringPipe: DateFormatDateToStringPipe =
    new DateFormatDateToStringPipe();
  private _dateFormatStringToDatePipe: DateFormatStringToDatePipe =
    new DateFormatStringToDatePipe();
  private estudante = {} as Estudante;
  private _id: string = null;

  estados: Estado[] = [];

  cidades: Cidade[] = [];
  filtroCidades: Observable<Cidade[]>;

  bairros: Bairro[] = [];
  filtroBairros: Observable<Bairro[]>;

  subBairros: Bairro[] = [];
  filtroSubBairros: Observable<SubBairro[]>;

  locaisNascimento: LocalNascimento[];
  tiposContato: TipoContato[];

  estudanteForm: FormGroup;
  mensagemErro: string = "";
  botaoSalvarDesabilitado = false;
  carregandoDadosEstudante = false;
  tiposContatoSelecionado: string[] = [];
  mascarasContato: string[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _estudanteService: EstudanteService,
    private _enderecoViaCepService: EnderecoBrasilApiService,
    private _enderecoHelperService: EnderecoHelperService,
    private _localNascimentoService: LocalNascimentoHelperService,
    private _tipoContatoService: TipoContatoHelperService,
    private _router: Router,
    private _fuseConfirmationService: FuseConfirmationService,
    private _activatedRoute: ActivatedRoute,
    private _fuseLoading: FuseLoadingService
  ) {}

  ngOnInit(): void {
    this.estudanteForm = this._formBuilder.group({
      informacoesBasicas: this._formBuilder.group({
        nome: [null, [tamanhoMinimoValidator(3), obrigatorioValidator]],
        sobrenome: [null, [tamanhoMinimoValidator(3), obrigatorioValidator]],
        nomeSocial: [null],
        cpf: [null, [cpfValidator]],
        sexo: [null, [obrigatorioValidator, tamanhoMaximoValidator(1)]],
        dataNascimento: [
          null,
          [
            dataMaiorOuIgualAtualValidator,
            dataPadraoValidator,
            anoMinimoValidator(7),
            obrigatorioValidator,
          ],
        ],
        naturalidade: [null],
        localNascimento: [null],
        nacionalidade: [null],
        corEtnia: [null],
        numeroRg: [null],
        dataEmissaoRg: [
          null,
          [dataMaiorOuIgualAtualValidator, dataPadraoValidator],
        ],
        orgaoExpedidorRg: [null],
      }),
      endereco: this._formBuilder.group({
        logradouro: [null, obrigatorioValidator],
        numero: [null],
        complemento: [null],
        bairro: [null, obrigatorioValidator],
        subBairro: [null],
        cidade: [null, obrigatorioValidator],
        estado: [null, obrigatorioValidator],
        cep: [null, obrigatorioValidator],
      }),
      filiacao: this._formBuilder.group({
        nomePai: [null, obrigatorioValidator],
        sobrenomePai: [null, obrigatorioValidator],
        cpfPai:  [null, [cpfValidator]],
        emailPai: [null, [emailValidator]],
        telefonePai: [null],
        nomeMae: [null, obrigatorioValidator],
        sobrenomeMae: [null, obrigatorioValidator],
        cpfMae:  [null, [cpfValidator]],
        emailMae: [null, [emailValidator]],
        telefoneMae: [null],
      }),
      contatos: this._formBuilder.array([]),
      confirmacao: this._formBuilder.group({}),
    });

    this._carregarEstudante();
    this._carregaEstados();
    this._carregaLocaisNascimento();
    this._carregaTipoContato();
    
  }

  private _carregarEstudante() {
    this._id = this._activatedRoute.snapshot.params.id;
    if (this._id) {
      this.carregandoDadosEstudante = true;
      this._fuseLoading.show();

      return this._estudanteService
        .buscarPorId<Estudante>(this._id)
        .pipe(
          finalize(() => {
            this.carregandoDadosEstudante = false;
            this._fuseLoading.hide();
          })
        )
        .subscribe((estudante) => {
          this._carregarInformacoesBasica(estudante);
          this._carregarEndereco(estudante.endereco);
          this._carregarContato(estudante);
          this._carregarFiliacao(estudante.filiacao);
        });
    }
  }

  private _carregaEstados() {
    this._enderecoHelperService.buscarTodosEstados().subscribe(
      (estados) => {
        this.estados = estados;
      },
      (exception) => {
        const erro = exception.error as MensagemErro;
        this.mensagemErro = erro.mensagem;
      }
    );
  }

  private _carregaLocaisNascimento() {
    this._localNascimentoService.getLocaisNascimento().subscribe(
      (locaisNascimento) => {
        this.locaisNascimento = locaisNascimento;
      },
      (exception) => {
        const erro = exception.error as MensagemErro;
        this.mensagemErro = erro.mensagem;
      }
    );
  }

  private _carregaTipoContato() {
    this._tipoContatoService.getTiposContato().subscribe(
      (tiposContato) => (this.tiposContato = tiposContato),
      (exception) => {
        const erro = exception.error as MensagemErro;
        this.mensagemErro = erro.mensagem;
      }
    );
  }

  private _carregarInformacoesBasica(estudante: Estudante) {
    this.estudanteForm.get("informacoesBasicas.nome").setValue(estudante.nome);
    this.estudanteForm
      .get("informacoesBasicas.sobrenome")
      .setValue(estudante.sobrenome);
    this.estudanteForm
      .get("informacoesBasicas.nomeSocial")
      .setValue(estudante.nomeSocial);
    this.estudanteForm.get("informacoesBasicas.cpf").setValue(estudante.cpf);
    this.estudanteForm.get("informacoesBasicas.sexo").setValue(estudante.sexo);
    this.estudanteForm
      .get("informacoesBasicas.dataNascimento")
      .setValue(
        this._dateFormatStringToDatePipe.transform(estudante.dataNascimento)
      );
    this.estudanteForm
      .get("informacoesBasicas.naturalidade")
      .setValue(estudante.naturalidade);
    this.estudanteForm
      .get("informacoesBasicas.nacionalidade")
      .setValue(estudante.nacionalidade);
    this.estudanteForm
      .get("informacoesBasicas.localNascimento")
      .setValue(estudante.localNascimento);
    this.estudanteForm
      .get("informacoesBasicas.corEtnia")
      .setValue(estudante.corEtnia);
    this.estudanteForm
      .get("informacoesBasicas.numeroRg")
      .setValue(estudante.numeroRg);
    this.estudanteForm
      .get("informacoesBasicas.dataEmissaoRg")
      .setValue(
        this._dateFormatStringToDatePipe.transform(estudante.dataEmissaoRg)
      );
    this.estudanteForm
      .get("informacoesBasicas.orgaoExpedidorRg")
      .setValue(estudante.orgaoExpedidorRg);
  }

  private _carregarEndereco(endereco: Endereco) {
    this.estudanteForm.get("endereco.logradouro").setValue(endereco.logradouro);
    this.estudanteForm.get("endereco.numero").setValue(endereco.numero);
    this.estudanteForm
      .get("endereco.complemento")
      .setValue(endereco.complemento);
    this.estudanteForm.get("endereco.bairro").setValue(endereco.bairro);
    this.estudanteForm.get("endereco.subBairro").setValue(endereco.subBairro);
    this.estudanteForm.get("endereco.cidade").setValue(endereco.cidade);
    this.estudanteForm.get("endereco.estado").setValue(endereco.estado);
    this.estudanteForm.get("endereco.cep").setValue(endereco.cep);
  }

  private _carregarFiliacao(filiacao: Filiacao){
    this.estudanteForm.get("filiacao.nomePai").setValue(filiacao.nomePai);
    this.estudanteForm.get("filiacao.sobrenomePai").setValue(filiacao.sobrenomePai);
    this.estudanteForm.get("filiacao.cpfPai").setValue(filiacao.cpfPai);
    this.estudanteForm.get("filiacao.emailPai").setValue(filiacao.emailPai);
    this.estudanteForm.get("filiacao.telefonePai").setValue(filiacao.telefonePai);

    this.estudanteForm.get("filiacao.nomeMae").setValue(filiacao.nomeMae);
    this.estudanteForm.get("filiacao.sobrenomeMae").setValue(filiacao.sobrenomeMae);
    this.estudanteForm.get("filiacao.cpfMae").setValue(filiacao.cpfMae);
    this.estudanteForm.get("filiacao.emailMae").setValue(filiacao.emailMae);
    this.estudanteForm.get("filiacao.telefoneMae").setValue(filiacao.telefoneMae);
    
  }

  private _carregarContato(estudante: Estudante) {
    estudante.contatos.forEach((contato, indice) => {
      let contatoForm = this._formBuilder.group({
        id: [contato.id],
        contato: [contato.contato],
        pertence: [contato.pertence],
        tipo: [contato.tipo],
      });

      this.contatos.push(contatoForm);
      this.habilitarEDefinirMascaraContato(indice, contato.tipo);
    });
  }

  salvar() {
    this.botaoSalvarDesabilitado = true;
    this.estudante = this._payloadEstudante();

    if (this._id) {
      this._estudanteService.atualizar(this._id, this.estudante).subscribe(
        (response) => {
          this._resetarFormulario();
          this._router.navigateByUrl(
            "/secretaria/estudante/confirmacao-atualizacao-dados",
            { state: { estudante: response } }
          );
        },
        (exception) => {
          const error = exception.error as MensagemErro[];

          error.forEach((e) => {
            this.mensagemErro += e.mensagem + "\n";
          });

          this.botaoSalvarDesabilitado = false;
        }
      );
      return;
    }

    this._estudanteService.salvar(this.estudante).subscribe(
      (response) => {
        this._resetarFormulario();
        this._router.navigateByUrl(
          "/secretaria/estudante/confirmacao-matricula",
          { state: { estudante: response } }
        );
      },
      (exception) => {
        const error = exception.error as MensagemErro[];

        error.forEach((e) => {
          this.mensagemErro += e.mensagem + "\n";
        });

        this.botaoSalvarDesabilitado = false;
      }
    );
  }

  private _resetarFormulario() {
    this.estudanteForm.reset();
    this.estudante = {} as Estudante;
    this.botaoSalvarDesabilitado = false;
  }

  private _payloadEstudante() {
    let formulario = Object.assign({}, this.estudanteForm.value);

    const {
      nome,
      sobrenome,
      nomeSocial,
      cpf,
      sexo,
      dataNascimento,
      naturalidade,
      nacionalidade,
      localNascimento,
      corEtnia,
      numeroRg,
      dataEmissaoRg,
      orgaoExpedidorRg,
    } = formulario.informacoesBasicas;

    const {
      logradouro,
      numero,
      complemento,
      bairro,
      subBairro,
      cidade,
      estado,
      cep,
    } = formulario.endereco;

    const filiacao = formulario.filiacao;
    const contatos = formulario.contatos;

    return {
      nome,
      sobrenome,
      nomeSocial,
      cpf,
      sexo,
      dataNascimento:
        this._dateFormatDateToStringPipe.transform(dataNascimento),
      naturalidade,
      nacionalidade,
      localNascimento,
      corEtnia,
      numeroRg,
      dataEmissaoRg: this._dateFormatDateToStringPipe.transform(dataEmissaoRg),
      orgaoExpedidorRg,
      endereco: {
        logradouro,
        numero,
        complemento,
        bairro,
        subBairro,
        cidade,
        estado,
        cep,
      },
      filiacao,
      contatos,
    };
  }

  buscarEndereco() {
    const cep = this.estudanteForm.get("endereco.cep").value;
    if (cep != null && cep !== "") {
      this.limparEndereco();
      this.limparMensagemErro();

      this._fuseLoading.show();

      this._enderecoViaCepService
        .buscarEndereco(cep)
        .pipe(finalize(() => this._fuseLoading.hide()))
        .subscribe(
          (enderecoBrasilAPI) => {
            this.estudanteForm
              .get("endereco.logradouro")
              .setValue(enderecoBrasilAPI.street);
            this.estudanteForm
              .get("endereco.bairro")
              .setValue(enderecoBrasilAPI.neighborhood);
            this.estudanteForm
              .get("endereco.cidade")
              .setValue(enderecoBrasilAPI.city);
            this.estudanteForm
              .get("endereco.estado")
              .setValue(enderecoBrasilAPI.state);
          },
          (exception) => {
            this.limparEndereco();
            this.limparMensagemErro();
            this.mensagemErro = `Não foi encontrado o endereço para o cep ${cep}`;
          }
        );
    }
  }

  //TODO deixar mais genérico filtro do Autocomplete da Cidade, Bairro e Sub-Bairro
  //Foi mantido dessa forma devido a falta de tempo no desenvolvimento.

  // --------------- Filtro Cidade ---------------------------

  buscarCidadesDoEstado(estadoSelecionado) {
    let idEstado = this.estados.find(
      (estado) => estado.sigla === estadoSelecionado.value
    ).id;

    this._enderecoHelperService.buscarCidadesDoEstado(idEstado).subscribe(
      (cidades) => {
        this.cidades = cidades;
        this._construirFiltroCidades();
      },
      (exception) => {
        console.log(exception);
      }
    );
  }

  private _construirFiltroCidades() {
    this.filtroCidades = this.estudanteForm
      .get("endereco.cidade")
      .valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.nome)),
        map((nome) => (nome ? this._filterCidade(nome) : this.cidades.slice()))
      );
  }

  private _filterCidade(valor): Cidade[] {
    const filterValue = valor?.toLowerCase();
    return this.cidades.filter((cidade) =>
      cidade.nome.toLowerCase().includes(filterValue)
    );
  }

  displayCidade(nome: string): string {
    return nome ? nome : undefined;
  }

  // --------------- Filtro Bairro ---------------------------

  buscarBairrosDaCidade(cidadeSelecionado) {
    let idCidade = this.cidades.find(
      (cidade) => cidade.nome === cidadeSelecionado.option.value
    ).id;

    this._enderecoHelperService.buscarBairrosDaCidade(idCidade).subscribe(
      (bairros) => {
        this.bairros = bairros;
        this._construirFiltroBairros();
      },
      (exception) => {
        console.log(exception);
      }
    );
  }

  private _construirFiltroBairros() {
    this.filtroBairros = this.estudanteForm
      .get("endereco.bairro")
      .valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.nome)),
        map((nome) => (nome ? this._filterBairro(nome) : this.bairros.slice()))
      );
  }

  private _filterBairro(valor): Bairro[] {
    const filterValue = valor.nome?.toLowerCase();
    return this.bairros.filter((bairro) =>
      bairro.nome.toLowerCase().includes(filterValue)
    );
  }

  displayBairro(nome: string): string {
    return nome ? nome : undefined;
  }

  // --------------- Filtro Sub-Bairro ---------------------------

  buscarSubBairrosDoBairro(bairroSelecionado) {
    let idBairro = this.bairros.find(
      (bairro) => bairro.nome === bairroSelecionado.option.value
    ).id;

    this._enderecoHelperService.buscarSubBairrosDoBairro(idBairro).subscribe(
      (subBairros) => {
        this.subBairros = subBairros;
        this._construirFiltroSubBairros();
      },
      (exception) => {
        console.log(exception);
      }
    );
  }

  private _construirFiltroSubBairros() {
    this.filtroSubBairros = this.estudanteForm
      .get("endereco.subBairro")
      .valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.nome)),
        map((nome) =>
          nome ? this._filterSubBairro(nome) : this.subBairros.slice()
        )
      );
  }

  private _filterSubBairro(valor): Bairro[] {
    const filterValue = valor.nome?.toLowerCase();
    return this.subBairros.filter((subBairro) =>
      subBairro.nome.toLowerCase().includes(filterValue)
    );
  }

  displaySubBairro(nome: string): string {
    return nome ? nome : undefined;
  }

  private limparEndereco() {
    this.estudanteForm.get("endereco.logradouro").setValue(null);
    this.estudanteForm.get("endereco.bairro").setValue(null);
    this.estudanteForm.get("endereco.cidade").setValue(null);
    this.estudanteForm.get("endereco.estado").setValue(null);
  }

  private limparMensagemErro() {
    this.mensagemErro = null;
  }

  dialogMenorIdade() {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Remove contact",
      message:
        'Are you sure you want to remove this contact permanently? <span class="font-medium">This action cannot be undone!</span>',
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "info",
      },
      actions: {
        confirm: {
          show: true,
          label: "Remove",
          color: "warn",
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  adicionarNovoContato() {
    if (this.limiteContatos()) {
      let contatoForm = this._formBuilder.group({
        contato: [null],
        pertence: [null],
        tipo: [null],
      });

      this.contatos.push(contatoForm);

      return;
    }

    this.mensagemErro = "Você só pode adicionar 5 contatos";
  }

  deletarContato(indice: number) {
    this.mascarasContato.splice(indice, 1);
    this.tiposContatoSelecionado.splice(indice, 1);

    this.contatos.removeAt(indice);
  }

  limiteContatos() {
    return this.contatos.length < 10;
  }

  get contatos() {
    return this.estudanteForm.get("contatos") as FormArray;
  }

  tipoContatoSelecionado(indice, event) {
    const tipoContato = event.value;
    this.habilitarEDefinirMascaraContato(indice, tipoContato);
  }

  habilitarEDefinirMascaraContato(indice, tipoContato) {
    if (tipoContato === "Telefone")
      this.mascarasContato[indice] = "(00) 0000-0000||(00) 00000-0000";
    else this.mascarasContato[indice] = "";

    this.tiposContatoSelecionado[indice] = tipoContato;
  }

  maiorIdade() {
    const dataNascimento = this.estudanteForm.get("informacoesBasicas.dataNascimento").value;

    if(dataNascimento){
        const cpfControl = this.estudanteForm.get("informacoesBasicas.cpf")
        if(isMaiorIdade(dataNascimento)){
           cpfControl.addValidators(obrigatorioValidator);
           cpfControl.updateValueAndValidity()
           cpfControl.markAsTouched();
        }else{
          cpfControl.removeValidators(obrigatorioValidator);
          cpfControl.updateValueAndValidity();
          cpfControl.markAsUntouched();
        }
    }
  }

  limparSujeitaMascaraTelefone(keyCode, input){
    if(keyCode === 8 || keyCode === 46){
      let telefone = this.estudanteForm.get(input).value
      if(telefone.length === 1 || telefone === '('){
        this.estudanteForm.get(input).setValue(null);
      }
    }
  
  }

}
