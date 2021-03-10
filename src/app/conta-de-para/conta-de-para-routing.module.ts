import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContaDeParaComponent } from './conta-de-para.component';
import { ContaDeParaFormComponent } from './conta-de-para-form/conta-de-para-form.component';
import { ContaDeParaFormModule } from './conta-de-para-form/conta-de-para-form.module';

const routes: Routes = [
    {
        path: '',
        component: ContaDeParaComponent
    },
    {
        path: ':id/:isEdit',
        component: ContaDeParaFormComponent,
        children: [
            { path: 'conta-de-para-form', loadChildren: () => ContaDeParaFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContaDeParaRoutingModule { }
