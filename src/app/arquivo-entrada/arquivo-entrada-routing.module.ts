import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArquivoEntradaComponent } from './arquivo-entrada.component';
import { ArquivoEntradaFormComponent } from './arquivo-entrada-form/arquivo-entrada-form.component';
import { ArquivoEntradaFormModule } from './arquivo-entrada-form/arquivo-entrada-form.module';

const routes: Routes = [
    {
        path: '',
        component: ArquivoEntradaComponent
    },
    {
        path: ':id/:isEdit',
        component: ArquivoEntradaFormComponent,
        children: [
            { path: 'arquivo-entrada-form', loadChildren: () => ArquivoEntradaFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArquivoEntradaRoutingModule { }
