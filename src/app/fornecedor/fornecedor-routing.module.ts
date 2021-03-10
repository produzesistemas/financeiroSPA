import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FornecedorComponent } from './fornecedor.component';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { FornecedorFormModule } from './fornecedor-form/fornecedor-form.module';

const routes: Routes = [
    {
        path: '',
        component: FornecedorComponent
    },
    {
        path: ':id/:isEdit',
        component: FornecedorFormComponent,
        children: [
            { path: 'fornecedor-form', loadChildren: () => FornecedorFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FornecedorRoutingModule { }
