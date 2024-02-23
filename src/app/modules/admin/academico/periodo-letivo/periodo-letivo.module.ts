import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
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
import {MatIconModule} from "@angular/material/icon";
import {FuseConfirmationModule} from '@fuse/services/confirmation';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSortModule} from "@angular/material/sort";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FuseLoadingBarModule} from "../../../../../@fuse/components/loading-bar";
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {PeriodoLetivoComponent} from "./periodo-letivo.component";
import {FormularioPeriodoLetivoComponent} from "./formulario-periodo-letivo/formulario-periodo-letivo.component";
import {MatExpansionModule} from "@angular/material/expansion";
import { DiaSemAulaComponent } from './dia-sem-aula/dia-sem-aula.component';


const routes: Route[] = [
    {
        path: '',
        component: PeriodoLetivoComponent
    },
    {
        path: 'formulario',
        component: FormularioPeriodoLetivoComponent
    },
    {
        path: 'formulario/:id',
        component: FormularioPeriodoLetivoComponent
    },
    {
        path: ':id/dia-sem-aula',
        component: DiaSemAulaComponent
    },
];

@NgModule({
    providers: [
        {provide: DateAdapter, useClass: DataPickerFormatter}
    ],
    declarations: [
        PeriodoLetivoComponent,
        FormularioPeriodoLetivoComponent,
        DiaSemAulaComponent
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
        MatExpansionModule
    ]
})
export class PeriodoLetivoModule {
}
