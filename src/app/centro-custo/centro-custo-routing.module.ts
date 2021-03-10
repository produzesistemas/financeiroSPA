import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentroCustoComponent } from './centro-custo.component';
import { CentroCustoFormComponent } from './centro-custo-form/centro-custo-form.component';
import { CentroCustoFormModule } from './centro-custo-form/centro-custo-form.module';

const routes: Routes = [
    {
        path: '',
        component: CentroCustoComponent
    },
    {
        path: ':id/:isEdit',
        component: CentroCustoFormComponent,
        children: [
            { path: 'centro-custo-form', loadChildren: () => CentroCustoFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CentroCustoRoutingModule { }
