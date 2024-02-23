import { finalize } from 'rxjs/operators';
import { TurmaService } from './turma.service';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Pagina } from "app/shared/pagina.model";
import { FuseAlertType } from "@fuse/components/alert";
import { Turma } from "./model/turma.model";
import { FuseLoadingService } from '@fuse/services/loading';

@Component({
  selector: "turma",
  templateUrl: "./turma.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class TurmaComponent implements OnInit {
  displayedColumns: string[] = ["nome", "periodo_letivo", "tem_comentario",  "opcoes"];
  paginacao: Pagina<Turma>;
  dataSource: MatTableDataSource<Turma>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  alert: {type: FuseAlertType; message: string} = {
    type: "success",
    message: "",
  };

  showAlert: boolean = false;
  isEmptyList: boolean = false;

  constructor(private _turmaService: TurmaService,
    private _fuseLoadingService: FuseLoadingService) {}

  ngOnInit(): void {
    this._carregarTurmas();
  }

  private _carregarTurmas(){
    this._fuseLoadingService.show();
    this._turmaService.listarComPaginacao<Turma>(1, 10)
                          .pipe(
                            finalize(() => this._fuseLoadingService.hide())
                            )
                          .subscribe(
                            (response) => {
                              this.paginacao = response;
                              this.isEmptyList = this.paginacao.total > 0 ? false : true;
                              this.dataSource = new MatTableDataSource<Turma>(
                                this.paginacao.conteudo
                              );
                              this.dataSource.paginator = this.paginator;                             
                            },
                            (exception) => {
                              console.log(exception);                        
                            }
                          );
  }

  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(id: number) {
    return `/academico/turma/formulario/${id}`;
  }

  adicionarCurso(id: number){
    return `/academico/turma/${id}/curso`
  }

  
}
