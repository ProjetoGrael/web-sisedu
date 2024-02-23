import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseLoadingService } from '@fuse/services/loading';
import { DateFormatDateToStringPipe } from 'app/core/pipe/data-format-date-to-string.pipe';
import { DateFormatStringToDatePipe } from 'app/core/pipe/data-format-string-to-date.pipe';
import { obrigatorioValidator } from 'app/core/validator/obrigatorio.validator';
import { Pagina } from 'app/shared/pagina.model';
import { PlanoAula } from '../model/plano-aula';
import { DateFormatYYYYMMDDStringToDatePipe } from 'app/core/pipe/data-format-yyyy-mm-dd-string-to-date.pipe';
import { DisciplinaService } from '../disciplina.service';
import { Disciplina } from '../model/disciplina.model';

@Component({
  selector: 'sisedu-plano-aula',
  templateUrl: './plano-aula.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PlanoAulaComponent implements OnInit {
  displayedColumns: string[] = [
    "ordenacao",
    "anotacoes",
    "observacoes",
    "opcoes",
  ];

  mensagemErro = ''
  planoAulaForm: FormGroup;
  planoAula: PlanoAula;
  dataSource: MatTableDataSource<PlanoAula>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  paginacao: Pagina<PlanoAula>;
  disciplina: Disciplina = null;
  idPlanoDeAula: number;
  

  constructor(
    private _formBuilder: FormBuilder,
    private _disciplinaService: DisciplinaService,
    private _activatedRoute: ActivatedRoute,
    private _fuseConfirmationService: FuseConfirmationService) { }

  ngOnInit(): void {
    this.planoAulaForm = this._formBuilder.group({
      ordenacao: [null],
      anotacoes: [null],
      observacoes: [null]
    });

    this._carregarDisciplina();
  }

  private _carregarDisciplina(){
    const idDisciplina = this._activatedRoute.snapshot.params.idDisciplina;
    
    if (idDisciplina) {
      this._disciplinaService.buscarPorId<Disciplina>(idDisciplina).subscribe(disciplina => {
        this.disciplina = disciplina;
        this._carregarPlanosAula(this.disciplina.id);
      }, exception => {
        this.mensagemErro = 'Não foi possível carregar os dados da Disciplina'
      });
    }
  }
  
  private _carregarPlanosAula(idDisciplina: number){
    this._disciplinaService.obterPlanoAulaPaginado(idDisciplina).subscribe(planosAulaPaginado => {
      this.paginacao = planosAulaPaginado

      this.dataSource = new MatTableDataSource<PlanoAula>(
        this.paginacao.conteudo
      );

      this.dataSource.paginator = this.paginator; 
    })
  }

  salvar(){
    console.log(this.idPlanoDeAula)
    if(this.idPlanoDeAula){
      this.editarPlanoDeAula();
    }else{
      this.adicionar();
    }
  }

  adicionar(){
     this.planoAula = this._payloadPlanoAula();
     this._disciplinaService.adicionarPlanoAula(this.planoAula, this.disciplina.id).subscribe(planoAula => {
        this.planoAulaForm.reset();
        this._carregarPlanosAula(this.disciplina.id);
     }, exception => {
        console.error(exception);
     });
  }

  editarPlanoDeAula(){
   this.planoAula = this._payloadPlanoAula();
     this._disciplinaService.atualizarPlanoAula(this.planoAula, this.idPlanoDeAula).subscribe(planoAula => {
        this.planoAulaForm.reset();
        this._carregarPlanosAula(this.disciplina.id);
        this.idPlanoDeAula = null;
     }, exception => {
        console.error(exception);
     });
  }

  private _payloadPlanoAula(): PlanoAula {
    let formulario = Object.assign({}, this.planoAulaForm.value);

    const {
      anotacoes,
      observacoes
    } = formulario;

    return {
      anotacoes,
      observacoes,
    } as PlanoAula;
  }

  voltar(){
    return [`/academico/disciplina`]
  }

  editar(idPlanoAula: number){
     const planoAula = this.paginacao.conteudo.find(planoAula => planoAula.id === idPlanoAula)
     
     this.idPlanoDeAula = idPlanoAula;
     this.planoAulaForm.get("ordenacao").setValue(planoAula.ordenacao);
     this.planoAulaForm.get("anotacoes").setValue(planoAula.anotacoes);
     this.planoAulaForm.get("observacoes").setValue(planoAula.observacoes);
  }

  cancelar(){
    this.planoAulaForm.reset();
    this.idPlanoDeAula = null;
  }

  dialogAdicionarPlanoAula(){
    const dialogRef = this._fuseConfirmationService.open({
      title: "Adicionar Plano de Aula",
      message:
        'Tem certeza que deseja adicionar esse Plano de Aula?',
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "info",
      },
      actions: {
        confirm: {
          show: true,
          label: "sim",
          color: "primary",
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result === 'confirmed'){
        this.salvar();
      }
    });
  }

}
