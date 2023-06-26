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
import { ClientePesquisaComponent } from './pesquisa/cliente-pesquisa.component';
import { ClienteManutencaoComponent } from './manutencao/cliente-manutencao.component';
import { ClientePesquisaService } from 'app/services/cliente-pesquisa.service';
import { ClienteCRUDService } from 'app/services/cliente-crud.service';

@NgModule({
  // Declaração dos componentes de Pesquisa e Manutenção
  declarations: [ClientePesquisaComponent, ClienteManutencaoComponent],
  imports: [
      ProgramaCrudModule.config({
          // url base da API
          url: 'cliente',
          pesquisa: ClientePesquisaComponent,
          manutencao: ClienteManutencaoComponent
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
    ClienteCRUDService,
    ClientePesquisaService
  ]
})
export class ClienteModule { }
