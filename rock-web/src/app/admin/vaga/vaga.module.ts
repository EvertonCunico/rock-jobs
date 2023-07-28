import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgramaCrudModule } from '@boom/ui/programas/programa-crud/programa-crud.module';
import { TableModule } from 'primeng/table';
import { TextMaskModule } from 'angular2-text-mask';
import { CalendarModule, CheckboxModule, FieldsetModule, InputMaskModule, PanelModule, TabViewModule } from 'primeng';
import { AutoCompleteModule } from '@boom/ui/auto-complete/auto-complete.module';
import { DatePickerModule } from '@boom/ui/date-picker/date-picker.module';
import { VagaPesquisaComponent } from './pesquisa/vaga-pesquisa.component';
import { VagaManutencaoComponent } from './manutencao/vaga-manutencao.component';
import { VagaCRUDService } from 'app/services/vaga/vaga-crud.service';
import { VagaPesquisaService } from 'app/services/vaga/vaga-pesquisa.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  // Declaração dos componentes de Pesquisa e Manutenção
  declarations: [VagaPesquisaComponent, VagaManutencaoComponent],
  imports: [
      ProgramaCrudModule.config({
          // url base da API
          url: 'vaga',
          pesquisa: VagaPesquisaComponent,
          manutencao: VagaManutencaoComponent
      }),
      // Imports dos componentes para construção das telas
      FormsModule,
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
      PanelModule,
      CheckboxModule,
      CalendarModule
  ],
  providers: [
    VagaCRUDService,
    VagaPesquisaService
  ]
})
export class VagaModule { }
