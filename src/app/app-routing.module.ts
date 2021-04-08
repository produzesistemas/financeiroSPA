import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from 'src/app/_layouts/default-layout/default-layout.component';
import { AppLayoutComponent } from 'src/app/_layouts/app-layout/app-layout.component';
import { ClientLayoutComponent } from 'src/app/_layouts/client-layout/client-layout.component';
import { AccountingLayoutComponent } from 'src/app/_layouts/accounting-layout/accounting-layout.component';
import { DefaultModule } from 'src/app/default/default.module';
import { LoginAdmModule } from 'src/app/login-adm/login-adm.module';
import { LoginEmpresaModule } from 'src/app/login-empresa/login-empresa.module';
import { AreaAdmModule } from 'src/app/area-adm/area-adm.module';
import { EmpresaModule } from 'src/app/empresa/empresa.module';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { ArquivoEntradaModule } from 'src/app/arquivo-entrada/arquivo-entrada.module';
import { AuthGuard } from '../app/_guard/auth.guard';
import { ConversaoModule } from 'src/app/conversao/conversao.module';
import { ContaDeParaModule } from 'src/app/conta-de-para/conta-de-para.module';
import { ContaCorrenteModule } from 'src/app/conta-corrente/conta-corrente.module';
import { FornecedorModule } from 'src/app/fornecedor/fornecedor.module';
import { PlanoContasModule } from 'src/app/plano-contas/plano-contas.module';
import { ConfiguracoesModule } from 'src/app/configuracoes/configuracoes.module';
import { CentroCustoModule } from 'src/app/centro-custo/centro-custo.module';
import { ContasAPagarModule } from 'src/app/contas-a-pagar/contas-a-pagar.module';
import { CategoriaContasAPagarModule } from 'src/app/categoria-contas-a-pagar/categoria-contas-a-pagar.module';
import { ContasPagasModule } from 'src/app/contas-pagas/contas-pagas.module';
import { QuemSomosModule } from 'src/app/quem-somos/quem-somos.module';
import { AccessDeniedComponent } from 'src/app/access-denied/access-denied.component';
import { AlterarUsuarioModule } from 'src/app/alterar-usuario/alterar-usuario.module';
import { UsuarioModule } from 'src/app/usuario/usuario.module';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full'},
      { path: 'index', loadChildren: () => DefaultModule },
      { path: 'login-adm', loadChildren: () => LoginAdmModule },
      { path: 'login-empresa', loadChildren: () => LoginEmpresaModule },
      { path: 'quem-somos', loadChildren: () => QuemSomosModule }
    ]
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'area-adm', loadChildren: () => AreaAdmModule },
      { path: 'empresa', loadChildren: () => EmpresaModule }
     ],
     canActivate: [AuthGuard],
     data: { expectedRole: ['Master'] }
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => DashboardModule },
      { path: 'conta-corrente', loadChildren: () => ContaCorrenteModule },
      { path: 'fornecedor', loadChildren: () => FornecedorModule },
      { path: 'plano-contas', loadChildren: () => PlanoContasModule },
      { path: 'centro-custo', loadChildren: () => CentroCustoModule },
      { path: 'configuracoes', loadChildren: () => ConfiguracoesModule },
      { path: 'contas-a-pagar', loadChildren: () => ContasAPagarModule },
      { path: 'contas-pagas', loadChildren: () => ContasPagasModule },
      { path: 'categoria-contas-a-pagar', loadChildren: () => CategoriaContasAPagarModule },
      { path: 'alterar-usuario', loadChildren: () => AlterarUsuarioModule },
      { path: 'usuario', loadChildren: () => UsuarioModule }
         ],
     canActivate: [AuthGuard],
     data: { expectedRole: ['Empresa','ContasAPagar','ContasAReceber','CEO'] }
  },
  {
    path: '',
    component: AccountingLayoutComponent,
    children: [
      { path: 'arquivo-entrada', loadChildren: () => ArquivoEntradaModule },
      { path: 'conversao', loadChildren: () => ConversaoModule },
      { path: 'conta-de-para', loadChildren: () => ContaDeParaModule },
         ],
     canActivate: [AuthGuard],
     data: { expectedRole: ['Escritorio','Tesouraria'] }
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
