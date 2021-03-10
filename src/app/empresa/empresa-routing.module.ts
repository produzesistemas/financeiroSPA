import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaComponent } from './empresa.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpresaFormModule } from './empresa-form/empresa-form.module';


const routes: Routes = [
    {
        path: '',
        component: EmpresaComponent
    },
    {
        path: ':id/:isEdit',
        component: EmpresaFormComponent,
        children: [
            { path: '', loadChildren: () => EmpresaFormModule },
          ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpresaRoutingModule { }
