import { Pagina } from "./../../../../shared/pagina.model";
import { Rotina } from "./model/rotina.model";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FuseAlertType } from "@fuse/components/alert";
import { RotinaService } from "./rotina.service";

@Component({
  selector: "sisedu-rotina",
  templateUrl: "./rotina.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class RotinaComponent implements OnInit {
  displayedColumns: string[] = ["nome", "tipo_rotina", "ativo", "opcoes"];
  paginacao: Pagina<Rotina>;
  dataSource: MatTableDataSource<Rotina>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };

  showAlert: boolean = false;

  constructor(private _rotinaService: RotinaService) {}

  ngOnInit(): void {
    this._carregarRotinas();
  }

  private _carregarRotinas() {
    this._rotinaService.listarComPaginacao<Rotina>().subscribe(
      (response) => {
        this.paginacao = response;
        this.dataSource = new MatTableDataSource<Rotina>(
          this.paginacao.conteudo
        );
        this.dataSource.paginator = this.paginator;
      },
      (exception) => {
        console.log(exception);
      }
    );
  }

  editar(id: string) {
    return `/administrativo/rotina/formulario/${id}`;
  }

  agendar(id: string){
    return `/administrativo/rotina/${id}/agendamento`
  }

  ativar(id: string){
    this._rotinaService.ativar(id).subscribe(response => {
      this._carregarRotinas();
    }, exception => {
      this.alert = {
        type: "warn",
        message: exception.error.mensagem,
      };
      this.showAlert = true;
    })
  }

  desativar(id: string){
    this._rotinaService.desativar(id).subscribe(response => {
      this._carregarRotinas();
    }, exception => {
      this.alert = {
        type: "warn",
        message: exception.error.mensagem,
      };
      this.showAlert = true;
    })
  }

}
