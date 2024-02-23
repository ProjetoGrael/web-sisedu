import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FuseConfirmationModule } from './../../../../../@fuse/services/confirmation/confirmation.module';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RotinaComponent } from './rotina.component';
import { FormularioRotinaComponent } from './formulario-rotina/formulario-rotina.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { FormularioAgendamentoSituacaoProjetoComponent } from './agendamento/formulario/formulario-agendamento-situacao-projeto.component';
const routes: Route[] = [
  {
      path: '',
      component: RotinaComponent
  },
  {
    path: ':id/agendamento',
    component: FormularioAgendamentoSituacaoProjetoComponent
  },
  {
    path: 'formulario',
    component: FormularioRotinaComponent
  },
  {
    path: 'formulario/:id',
    component: FormularioRotinaComponent
  }
];

@NgModule({
  declarations: [
    RotinaComponent,
    FormularioRotinaComponent,
    FormularioAgendamentoSituacaoProjetoComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FuseAlertModule,
    FuseConfirmationModule,
    CommonModule,
    SharedModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    MatCardModule
  ]
})
export class RotinaModule { }
