import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {EstudanteParcial} from "../model/estudanteParcial.model";
import {EstudanteService} from "../estudante.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'sisedu-visualizacao-parcial-estudante',
    templateUrl: 'visualizacao-parcial-estudante.component.html',
    encapsulation: ViewEncapsulation.None
})
export class VisualizacaoParcialEstudanteComponent implements OnInit {
    displayedColumns: string[] = ['observacoes'];
    estudanteParcial = {} as EstudanteParcial;
    private _id: string = null;
    dataSource: MatTableDataSource<string>;

    constructor(
        private _estudanteService: EstudanteService,
        private _router: Router,
        private _fuseConfirmationService: FuseConfirmationService,
        private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.carregarEstudanteParcial();
    }

    carregarEstudanteParcial() {
        this._id = this._activatedRoute.snapshot.params.id;
        if (this._id) {
            this._estudanteService.buscarEstudanteParcialPorId(this._id)
                .subscribe(estudanteParcial => {
                    this._carregarInformacoesEstudanteParcial(estudanteParcial);
                    this.dataSource = new MatTableDataSource<string>(estudanteParcial.Observacoes);
                });
        }
    }

    private _carregarInformacoesEstudanteParcial(estudanteParcial: EstudanteParcial) {
        this.estudanteParcial = estudanteParcial;
    }

}