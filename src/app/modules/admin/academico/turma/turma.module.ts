import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { Route, RouterModule } from "@angular/router";
import { FuseAlertModule } from "@fuse/components/alert";
import { FuseLoadingBarModule } from "@fuse/components/loading-bar";
import { TurmaComponent } from "app/modules/admin/academico/turma/turma.component";
import { SharedModule } from "app/shared/shared.module";
import { NgxMaskModule } from "ngx-mask";
import { FormularioTurmaComponent } from './formulario-turma/formulario-turma.component';
import { CursoComponent } from './curso/curso.component';
import { InscricaoComponent } from "./curso/inscricao-curso/inscricao-curso.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConselhoDeClasseComponent } from "./conselho-de-classe/conselho-de-classe.component";
import { EstudantesCursoComponent } from './curso/estudantes-curso/estudantes-curso.component';
import { MeusCursosComponent } from './curso/meus-cursos/meus-cursos.component';
import { MatCardModule } from '@angular/material/card';
import { FuseCardModule } from '@fuse/components/card';
import { PautaComponent } from './curso/pauta/pauta.component';


const routes: Route[] = [
    {
        path: "",
        component: TurmaComponent,
    },
    {
        path: "formulario",
        component: FormularioTurmaComponent,
    },
    {
        path: "formulario/:id",
        component: FormularioTurmaComponent,
    },
    {
        path: ":id/curso",
        component: CursoComponent,
    },
    {
        path: ":idTurma/curso/:id/inscricao",
        component: InscricaoComponent,
    },
    {
        path: ":idTurma/curso/:id/estudantes-curso",
        component: EstudantesCursoComponent,
    },
    {
        path: ":idTurma/curso/:idCurso/estudantes-curso/:idEstudante/conselho-de-classe",
        component: ConselhoDeClasseComponent,
    },
    {
        path: "meus-cursos",
        component: MeusCursosComponent
    },
    {
        path: ":idTurma/curso/:idCurso/pauta/:dataPauta/novo",
        component: PautaComponent
    },
    {
        path: ":idTurma/curso/:idCurso/pauta/:idPauta/edicao",
        component: PautaComponent
    }

];

@NgModule({
    declarations: [TurmaComponent, FormularioTurmaComponent, CursoComponent, InscricaoComponent, 
                   ConselhoDeClasseComponent, EstudantesCursoComponent, MeusCursosComponent, PautaComponent],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatMenuModule,
        MatDividerModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FuseLoadingBarModule,
        ReactiveFormsModule,
        FuseAlertModule,
        FuseCardModule,
        MatIconModule,
        NgxMaskModule,
        CommonModule,
        SharedModule
    ],
})
export class TurmaModule {
}
