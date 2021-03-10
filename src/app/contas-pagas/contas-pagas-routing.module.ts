import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContasPagasComponent } from './contas-pagas.component';
import { ContasPagasExportacaoComponent } from './contas-pagas-exportacao/contas-pagas-exportacao.component';
import { ContasPagasExportacaoModule } from './contas-pagas-exportacao/contas-pagas-exportacao.module';

const routes: Routes = [
    {
        path: '',
        component: ContasPagasComponent
    },
    {
        path: 'contas-pagas-exportacao',
        component: ContasPagasExportacaoComponent,
        children: [
            { path: 'contas-pagas-exportacao', loadChildren: () => ContasPagasExportacaoModule }
          ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContasPagasRoutingModule { }
