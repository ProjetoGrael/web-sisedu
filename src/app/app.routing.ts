import {Route} from '@angular/router';
import {AuthGuard} from 'app/core/auth/guards/auth.guard';
import {NoAuthGuard} from 'app/core/auth/guards/noAuth.guard';
import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/principal'
    {path: '', pathMatch: 'full', redirectTo: '/principal'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: '/principal'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)
            },
            {
                path: 'sign-in',
                loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)
            }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)
            },
            {
                path: 'unlock-session',
                loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)
            }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'home',
                loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)
            },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'compact',
            theme: 'brand'
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'principal',
                loadChildren: () => import('app/modules/admin/principal/principal.module').then(m => m.PrincipalModule)
            },

            {
                path: 'usuario', children: [
                    {
                        path: 'usuario',
                        loadChildren: () => import('app/modules/admin/usuario/usuario.module').then(m => m.UsuarioModule)
                    },
                ]
            },
            {
                path: 'secretaria', children: [
                    {
                        path: 'estudante',
                        loadChildren: () => import('app/modules/admin/secretaria/estudante/estudante.module').then(m => m.EstudanteModule)
                    },                  
                ]
            },
            {
                path: 'academico', children: [
                    {
                        path: 'turma',
                        loadChildren: () => import('app/modules/admin/academico/turma/turma.module').then(m => m.TurmaModule)
                    },
                    {
                        path: 'disciplina',
                        loadChildren: () => import('app/modules/admin/academico/disciplina/disciplina.module').then(m => m.DisciplinaModule)
                    },
                    {
                        path: 'instrutor',
                        loadChildren: () => import('app/modules/admin/academico/instrutores/instrutores.module').then(m => m.InstrutoresModule)
                    },
                    {
                        path: 'periodo-letivo',
                       loadChildren: () => import('app/modules/admin/academico/periodo-letivo/periodo-letivo.module').then(m => m.PeriodoLetivoModule)
                    },
                ]
            },
            {
                path: 'financeiro', children: [
                    {
                        path: 'transacao',
                        loadChildren: () => import('app/modules/admin/financeiro/transacao/transacao.module').then(m => m.TransacaoModule)
                    },
                ]
            },
            {
                path: 'administrativo', children: [
                    {
                        path: 'rotina',
                        loadChildren: () => import('app/modules/admin/administrativo/rotina/rotina.module').then(m => m.RotinaModule)
                    },
                ]
            },
        ]
    }
];