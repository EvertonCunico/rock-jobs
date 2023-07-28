import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgramaCrudModule } from '@boom/ui/programas/programa-crud/programa-crud.module';
import { TableModule } from 'primeng/table';
import { TextMaskModule } from 'angular2-text-mask';
import { FieldsetModule, InputMaskModule, PanelModule, TabViewModule } from 'primeng';
import { AutoCompleteModule } from '@boom/ui/auto-complete/auto-complete.module';
import { DatePickerModule } from '@boom/ui/date-picker/date-picker.module';
import { EmpresaPesquisaComponent } from './pesquisa/empresa-pesquisa.component';
import { EmpresaManutencaoComponent } from './manutencao/empresa-manutencao.component';
import { EmpresaPesquisaService } from 'app/services/empresa-pesquisa.service';
import { EmpresaCRUDService } from 'app/services/empresa-crud.service';

@NgModule({
  // Declaração dos componentes de Pesquisa e Manutenção
  declarations: [EmpresaPesquisaComponent, EmpresaManutencaoComponent],
  imports: [
      ProgramaCrudModule.config({
          // url base da API
          url: 'empresa',
          pesquisa: EmpresaPesquisaComponent,
          manutencao: EmpresaManutencaoComponent
      }),
      // Imports dos componentes para construção das telas
      InputTextModule,
      ButtonModule,
      DropdownModule,
      TableModule,
      TextMaskModule,
      TabViewModule,
      InputMaskModule,
      AutoCompleteModule,
      FieldsetModule,
      DatePickerModule,
      PanelModule
  ],
  providers: [
    EmpresaCRUDService,
    EmpresaPesquisaService
  ]
})
export class EmpresaModule { }
