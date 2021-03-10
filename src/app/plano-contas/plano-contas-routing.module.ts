import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanoContasComponent } from './plano-contas.component';
import { PlanoContasFormComponent } from './plano-contas-form/plano-contas-form.component';
import { PlanoContasFormModule } from './plano-contas-form/plano-contas-form.module';

const routes: Routes = [
    {
        path: '',
        component: PlanoContasComponent
    },
    {
        path: ':id/:isEdit',
        component: PlanoContasFormComponent,
        children: [
            { path: 'plano-contas-form', loadChildren: () => PlanoContasFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlanoContasRoutingModule { }
