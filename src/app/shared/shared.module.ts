import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErroComponent} from './erro/erro-obrigatorio/erro.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {DateFormatDateToStringPipe} from "../core/pipe/data-format-date-to-string.pipe";
import {DateFormatStringToDatePipe} from "../core/pipe/data-format-string-to-date.pipe";
import {MensagemSucessoComponent} from './mensagem-sucesso/mensagem-sucesso.component';
import {MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        RouterModule,
        MatButtonModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ErroComponent,
        DateFormatDateToStringPipe,
        DateFormatStringToDatePipe,
        MensagemSucessoComponent
    ],
    declarations: [
        ErroComponent,
        DateFormatDateToStringPipe,
        DateFormatStringToDatePipe,
        MensagemSucessoComponent
    ]
})
export class SharedModule {
}
