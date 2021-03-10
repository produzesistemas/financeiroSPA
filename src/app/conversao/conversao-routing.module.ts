import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversaoComponent } from './conversao.component';

const routes: Routes = [
    {
        path: '',
        component: ConversaoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConversaoRoutingModule { }
