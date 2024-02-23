import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Curso } from './../model/curso.model';
import { obrigatorioValidator } from 'app/core/validator/obrigatorio.validator';
import { InstrutorDisciplina } from './../../instrutores/model/instrutor-disciplina.model';
import { Instrutor } from './../../instrutores/model/instrutor.model';
import { Disciplina } from './../../disciplina/model/disciplina.model';
import { DisciplinaService } from './../../disciplina/disciplina.service';
import { TurmaService } from './../turma.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';
import { Turma } from '../model/turma.model';
import { ConstantsUtils } from 'app/core/utils/constants.utils';
import moment from 'moment';
import { MensagemErro } from 'app/core/error/mensagem-erro.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'sisedu-curso',
  templateUrl: './curso.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CursoComponent implements OnInit {

  colunasDisciplinaAssociadas: string[] = ['disciplina', 'instrutor', 'horario_inicio', 'horario_termino', 
                                           'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'disciplina_principal', 'ativo', 'opcao'];

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };

  mensagemErro = ''
  showAlert: boolean = false;
  turma = {} as Turma;
  disciplinas = [] as Disciplina[]
  instrutoresDisciplina = [] as InstrutorDisciplina[]
  cursoForm: FormGroup;
  curso = {} as Curso;
  cursos: MatTableDataSource<Curso>;// = [] as Curso[];
  editarInstrutor: boolean = false;
  
  private _idTurma: number;
  private _idCursoSelecionado: number;

  @ViewChild('formCurso') formulario;

  constructor(private _formBuilder: FormBuilder,
              private _turmaService: TurmaService,
              private _disciplinaService: DisciplinaService,
              private _activatedRoute: ActivatedRoute,
              private _fuseConfirmationService: FuseConfirmationService,) { }

  ngOnInit(): void {
    this.cursoForm = this._formBuilder.group(
      {
        disciplina: [null, [obrigatorioValidator]],
        horarioInicio: [null, [obrigatorioValidator]],
        horarioTermino: [null, [obrigatorioValidator]],
        segundaFeira: [false],
        tercaFeira: [false],
        quartaFeira: [false],
        quintaFeira: [false],
        sextaFeira: [false],
        instrutorDisciplina: [null, [obrigatorioValidator]]
      }
    );

    this._carregarTurma();
    this._caregarDisciplina();
    this._carregarCursos();
  }

  private _carregarTurma(){
    this._idTurma = this._activatedRoute.snapshot.params.id;
    if(this._idTurma){
      this._turmaService.buscarPorId<Turma>(this._idTurma).subscribe(turma => this.turma = turma)
    }
  }

  private _caregarDisciplina(){
    this._disciplinaService.todos().subscribe(disciplinas => this.disciplinas = disciplinas);
  }

  private _carregarCursos(){
    this._turmaService.buscarCursosCadastrados(this._idTurma).subscribe(cursos => this.cursos = new MatTableDataSource<Curso>(cursos));
  }

  buscarInstrutorDisciplina(idDisciplina: number){
     this._disciplinaService.buscarTodosInstrutoresAssociados(idDisciplina).subscribe(instrutoresDisciplina => {
      this.instrutoresDisciplina = instrutoresDisciplina
    })
  }

  salvar(){
    if(this.editarInstrutor){
      this.dialogEditarInstrutorDoCurso()
      return;
    }

    this.dialogAdicionarCurso();
  }

  adicionar(){
    this.curso = this._payloadCurso();

    if(this.validarDiasSemana(this.curso)){
      this._turmaService.adicionarCurso(this.curso).subscribe(
        response => {
          this._carregarCursos();
          this.resetarFormulario();       
        }, 
        exception => {
          this.mensagemErro = '';

          const error = exception.error as MensagemErro[];

          error.forEach((e) => {
            this.mensagemErro += e.mensagem + '\n';
          });

        }
        )

        return;
    }

    this.mensagemErro = 'Você deve selecionar pelo menos um dia da semana.'
  }

  editarInstrutorDoCurso(){
    this.curso = this._payloadCurso();

    this._turmaService.editarCurso(this._idCursoSelecionado, this.curso).subscribe(response => 
      {
        this._carregarCursos();
        this.editarInstrutor = false;
        this._idCursoSelecionado = null;
        this.resetarFormulario();
      }, 
    exception => {
      this.mensagemErro = '';

      const error = exception.error as MensagemErro[];

      error.forEach((e) => {
        this.mensagemErro += e.mensagem + '\n';
      });

    }
    );
  }

  validarDiasSemana(curso: Curso){
    return curso.segundaFeira ||  curso.tercaFeira || curso.quartaFeira || curso.quintaFeira || curso.sextaFeira
  }

  private _payloadCurso() {
    let formulario = Object.assign({}, this.cursoForm.value);

    const {
      horarioInicio,
      horarioTermino,
      segundaFeira,
      tercaFeira,
      quartaFeira,
      quintaFeira,
      sextaFeira,
      instrutorDisciplina
    } = formulario;

    return { horarioInicio, 
             horarioTermino, 
             segundaFeira: segundaFeira ? true : false, 
             tercaFeira: tercaFeira ? true : false, 
             quartaFeira: quartaFeira ? true : false, 
             quintaFeira: quintaFeira ? true : false, 
             sextaFeira: sextaFeira ? true : false, 
             instrutorDisciplina: {
               id: instrutorDisciplina as number
             }, 
             turma: {
              id: this._idTurma as number
            }
            } as Curso
  }

  resetarFormulario(){
    this.formulario.resetForm();
    this.mensagemErro = '';
    this.editarInstrutor = false
  }

  definirDisciplinaPrincipal(idCurso: number, isDisciplinaPrincipal: boolean){
    if(isDisciplinaPrincipal){
      this._turmaService.definirComoDisciplinaPrincipalComoSim(this._idTurma, idCurso).subscribe(response => this._carregarCursos(), 
      exception => {
        this.mensagemErro = '';

        const error = exception.error as MensagemErro[];

        error.forEach((e) => {
          this.mensagemErro += e.mensagem + '\n';
        });

      });
      return;
    }

    this._turmaService.definirComoDisciplinaPrincipalComoNao(this._idTurma, idCurso).subscribe(response => this._carregarCursos(), exception => {
      this.mensagemErro = '';

      const error = exception.error as MensagemErro[];

      error.forEach((e) => {
        this.mensagemErro += e.mensagem + '\n';
      });

    });
  }

  desativar(idCurso: number){
    this.dialogDesativar(idCurso);
  }

  editar(idCurso: number){
    this.editarInstrutor = true;
    this._idCursoSelecionado = idCurso;
    this._turmaService.buscarCursoPorId(idCurso).subscribe(curso => {
      this.cursoForm.get("horarioInicio").setValue(curso.horarioInicio);
      this.cursoForm.get("horarioTermino").setValue(curso.horarioTermino);
      this.cursoForm.get("segundaFeira").setValue(curso.segundaFeira);
      this.cursoForm.get("tercaFeira").setValue(curso.tercaFeira);
      this.cursoForm.get("quartaFeira").setValue(curso.quartaFeira);
      this.cursoForm.get("quintaFeira").setValue(curso.quintaFeira);
      this.cursoForm.get("sextaFeira").setValue(curso.sextaFeira);

      const idDisciplina = curso.instrutorDisciplina.disciplina.id
      this.cursoForm.get("disciplina").setValue(idDisciplina);
      this.buscarInstrutorDisciplina(idDisciplina);
      this.cursoForm.get("instrutorDisciplina").setValue(curso.instrutorDisciplina.id);

    })
  }

  dialogDesativar(idCurso: number) {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Desativar",
      message:
        'Tem certeza que deseja desativar esse Curso?',
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "info",
      },
      actions: {
        confirm: {
          show: true,
          label: "sim",
          color: "warn",
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result === 'confirmed'){
        this._turmaService.desativar(idCurso).subscribe(response => this._carregarCursos())
      }
    });
  }

  dialogAdicionarCurso(){
    const dialogRef = this._fuseConfirmationService.open({
      title: "Adicionar Curso",
      message:
        'Tem certeza que deseja adicionar esse Curso?',
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
        this.adicionar();
      }
    });
  }

  dialogEditarInstrutorDoCurso(){
    const dialogRef = this._fuseConfirmationService.open({
      title: "Alterar Instrutor",
      message:
        'Tem certeza que deseja alterar o Instrutor desse Curso?',
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
        this.editarInstrutorDoCurso();
      }
    });
  }

  
  planoAula(id: number){
    return `/academico/turma/${this._idTurma}/curso/${id}/plano-aula`
  }
  
  inscreverAlunos(id: number){
    return `/academico/turma/${this._idTurma}/curso/${id}/inscricao`
  }
  
  visualizarAlunos(id: number){
    return `/academico/turma/${this._idTurma}/curso/${id}/estudantes-curso`
  }

}
 