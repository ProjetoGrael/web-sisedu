import { InstrutorDisciplina } from './../model/instrutor-disciplina.model';
import { DisciplinaService } from './../../disciplina/disciplina.service';
import { Instrutor } from './../model/instrutor.model';
import { InstrutoresService } from './../instrutores.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
  selector: 'sisedu-associacao-disciplina',
  templateUrl: './associacao-disciplina.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AssociacaoDisciplinaComponent implements OnInit {

  instrutor: Instrutor;
  colunasDisciplinaPesquisada: string[] = ['nome', 'tipo', 'programa', 'carga_horaria', 'associar'];
  disciplinaPesquisadas = []
  nomeDisciplina = '';

  colunasDisciplinaAssociadas: string[] = ['nome', 'tipo', 'programa', 'carga_horaria', 'ativo', 'opcao'];
  disciplinasAssociadas = []

  tabelaDisciplinaVisivel = false

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };

  showAlert: boolean = false;

  private _id: number;

  constructor(private _instrutorService: InstrutoresService, 
              private _activatedRoute: ActivatedRoute,
              private _disciplinaService: DisciplinaService) { }

  ngOnInit(): void {
    this._id = this._activatedRoute.snapshot.params.id;
    if(this._id){
      this._instrutorService.buscarPorId<Instrutor>(this._id)
       .subscribe((instrutor) => {
          this.instrutor = instrutor;
          this.buscarTodasDisciplinasAssociadas();
      })
    }
  }

  pesquisarDisciplina(){
     this._disciplinaService.buscarPorNome(this.nomeDisciplina).subscribe(disciplina => {
        this.disciplinaPesquisadas = disciplina.conteudo;
        this.tabelaDisciplinaVisivel = true;
     });
  }

  associarDisciplina(idDisciplina: number){
    this._instrutorService.associarDisciplina(this.instrutor.id, idDisciplina).subscribe(response => {
      this.buscarTodasDisciplinasAssociadas();
    }, exception => {
      this.alert = {
        type: "warn",
        message: exception.error.mensagem,
      };
      this.showAlert = true;
    })
  }

  desassociarDisciplina(idAssociacao: number){
    this._instrutorService.desassociarDisciplina(idAssociacao).subscribe(response =>{
      this.buscarTodasDisciplinasAssociadas();
    });
  }

  ativarAssociacao(idAssociacao: number){
    this._instrutorService.ativarAssiciaoDisciplina(idAssociacao).subscribe(response =>{
      this.buscarTodasDisciplinasAssociadas();
    });
  }

  buscarTodasDisciplinasAssociadas(){
    this.disciplinasAssociadas = [];
    this._instrutorService.buscarTodasDisciplinasAssociadas(this.instrutor.id).subscribe(associacoes => {
      associacoes.forEach(associacao => {
        this.disciplinasAssociadas = [...this.disciplinasAssociadas, associacao]   
      });
    });
  }

  cancelar(){
    this.tabelaDisciplinaVisivel = false
    this.disciplinaPesquisadas = []
    this.nomeDisciplina = ''
  }

}
