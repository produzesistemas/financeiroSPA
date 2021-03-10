import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaAdmComponent } from './area-adm.component';

const routes: Routes = [
    {
        path: '',
        component: AreaAdmComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaAdmRoutingModule { }
