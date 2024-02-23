import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {EstudanteComponent} from 'app/modules/admin/secretaria/estudante/estudante.component';
import {FormularioEstudanteComponent} from './formulario-estudante/formulario-estudante.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from "@angular/forms";

import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {NgxMaskModule} from "ngx-mask";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {FuseAlertModule} from "../../../../../@fuse/components/alert";
import {CommonModule} from "@angular/common";
import {DataPickerFormatter} from "../../../../core/formatter/data-picker.formatter";
import {SharedModule} from "../../../../shared/shared.module";
import { ConfirmacaoMatriculaEstudanteComponent } from './confirmacao-matricula-estudante/confirmacao-matricula-estudante.component';
import {MatIconModule} from "@angular/material/icon";
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { ConfirmacaoAtualizacaoDadosComponent } from './confirmacao-atualizacao-dados/confirmacao-atualizacao-dados.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatMenuModule} from "@angular/material/menu";
import {CheckListDocumentacaoComponent} from "./checklist-documentacao-estudante/checklist-documentacao-estudante.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {
    VisualizacaoParcialEstudanteComponent
} from "./visualizacao-parcial-estudante/visualizacao-parcial-estudante.component";
import {MatSortModule} from "@angular/material/sort";
import {FormularioResponsavelComponent} from "./formulario-responsavel/formulario-responsavel.component";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {SituacaoEscolarEstudanteComponent} from "./situacao-escolar-estudante/situacao-escolar-estudante.component";
import {FuseLoadingBarModule} from "../../../../../@fuse/components/loading-bar";
import { SituacaoProjetoComponent } from './situacao-projeto/situacao-projeto.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CabecalhoEstudanteComponent } from './cabecalho-estudante/cabecalho-estudante.component';
import { SituacaoFamiliarComponent } from './situacao-familiar/situacao-familiar.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

const routes: Route[] = [
    {
        path: '',
        component: EstudanteComponent
    },
    {
        path: 'formulario',
        component: FormularioEstudanteComponent
    },
    {
        path: 'formulario/:id',
        component: FormularioEstudanteComponent
    },
    {
        path: 'formulario-responsavel/:id',
        component: FormularioResponsavelComponent
    },
    {
        path: 'checklistdocumentacao/:id',
        component: CheckListDocumentacaoComponent
    },
    {
        path: 'situacaoescolar/:id',
        component: SituacaoEscolarEstudanteComponent,
    },
    {
        path: 'visualizacaoparcial/:id',
        component: VisualizacaoParcialEstudanteComponent
    },
    {
        path: 'confirmacao-matricula',
        component: ConfirmacaoMatriculaEstudanteComponent
    },
    {
        path: 'confirmacao-atualizacao-dados',
        component: ConfirmacaoAtualizacaoDadosComponent
    },
    {
        path: 'situacao-projeto/:id',
        component: SituacaoProjetoComponent
    },
    {
        path: 'situacao-familiar/:id',
        component: SituacaoFamiliarComponent
    },
];

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "left",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};

@NgModule({
    providers: [
        {provide: DateAdapter, useClass: DataPickerFormatter},
        {provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ],
    declarations: [
        EstudanteComponent,
        FormularioEstudanteComponent,
        FormularioResponsavelComponent,
        CheckListDocumentacaoComponent,
        SituacaoEscolarEstudanteComponent,
        VisualizacaoParcialEstudanteComponent,
        ConfirmacaoMatriculaEstudanteComponent,
        ConfirmacaoAtualizacaoDadosComponent,
        SituacaoProjetoComponent,
        CabecalhoEstudanteComponent,
        SituacaoFamiliarComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaskModule,
        MatDividerModule,
        MatCardModule,
        FuseAlertModule,
        CommonModule,
        SharedModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        FuseConfirmationModule,
        MatMenuModule,
        MatCheckboxModule,
        MatSortModule,
        MatAutocompleteModule,
        FuseLoadingBarModule,
        MatChipsModule,
        MatTooltipModule,
        NgxSkeletonLoaderModule,
        CurrencyMaskModule
    ]
})
export class EstudanteModule {
}
