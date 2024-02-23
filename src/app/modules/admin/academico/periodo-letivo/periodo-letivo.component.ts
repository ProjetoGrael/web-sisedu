import {finalize} from 'rxjs/operators';
import {
    Component,
    Inject,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";

import {PeriodoLetivo} from "./model/periodo-letivo.model";
import {Pagina} from "../../../../shared/pagina.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FuseAlertType} from "../../../../../@fuse/components/alert";
import {Router} from "@angular/router";
import {FuseLoadingService} from '@fuse/services/loading';
import {PeriodoLetivoService} from './periodo-letivo.service';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Disciplina} from "../../academico/disciplina/model/disciplina.model";

@Component({
    selector: "periodoLetivo",
    templateUrl: "./periodo-letivo.component.html",
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    encapsulation: ViewEncapsulation.None,
})
export class PeriodoLetivoComponent implements OnInit {
    displayedColumnsDetalhe: string[] = [
        "nome",
        "dataInicio",
        "dataFim",
        "capacidade",
        "alunosNoSistema",
        "matriculados",
        "opcoes",
    ];
    anos: Number[];
    periodos: PeriodoLetivo[];

    alert: { type: FuseAlertType; message: string } = {
        type: "success",
        message: "",
    };
    showAlert: boolean = false;
    isEmptyList: boolean = false;
    dataSource: MatTableDataSource<PeriodoLetivo>;

    constructor(
        private _periodoLetivoService: PeriodoLetivoService,
        private _router: Router,
        private _fuseLoadingService: FuseLoadingService
    ) {
    }

    ngOnInit(): void {
        this.carregarAnosPeriodoLetivos();
        this.carregarPeriodoLetivos()
    }


    carregarAnosPeriodoLetivos() {
        this._fuseLoadingService.show();
        this._periodoLetivoService.buscarAnosPeriodosLetivos()
            .pipe(
                finalize(() => this._fuseLoadingService.hide())
            )
            .subscribe(
                (response) => {
                    this.anos = response;
                    this.isEmptyList = this.anos.length > 0 ? false : true;
                },
                (exception) => {
                    console.log(exception);
                }
            );
    }


    carregarPeriodoLetivos() {
        this._fuseLoadingService.show();
        this._periodoLetivoService.listarComPaginacao<PeriodoLetivo>()
            .pipe(
                finalize(() => this._fuseLoadingService.hide())
            )
            .subscribe(
                (response) => {
                    this.periodos = response.conteudo;
                    this.dataSource = new MatTableDataSource<PeriodoLetivo>(
                        this.periodos
                    );
                },
                (exception) => {
                    console.log(exception);
                }
            );
    }

    filtroAno(ano?: number) {
        this.dataSource.filter = ano ? ano.toString() : "";
    }


    filtrar(event: Event) {
        const valorFiltro = (event.target as HTMLInputElement).value;
        this.dataSource.filter = valorFiltro.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }


    editar(id: string) {
        return `/academico/periodo-letivo/formulario/${id}`;
    }

    diasSemAula(id: string) {
        return `/academico/periodo-letivo/${id}/dia-sem-aula`;
    }

    deletar(periodoLetivo: PeriodoLetivo) {
        this._fuseLoadingService.show();
        this._periodoLetivoService.deletar(periodoLetivo.id)
            .pipe(
                finalize(() => this._fuseLoadingService.hide())
            )
            .subscribe(
                () => {
                    this.alert = {
                        type: "success",
                        message: `A periodoLetivo ${periodoLetivo.nome} foi deletada com sucesso.`,
                    };
                    this.showAlert = true;
                },
                (exception) => {
                    console.log(exception);
                }
            );
    }

}
