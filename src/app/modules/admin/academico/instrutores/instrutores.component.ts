import { finalize } from 'rxjs/operators';
import { InstrutoresService } from './instrutores.service';
import { FuseAlertType } from '@fuse/components/alert/alert.types';
import { MatTableDataSource } from '@angular/material/table';
import { Instrutor } from './model/instrutor.model';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Pagina } from 'app/shared/pagina.model';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';

@Component({
  selector: 'sisedu-instrutores',
  templateUrl: './instrutores.component.html',
  encapsulation: ViewEncapsulation.None
})
export class InstrutoresComponent implements OnInit {
  displayedColumns: string[] = [
    "nome",
    "celular",
    "ativo",
    "opcoes"
  ];
  paginacao: Pagina<Instrutor>;
  dataSource: MatTableDataSource<Instrutor>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };

  showAlert: boolean = false;
  isEmptyList: boolean = false;

  constructor(private _instrutorService: InstrutoresService,
              private _router: Router,
              private _fuseLoadingService: FuseLoadingService) { }

  ngOnInit(): void {
    this._carregarInstrutor();
  }

  private _carregarInstrutor() {
    this._fuseLoadingService.show();
    this._instrutorService.listarComPaginacao<Instrutor>(1, 10)
                          .pipe(
                            finalize(() => this._fuseLoadingService.hide())
                            )
                          .subscribe(
                            (response) => {
                              this.paginacao = response;
                              this.isEmptyList = this.paginacao.total > 0 ? false : true;
                              this.dataSource = new MatTableDataSource<Instrutor>(
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
    return `/academico/instrutor/formulario/${id}`;
  }

  desativar(instrutor: Instrutor){
    this._fuseLoadingService.show();
    this._instrutorService.desativar(instrutor.id).pipe(
      finalize(() => this._fuseLoadingService.hide())
    ).subscribe(
      () => {
        this.alert = {
          type: "success",
          message: `O instrutor ${instrutor.nome} foi desativado com sucesso.`,
        };
        this.showAlert = true;
        this._carregarInstrutor();
      },
      (exception) => {
        console.log(exception);
      }
    );
  }

  ativar(instrutor: Instrutor){
    this._fuseLoadingService.show();
    this._instrutorService.ativar(instrutor.id).pipe(
      finalize(() => this._fuseLoadingService.hide())
    ).subscribe(
      () => {
        this.alert = {
          type: "success",
          message: `O instrutor ${instrutor.nome} foi ativado com sucesso.`,
        };
        this.showAlert = true;
        this._carregarInstrutor();
      },
      (exception) => {
        console.log(exception);
      }
    );
  }

  associarDisciplina(id: number){
    return `/academico/instrutor/${id}/disciplina`;
  }

}
