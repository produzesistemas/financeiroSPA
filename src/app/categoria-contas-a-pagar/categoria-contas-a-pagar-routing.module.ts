import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaContasAPagarComponent } from './categoria-contas-a-pagar.component';
import { CategoriaContasAPagarFormComponent } from './categoria-contas-a-pagar-form/categoria-contas-a-pagar-form.component';
import { CategoriaContasAPagarFormModule } from './categoria-contas-a-pagar-form/categoria-contas-a-pagar-form.module';

const routes: Routes = [
    {
        path: '',
        component: CategoriaContasAPagarComponent
    },
    {
        path: ':id/:isEdit',
        component: CategoriaContasAPagarFormComponent,
        children: [
            { path: 'categoria-contas-a-pagar-form', loadChildren: () => CategoriaContasAPagarFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriaContasAPagarRoutingModule { }
