import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TransacaoComponent } from 'app/modules/admin/financeiro/transacao/transacao.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: TransacaoComponent
    }
];

@NgModule({
    declarations: [
        TransacaoComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class TransacaoModule
{
}
