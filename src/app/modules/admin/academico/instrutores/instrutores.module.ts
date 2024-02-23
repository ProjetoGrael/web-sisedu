import { MatDividerModule } from '@angular/material/divider';
import { AssociacaoDisciplinaComponent } from './associacao-disciplina/associacao-disciplina.component';
import { FormularioInstrutorComponent } from "./formulario-instrutor/formulario-instrutor.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Route, RouterModule } from "@angular/router";
import { InstrutoresComponent } from "./instrutores.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { FuseLoadingBarModule } from "@fuse/components/loading-bar";
import { SharedModule } from "app/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { FuseAlertModule } from "@fuse/components/alert";
import { MatMenuModule } from "@angular/material/menu";

const routes: Route[] = [
  {
    path: "",
    component: InstrutoresComponent,
  },
  {
    path: "formulario",
    component: FormularioInstrutorComponent,
  },
  {
    path: "formulario/:id",
    component: FormularioInstrutorComponent,
  },
  {
    path: ":id/disciplina",
    component: AssociacaoDisciplinaComponent,
  }
];

@NgModule({
  declarations: [InstrutoresComponent, FormularioInstrutorComponent, AssociacaoDisciplinaComponent],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDividerModule,
    FuseLoadingBarModule,
    ReactiveFormsModule,
    FuseAlertModule,
    NgxMaskModule,
    NgxSkeletonLoaderModule,
    CommonModule,
    SharedModule
  ],
})
export class InstrutoresModule {}
