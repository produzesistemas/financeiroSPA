import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContasAPagarComponent } from './contas-a-pagar.component';
import { ContasAPagarFormComponent } from './contas-a-pagar-form/contas-a-pagar-form.component';
import { ContasAPagarRelatorioComponent } from './contas-a-pagar-relatorio/contas-a-pagar-relatorio.component';
import { ContasAPagarFormModule } from './contas-a-pagar-form/contas-a-pagar-form.module';
import { ContasAPagarRelatorioModule } from './contas-a-pagar-relatorio/contas-a-pagar-relatorio.module';
import { ContasAPagarXMLComponent } from './contas-a-pagar-xml/contas-a-pagar-xml.component';
import { ContasAPagarXMLModule } from './contas-a-pagar-xml/contas-a-pagar-xml.module';
const routes: Routes = [
    {
        path: '',
        component: ContasAPagarComponent
    },
    {
        path: ':id/:isEdit',
        component: ContasAPagarFormComponent,
        children: [
            { path: 'contas-a-pagar-form', loadChildren: () => ContasAPagarFormModule }
          ]
      },
      {
        path: 'contas-a-pagar-relatorio',
        component: ContasAPagarRelatorioComponent,
        children: [
            { path: 'contas-a-pagar-relatorio', loadChildren: () => ContasAPagarRelatorioModule }
          ]
      },
      {
        path: 'contas-a-pagar-xml',
        component: ContasAPagarXMLComponent,
        children: [
            { path: 'contas-a-pagar-xml', loadChildren: () => ContasAPagarXMLModule }
          ]
      }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContasAPagarRoutingModule { }
