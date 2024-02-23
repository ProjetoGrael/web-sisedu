import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UsuarioComponent } from 'app/modules/admin/usuario/usuario.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: UsuarioComponent
    }
];

@NgModule({
    declarations: [
        UsuarioComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class UsuarioModule
{
}
