import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, PreloadAllModules, RouterModule} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';
import {FuseModule} from '@fuse';
import {FuseConfigModule} from '@fuse/services/config';
import {FuseMockApiModule} from '@fuse/lib/mock-api';
import {CoreModule} from 'app/core/core.module';
import {appConfig} from 'app/core/config/app.config';
import {mockApiServices} from 'app/mock-api';
import {LayoutModule} from 'app/layout/layout.module';
import {AppComponent} from 'app/app.component';
import {appRoutes} from 'app/app.routing';
import {NgxMaskModule, IConfig} from 'ngx-mask'
import {ConstantsUtils} from "./core/utils/constants.utils";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {PaginatorPtBr} from "./core/paginator/paginator.pt-br";

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    providers: [
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
        {provide: LOCALE_ID, useValue: ConstantsUtils.LOCALE},
        {provide: MatPaginatorIntl, useClass: PaginatorPtBr},
    ],
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),

        //Lib (ngx-mask) para mascaras no input
        NgxMaskModule.forRoot(),
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
