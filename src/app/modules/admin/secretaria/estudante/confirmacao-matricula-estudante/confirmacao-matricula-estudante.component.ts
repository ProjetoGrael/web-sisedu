import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {Estudante} from "../model/estudante.model";

@Component({
    selector: 'sisedu-confirmacao-matricula-estudante',
    templateUrl: './confirmacao-matricula-estudante.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ConfirmacaoMatriculaEstudanteComponent implements OnInit {

    mensagem: string;
    nome: string;
    matricula: string;
    id: string;

    constructor(private _router: Router) {
        const nav = this._router.getCurrentNavigation();
        if(nav){
            const estudante = nav.extras.state.estudante as Estudante;

            this.id = estudante.id;
            this.nome = `${estudante.nome} ${estudante.sobrenome}`;
            this.matricula = estudante.matricula;
        }
    }

    ngOnInit(): void {
        this.mensagem = `O número da matricula do estudante ${this.nome} é ${this.matricula}`
    }

    visualizar(){
        return [`/secretaria/estudante/${this.id}`];
    }

}
