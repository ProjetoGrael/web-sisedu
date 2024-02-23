import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudanteService } from '../estudante.service';
import { Estudante } from '../model/estudante.model';

@Component({
  selector: 'sisedu-cabecalho-estudante',
  templateUrl: './cabecalho-estudante.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CabecalhoEstudanteComponent implements OnInit {

  private _id: string = null;
  estudante: Estudante = null;

  constructor(private _estudanteService: EstudanteService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._id = this._activatedRoute.snapshot.params.id;
    if(this._id){
      this._estudanteService.buscarPorId<Estudante>(this._id).subscribe(estudante => this.estudante = estudante)
    }
  }

}
