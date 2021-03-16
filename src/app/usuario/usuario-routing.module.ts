import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioFormModule } from './usuario-form/usuario-form.module';

const routes: Routes = [
    {
        path: '',
        component: UsuarioComponent
    },
    {
        path: ':id/:isEdit',
        component: UsuarioFormComponent,
        children: [
            { path: 'usuario-form', loadChildren: () => UsuarioFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule { }
