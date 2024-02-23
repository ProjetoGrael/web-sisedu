import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PrincipalComponent } from 'app/modules/admin/principal/principal.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: PrincipalComponent
    }
];

@NgModule({
    declarations: [
        PrincipalComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class PrincipalModule
{
}
