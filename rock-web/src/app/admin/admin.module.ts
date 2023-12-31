import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { PrimengModule } from '../shared/primeng/primeng.module';
import { BaseModuloAdminComponent } from './base-modulo-admin/base-modulo-admin.component';
import { AdminService } from './services/admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from '@boom/ui/auto-complete/auto-complete.module';
import { RotuloModule } from '@boom/ui/rotulo/rotulo.module';

const routes = [
  {
    path: '',
    component: BaseModuloAdminComponent,
    children: [
      { path: 'pagina-inicial', component: PaginaInicialComponent },
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
      },
      {
        path: 'empresa',
        loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule)
      },
      {
        path: 'vaga',
        loadChildren: () => import('./vaga/vaga.module').then(m => m.VagaModule)
      },
      { path: '', redirectTo: 'pagina-inicial', pathMatch: 'full' },
    ]
  }
];


@NgModule({
  declarations: [
    PaginaInicialComponent,
    BaseModuloAdminComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    RotuloModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
