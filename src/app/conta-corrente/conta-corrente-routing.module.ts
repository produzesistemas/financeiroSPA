import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaCorrenteComponent } from './conta-corrente.component';
import { ContaCorrenteFormComponent } from './conta-corrente-form/conta-corrente-form.component';
import { ContaCorrenteFormModule } from './conta-corrente-form/conta-corrente-form.module';

const routes: Routes = [
    {
        path: '',
        component: ContaCorrenteComponent
    },
    {
        path: ':id/:isEdit',
        component: ContaCorrenteFormComponent,
        children: [
            { path: 'conta-corrente-form', loadChildren: () => ContaCorrenteFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContaCorrenteRoutingModule { }
